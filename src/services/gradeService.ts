
import api from './api';
import { Grade, ApiResponse } from '../types';

export const gradeService = {
  async getGrades(params?: {
    estudiante?: number;
    materia?: number;
    periodo?: number;
    page?: number;
  }): Promise<ApiResponse<Grade>> {
    const response = await api.get('/notas/', { params });
    return response.data;
  },

  async createGrade(grade: Partial<Grade>): Promise<Grade> {
    const response = await api.post('/notas/', grade);
    return response.data;
  },

  async updateGrade(id: number, grade: Partial<Grade>): Promise<Grade> {
    const response = await api.put(`/notas/${id}/`, grade);
    return response.data;
  },

  async deleteGrade(id: number): Promise<void> {
    await api.delete(`/notas/${id}/`);
  },

  async getGradesByStudent(studentId: number): Promise<Grade[]> {
    const response = await api.get(`/notas/estudiante/${studentId}/`);
    return response.data;
  },

  async getGradesBySubject(subjectId: number): Promise<Grade[]> {
    const response = await api.get(`/notas/materia/${subjectId}/`);
    return response.data;
  },
};
