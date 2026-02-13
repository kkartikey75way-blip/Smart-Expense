import { Icons } from "../../components/ui/Icons";
import TransactionForm from "../../components/forms/TransactionForm";
import TransactionTable from "../../components/ui/TransactionTable";
import ImportModal from "../../components/modals/ImportModal";
import Button from "../../components/ui/Button";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function TransactionsPage() {
  const [showForm, setShowForm] = useState(false);
  const [showImport, setShowImport] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-main">Transactions</h1>
          <p className="text-muted">Manage and export your financial records.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            className="flex items-center gap-2"
            onClick={() => setShowImport(true)}
          >
            <Icons.Upload className="w-5 h-5" />
            Import Statement
          </Button>
          <Button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2"
          >
            <Icons.Plus className="w-5 h-5" />
            New Entry
          </Button>
        </div>
      </div>

      <div className="w-full">
        <TransactionTable />
      </div>

      <AnimatePresence>
        {showForm && (
          <TransactionForm onClose={() => setShowForm(false)} />
        )}
        {showImport && (
          <ImportModal onClose={() => setShowImport(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
