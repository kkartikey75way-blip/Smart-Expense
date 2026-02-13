import { useState } from "react";
import Card from "../../components/ui/Card";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    Legend
} from "recharts";
import { useGetCategoryStatsQuery, useGetMonthlyStatsQuery } from "../../services/analyticsApi";

const COLORS = ["#8b5cf6", "#ec4899", "#10b981", "#f59e0b", "#3b82f6", "#ef4444"];

export default function AnalyticsPage() {
    const [type, setType] = useState<"income" | "expense">("expense");

    const { data: categoryData, isLoading: catLoading } = useGetCategoryStatsQuery(type);
    const { data: monthlyData, isLoading: monthLoading } = useGetMonthlyStatsQuery();

    if (catLoading || monthLoading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Financial Analytics</h1>
                    <p className="text-gray-400">Deep dive into your spending and earning patterns.</p>
                </div>
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                    <button
                        onClick={() => setType("expense")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${type === "expense" ? "bg-brand-secondary text-white shadow-lg" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Expenses
                    </button>
                    <button
                        onClick={() => setType("income")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${type === "income" ? "bg-brand-primary text-white shadow-lg" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Income
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 h-[450px]">
                    <h3 className="text-lg font-bold mb-6">Category Breakdown</h3>
                    <ResponsiveContainer width="100%" height="80%">
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={120}
                                paddingAngle={5}
                                dataKey="total"
                                nameKey="_id"
                            >
                                {categoryData?.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>

                            <Tooltip
                                contentStyle={{ backgroundColor: "#111827", borderColor: "#374151", borderRadius: "8px" }}
                                itemStyle={{ color: "#fff" }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>

                <Card className="p-6 h-[450px]">
                    <h3 className="text-lg font-bold mb-6">Monthly Evolution</h3>
                    <ResponsiveContainer width="100%" height="80%">
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" vertical={false} />
                            <XAxis dataKey="_id" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#111827", borderColor: "#374151", borderRadius: "8px" }}
                                itemStyle={{ color: "#fff" }}
                            />
                            <Bar dataKey="income" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="expense" fill="#ec4899" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            <Card className="p-6 h-[400px]">
                <h3 className="text-lg font-bold mb-6">Cash Flow Trend</h3>
                <ResponsiveContainer width="100%" height="80%">
                    <AreaChart data={monthlyData}>
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
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
                        <Area type="monotone" dataKey="expense" stroke="#ec4899" fillOpacity={1} fill="url(#colorExpense)" />
                    </AreaChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
}
