
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, TrendingUp, AlertTriangle, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const performanceData = [
  { name: "Matemáticas", promedio: 85, riesgo: 15 },
  { name: "Ciencias", promedio: 78, riesgo: 22 },
  { name: "Historia", promedio: 92, riesgo: 8 },
  { name: "Inglés", promedio: 76, riesgo: 24 },
  { name: "Educación Física", promedio: 89, riesgo: 11 },
];

const riskDistribution = [
  { name: "Bajo Riesgo", value: 65, color: "#10b981" },
  { name: "Riesgo Medio", value: 25, color: "#f59e0b" },
  { name: "Alto Riesgo", value: 10, color: "#ef4444" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Académico</h1>
          <p className="text-gray-600">Resumen general del rendimiento estudiantil</p>
        </div>
        <div className="text-sm text-gray-500 mt-2 sm:mt-0">
          Última actualización: Hoy, 10:30 AM
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Estudiantes"
          value="248"
          icon={Users}
          trend={{ value: 5, isPositive: true }}
          color="blue"
        />
        <StatCard
          title="Promedio General"
          value="84.2%"
          icon={TrendingUp}
          trend={{ value: 2.1, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Asistencia Promedio"
          value="92.5%"
          icon={BarChart3}
          trend={{ value: -1.2, isPositive: false }}
          color="yellow"
        />
        <StatCard
          title="Estudiantes en Riesgo"
          value="25"
          icon={AlertTriangle}
          trend={{ value: -8, isPositive: true }}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de rendimiento por materia */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Rendimiento por Materia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="promedio" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribución de riesgo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Distribución de Riesgo Académico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Predicciones y alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Predicciones IA - Próximo Período</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800">Pronóstico Positivo</h4>
              <p className="text-sm text-green-700">
                El 78% de los estudiantes mantendrá o mejorará su rendimiento actual basado en tendencias de asistencia y participación.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800">Atención Requerida</h4>
              <p className="text-sm text-yellow-700">
                15 estudiantes muestran patrones que sugieren posible declive en rendimiento. Se recomienda intervención temprana.
              </p>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-800">Riesgo Alto</h4>
              <p className="text-sm text-red-700">
                8 estudiantes requieren atención inmediata. Factores críticos: baja asistencia y participación decreciente.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
              <div className="font-medium text-blue-900">Registrar Calificaciones</div>
              <div className="text-sm text-blue-700">Actualizar notas del día</div>
            </button>
            <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
              <div className="font-medium text-green-900">Tomar Asistencia</div>
              <div className="text-sm text-green-700">Marcar presentes/ausentes</div>
            </button>
            <button className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors">
              <div className="font-medium text-purple-900">Ver Reportes</div>
              <div className="text-sm text-purple-700">Generar informes detallados</div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
