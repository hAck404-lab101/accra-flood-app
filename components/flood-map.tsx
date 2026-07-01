"use client";

import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { FloodReport, FloodStatus } from "@/lib/types";
import { StatusBadge } from "./status-badge";

const ACCRA_CENTER: [number, number] = [5.6037, -0.187];

const markerColors: Record<FloodStatus, string> = {
  flooded: "#ef4444",
  water_rising: "#f59e0b",
  clear: "#16a34a"
};

function createStatusIcon(status: FloodStatus) {
  return L.divIcon({
    className: "",
    html: `<div style="width:22px;height:22px;border-radius:999px;background:${markerColors[status]};border:4px solid white;box-shadow:0 12px 28px rgba(0,0,0,.25);"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  });
}

export default function FloodMap({ reports }: { reports: FloodReport[] }) {
  return (
    <div className="map-shell h-[68vh] min-h-[520px] overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-soft">
      <MapContainer center={ACCRA_CENTER} zoom={12} scrollWheelZoom className="z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[report.latitude, report.longitude]}
            icon={createStatusIcon(report.status)}
          >
            <Popup>
              <div className="min-w-[220px] space-y-2">
                <div className="text-base font-extrabold text-slate-950">{report.area_name}</div>
                <StatusBadge status={report.status} />
                {report.water_level ? <p className="text-sm text-slate-700">Water level: {report.water_level}</p> : null}
                {report.description ? <p className="text-sm text-slate-600">{report.description}</p> : null}
                <p className="text-xs text-slate-400">
                  {report.is_verified ? "Verified report" : "Unverified report"}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
