"use client";

import { useState } from "react";
import { MapPin, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { FloodStatus } from "@/lib/types";

const initialForm = {
  area_name: "",
  latitude: "",
  longitude: "",
  status: "water_rising" as FloodStatus,
  water_level: "",
  description: "",
  reported_by: ""
};

export function ReportForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      setMessage("Location is not available on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateField("latitude", String(position.coords.latitude));
        updateField("longitude", String(position.coords.longitude));
        setMessage("Location added. You can still adjust the area name.");
      },
      () => setMessage("Could not get your location. Enter latitude and longitude manually.")
    );
  }

  async function submitReport(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const latitude = Number(form.latitude);
    const longitude = Number(form.longitude);

    if (!form.area_name || Number.isNaN(latitude) || Number.isNaN(longitude)) {
      setMessage("Please provide area name, latitude, and longitude.");
      setLoading(false);
      return;
    }

    if (!supabase) {
      setMessage("Supabase is not connected yet. Add env keys to save real reports.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("flood_reports").insert({
      area_name: form.area_name,
      latitude,
      longitude,
      status: form.status,
      water_level: form.water_level || null,
      description: form.description || null,
      reported_by: form.reported_by || null,
      is_verified: false
    });

    if (error) {
      setMessage(error.message);
    } else {
      setForm(initialForm);
      setMessage("Report submitted. It will appear after verification or public display rules are enabled.");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={submitReport} className="space-y-5 rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div>
        <h2 className="text-2xl font-black text-slate-950">Report flood status</h2>
        <p className="mt-2 text-sm text-slate-600">
          Submit only what you can actually see. Reports are marked unverified until checked.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-bold text-slate-700">Area name</span>
          <input
            value={form.area_name}
            onChange={(event) => updateField("area_name", event.target.value)}
            placeholder="Eg. Circle, Kaneshie, Spintex"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-bold text-slate-700">Status</span>
          <select
            value={form.status}
            onChange={(event) => updateField("status", event.target.value as FloodStatus)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="flooded">Flooded</option>
            <option value="water_rising">Water rising</option>
            <option value="clear">Clear</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-bold text-slate-700">Latitude</span>
          <input
            value={form.latitude}
            onChange={(event) => updateField("latitude", event.target.value)}
            placeholder="5.6037"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-bold text-slate-700">Longitude</span>
          <input
            value={form.longitude}
            onChange={(event) => updateField("longitude", event.target.value)}
            placeholder="-0.1870"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={useMyLocation}
        className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-800 hover:bg-slate-200"
      >
        <MapPin size={18} /> Use my current location
      </button>

      <label className="block space-y-2">
        <span className="text-sm font-bold text-slate-700">Water level</span>
        <input
          value={form.water_level}
          onChange={(event) => updateField("water_level", event.target.value)}
          placeholder="Eg. ankle level, knee level, road blocked"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-bold text-slate-700">Description</span>
        <textarea
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          placeholder="Describe what is happening..."
          rows={4}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-bold text-slate-700">Your name or phone optional</span>
        <input
          value={form.reported_by}
          onChange={(event) => updateField("reported_by", event.target.value)}
          placeholder="Optional"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
        />
      </label>

      {message ? <p className="rounded-2xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">{message}</p> : null}

      <button
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 font-black text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={18} /> {loading ? "Submitting..." : "Submit flood report"}
      </button>
    </form>
  );
}
