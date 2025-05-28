
import api from './api';
import { AuthTokens, LoginCredentials, User } from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    const response = await api.post('/token/', credentials);
    const { access, refresh } = response.data;
    
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    
    return response.data;
  },

  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        await api.post('/token/blacklist/', { refresh: refreshToken });
      } catch (error) {
        console.error('Error al hacer logout:', error);
      }
    }
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/usuarios/me/');
    return response.data;
  },

  async refreshToken(): Promise<AuthTokens> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await api.post('/token/refresh/', {
      refresh: refreshToken,
    });
    
    const { access } = response.data;
    localStorage.setItem('access_token', access);
    
    return response.data;
  },

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  },

  getToken(): string | null {
    return localStorage.getItem('access_token');
  },
};
