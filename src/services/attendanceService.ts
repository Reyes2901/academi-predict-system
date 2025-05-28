
import api from './api';
import { Attendance, ApiResponse } from '../types';

export const attendanceService = {
  async getAttendance(params?: {
    estudiante?: number;
    materia?: number;
    fecha?: string;
    estado?: string;
    page?: number;
  }): Promise<ApiResponse<Attendance>> {
    const response = await api.get('/asistencias/', { params });
    return response.data;
  },

  async createAttendance(attendance: Partial<Attendance>): Promise<Attendance> {
    const response = await api.post('/asistencias/', attendance);
    return response.data;
  },

  async updateAttendance(id: number, attendance: Partial<Attendance>): Promise<Attendance> {
    const response = await api.put(`/asistencias/${id}/`, attendance);
    return response.data;
  },

  async deleteAttendance(id: number): Promise<void> {
    await api.delete(`/asistencias/${id}/`);
  },

  async getAttendanceStats(): Promise<any> {
    const response = await api.get('/asistencias/estadisticas/');
    return response.data;
  },

  async bulkCreateAttendance(attendances: Partial<Attendance>[]): Promise<Attendance[]> {
    const response = await api.post('/asistencias/bulk-create/', { asistencias: attendances });
    return response.data;
  },
};
