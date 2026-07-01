"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { FloodReport } from "@/lib/types";
import { StatusBadge } from "@/components/status-badge";

export default function AreaPage({ params }: { params: { slug: string } }) {
  const [reports, setReports] = useState<FloodReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadMessage, setLoadMessage] = useState<string | null>(null);
  const areaName = useMemo(() => decodeURIComponent(params.slug).replaceAll("-", " "), [params.slug]);

  useEffect(() => {
    async function loadAreaReports() {
      setLoading(true);
      setLoadMessage(null);

      if (!supabase) {
        setReports([]);
        setLoadMessage("Supabase is not connected. Add your Supabase URL and anon key in Vercel environment variables.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("flood_reports")
        .select("*")
        .ilike("area_name", areaName)
        .order("created_at", { ascending: false });

      if (error) {
        setReports([]);
        setLoadMessage(error.message);
      } else {
        setReports((data || []) as FloodReport[]);
      }

      setLoading(false);
    }

    loadAreaReports();
  }, [areaName]);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 md:px-8">
      <section className="mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50">
          <ArrowLeft size={16} /> Back to map
        </Link>

        <header className="mt-6 rounded-[28px] bg-slate-950 p-6 text-white shadow-soft">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-200">Area reports</p>
          <h1 className="mt-3 text-4xl font-black capitalize">{areaName}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            View flood updates for this area. New community reports should be verified before being treated as reliable.
          </p>
        </header>

        <div className="mt-6 space-y-4">
          {loading ? (
            <p className="rounded-[24px] bg-blue-50 p-5 text-sm font-semibold text-blue-700 shadow-sm ring-1 ring-blue-100">
              Loading live reports for this area...
            </p>
          ) : null}

          {!loading && loadMessage ? (
            <p className="rounded-[24px] bg-amber-50 p-5 text-sm font-semibold text-amber-700 shadow-sm ring-1 ring-amber-100">
              {loadMessage}
            </p>
          ) : null}

          {reports.map((report) => (
            <article key={report.id} className="rounded-[24px] bg-white p-5 shadow-soft ring-1 ring-slate-200">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-950">{report.area_name}</h2>
                  <p className="mt-2 text-sm text-slate-600">{report.description || "No description provided."}</p>
                  <p className="mt-3 text-xs font-semibold text-slate-400">
                    {new Date(report.created_at).toLocaleString()} • {report.latitude}, {report.longitude}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status={report.status} />
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    {report.is_verified ? "Verified" : "Unverified"}
                  </span>
                </div>
              </div>
            </article>
          ))}

          {!loading && !loadMessage && reports.length === 0 ? (
            <div className="rounded-[24px] bg-white p-10 text-center shadow-soft ring-1 ring-slate-200">
              <h2 className="text-xl font-black text-slate-950">No live reports for this area yet</h2>
              <p className="mt-2 text-sm text-slate-600">Submit one if you are there and can safely confirm the condition.</p>
              <Link href="/report" className="mt-5 inline-flex rounded-2xl bg-blue-600 px-5 py-3 font-black text-white hover:bg-blue-700">
                Report this area
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
