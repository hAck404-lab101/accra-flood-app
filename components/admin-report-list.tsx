"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, RefreshCcw, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { FloodReport } from "@/lib/types";
import { StatusBadge } from "./status-badge";

export function AdminReportList() {
  const [reports, setReports] = useState<FloodReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  async function loadReports() {
    setLoading(true);
    setMessage(null);

    if (!supabase) {
      setMessage("Supabase is not connected yet. Add env keys to load reports.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("flood_reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) setMessage(error.message);
    else setReports((data || []) as FloodReport[]);

    setLoading(false);
  }

  async function verifyReport(id: string, verified: boolean) {
    if (!supabase) return;

    const { error } = await supabase
      .from("flood_reports")
      .update({ is_verified: verified })
      .eq("id", id);

    if (error) setMessage(error.message);
    else loadReports();
  }

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div className="rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-950">Admin verification</h2>
          <p className="mt-1 text-sm text-slate-600">Approve only reports that are credible or confirmed.</p>
        </div>
        <button
          onClick={loadReports}
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-800 hover:bg-slate-200"
        >
          <RefreshCcw size={16} /> Refresh
        </button>
      </div>

      {message ? <p className="mt-5 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">{message}</p> : null}
      {loading ? <p className="mt-5 text-sm font-semibold text-slate-500">Loading reports...</p> : null}

      <div className="mt-6 space-y-4">
        {reports.map((report) => (
          <article key={report.id} className="rounded-3xl border border-slate-200 p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-950">{report.area_name}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <StatusBadge status={report.status} />
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    {report.is_verified ? "Verified" : "Unverified"}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{report.description || "No description provided."}</p>
                <p className="mt-2 text-xs text-slate-400">
                  {report.latitude}, {report.longitude} • {new Date(report.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => verifyReport(report.id, true)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-green-600 px-4 py-3 text-sm font-black text-white hover:bg-green-700"
                >
                  <CheckCircle2 size={16} /> Verify
                </button>
                <button
                  onClick={() => verifyReport(report.id, false)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-red-100 px-4 py-3 text-sm font-black text-red-700 hover:bg-red-200"
                >
                  <XCircle size={16} /> Reject
                </button>
              </div>
            </div>
          </article>
        ))}

        {!loading && reports.length === 0 ? (
          <p className="rounded-2xl bg-slate-50 px-4 py-8 text-center text-sm font-semibold text-slate-500">
            No reports yet.
          </p>
        ) : null}
      </div>
    </div>
  );
}
