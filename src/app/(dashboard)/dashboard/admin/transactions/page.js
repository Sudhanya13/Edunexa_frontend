"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, RefreshCw, Receipt } from "lucide-react";
import DashboardSection from "@/components/dashboard/shared/DashboardSection";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://edunexa-server.vercel.app";

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTransactions = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/admin/transactions`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to load transactions");
      }
      setError("");
      setTransactions(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Load remote data; updates occur after fetch resolves.
    fetchTransactions();
  }, [fetchTransactions]);

  const formatDate = (dateVal) => {
    if (!dateVal) return "—";
    const d = new Date(dateVal);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <DashboardSection
      title="Transactions"
      description="All Stripe subscription payments recorded in the platform."
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            {transactions.length} payment record(s)
          </p>

          <button
            onClick={() => {
              setLoading(true);
              fetchTransactions();
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <RefreshCw className="size-4" />
            Refresh
          </button>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex min-h-60 items-center justify-center">
            <Loader2 className="size-8 animate-spin text-indigo-600" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <Receipt className="mx-auto size-11 text-slate-300" />
            <p className="mt-3 font-semibold text-slate-800">
              No payment transactions yet
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3.5">User Name</th>
                  <th className="px-5 py-3.5">Email</th>
                  <th className="px-5 py-3.5">Role</th>
                  <th className="px-5 py-3.5">Plan Name</th>
                  <th className="px-5 py-3.5">Amount</th>
                  <th className="px-5 py-3.5">Transaction ID</th>
                  <th className="px-5 py-3.5">Payment Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((tx) => (
                  <tr key={String(tx._id)} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {tx.userName}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{tx.userEmail}</td>
                    <td className="px-5 py-4 capitalize text-slate-700">
                      {tx.role}
                    </td>
                    <td className="px-5 py-4 font-medium text-indigo-700">
                      {tx.planName}
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-900">
                      ${Number(tx.amount || 0).toFixed(2)}
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-slate-600">
                      {tx.transactionId}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {formatDate(tx.paymentDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardSection>
  );
}
