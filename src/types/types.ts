export interface SensorData {
  id: string;
  name: string;
  temperature: number;
  description?: string;
}
export interface DataSnapshot {
  timestamp: number;
  sensors: SensorData[];
}
