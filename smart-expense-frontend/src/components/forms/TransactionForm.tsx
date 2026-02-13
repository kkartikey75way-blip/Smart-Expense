import { useForm } from "react-hook-form";
import { useCreateTransactionMutation } from "../../services/transactionApi";
import { toast } from "react-hot-toast";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Card from "../ui/Card";
import { Icons } from "../ui/Icons";


interface TransactionFormProps {
  onClose?: () => void;
}

export default function TransactionForm({ onClose }: TransactionFormProps) {
  const { register, handleSubmit, reset } = useForm();
  const [createTransaction, { isLoading }] = useCreateTransactionMutation();

  const onSubmit = async (data: any) => {
    try {
      await createTransaction(data).unwrap();
      toast.success("Transaction added successfully!");
      reset();
      onClose?.();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add transaction");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <Card className="p-8 space-y-6 w-full max-w-md relative animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">New Transaction</h3>
            <p className="text-sm text-gray-400">Add a new income or expense record.</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-all"
            >
              <Icons.X className="w-5 h-5" />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 ml-1">Type</label>
            <select
              {...register("type")}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all appearance-none cursor-pointer"
            >
              <option value="expense" className="bg-[#030712]">Expense</option>
              <option value="income" className="bg-[#030712]">Income</option>
            </select>
          </div>

          <Input
            {...register("amount", { valueAsNumber: true })}
            type="number"
            label="Amount"
            placeholder="0.00"
            required
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 ml-1">Category</label>
            <select
              {...register("category")}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all appearance-none cursor-pointer"
            >
              <option value="Shopping" className="bg-[#030712]">Shopping</option>
              <option value="Food" className="bg-[#030712]">Food</option>
              <option value="Bills" className="bg-[#030712]">Bills</option>
              <option value="Travel" className="bg-[#030712]">Travel</option>
              <option value="Salary" className="bg-[#030712]">Salary</option>
              <option value="Other" className="bg-[#030712]">Other</option>
            </select>
          </div>

          <Input
            {...register("description")}
            label="Description"
            placeholder="What was this for?"
          />

          <div className="flex gap-3 pt-2">
            {onClose && (
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={onClose}
              >
                Cancel
              </Button>
            )}
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Transaction"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
