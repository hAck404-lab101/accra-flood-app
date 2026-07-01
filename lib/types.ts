export type FloodStatus = "flooded" | "water_rising" | "clear";

export type FloodReport = {
  id: string;
  area_name: string;
  latitude: number;
  longitude: number;
  status: FloodStatus;
  water_level?: string | null;
  description?: string | null;
  image_url?: string | null;
  reported_by?: string | null;
  is_verified: boolean;
  created_at: string;
};

export type NewFloodReport = Omit<FloodReport, "id" | "is_verified" | "created_at">;
