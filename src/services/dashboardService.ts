
import api from './api';
import { DashboardStats } from '../types';

export const dashboardService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get('/dashboard/estadisticas/');
    return response.data;
  },

  async getPerformanceData(params?: {
    materia?: number;
    periodo?: number;
  }): Promise<any> {
    const response = await api.get('/dashboard/rendimiento/', { params });
    return response.data;
  },

  async getAttendanceTrends(): Promise<any> {
    const response = await api.get('/dashboard/tendencias-asistencia/');
    return response.data;
  },

  async getRiskDistribution(): Promise<any> {
    const response = await api.get('/dashboard/distribucion-riesgo/');
    return response.data;
  },
};
