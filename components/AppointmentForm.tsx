import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMinutes, setHours, setMinutes, isSaturday, isSunday } from "date-fns";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

interface AppointmentFormProps {
  onSuccess?: () => void;
}

export default function AppointmentForm({ onSuccess }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    motivo: "",
    fecha: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const MOTIVOS = [
    {
      value: "primera-valoracion",
      label: "Primera valoración",
      precio: 150000,
      incluye: ["Escaneo", "Valoración", "Plan de tratamiento"],
    },
    {
      value: "control-tratamiento",
      label: "Control de tratamiento",
      precio: 80000,
      incluye: ["Revisión", "Ajuste", "Recomendaciones"],
    },
    {
      value: "urgencia",
      label: "Urgencia",
      precio: 100000,
      incluye: ["Diagnóstico", "Manejo del dolor", "Recomendaciones"],
    },
    {
      value: "ortodoncia-invisible",
      label: "Ortodoncia invisible",
      precio: 200000,
      incluye: ["Escaneo", "Simulación", "Plan personalizado"],
    },
    {
      value: "otro",
      label: "Otro",
      precio: 150000,
      incluye: ["Consulta personalizada"],
    },
  ];
  const [selectedMotivo, setSelectedMotivo] = useState(MOTIVOS[0]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ nombre: "", apellido: "", telefono: "", email: "", motivo: "", fecha: "" });
        if (onSuccess) onSuccess();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Eliminar el disclaimer de precio aquí */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-gray-700 mb-2" htmlFor="nombre">Nombre *</label>
          <input id="nombre" name="nombre" type="text" required value={formData.nombre} onChange={handleChange} className="w-full rounded-lg border border-gray-400 px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#FFB4AB]" />
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700 mb-2" htmlFor="apellido">Apellido *</label>
          <input id="apellido" name="apellido" type="text" required value={formData.apellido} onChange={handleChange} className="w-full rounded-lg border border-gray-400 px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#FFB4AB]" />
        </div>
      </div>
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="telefono">Teléfono *</label>
        <input id="telefono" name="telefono" type="tel" required value={formData.telefono} onChange={handleChange} className="w-full rounded-lg border border-gray-400 px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#FFB4AB]" />
      </div>
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="email">Email *</label>
        <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full rounded-lg border border-gray-400 px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#FFB4AB]" />
      </div>
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="motivo">Motivo de la consulta *</label>
        <div className="flex items-center gap-4">
          <select
            id="motivo"
            name="motivo"
            required
            value={selectedMotivo.value}
            onChange={e => {
              const motivo = MOTIVOS.find(m => m.value === e.target.value) || MOTIVOS[0];
              setSelectedMotivo(motivo);
              setFormData({ ...formData, motivo: motivo.label });
            }}
            className="w-full rounded-lg border border-gray-400 px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#FFB4AB] focus-visible:outline-none invalid:border-red-400"
          >
            {MOTIVOS.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
          <span className="text-[#021D49] font-semibold whitespace-nowrap">${selectedMotivo.precio.toLocaleString("es-CO")} COP</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="flex-1 w-full">
          <label className="block text-gray-700 mb-2" htmlFor="fecha">Fecha y hora para la cita *</label>
          <DatePicker
            id="fecha"
            name="fecha"
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setFormData({ ...formData, fecha: date ? date.toISOString() : "" });
            }}
            showTimeSelect
            timeIntervals={30}
            timeCaption="Hora"
            dateFormat="dd/MM/yyyy h:mm aa"
            minDate={new Date()}
            filterDate={(date) => {
              // No permitir domingos
              return date.getDay() !== 0;
            }}
            filterTime={(time) => {
              if (!selectedDate) return true;
              const now = new Date();
              const selectedDay = selectedDate.getDate();
              const selectedMonth = selectedDate.getMonth();
              const selectedYear = selectedDate.getFullYear();
              // Si la fecha seleccionada es hoy, solo permite horas futuras
              if (
                selectedDay === now.getDate() &&
                selectedMonth === now.getMonth() &&
                selectedYear === now.getFullYear()
              ) {
                return time.getTime() > now.getTime();
              }
              // Sábado: 8am-1pm
              const day = selectedDate.getDay();
              const hour = time.getHours();
              if (day === 6) return hour >= 8 && hour < 13;
              // Lunes a viernes: 8am-5pm
              return hour >= 8 && hour < 17;
            }}
            placeholderText={isSunday(selectedDate || new Date()) ? "No disponible los domingos" : "Selecciona fecha y hora"}
            disabled={isSunday(selectedDate || new Date())}
            className="w-full rounded-lg border border-gray-400 px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#FFB4AB]"
          />
          {selectedDate && isSunday(selectedDate) && (
            <div className="text-red-600 text-sm mt-2">No disponible los domingos</div>
          )}
        </div>
        <div className="flex-1 w-full mt-4 md:mt-0 md:ml-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="font-semibold mb-2 text-[#021D49]">¿Qué incluye la consulta?</div>
          <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
            {selectedMotivo.incluye.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full bg-[#FFB4AB] text-[#021D49] hover:bg-[#021D49] hover:text-[#FFB4AB] font-semibold text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed">
        {isSubmitting ? "Agendando..." : "Agendar Cita"}
      </Button>
    </form>
  );
} 