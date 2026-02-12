import { useForm } from "react-hook-form";
import { useCreateTransactionMutation } from "../../services/transactionApi";

export default function TransactionForm() {

  const { register, handleSubmit, reset } = useForm();
  const [createTransaction] = useCreateTransactionMutation();

  const onSubmit = async (data: any) => {
    await createTransaction(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 rounded shadow space-y-4"
    >

      <select {...register("type")} className="border p-2 w-full">
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        {...register("amount")}
        type="number"
        placeholder="Amount"
        className="border p-2 w-full"
      />

      <input
        {...register("category")}
        placeholder="Category"
        className="border p-2 w-full"
      />

      <input
        {...register("description")}
        placeholder="Description"
        className="border p-2 w-full"
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Transaction
      </button>

    </form>
  );
}
