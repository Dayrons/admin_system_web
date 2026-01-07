import type { Service } from "./Service";

export type HistoryService = {
  id: number;
  name: string;
  service?: Service;
  created_at: string;
  updated_at: string;
};