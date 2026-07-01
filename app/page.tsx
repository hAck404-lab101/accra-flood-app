"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, CloudRain, MapPin, ShieldCheck } from "lucide-react";
import { demoReports } from "@/lib/demo-data";
import { supabase } from "@/lib/supabase";
import type { FloodReport, FloodStatus } from "@/lib/types";
import { StatusBadge } from "@/components/status-badge";

const FloodMap = dynamic(() => import("@/components/flood-map"), {
  ssr: false,
  loading: () => <div className="h-[68vh] min-h-[520px] rounded-[28px] bg-white shadow-soft" />
});

const statusOrder: FloodStatus[] = ["flooded", "water_rising", "clear"];

export default function HomePage() {
  const [reports, setReports] = useState<FloodReport[]>(demoReports);
  const [usingDemo, setUsingDemo] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function loadReports() {
      if (!supabase) return;

      const { data, error } = await supabase
        .from("flood_reports")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (!error && data && data.length > 0) {
        setReports(data as FloodReport[]);
        setUsingDemo(false);
      }
    }

    loadReports();
  }, []);

  const filteredReports = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return reports;
    return reports.filter((report) => report.area_name.toLowerCase().includes(cleanQuery));
  }, [query, reports]);

  const counts = useMemo(() => {
    return statusOrder.reduce(
      (acc, status) => ({
        ...acc,
        [status]: reports.filter((report) => report.status === status).length
      }),
      {} as Record<FloodStatus, number>
    );
  }, [reports]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_35%),#f3f7fb] px-4 py-6 text-slate-950 md:px-8">
      <section className="mx-auto max-w-7xl">
        <header className="grid gap-6 rounded-[32px] bg-slate-950 p-6 text-white shadow-soft md:grid-cols-[1.2fr_.8fr] md:p-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-blue-100 ring-1 ring-white/15">
              <CloudRain size={16} /> Rainy-day movement assistant for Accra
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
              Check flood reports before entering Accra.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              Use the map to see community flood reports, risky areas, and clear routes. Built first for travellers coming from places like Ho into Accra during heavy rains.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/report" className="rounded-2xl bg-blue-500 px-5 py-3 font-black text-white hover:bg-blue-600">
                Report flood status
              </Link>
              <Link href="/admin" className="rounded-2xl bg-white/10 px-5 py-3 font-black text-white ring-1 ring-white/15 hover:bg-white/15">
                Admin review
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] bg-white/10 p-5 ring-1 ring-white/15">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-1 text-amber-300" />
              <div>
                <h2 className="font-black">Important safety note</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  This MVP should not be treated as perfect truth. Reports can be incomplete. Official alerts and local instructions should still be followed.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] bg-white p-5 shadow-soft ring-1 ring-slate-200">
            <p className="text-sm font-bold text-slate-500">Flooded</p>
            <p className="mt-2 text-4xl font-black text-red-600">{counts.flooded}</p>
          </div>
          <div className="rounded-[24px] bg-white p-5 shadow-soft ring-1 ring-slate-200">
            <p className="text-sm font-bold text-slate-500">Water rising</p>
            <p className="mt-2 text-4xl font-black text-amber-600">{counts.water_rising}</p>
          </div>
          <div className="rounded-[24px] bg-white p-5 shadow-soft ring-1 ring-slate-200">
            <p className="text-sm font-bold text-slate-500">Clear</p>
            <p className="mt-2 text-4xl font-black text-green-600">{counts.clear}</p>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <FloodMap reports={filteredReports} />
            {usingDemo ? (
              <p className="mt-3 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
                Demo data is showing because Supabase has no live reports yet.
              </p>
            ) : null}
          </div>

          <aside className="rounded-[28px] bg-white p-5 shadow-soft ring-1 ring-slate-200">
            <label className="block">
              <span className="text-sm font-black text-slate-700">Search area</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Circle, Kaneshie, Madina..."
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </label>

            <div className="mt-5 space-y-3">
              {filteredReports.map((report) => (
                <Link
                  key={report.id}
                  href={`/area/${encodeURIComponent(report.area_name.toLowerCase().replaceAll(" ", "-"))}`}
                  className="block rounded-2xl border border-slate-200 p-4 hover:border-blue-300 hover:bg-blue-50/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-black text-slate-950">{report.area_name}</h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {report.is_verified ? "Verified" : "Unverified"} • {new Date(report.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                    <StatusBadge status={report.status} />
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] bg-white p-5 shadow-soft ring-1 ring-slate-200">
            <MapPin className="text-blue-600" />
            <h3 className="mt-3 font-black">Community reports</h3>
            <p className="mt-2 text-sm text-slate-600">People on the ground submit live observations with location and status.</p>
          </div>
          <div className="rounded-[24px] bg-white p-5 shadow-soft ring-1 ring-slate-200">
            <ShieldCheck className="text-green-600" />
            <h3 className="mt-3 font-black">Verification layer</h3>
            <p className="mt-2 text-sm text-slate-600">Admins can verify credible reports before they are trusted by the public.</p>
          </div>
          <div className="rounded-[24px] bg-white p-5 shadow-soft ring-1 ring-slate-200">
            <CloudRain className="text-blue-600" />
            <h3 className="mt-3 font-black">Weather layer next</h3>
            <p className="mt-2 text-sm text-slate-600">Rain radar and official alerts can be added after the report system works.</p>
          </div>
        </section>
      </section>
    </main>
  );
}
