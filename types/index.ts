export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

export interface Case {
  id: number;
  name: string;
  color: string;
  icon: string;
  status: 'active' | 'archive' | 'closed';
  created_at: string;
}

export interface Task {
  id: number;
  case_id: number;
  title: string;
  description?: string;
  due_date?: string;
  completed: boolean;
  delayed: boolean;
  created_at: string;
}

export interface Session {
  id: number;
  case_id: number;
  date: string; // شمسی
  time: string;
  location: string;
  title: string;
  description: string;
  attachment?: string;
  created_at: string;
}

export interface HistoryEntry {
  id: number;
  case_id: number;
  action: string;
  details: string;
  timestamp: string;
}

export interface Letter {
  id: number;
  title: string;
  description: string;
  due_date?: string;
  completed: boolean;
  delayed: boolean;
  created_at: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  color: string;
  created_at: string;
}

export interface Settings {
  id: number;
  theme: 'light' | 'dark' | 'custom';
  font_size: number;
  logo?: string;
  title: string;
  user_avatar?: string;
}
