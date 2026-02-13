import {
  useGetTransactionsQuery,
  useDeleteTransactionMutation
} from "../../services/transactionApi";
import { Icons } from "./Icons";
import Card from "./Card";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../store/store";
import { setSortConfig, type SortDirection } from "../../store/reducer/uiReducer";
import { useMemo } from "react";

export default function TransactionTable() {
  const { data, isLoading } = useGetTransactionsQuery();
  const [deleteTransaction] = useDeleteTransactionMutation();
  const dispatch = useDispatch();
  const { searchTerm, sortConfig } = useSelector((state: RootState) => state.ui);

  const filteredAndSortedTransactions = useMemo(() => {
    if (!data?.transactions) return [];

    let result = [...data.transactions];

    // Search Filtering
    if (searchTerm) {
      result = result.filter((t: any) =>
        t.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting
    if (sortConfig.key && sortConfig.direction) {
      result.sort((a: any, b: any) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        if (sortConfig.key === "date") {
          valA = new Date(valA).getTime();
          valB = new Date(valB).getTime();
        }

        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchTerm, sortConfig]);

  const toggleSort = (key: string) => {
    let direction: SortDirection = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    dispatch(setSortConfig({ key, direction }));
  };

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return <Icons.MoreVertical className="w-3 h-3 opacity-20" />;
    return sortConfig.direction === "asc" ? (
      <Icons.ArrowUpRight className="w-3 h-3 text-brand-primary" />
    ) : (
      <Icons.ArrowDownRight className="w-3 h-3 text-brand-primary" />
    );
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id).unwrap();
      toast.success("Transaction deleted");
    } catch (error) {
      toast.error("Failed to delete transaction");
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case "shopping": return <Icons.ShoppingBag className="w-4 h-4" />;
      case "food": return <Icons.Utensils className="w-4 h-4" />;
      case "bills": return <Icons.Zap className="w-4 h-4" />;
      case "travel": return <Icons.Car className="w-4 h-4" />;
      default: return <Icons.MoreVertical className="w-4 h-4" />;
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center p-12">
      <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <Card className="p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-muted bg-white/5">
              <th
                className="p-4 text-xs font-semibold text-muted uppercase tracking-wider cursor-pointer hover:text-main transition-colors"
                onClick={() => toggleSort("description")}
              >
                <div className="flex items-center gap-2">
                  Transaction {getSortIcon("description")}
                </div>
              </th>
              <th className="p-4 text-xs font-semibold text-muted uppercase tracking-wider">Category</th>
              <th
                className="p-4 text-xs font-semibold text-muted uppercase tracking-wider text-right cursor-pointer hover:text-main transition-colors"
                onClick={() => toggleSort("amount")}
              >
                <div className="flex items-center justify-end gap-2">
                  Amount {getSortIcon("amount")}
                </div>
              </th>
              <th className="p-4 text-xs font-semibold text-muted uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted">
            {filteredAndSortedTransactions.map((t: any) => (
              <tr key={t._id} className="group hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-muted group-hover:bg-brand-primary/20 group-hover:text-brand-primary transition-all">
                      {getCategoryIcon(t.category)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t.description || "No description"}</p>
                      <p className="text-xs text-muted">{new Date(t.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-main border border-muted">
                    {t.category}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <span className={`text-sm font-bold ${t.type === 'expense' ? 'text-brand-secondary' : 'text-green-500'}`}>
                    {t.type === 'expense' ? '-' : '+'} ₹ {t.amount}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="p-2 text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                    title="Delete"
                  >
                    <Icons.Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredAndSortedTransactions.length === 0 && (
        <div className="p-12 text-center text-muted">
          No transactions found.
        </div>
      )}
    </Card>
  );
}
