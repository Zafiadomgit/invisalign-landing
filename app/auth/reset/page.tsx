"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") || "";
  const email = params.get("email") || "";
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#021D49]">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="cera-pro text-2xl text-center mb-6 text-[#021D49]">Restablecer contraseña</h2>
        <form
          className="space-y-4"
          onSubmit={async e => {
            e.preventDefault();
            setLoading(true);
            setMsg("");
            const res = await fetch("/api/auth/reset", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, token, password }),
            });
            const data = await res.json();
            setMsg(data.message || "");
            setLoading(false);
            if (res.ok) setTimeout(() => router.push("/auth"), 1500);
          }}
        >
          <div>
            <label htmlFor="reset-password" className="block mb-1">Nueva contraseña</label>
            <PasswordInput
              id="reset-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {msg && <div className={msg.includes("exito") ? "text-green-600" : "text-red-600"}>{msg}</div>}
          <Button type="submit" className="w-full cera-pro-black-btn" disabled={loading}>
            {loading ? "Guardando..." : "Restablecer contraseña"}
          </Button>
        </form>
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => router.push("/")}
        >
          Volver a la página principal
        </Button>
      </div>
    </div>
  );
} 