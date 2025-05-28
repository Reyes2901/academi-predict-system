
import api from './api';
import { Student, ApiResponse } from '../types';

export const studentService = {
  async getStudents(params?: {
    curso?: number;
    search?: string;
    page?: number;
  }): Promise<ApiResponse<Student>> {
    const response = await api.get('/usuarios/', {
      params: { rol: 'ESTUDIANTE', ...params },
    });
    return response.data;
  },

  async getStudent(id: number): Promise<Student> {
    const response = await api.get(`/usuarios/${id}/`);
    return response.data;
  },

  async createStudent(student: Partial<Student>): Promise<Student> {
    const response = await api.post('/usuarios/', {
      ...student,
      rol: 'ESTUDIANTE',
    });
    return response.data;
  },

  async updateStudent(id: number, student: Partial<Student>): Promise<Student> {
    const response = await api.put(`/usuarios/${id}/`, student);
    return response.data;
  },

  async deleteStudent(id: number): Promise<void> {
    await api.delete(`/usuarios/${id}/`);
  },

  async getStudentsByProfessor(): Promise<Student[]> {
    const response = await api.get('/usuarios/estudiantes-profesor/');
    return response.data;
  },
};
