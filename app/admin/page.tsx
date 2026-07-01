import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminReportList } from "@/components/admin-report-list";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 md:px-8">
      <section className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50">
          <ArrowLeft size={16} /> Back to map
        </Link>

        <div className="mt-6">
          <AdminReportList />
        </div>
      </section>
    </main>
  );
}
