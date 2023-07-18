export interface Log {
  id: number;
  message: string;
  timestamp: string;
}

export interface Column {
  name: string;
  label: string;
  field: string;
  align: string;
}

export interface Category {
  id: string;
  description: string;
}
