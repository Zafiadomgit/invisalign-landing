"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || (session.user as any).role !== "admin") {
      router.replace("/");
      return;
    }
    fetch("/api/admin/users")
      .then(res => res.json())
      .then(data => setUsers(data.users || []))
      .finally(() => setLoading(false));
  }, [session, status, router]);

  if (status === "loading" || loading) return <div className="p-8 text-center">Cargando...</div>;

  return (
    <div className="min-h-screen bg-[#021D49] p-8">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
        <h2 className="cera-pro text-2xl mb-6 text-[#021D49]">Panel de Administración</h2>
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Apellido</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Teléfono</th>
              <th className="p-2 border">Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="even:bg-gray-50">
                <td className="p-2 border">{u.id}</td>
                <td className="p-2 border">{u.nombre}</td>
                <td className="p-2 border">{u.apellido}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.phone}</td>
                <td className="p-2 border">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 