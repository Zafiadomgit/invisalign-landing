"use client";

import TestimonialsCarousel from "@/components/testimonials-carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";

// Background video component con fallback
function BackgroundVideo() {
  const [videoError, setVideoError] = React.useState(false);

  return (
    <div className="fixed inset-0 z-0">
      {!videoError ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onError={() => setVideoError(true)}
        >
          <source src="/video/ConsutorioBG.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className="w-full h-full bg-gray-900">
          <img
            src="/img/placeholder.jpg"
            alt="IPS Mónica Botero S.A.S"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/85 via-gray-800/70 to-gray-900/90 pointer-events-none"></div>
    </div>
  );
}

export default function InvisalignLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  // Cerrar menú de usuario al hacer clic fuera
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      const menu = document.getElementById('user-menu');
      if (menu && !menu.contains(e.target as Node)) setUserMenuOpen(false);
    }
    if (userMenuOpen) document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [userMenuOpen]);
  if (session && session.user) {
    // Log temporal para depuración
    console.log('session.user:', session.user);
  }

  return (
    <>
      {/* Custom Font Styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap");

        @font-face {
          font-family: "GuthenBloots";
          src: url("/Font/Guthen Bloots Personal Use.ttf") format("truetype");
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: "CeraProBlack";
          src: url("/Font/Cera Pro Black.otf") format("opentype");
          font-weight: 900;
          font-style: normal;
          font-display: swap;
        }
        .cera-pro-black {
          font-family: "CeraProBlack", "Playfair Display", serif !important;
          font-weight: 900 !important;
          letter-spacing: -0.01em;
        }

        .navbar-guthen {
          font-family: "CeraProBlack", "Playfair Display", serif !important;
          font-weight: 900;
          letter-spacing: -0.01em;
        }

        h3 {
          font-family: "CeraProBlack", "Playfair Display", serif !important;
          font-weight: 900;
          letter-spacing: -0.01em;
        }

        h1 {
          font-family: "GuthenBloots", cursive, sans-serif !important;
          color: #ffffff !important;
          letter-spacing: 0.01em;
          font-weight: normal;
        }

        h3 {
          font-family: "CeraProBlack", "Playfair Display", serif !important;
          font-weight: 900;
          letter-spacing: -0.01em;
        }

        .cera-pro,
        .cera-pro-medium,
        .cera-pro-bold,
        h1.cera-pro-bold,
        h2.cera-pro,
        h3.cera-pro-medium,
        h2.cera-pro-medium,
        h3.cera-pro-bold,
        h2.cera-pro-medium {
          font-family: "CeraProBlack", "Playfair Display", serif;
          font-weight: 900;
          letter-spacing: -0.01em;
        }

        h3.cera-pro-medium,
        h2.cera-pro-medium {
          font-family: "CeraProBlack", "Playfair Display", serif;
          font-weight: 900;
          font-style: normal;
          line-height: 1.6;
        }

        /* Restore default paragraph font */
        p {
          font-family: "Inter", Arial, Helvetica, sans-serif;
          letter-spacing: normal;
        }
        button, .btn, .Button, .cera-pro-black-btn {
          font-family: "CeraProBlack", "Playfair Display", serif !important;
          font-weight: 900 !important;
          letter-spacing: -0.01em;
        }
      `}</style>

      <div className="min-h-screen relative">
        {/* Background Video */}
        <BackgroundVideo />

        {/* Header */}
        <header className="relative z-10 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <a href="/" aria-label="Ir a la página principal">
                <Image
                  src="/img/IPS-MONICA-BOTERO-SAS-Ortodoncia-Digital.png"
                  alt="IPS Mónica Botero S.A.S Logo"
                  width={180}
                  height={60}
                  className="h-12 w-auto"
                  priority
                />
              </a>
            </div>
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#about"
                className="navbar-guthen text-[#021D49] hover:text-[#FFB4AB] transition-colors"
              >
                Sobre Mí
              </a>
              <a
                href="#treatment"
                className="navbar-guthen text-[#021D49] hover:text-[#FFB4AB] transition-colors"
              >
                Tratamiento
              </a>
              <a
                href="#testimonials"
                className="navbar-guthen text-[#021D49] hover:text-[#FFB4AB] transition-colors"
              >
                Testimonios
              </a>
              <a
                href="/curso"
                className="navbar-guthen text-[#021D49] hover:text-[#FFB4AB] transition-colors"
              >
                Curso de la A a la Z
              </a>
              {session && session.user ? (
                <div className="relative">
                  <button
                    className="navbar-guthen text-[#021D49] hover:text-[#FFB4AB] transition-colors focus:outline-none"
                    onClick={() => {
                      setUserMenuOpen((v) => !v);
                      setMenuOpen(false);
                    }}
                  >
                    {(session.user as any).nombre} {(session.user as any).apellido}
                  </button>
                  {userMenuOpen && (
                    <div id="user-menu" className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                      {((session.user as any).role === "admin" || (session.user as any).email === "odontoesteticabogota@gmail.com") && (
                        <Link
                          href="/admin"
                          className="block w-full text-left px-4 py-2 text-[#021D49] hover:bg-gray-100 font-bold"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Panel de administración
                        </Link>
                      )}
                      <button
                        className="block w-full text-left px-4 py-2 text-[#021D49] hover:bg-gray-100 font-bold"
                        onClick={() => {
                          setUserMenuOpen(false);
                          signOut({ callbackUrl: "/" });
                        }}
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href="/auth"
                  className="navbar-guthen text-[#021D49] hover:text-[#FFB4AB] transition-colors"
                >
                  Acceso
                </a>
              )}
              <Button asChild className="bg-[#021D49] hover:bg-[#FFB4AB] text-white hover:text-[#021D49] font-semibold">
                <a
                  href="https://wa.link/942se9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agenda tu cita
                </a>
              </Button>
            </nav>
            {/* Hamburger Icon */}
            <button
              className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#021D49]"
              onClick={() => {
                setMenuOpen(!menuOpen);
                setUserMenuOpen(false);
              }}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {menuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div> {/* <-- This closes the header container */}
        </header>

        {/* Mobile Menu Overlay - place this right after </header> */}
        {menuOpen && (
          <nav
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 transition-colors duration-300"
            style={{ backdropFilter: 'blur(2px)' }}
          >
            <div
              className="relative bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center w-11/12 max-w-xs h-1/2 transition-all duration-300"
              style={{
                transitionProperty: "transform, opacity",
                transitionDuration: "300ms",
                transform: menuOpen ? "scale(1)" : "scale(0.95)",
                opacity: menuOpen ? 1 : 0,
              }}
            >
              <button
                className="absolute top-4 right-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#021D49] transition-colors"
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <X size={28} />
              </button>
              <div className="flex flex-col items-center space-y-6 w-full mt-8">
                <a
                  href="#about"
                  className="navbar-guthen text-[#021D49] hover:text-[#FFB4AB] transition-colors text-2xl"
                  onClick={() => setMenuOpen(false)}
                >
                  Sobre Mí
                </a>
                <a
                  href="#treatment"
                  className="navbar-guthen text-[#021D49] hover:text-[#FFB4AB] transition-colors text-2xl"
                  onClick={() => setMenuOpen(false)}
                >
                  Tratamiento
                </a>
                <a
                  href="#testimonials"
                  className="navbar-guthen text-[#021D49] hover:text-[#FFB4AB] transition-colors text-2xl"
                  onClick={() => setMenuOpen(false)}
                >
                  Testimonios
                </a>
                <a
                  href="/curso"
                  className="navbar-guthen text-[#021D49] hover:text-[#FFB4AB] transition-colors text-2xl"
                  onClick={() => setMenuOpen(false)}
                >
                  Curso de la A a la Z
                </a>
                {session && session.user ? (
                  <>
                    <div className="navbar-guthen text-[#021D49] text-2xl mb-2 mt-2">
                      {(session.user as any).nombre} {(session.user as any).apellido}
                    </div>
                    {(session.user as any).role === "admin" && (
                      <a
                        href="/admin"
                        className="block w-full text-left px-4 py-2 text-[#021D49] hover:bg-gray-100 text-xl mb-2"
                        onClick={() => setMenuOpen(false)}
                      >
                        Panel de administración
                      </a>
                    )}
                    <Button
                      className="w-11/12 text-xl mt-2 bg-[#FFB4AB] text-[#021D49] hover:bg-[#021D49] hover:text-[#FFB4AB]"
                      onClick={() => { signOut({ callbackUrl: "/" }); setMenuOpen(false); }}
                    >
                      Cerrar sesión
                    </Button>
                  </>
                ) : (
                  <a
                    href="/auth"
                    className="navbar-guthen text-[#021D49] hover:text-[#FFB4AB] transition-colors text-2xl"
                    onClick={() => setMenuOpen(false)}
                  >
                    Acceso
                  </a>
                )}
                <Button
                  asChild
                  className="bg-[#021D49] hover:bg-[#FFB4AB] text-white hover:text-[#021D49] font-semibold w-11/12 text-xl mt-2 transition-colors"
                >
                  <a
                    href="https://wa.link/942se9"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                  >
                    Agenda tu cita
                  </a>
                </Button>
              </div>
            </div>
          </nav>
        )}

        {/* Hero Section */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <Image
                  src="/img/emerald-logo.png"
                  alt="Emerald Provider Logo"
                  width={80}
                  height={40}
                />
              </div>
              <h1 className="cera-pro-black text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
                IPS Mónica Botero{" "}
                <span className="text-3xl md:text-4xl lg:text-5xl">S.A.S</span>
              </h1>
              <p className="cera-pro-black text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
                Pionera en la técnica de Ortodoncia invisible en Colombia y
                Latinoamérica. Transforme su sonrisa con Ortodoncia invisible
                Invisalign.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="cera-pro-black-btn bg-[#ffffff] hover:bg-[#FFB4AB] text-[#021D49] font-semibold text-lg px-8 py-6"
                >
                  Agenda tu cita
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="cera-pro-black-btn border-gray-300 text-gray-300 hover:bg-gray-300/10 text-lg px-8 py-6 bg-transparent"
                >
                  Conocer Más
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Invisible Braces Showcase */}
        <section className="relative z-10 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="cera-pro text-3xl md:text-4xl text-white mb-4">
                Ortodoncia Invisible Invisalign
              </h2>
              <p className="ghuten-bloost text-xl text-gray-300 max-w-3xl mx-auto">
                La tecnología más avanzada para transformar su sonrisa de manera
                discreta y cómoda.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-[#021D49] border-gray-600">
                <CardContent className="p-6">
                  <div className="aspect-square relative mb-4 overflow-hidden rounded-lg">
                    <Image
                      src="/placeholder.svg?height=400&width=400"
                      alt="Invisalign aligners"
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="navbar-guthen cera-pro-medium text-xl text-white mb-2">
                    Alineadores Transparentes
                  </h3>
                  <p className="ghuten-bloost text-gray-300">
                    Prácticamente invisibles, nadie notará que está en
                    tratamiento.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#021D49] border-gray-600">
                <CardContent className="p-6">
                  <div className="aspect-square relative mb-4 overflow-hidden rounded-lg">
                    <Image
                      src="/placeholder.svg?height=400&width=400"
                      alt="Invisalign treatment process"
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="navbar-guthen text-xl text-white mb-2">
                    Proceso de Tratamiento
                  </h3>
                  <p className="ghuten-bloost text-gray-300">
                    Tecnología avanzada para planificar cada paso de su
                    transformación.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#021D49] border-gray-600">
                <CardContent className="p-6">
                  <div className="aspect-square relative mb-4 overflow-hidden rounded-lg">
                    <Image
                      src="/img/invisalign-before-after_1_Isabella.png"
                      alt="Invisalign before and after"
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                  </div>

                  <h3 className="navbar-guthen text-xl text-white mb-2">
                    Resultados Increíbles
                  </h3>
                  <p className="ghuten-bloost text-gray-300">
                    Transformaciones reales con ortodoncia invisible Invisalign.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Doctor Section */}
        <section id="about" className="relative z-10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-8">
              <h2 className="cera-pro text-3xl md:text-4xl text-white mb-4">
                Sobre Mí
              </h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative flex flex-col items-center">
                <Card className="bg-[#021D49] border-gray-600 p-4">
                  <Image
                    src="/img/l (28 de 65).JPG"
                    alt="Doctora Mónica Botero - Especialista en Ortodoncia"
                    width={340}
                    height={410}
                    className="rounded-xl"
                  />
                </Card>
                <div className="absolute -bottom-6 -right-6 bg-[#F5F5F1] text-[#021D49] p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/img/emerald-logo.png"
                      alt="Emerald Provider Logo"
                      width={60}
                      height={30}
                    />
                    <div>
                      <div className="cera-pro-medium text-sm">
                        Top Doctor Emerald
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <Card className="bg-[#021D49] border-gray-600">
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <Image
                          src="/img/emerald-logo.png"
                          alt="Emerald Provider Logo"
                          width={60}
                          height={30}
                        />
                        <Badge className="bg-[#FFB4AB] text-[#021D49] hover:bg-[#FFB4AB] font-semibold">
                          Top 1% Mundial
                        </Badge>
                      </div>
                      <h2 className="cera-pro text-3xl md:text-4xl text-white">
                        Doctora Mónica Botero
                      </h2>
                      <p className="ghuten-bloost text-lg text-gray-300 leading-relaxed">
                        Píonera en invisalign Como Top Emerald Invisalign, la
                        Dra. Mónica Botero representa el 1% superior de los
                        doctores de Invisalign a nivel mundial. Con más de 15
                        años de experiencia y más de 1000 casos exitosos de
                        Invisalign, está dedicada a crear sonrisas hermosas y
                        saludables.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#FFB4AB] mt-1 flex-shrink-0" />
                        <div>
                          <div className="cera-pro-medium text-white">
                            Top 1% Provider
                          </div>
                          <div className="ghuten-bloost text-sm text-gray-400">
                            Reconocimiento Emerald
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#FFB4AB] mt-1 flex-shrink-0" />
                        <div>
                          <div className="cera-pro-medium text-white">
                            1000+ Casos
                          </div>
                          <div className="ghuten-bloost text-sm text-gray-400">
                            Tratamientos exitosos
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#FFB4AB] mt-1 flex-shrink-0" />
                        <div>
                          <div className="cera-pro-medium text-white">
                            15+ Años
                          </div>
                          <div className="ghuten-bloost text-sm text-gray-400">
                            Experiencia en ortodoncia
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#FFB4AB] mt-1 flex-shrink-0" />
                        <div>
                          <div className="cera-pro-medium text-white">
                            Formación Avanzada
                          </div>
                          <div className="ghuten-bloost text-sm text-gray-400">
                            Educación continua
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How Invisalign Works */}
        <section id="treatment" className="relative z-10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="cera-pro text-3xl md:text-4xl text-white mb-4">
                Cómo Funciona Invisalign
              </h2>
              <p className="ghuten-bloost text-xl text-gray-300 max-w-3xl mx-auto">
                Experimente el revolucionario sistema de alineadores
                transparentes que arregla los dientes sin ortodoncia metálica
                tradicional.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              <Card className="bg-[#021D49] border-gray-600 h-full">
                <CardContent className="p-8 text-center flex flex-col justify-between h-full">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-[#FFB4AB]/70 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="cera-pro text-2xl text-[#021D49]">
                        1
                      </span>
                    </div>
                    <h3 className="cera-pro-medium text-xl text-white mb-4">
                      Consulta y Escaneo
                    </h3>
                    <p className="ghuten-bloost text-gray-300 leading-relaxed mb-6 flex-grow">
                      Examinaremos sus dientes y crearemos un escaneo 3D preciso
                      para diseñar su plan de tratamiento personalizado.
                    </p>
                  </div>
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source
                        src="/video/Escaneo_1_mov.mov"
                        type="video/mp4"
                      />
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt="Invisalign scanning process"
                        fill
                        className="object-cover"
                      />
                    </video>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#021D49] border-gray-600 h-full">
                <CardContent className="p-8 text-center flex flex-col justify-between h-full">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-[#FFB4AB]/70 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="cera-pro text-2xl text-[#021D49]">
                        2
                      </span>
                    </div>
                    <h3 className="cera-pro-medium text-xl text-white mb-4">
                      Alineadores Personalizados
                    </h3>
                    <p className="ghuten-bloost text-gray-300 leading-relaxed mb-6 flex-grow">
                      Reciba su serie de alineadores transparentes hechos a
                      medida, diseñados específicamente para la transformación
                      única de su sonrisa.
                    </p>
                  </div>
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source
                        src="/video/Alineadores%20personalisados.mov"
                        type="video/mp4"
                      />
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt="Custom Invisalign aligners"
                        fill
                        className="object-cover"
                      />
                    </video>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#021D49] border-gray-600 h-full">
                <CardContent className="p-8 text-center flex flex-col justify-between h-full">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-[#FFB4AB]/70 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="cera-pro text-2xl text-[#021D49]">
                        3
                      </span>
                    </div>
                    <h3 className="cera-pro-medium text-xl text-white mb-4">
                      Resultados Hermosos
                    </h3>
                    <p className="ghuten-bloost text-gray-300 leading-relaxed mb-6 flex-grow">
                      Use sus alineadores de 16 a 22 horas diarias y observe
                      cómo su sonrisa se transforma gradual y cómodamente.
                    </p>
                  </div>
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source
                        src="https://video-private-assets.canva.com/VAFlbJl7MZQ/v/112d5d0bf4.mp4?exp=1752008940000&cf-ck=lrO0-Tayf_aVJUIjP75aAqU19KvUrlTIOtXBgpxVhvg&cf-sig=hlzmRMrFmPF8ZCWsSk0i2NMtHwdNTObD2qiQg2nx90A&cf-sig-kid=CO7cCjZ_YiI=&sig=8SReBTvIXWwuvOGkPzRy43CC4FtsfZYt3VEyVRtdG7s&sig-kid=GzFgFdhXD-Q="
                        type="video/mp4"
                      />
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt="Invisalign results"
                        fill
                        className="object-cover"
                      />
                    </video>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Before & After Gallery */}
        <section className="relative z-10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="cera-pro text-3xl md:text-4xl text-white mb-4">
                Antes y Después
              </h2>
              <p className="ghuten-bloost text-xl text-gray-300 max-w-3xl mx-auto">
                Transformaciones reales de pacientes con ortodoncia invisible
                Invisalign
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  before: "/img/Antes_Caso_1_FRONT.jpg",
                  after: "/img/Despues_Caso_1_Front.jpg",
                  months: 8
                },
                {
                  before: "/img/invisalign-before-after_2_isabella.png", 
                  after: "/img/invisalign-before-after_1_Isabella.png",
                  months: 10
                },
                {
                  before: "/placeholder.svg?height=300&width=250",
                  after: "/placeholder.svg?height=300&width=250",
                  months: 9
                }
              ].map((item, index) => (
                <Card
                  key={index}
                  className="bg-[#021D49] border-gray-600 overflow-hidden"
                >
                  <div className="w-full mx-auto h-56 relative flex items-center justify-center bg-[#021D49] rounded-lg overflow-hidden py-10 px-4">
                    <Image
                      src={item.before}
                      alt={`Before Invisalign treatment ${index + 1}`}
                      width={320}
                      height={180}
                      className="object-contain max-w-[98%] max-h-full mx-auto"
                    />
                    <div className="absolute bottom-2 left-2 bg-gray-900/80 text-white text-xs px-2 py-1 rounded">
                      Antes
                    </div>
                  </div>
                  <div className="w-full mx-auto h-56 relative flex items-center justify-center bg-[#021D49] rounded-lg overflow-hidden py-10 px-4">
                    <Image
                      src={item.after}
                      alt={`After Invisalign treatment ${index + 1}`}
                      width={320}
                      height={180}
                      className="object-contain max-w-[98%] max-h-full mx-auto"
                    />
                    <div className="absolute bottom-2 right-2 bg-[#FFB4AB]/80 text-[#021D49] text-xs px-2 py-1 rounded">
                      Después
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="ghuten-bloost text-gray-300 text-sm">
                      Tratamiento quirurgico resuelto con alineadores sin cirugia {item.months} meses
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section id="testimonials" className="relative z-10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="cera-pro text-3xl md:text-4xl text-white mb-4">
                Lo Que Dicen Nuestros Pacientes
              </h2>
              <p className="ghuten-bloost text-xl text-gray-300">
                Historias reales de pacientes que transformaron sus sonrisas
              </p>
            </div>
            <TestimonialsCarousel />
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Card className="bg-gray-800/30 backdrop-blur-md border-gray-600/40">
              <CardContent className="p-8 md:p-12">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                  <div className="flex justify-center mb-4">
                    <Image
                      src="/img/emerald-logo.png"
                      alt="Emerald Provider Logo"
                      width={120}
                      height={60}
                    />
                  </div>
                  <h2 className="cera-pro text-3xl md:text-4xl text-white">
                    ¿Listo para Transformar Su Sonrisa?
                  </h2>
                  <p className="ghuten-bloost text-xl text-gray-300 leading-relaxed">
                    Reserve su consulta hoy y descubra cómo Invisalign puede
                    darle la sonrisa segura que siempre ha deseado.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="cera-pro-black-btn bg-[#ffffff] hover:bg-[#FFB4AB] text-[#021D49] font-semibold text-lg px-8 py-4"
                    >
                      <a
                        href="https://wa.link/942se9"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Agenda tu cita
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="cera-pro-black-btn border-gray-300 text-gray-300 hover:bg-gray-300/10 text-lg px-8 py-4 bg-transparent"
                    >
                      <a href="tel:3125570483">
                        Llamar (312) 5570 483
                      </a>
                    </Button>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-gray-300">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#FFB4AB]" />
                      <span className="ghuten-bloost">Consulta Gratuita</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#FFB4AB]" />
                      <span className="ghuten-bloost">Sin Compromiso</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#FFB4AB]" />
                      <span className="ghuten-bloost">Citas el Mismo Día</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Sección Cómo llegar y reseñas */}
        <Script src="https://static.elfsight.com/platform/platform.js" strategy="lazyOnload" />
        <section className="w-full flex flex-col items-center my-12">
          <h2 className="text-3xl font-bold mb-8 text-[#021D49] text-center">¿Cómo llegar?</h2>
          <div className="w-full max-w-3xl flex justify-center items-stretch">
            {/* Mapa OpenStreetMap - Forzando redeploy */}
            <div
              className="flex-1 bg-white rounded-xl shadow-lg p-4 flex items-center justify-center"
              style={{ minHeight: 350, height: 350, width: "100%" }}
            >
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-74.05237451859113%2C4.697635712931899%2C-74.04837451859113%2C4.701635712931899&layer=mapnik&marker=4.699635712931899%2C-74.05037451859113"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 12, minHeight: 320, minWidth: "100%" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cómo llegar a la clínica"
              ></iframe>
            </div>
          </div>
        </section>
        {/* Fin sección Cómo llegar */}

        {/* Footer */}
        <footer className="relative z-10 bg-gray-900/95 backdrop-blur-md text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 items-start">
  <div>
    <div className="mb-4">
      <Image
        src="/img/monica-botero-logo.png"
        alt="IPS Mónica Botero S.A.S Logo"
        width={200}
        height={60}
        className="h-12 w-auto"
      />
    </div>
    <div className="flex items-center space-x-2 mb-4">
      <Image
        src="/img/emerald-logo.png"
        alt="Emerald Provider Logo"
        width={80}
        height={40}
      />
      <span className="ghuten-bloost text-sm text-gray-400">
        Top Provider Certificado
      </span>
    </div>
    <p className="ghuten-bloost text-gray-400 leading-relaxed">
      Tratamiento experto de Invisalign de una Top Doctor Emerald.
      Transforme su sonrisa con confianza.
    </p>
  </div>
  <div>
    <h3 className="navbar-guthen mb-4">
      Información de Contacto
    </h3>
    <div className="space-y-3 text-gray-400">
      <div className="flex items-start space-x-2">
        <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
        <div className="ghuten-bloost">
          <div>312 5570 483</div>
          <div>312 2945 975</div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Mail className="w-4 h-4" />
        <span className="ghuten-bloost">
          citas@doctoramonicabotero.com
        </span>
      </div>
      <div className="flex items-start space-x-2">
        <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
        <span className="ghuten-bloost">
          Bogotá - Calle 118 # 19-52 Cons. 406
          <br />
          NOU - Centro Empresarial KM 1.5 Vía Chía Cajicá Local 117
        </span>
      </div>
    </div>
  </div>
  <div className="flex flex-col items-end">
    <h3 className="navbar-guthen mb-4">Horario de Atención</h3>
    <div className="space-y-2 text-gray-400 mb-6">
      <div className="ghuten-bloost">
        Lunes - Viernes: 8:00 AM - 6:00 PM
      </div>
      <div className="ghuten-bloost">Sábado: 9:00 AM - 2:00 PM</div>
      <div className="ghuten-bloost">Domingo: Cerrado</div>
    </div>
    <div className="flex space-x-4 mt-2">
      <a
        href="https://www.instagram.com/doctoramonicabotero/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80"
        aria-label="Instagram"
      >
        <Image
          src="/svg/instagram.svg"
          alt="Instagram"
          width={32}
          height={32}
          style={{ display: 'inline-block', verticalAlign: 'middle' }}
        />
      </a>
      <a
        href="https://www.facebook.com/doctoramonicabotero/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80"
        aria-label="Facebook"
      >
        <Image
          src="/svg/facebook.svg"
          alt="Facebook"
          width={32}
          height={32}
          style={{ display: 'inline-block', verticalAlign: 'middle' }}
        />
      </a>
      <a
        href="https://x.com/doctoramonicabotero"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80"
        aria-label="X"
      >
        <Image
          src="/svg/x.svg"
          alt="X"
          width={32}
          height={32}
          style={{ display: 'inline-block', verticalAlign: 'middle' }}
        />
      </a>
    </div>
  </div>
</div>
            <div className="border-t border-gray-600/30 mt-8 pt-8 text-center text-gray-400">
              <p className="ghuten-bloost">
                &copy; 2024 IPS Mónica Botero S.A.S. Todos los derechos
                reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
