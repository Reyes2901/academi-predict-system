
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  rol: 'PROFESOR' | 'ESTUDIANTE' | 'ADMINISTRATIVO';
  telefono?: string;
  fecha_nacimiento?: string;
  direccion?: string;
  is_active: boolean;
}

export interface Student extends User {
  codigo_estudiante: string;
  fecha_ingreso: string;
  curso?: Course;
}

export interface Subject {
  id: number;
  nombre: string;
  codigo: string;
  descripcion: string;
  horas_semanales: number;
  profesor?: User;
  curso?: Course;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: number;
  nombre: string;
  nivel: string;
  seccion: string;
  ano_academico: number;
  profesor_guia?: User;
  estudiantes: Student[];
  materias: Subject[];
  created_at: string;
  updated_at: string;
}

export interface Grade {
  id: number;
  estudiante: Student;
  materia: Subject;
  periodo: AcademicPeriod;
  nota_ser: number;
  nota_saber: number;
  nota_hacer: number;
  nota_decidir: number;
  promedio: number;
  observaciones?: string;
  fecha_registro: string;
}

export interface AcademicPeriod {
  id: number;
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  is_active: boolean;
}

export interface Attendance {
  id: number;
  estudiante: Student;
  materia: Subject;
  fecha: string;
  estado: 'PRESENTE' | 'AUSENTE' | 'TARDANZA' | 'JUSTIFICADO';
  observaciones?: string;
  hora_llegada?: string;
}

export interface Participation {
  id: number;
  estudiante: Student;
  materia: Subject;
  fecha: string;
  tipo: 'VOLUNTARIA' | 'SOLICITADA' | 'EJERCICIO' | 'PREGUNTA';
  calidad: 'EXCELENTE' | 'BUENA' | 'REGULAR' | 'DEFICIENTE';
  descripcion: string;
  puntos: number;
}

export interface Prediction {
  id: number;
  estudiante: Student;
  materia: Subject;
  probabilidad_aprobacion: number;
  nivel_riesgo: 'BAJO' | 'MEDIO' | 'ALTO';
  factores_riesgo: string[];
  recomendaciones: string[];
  fecha_prediccion: string;
}

export interface DashboardStats {
  total_estudiantes: number;
  total_profesores: number;
  total_materias: number;
  total_cursos: number;
  promedio_general: number;
  porcentaje_asistencia: number;
  estudiantes_riesgo_alto: number;
  estudiantes_riesgo_medio: number;
  estudiantes_riesgo_bajo: number;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
