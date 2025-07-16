"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";

export default function AuthPage() {
  const [tab, setTab] = useState("login");
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    nombre: "",
    apellido: "",
    phone: "",
    status: "nuevo",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [keepLogged, setKeepLogged] = useState(true);
  const router = useRouter();

  // Registro personalizado
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error en el registro");
      setSuccess("¡Registro exitoso! Redirigiendo...");
      // Login automático
      await signIn("credentials", {
        email: registerData.email,
        password: registerData.password,
        redirect: false,
      });
      setTimeout(() => router.push("/"), 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Login con NextAuth
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const res = await signIn("credentials", {
      email: loginData.email,
      password: loginData.password,
      redirect: false,
      maxAge: keepLogged ? 30 * 24 * 60 * 60 : undefined,
    });
    setLoading(false);
    if (res?.error) {
      setError("Credenciales incorrectas");
    } else {
      setSuccess("¡Bienvenido!");
      router.push("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#021D49]">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="cera-pro text-2xl text-center mb-6 text-[#021D49]">Acceso a tu cuenta</h2>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="w-full flex mb-6">
            <TabsTrigger value="login" className="flex-1">Iniciar sesión</TabsTrigger>
            <TabsTrigger value="register" className="flex-1">Registrarse</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            {showReset ? (
              <form
                onSubmit={async e => {
                  e.preventDefault();
                  setResetMsg("");
                  const res = await fetch("/api/auth/forgot", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: resetEmail }),
                  });
                  const data = await res.json();
                  setResetMsg(data.message || "");
                }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    value={resetEmail}
                    onChange={e => setResetEmail(e.target.value)}
                    required
                  />
                </div>
                {resetMsg && <div className="text-blue-600 text-sm">{resetMsg}</div>}
                <Button type="submit" className="w-full cera-pro-black-btn">Enviar enlace de recuperación</Button>
                <Button type="button" variant="outline" className="w-full" onClick={() => setShowReset(false)}>Volver</Button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginData.email}
                    onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="login-password">Contraseña</Label>
                  <PasswordInput
                    id="login-password"
                    value={loginData.password}
                    onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="keep-logged"
                    type="checkbox"
                    checked={keepLogged}
                    onChange={e => setKeepLogged(e.target.checked)}
                    className="accent-[#021D49]"
                  />
                  <label htmlFor="keep-logged" className="text-sm text-gray-700 select-none">Mantenerme logueado</label>
                </div>
                {error && <div className="text-red-600 text-sm">{error}</div>}
                {success && <div className="text-green-600 text-sm">{success}</div>}
                <Button type="submit" className="w-full cera-pro-black-btn" disabled={loading}>
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
                <button
                  type="button"
                  className="block w-full text-center text-sm text-[#021D49] underline mt-2"
                  onClick={() => setShowReset(true)}
                >
                  ¿No puedes iniciar sesión?
                </button>
              </form>
            )}
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  value={registerData.email}
                  onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="register-password">Contraseña</Label>
                <PasswordInput
                  id="register-password"
                  value={registerData.password}
                  onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="register-nombre">Nombre</Label>
                <Input
                  id="register-nombre"
                  type="text"
                  value={registerData.nombre}
                  onChange={e => setRegisterData({ ...registerData, nombre: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="register-apellido">Apellido</Label>
                <Input
                  id="register-apellido"
                  type="text"
                  value={registerData.apellido}
                  onChange={e => setRegisterData({ ...registerData, apellido: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="register-phone">Teléfono</Label>
                <Input
                  id="register-phone"
                  type="tel"
                  value={registerData.phone}
                  onChange={e => setRegisterData({ ...registerData, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="register-status">¿Eres nuevo o ya tienes tratamiento?</Label>
                <select
                  id="register-status"
                  className="w-full border rounded px-3 py-2"
                  value={registerData.status}
                  onChange={e => setRegisterData({ ...registerData, status: e.target.value })}
                >
                  <option value="nuevo">Nuevo</option>
                  <option value="tratamiento">En tratamiento</option>
                </select>
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              {success && <div className="text-green-600 text-sm">{success}</div>}
              <Button type="submit" className="w-full cera-pro-black-btn" disabled={loading}>
                {loading ? "Registrando..." : "Registrarse"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
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