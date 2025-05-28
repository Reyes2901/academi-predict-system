
import api from './api';
import { Participation, ApiResponse } from '../types';

export const participationService = {
  async getParticipations(params?: {
    estudiante?: number;
    materia?: number;
    fecha?: string;
    tipo?: string;
    calidad?: string;
    page?: number;
  }): Promise<ApiResponse<Participation>> {
    const response = await api.get('/participaciones/', { params });
    return response.data;
  },

  async createParticipation(participation: Partial<Participation>): Promise<Participation> {
    const response = await api.post('/participaciones/', participation);
    return response.data;
  },

  async updateParticipation(id: number, participation: Partial<Participation>): Promise<Participation> {
    const response = await api.put(`/participaciones/${id}/`, participation);
    return response.data;
  },

  async deleteParticipation(id: number): Promise<void> {
    await api.delete(`/participaciones/${id}/`);
  },

  async getParticipationStats(): Promise<any> {
    const response = await api.get('/participaciones/estadisticas/');
    return response.data;
  },
};
