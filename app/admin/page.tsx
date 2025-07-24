"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || (session.user as any).role !== "admin") {
      router.replace("/");
      return;
    }
    fetch("/api/admin/appointments")
      .then(res => res.json())
      .then(data => setAppointments(data.appointments || []))
      .finally(() => setLoading(false));
  }, [session, status, router]);

  if (status === "loading" || loading) return <div className="p-8 text-center">Cargando...</div>;

  return (
    <div className="min-h-screen bg-[#021D49] p-8">
      <Card className="bg-white rounded-xl shadow-lg p-8 max-w-6xl mx-auto">
        <CardContent>
          <h2 className="cera-pro text-2xl mb-6 text-[#021D49]">Panel de Administración de Citas</h2>
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Paciente</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Teléfono</th>
                <th className="p-2 border">Motivo</th>
                <th className="p-2 border">Fecha</th>
                <th className="p-2 border">Estado</th>
                <th className="p-2 border">Pago</th>
                <th className="p-2 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(a => (
                <tr key={a.id} className="even:bg-gray-50">
                  <td className="p-2 border">{a.id}</td>
                  <td className="p-2 border">{a.nombre} {a.apellido}</td>
                  <td className="p-2 border">{a.email}</td>
                  <td className="p-2 border">{a.telefono}</td>
                  <td className="p-2 border">{a.motivo}</td>
                  <td className="p-2 border">{a.fecha}</td>
                  <td className="p-2 border">{a.estado}</td>
                  <td className="p-2 border">{a.pago || "-"}</td>
                  <td className="p-2 border">
                    <Button size="sm" className="mr-1">Modificar</Button>
                    <Button size="sm" variant="outline" className="mr-1">Reasignar</Button>
                    <Button size="sm" variant="destructive" className="mr-1">Cancelar</Button>
                    <Button size="sm" variant="success">Marcar pago</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
} 