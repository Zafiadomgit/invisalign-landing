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
      <div className="mb-2 text-sm text-gray-600 text-center">
        <strong>Agendar la consulta tiene un valor de $150.000 COP.</strong>
      </div>
      {submitStatus === "success" && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
          ¡Gracias! Tu cita ha sido agendada exitosamente. Te hemos enviado un correo de confirmación.
        </div>
      )}
      {submitStatus === "error" && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
          Hubo un error al agendar tu cita. Por favor, intenta nuevamente.
        </div>
      )}
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
        <textarea id="motivo" name="motivo" required rows={2} value={formData.motivo} onChange={handleChange} className="w-full rounded-lg border border-gray-400 px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#FFB4AB]" />
      </div>
      <div>
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
            const day = selectedDate.getDay();
            const hour = time.getHours();
            // Sábado: 8am-1pm
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
      <Button type="submit" disabled={isSubmitting} className="w-full bg-[#FFB4AB] text-[#021D49] hover:bg-[#021D49] hover:text-[#FFB4AB] font-semibold text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed">
        {isSubmitting ? "Agendando..." : "Agendar Cita"}
      </Button>
    </form>
  );
} 