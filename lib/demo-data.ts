import type { FloodReport } from "./types";

export const demoReports: FloodReport[] = [
  {
    id: "demo-circle",
    area_name: "Kwame Nkrumah Circle",
    latitude: 5.556,
    longitude: -0.203,
    status: "water_rising",
    water_level: "ankle level",
    description: "Demo report for MVP testing. Replace with real community reports from Supabase.",
    image_url: null,
    reported_by: "Demo",
    is_verified: false,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-kaneshie",
    area_name: "Kaneshie",
    latitude: 5.567,
    longitude: -0.234,
    status: "flooded",
    water_level: "knee level",
    description: "Demo high-risk marker. Do not treat as live flood truth.",
    image_url: null,
    reported_by: "Demo",
    is_verified: false,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-madina",
    area_name: "Madina",
    latitude: 5.683,
    longitude: -0.167,
    status: "clear",
    water_level: "none",
    description: "Demo clear status for design testing.",
    image_url: null,
    reported_by: "Demo",
    is_verified: false,
    created_at: new Date().toISOString()
  }
];
