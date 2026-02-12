import TransactionForm from "../../components/forms/TransactionForm";
import TransactionTable from "../../components/ui/TransactionTable";

export default function TransactionsPage() {

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Transactions
      </h1>

      <TransactionForm />
      <TransactionTable />

    </div>
  );
}
