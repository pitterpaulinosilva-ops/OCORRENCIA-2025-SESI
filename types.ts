export interface Incident {
  id: string;
  date: string; // ISO String YYYY-MM-DD
  type: string; // "Tipo de Ocorrência"
  oms: string; // "Tipo de Incidente (OMS)"
  phase: string; // "Fase"
  unit: string; // "Notificada" (Unidade)
  severity: string; // "Severidade/Gravidade"
  responsible: string; // "Responsável"
  process: string; // "Processo"
  status?: string; // "Status"
  description?: string;
}

export interface DashboardMetrics {
  totalIncidents: number;
  openIncidents: number;
  criticalIncidents: number;
  avgResolutionTime: number; // in days
}

export interface FilterState {
  startDate: string;
  endDate: string;
  units: string[]; // Array para múltipla seleção
  severities: string[]; // Array para múltipla seleção
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}