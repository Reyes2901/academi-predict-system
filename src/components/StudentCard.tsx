
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Calendar, BarChart3 } from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  average: number;
  attendance: number;
  participation: number;
  prediction: "alto" | "medio" | "bajo";
  lastActivity: string;
}

interface StudentCardProps {
  student: Student;
  onViewDetails: (studentId: string) => void;
}

export function StudentCard({ student, onViewDetails }: StudentCardProps) {
  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case "alto": return "bg-green-100 text-green-800";
      case "medio": return "bg-yellow-100 text-yellow-800";
      case "bajo": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAverageColor = (average: number) => {
    if (average >= 85) return "text-green-600";
    if (average >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{student.name}</h3>
              <p className="text-sm text-gray-500">{student.email}</p>
            </div>
          </div>
          <Badge className={getPredictionColor(student.prediction)}>
            Riesgo {student.prediction}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-500">Promedio</p>
            <p className={`text-lg font-semibold ${getAverageColor(student.average)}`}>
              {student.average}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Asistencia</p>
            <p className="text-lg font-semibold text-gray-900">{student.attendance}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Participación</p>
            <p className="text-lg font-semibold text-gray-900">{student.participation}%</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            {student.lastActivity}
          </div>
          <Button 
            size="sm" 
            onClick={() => onViewDetails(student.id)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Ver Detalles
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
