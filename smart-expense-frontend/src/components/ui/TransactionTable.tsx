import {
  useGetTransactionsQuery,
  useDeleteTransactionMutation
} from "../../services/transactionApi";

export default function TransactionTable() {

  const { data, isLoading } = useGetTransactionsQuery();
  const [deleteTransaction] = useDeleteTransactionMutation();

  if (isLoading) return <p>Loading...</p>;

  return (
    <table className="w-full bg-white shadow rounded mt-6">

      <thead>
        <tr className="border-b">
          <th className="p-2">Type</th>
          <th className="p-2">Amount</th>
          <th className="p-2">Category</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {data?.transactions.map((t) => (
          <tr key={t._id} className="border-b text-center">

            <td className="p-2">{t.type}</td>
            <td className="p-2">₹ {t.amount}</td>
            <td className="p-2">{t.category}</td>

            <td className="p-2">
              <button
                onClick={() => deleteTransaction(t._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </td>

          </tr>
        ))}
      </tbody>

    </table>
  );
}
