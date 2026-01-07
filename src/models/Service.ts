import type { HistoryService } from "./HistoryService";

export type Service = {
  id: number;
  name: string;
  description: string;
  status: string;
  is_active: boolean;
  add_file: boolean;
  replay: boolean;
  created_at: string;
  updated_at: string;
  user_exec: string;
 histories: HistoryService[];
};