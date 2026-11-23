"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, RefreshCw, Shield, Search } from "lucide-react";
import DashboardSection from "@/components/dashboard/shared/DashboardSection";
import { authClient } from "@/lib/auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://edunexa-server.vercel.app";

const ROLES = ["student", "tutor", "admin"];

function RoleBadge({ role }) {
  const styles = {
    admin: "bg-purple-100 text-purple-700",
    tutor: "bg-sky-100 text-sky-700",
    student: "bg-slate-100 text-slate-700",
  };
  const normalized = String(role || "student").toLowerCase();

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
        styles[normalized] || "bg-slate-100 text-slate-700"
      }`}
    >
      {normalized}
    </span>
  );
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchUsers = useCallback(async () => {
    const { data: tokenData, error: tokenError } = await authClient.token();

    if (tokenError || !tokenData?.token) {
      throw new Error(tokenError?.message || "Failed to retrieve auth token");
    }
    try {
      const res = await fetch(`${API_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to load users");
      }
      setError("");
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Load remote data; updates occur after fetch resolves.
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (userObj, newRole) => {
    const userId = userObj.id || userObj._id;
    try {
      setUpdatingId(userId);
      setError("");
      setSuccess("");

      const res = await fetch(`${API_URL}/admin/users/${userId}/role`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Role update failed");
      }

      setUsers((prev) =>
        prev.map((u) =>
          (u.id || u._id) === userId ? { ...u, role: newRole } : u,
        ),
      );
      setSuccess(`Updated ${userObj.email || userObj.name} to ${newRole}.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      String(u.name || "")
        .toLowerCase()
        .includes(q) ||
      String(u.email || "")
        .toLowerCase()
        .includes(q) ||
      String(u.role || "")
        .toLowerCase()
        .includes(q)
    );
  });

  return (
    <DashboardSection
      title="User Management"
      description="View registered users and assign student, tutor, or admin roles."
    >
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or role..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
            />
          </div>

          <button
            onClick={() => {
              setLoading(true);
              fetchUsers();
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
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

        {success && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {loading ? (
          <div className="flex min-h-60 items-center justify-center">
            <Loader2 className="size-8 animate-spin text-indigo-600" />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3.5">User</th>
                  <th className="px-5 py-3.5">Email</th>
                  <th className="px-5 py-3.5">Plan</th>
                  <th className="px-5 py-3.5">Current Role</th>
                  <th className="px-5 py-3.5">Change Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => {
                  const userId = u.id || u._id;
                  const currentRole = String(u.role || "student").toLowerCase();
                  return (
                    <tr key={String(userId)} className="hover:bg-slate-50/70">
                      <td className="px-5 py-4 font-semibold text-slate-900">
                        {u.name || "Unnamed User"}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {u.email || "—"}
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold capitalize text-indigo-700">
                          {u.plan || "free"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <RoleBadge role={currentRole} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="inline-flex items-center gap-2">
                          <Shield className="size-4 text-slate-400" />
                          <select
                            value={currentRole}
                            disabled={updatingId === userId}
                            onChange={(e) =>
                              handleRoleChange(u, e.target.value)
                            }
                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold capitalize text-slate-700 outline-none focus:border-indigo-500 disabled:opacity-60"
                          >
                            {ROLES.map((r) => (
                              <option key={r} value={r}>
                                {r}
                              </option>
                            ))}
                          </select>
                          {updatingId === userId && (
                            <Loader2 className="size-4 animate-spin text-indigo-600" />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-10 text-center text-slate-500"
                    >
                      No users match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardSection>
  );
}
