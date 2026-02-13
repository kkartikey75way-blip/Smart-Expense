import { Icons } from "../../components/ui/Icons";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useGetDashboardStatsQuery, useGetMonthlyStatsQuery } from "../../services/analyticsApi";
import { useGetTransactionsQuery } from "../../services/transactionApi";
import TransactionForm from "../../components/forms/TransactionForm";
import { useState } from "react";

export default function DashboardPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const { data: stats, isLoading: statsLoading } = useGetDashboardStatsQuery();
  const { data: graphData, isLoading: graphLoading } = useGetMonthlyStatsQuery();
  const { data: transactionsData, isLoading: transLoading } = useGetTransactionsQuery();

  const isLoading = statsLoading || graphLoading || transLoading;

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  const statCards = [
    { label: "Total Balance", value: `$${stats?.balance?.toLocaleString() || "0"}`, icon: Icons.Wallet, color: "brand-primary" },
    { label: "Monthly Income", value: `$${stats?.totalIncome?.toLocaleString() || "0"}`, icon: Icons.TrendingUp, color: "green-500" },
    { label: "Monthly Expense", value: `$${stats?.totalExpense?.toLocaleString() || "0"}`, icon: Icons.CreditCard, color: "brand-secondary" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-gray-400">Welcome back, track your daily expenses here.</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2">
          <Icons.Plus className="w-5 h-5" />
          Add Transaction
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl bg-white/5`}>
                <stat.icon className={`w-6 h-6 text-white`} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-green-500 text-sm font-medium flex items-center">
                <Icons.ArrowUpRight className="w-4 h-4" /> +0%
              </span>
              <span className="text-gray-500 text-xs">from last month</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 h-[400px]">
          <h3 className="text-lg font-bold mb-6">Cash Flow Analytics</h3>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={graphData}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" vertical={false} />
              <XAxis dataKey="_id" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#111827", borderColor: "#374151", borderRadius: "8px" }}
                itemStyle={{ color: "#fff" }}
              />
              <Area type="monotone" dataKey="income" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorIncome)" />
              <Area type="monotone" dataKey="expense" stroke="#ec4899" fillOpacity={1} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Recent Transactions</h3>
          </div>
          <div className="space-y-6">
            {transactionsData?.transactions?.slice(0, 5).map((transaction: any) => (
              <div key={transaction._id} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-primary/20 group-hover:text-brand-primary transition-all">
                    <Icons.ArrowDownRight className={`w-5 h-5 ${transaction.type === "expense" ? "text-brand-secondary" : "text-green-500"}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{transaction.description}</p>
                    <p className="text-xs text-gray-500">{transaction.category} • {new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className={`text-sm font-bold ${transaction.type === "expense" ? "text-white" : "text-green-500"}`}>
                  {transaction.type === "expense" ? "-" : "+"}${transaction.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          <Button variant="secondary" className="w-full mt-8">View All</Button>
        </Card>
      </div>

      {showAddModal && (
        <TransactionForm onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}
