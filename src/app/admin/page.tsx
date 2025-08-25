"use client";
import { useMemo, useState } from "react";

type Registration = {
  id: number;
  name: string;
  email: string;
  phone: string;
  emailSent?: number;
  emailError?: string | null;
  registeredAt?: string;
};

type Subscriber = {
  email: string;
  subscribedAt?: string;
  source?: string;
};

export default function AdminDashboard() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [error, setError] = useState<string>("");
  const [settingsError, setSettingsError] = useState<string>("");
  const [settingsOk, setSettingsOk] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmTarget, setConfirmTarget] = useState<Registration | null>(null);
  // Keep authenticated credentials (current) separate from the editable fields
  const [authUser, setAuthUser] = useState<string>("");
  const [authPass, setAuthPass] = useState<string>("");

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  // No auto-fill; credentials must be entered manually

  const authHeader = useMemo(() => {
    if (!username || !password) return {} as Record<string, string>;
    const token = typeof window !== "undefined" ? btoa(`${username}:${password}`) : "";
    return { Authorization: `Basic ${token}` } as Record<string, string>;
  }, [username, password]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      // Registrations
      const regRes = await fetch(`${apiBase}/admin/registrations`, {
        headers: { ...authHeader },
        credentials: "include",
      });
      if (regRes.status === 401) {
        const msg = await regRes.json().catch(() => null);
        const remaining = msg?.remainingAttempts;
        throw new Error(remaining !== undefined ? `Wrong credentials. You have ${remaining} more ${remaining === 1 ? 'chance' : 'chances'}.` : 'Unauthorized – check admin credentials.');
      }
      if (regRes.status === 423) {
        const msg = await regRes.json().catch(() => null);
        const ms = msg?.retryAfterMs ?? 0;
        const secs = Math.ceil(ms / 1000);
        throw new Error(`Too many attempts. Locked. Try again in ~${secs}s.`);
      }
      const regJson = await regRes.json();
      setRegistrations(Array.isArray(regJson) ? regJson : []);

      // Subscribers
      // Use admin endpoint that returns all subscribers, not just active
      const subRes = await fetch(`${apiBase}/admin/newsletter/subscribers`, {
        headers: { ...authHeader },
        credentials: "include",
      });
      if (subRes.status === 401) {
        const msg = await subRes.json().catch(() => null);
        const remaining = msg?.remainingAttempts;
        throw new Error(remaining !== undefined ? `Wrong credentials. You have ${remaining} more ${remaining === 1 ? 'chance' : 'chances'}.` : 'Unauthorized – check admin credentials.');
      }
      if (subRes.status === 423) {
        const msg = await subRes.json().catch(() => null);
        const ms = msg?.retryAfterMs ?? 0;
        const secs = Math.ceil(ms / 1000);
        throw new Error(`Too many attempts. Locked. Try again in ~${secs}s.`);
      }
      const subJson = await subRes.json();
      setSubs(Array.isArray(subJson?.subscribers) ? subJson.subscribers : []);
      setIsAuthed(true);
      // cache the current valid auth creds for privileged actions (like changing creds)
      setAuthUser(username);
      setAuthPass(password);
      if (typeof window !== "undefined") {
        localStorage.setItem("adminUser", username);
        localStorage.setItem("adminPass", password);
      }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : "Failed to load admin data";
      setError(errorMessage);
      setIsAuthed(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteRegistration = async (id: number) => {
    try {
      const token = typeof window !== "undefined" ? btoa(`${username}:${password}`) : "";
      const res = await fetch(`${apiBase}/admin/registrations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Basic ${token}` },
      });
      const json = await res.json();
      if (!json?.success) throw new Error(json?.message || 'Failed to delete');
      setRegistrations((prev) => prev.filter(r => r.id !== id));
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Delete failed';
      setError(errorMessage);
    }
  };

  type ColumnDef = { key: string; title: string; mapper?: (v: unknown, row?: Record<string, unknown>) => string };

  const exportCsv = (rows: Record<string, unknown>[], filename: string, columns: ColumnDef[]) => {
    if (!rows || rows.length === 0) return;
    const header = columns.map(c => c.title).join(',');
    const lines = rows.map(row => {
      return columns.map(c => {
        const raw = c.mapper ? c.mapper(row[c.key], row) : row[c.key];
        const val = raw == null ? '' : String(raw);
        // Escape commas, quotes, newlines
        const needsQuotes = /[",\n\r]/.test(val);
        const escaped = '"' + val.replace(/"/g, '""') + '"';
        return needsQuotes ? escaped : val;
      }).join(',');
    });
    // Add BOM for Excel and CRLF endings
    const csvContent = '\ufeff' + [header, ...lines].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden pt-24 pb-12">
      {/* Background */}
      <div className="fixed inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: "url('/new-adeyababa.jpg')" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#3b2f23] to-black opacity-80 -z-10" />

      {/* Accent */}
      <div className="pointer-events-none fixed top-0 left-0 z-0">
        <div className="w-40 h-40 bg-yellow-500 opacity-20 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 mb-4">Admin Dashboard</h1>
          <p className="text-amber-100/80">View registrations and newsletter subscribers</p>
        </div>

        {/* Auth Box */}
        <div className="bg-black/70 border border-yellow-500 rounded-2xl p-6 mb-8 max-w-xl mx-auto">
          <div className="grid grid-cols-1 gap-4">
            <input
              className="bg-black/40 border-2 border-yellow-400/30 text-yellow-200 placeholder-yellow-300/60 px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400"
              placeholder="Admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full bg-black/40 border-2 border-yellow-400/30 text-yellow-200 placeholder-yellow-300/60 px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 pr-10"
                placeholder="Admin password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-yellow-300 hover:text-yellow-200"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchData}
                className="px-5 py-3 rounded-full font-bold text-black bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 shadow-lg"
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign in & Load"}
              </button>
              {isAuthed && (
                <span className="self-center text-green-300 text-sm">Authenticated</span>
              )}
            </div>
            {error && <div className="text-red-300 text-sm">{error}</div>}
          </div>
        </div>

        {/* Data Sections - visible only after auth */}
        {isAuthed && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Registrations */}
          <section className="bg-black/70 border border-yellow-500 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-yellow-300">Registrations ({registrations.length})</h2>
              <button
                onClick={() => exportCsv(registrations, "registrations.csv", [
                  { key: 'id', title: 'ID' },
                  { key: 'name', title: 'Name' },
                  { key: 'email', title: 'Email' },
                  { key: 'phone', title: 'Phone' },
                  { key: 'registeredAt', title: 'Registered At' },
                  { key: 'emailSent', title: 'Email Sent', mapper: v => v ? 'Yes' : 'No' },
                ])}
                className="px-3 py-2 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600"
                disabled={!registrations.length}
              >
                Export CSV
              </button>
            </div>
            <div className="overflow-auto max-h-[480px]">
              <table className="min-w-full text-sm text-yellow-100/90">
                <thead className="sticky top-0 bg-black/60">
                  <tr>
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Phone</th>
                    <th className="text-left p-2">Registered</th>
                    <th className="text-left p-2">Email Sent</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((r) => (
                    <tr key={r.id} className="odd:bg-white/5">
                      <td className="p-2">{r.name}</td>
                      <td className="p-2">{r.email}</td>
                      <td className="p-2">{r.phone}</td>
                      <td className="p-2">{r.registeredAt ?? "-"}</td>
                      <td className="p-2">{r.emailSent ? "Yes" : "No"}</td>
                      <td className="p-2">
                        <button onClick={() => { setConfirmTarget(r); setConfirmOpen(true); }} className="px-3 py-1 text-xs rounded-full bg-red-600 hover:bg-red-700 text-white">
                          Cancel Registration
                        </button>
                      </td>
                    </tr>
                  ))}
                  {!registrations.length && (
                    <tr><td colSpan={5} className="p-3 text-yellow-200/70">No registrations loaded.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Subscribers */}
          <section className="bg-black/70 border border-yellow-500 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-yellow-300">Newsletter Subscribers ({subs.length})</h2>
              <button
                onClick={() => exportCsv(subs, "subscribers.csv", [
                  { key: 'email', title: 'Email' },
                  { key: 'status', title: 'Status' },
                  { key: 'isActive', title: 'Active', mapper: v => v ? 'Yes' : 'No' },
                  { key: 'subscribedAt', title: 'Subscribed At' },
                  { key: 'source', title: 'Source' },
                ])}
                className="px-3 py-2 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600"
                disabled={!subs.length}
              >
                Export CSV
              </button>
            </div>
            <div className="overflow-auto max-h-[480px]">
              <table className="min-w-full text-sm text-yellow-100/90">
                <thead className="sticky top-0 bg-black/60">
                  <tr>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Subscribed</th>
                    <th className="text-left p-2">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {subs.map((s, i) => (
                    <tr key={i} className="odd:bg-white/5">
                      <td className="p-2">{s.email}</td>
                      <td className="p-2">{s.subscribedAt ?? "-"}</td>
                      <td className="p-2">{s.source ?? "-"}</td>
                    </tr>
                  ))}
                  {!subs.length && (
                    <tr><td colSpan={3} className="p-3 text-yellow-200/70">No subscribers loaded.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
          {/* Settings */}
          <section className="bg-black/70 border border-yellow-500 rounded-2xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-yellow-300">Admin Settings</h2>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="px-3 py-2 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600"
              >
                {showSettings ? 'Close' : 'Change Credentials'}
              </button>
            </div>
            {showSettings && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-yellow-200/80 text-sm mb-1">New username</label>
                <input
                  className="w-full bg-black/40 border-2 border-yellow-400/30 text-yellow-200 placeholder-yellow-300/60 px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-yellow-200/80 text-sm mb-1">New password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full bg-black/40 border-2 border-yellow-400/30 text-yellow-200 placeholder-yellow-300/60 px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-yellow-300 hover:text-yellow-200"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              <div>
                <button
                  onClick={async () => {
                    try {
                      setSettingsError("");
                      setSettingsOk(false);
                      // Use CURRENT credentials to authorize the change
                      const token = typeof window !== "undefined" ? btoa(`${authUser}:${authPass}`) : "";
                      const res = await fetch(`${apiBase}/admin/settings`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', Authorization: `Basic ${token}` },
                        body: JSON.stringify({ username, password })
                      });
                      const json = await res.json();
                      if (!json?.success) throw new Error(json?.message || 'Failed to update settings');
                      setSettingsOk(true);
                      // After a successful change, restart the page so the session restarts with new creds
                      setTimeout(() => {
                        if (typeof window !== 'undefined') {
                          window.location.reload();
                        }
                      }, 500);
                    } catch (e: unknown) {
                      const errorMessage = e instanceof Error ? e.message : 'Failed to update settings';
                      setSettingsError(errorMessage);
                    }
                  }}
                  className="w-full px-5 py-3 rounded-full font-bold text-black bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 shadow-lg"
                >
                  Save Settings
                </button>
              </div>
            </div>
            )}
            {settingsOk && <div className="mt-2 text-green-300 text-sm">Settings updated.</div>}
            {settingsError && <div className="mt-2 text-red-300 text-sm">{settingsError}</div>}
          </section>
        </div>
        )}

        {/* Themed Unregister Confirm Modal */}
        {confirmOpen && confirmTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/80" onClick={() => setConfirmOpen(false)}></div>
            <div className="relative bg-black/90 border border-yellow-500 rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-fade-in">
              <div className="px-6 py-4 border-b border-yellow-500/40 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-t-2xl">
                <h3 className="text-lg font-bold">Confirm Cancellation</h3>
              </div>
              <div className="p-6 text-yellow-100/90">
                <p>Cancel registration for &quot;{confirmTarget.name}&quot; ({confirmTarget.email})?</p>
                <div className="mt-6 flex justify-end gap-3">
                  <button className="px-4 py-2 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600" onClick={() => setConfirmOpen(false)}>Cancel</button>
                  <button
                    className="px-5 py-2 rounded-full font-bold text-black bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
                    onClick={async () => {
                      if (confirmTarget) {
                        await deleteRegistration(confirmTarget.id);
                      }
                      setConfirmOpen(false);
                      setConfirmTarget(null);
                    }}
                  >
                    Cancel Registration
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


