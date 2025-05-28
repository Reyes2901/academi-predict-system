
import api from './api';
import { Subject, ApiResponse } from '../types';

export const subjectService = {
  async getSubjects(params?: {
    search?: string;
    profesor?: number;
    curso?: number;
    page?: number;
  }): Promise<ApiResponse<Subject>> {
    const response = await api.get('/materias/', { params });
    return response.data;
  },

  async getSubject(id: number): Promise<Subject> {
    const response = await api.get(`/materias/${id}/`);
    return response.data;
  },

  async createSubject(subject: Partial<Subject>): Promise<Subject> {
    const response = await api.post('/materias/', subject);
    return response.data;
  },

  async updateSubject(id: number, subject: Partial<Subject>): Promise<Subject> {
    const response = await api.put(`/materias/${id}/`, subject);
    return response.data;
  },

  async deleteSubject(id: number): Promise<void> {
    await api.delete(`/materias/${id}/`);
  },

  async getSubjectsByProfessor(): Promise<Subject[]> {
    const response = await api.get('/materias/mis-materias/');
    return response.data;
  },
};
