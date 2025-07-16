"use client";

import TestimonialsCarousel from "@/components/testimonials-carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

// Reutilizamos el mismo fondo de video que en la home
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
          className="w-full h-full object-cover mx-auto my-auto"
          onError={() => setVideoError(true)}
        >
          <source src="/video/IMG_1191.mov" type="video/mp4" />
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

export default function CursoPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
        p {
          font-family: "Inter", Arial, Helvetica, sans-serif;
          letter-spacing: normal;
        }
        button, .btn, .Button, .cera-pro-black-btn {
          font-family: "CeraProBlack", "Playfair Display", serif !important;
          font-weight: 900 !important;
          letter-spacing: -0.01em;
        }
        /* Animación para el carrusel de imágenes */
        .animate-scroll-x {
          animation: scroll-x 30s linear infinite;
        }
        @keyframes scroll-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
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
                href="/"
                className="navbar-guthen text-[#021D49] hover:text-[#FFB4AB] transition-colors"
              >
                Sobre Mí
              </a>
              <a
                href="/"
                className="navbar-guthen text-[#021D49] hover:text-[#FFB4AB] transition-colors"
              >
                Tratamiento
              </a>
              <a
                href="/"
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
              <Button asChild className="cera-pro-black-btn bg-[#021D49] hover:bg-[#FFB4AB] text-white hover:text-[#021D49] font-semibold">
                <a
                  href="https://wa.link/942se9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solicita tu Consulta
                </a>
              </Button>
            </nav>
            {/* Hamburger Icon */}
            <button
              className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#021D49]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {menuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <nav
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 transition-colors duration-300"
            style={{ backdropFilter: "blur(2px)" }}
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
                  href="/"
                  className="navbar-guthen text-[#021D49] hover:text-[#FFB4AB] transition-colors text-2xl"
                  onClick={() => setMenuOpen(false)}
                >
                  Sobre Mí
                </a>
                <a
                  href="/"
                  className="navbar-guthen text-[#021D49] hover:text-[#FFB4AB] transition-colors text-2xl"
                  onClick={() => setMenuOpen(false)}
                >
                  Tratamiento
                </a>
                <a
                  href="/"
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
                <Button
                  asChild
                  className="cera-pro-black-btn bg-[#021D49] hover:bg-[#FFB4AB] text-white hover:text-[#021D49] font-semibold w-11/12 text-xl mt-2 transition-colors"
                >
                  <a
                    href="https://wa.link/942se9"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                  >
                    Solicita tu Consulta
                  </a>
                </Button>
              </div>
            </div>
          </nav>
        )}

        {/* Contenido principal del curso */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="cera-pro-black text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
                Curso de la A a la Z
              </h1>
              <p className="cera-pro-black text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
                Aprende todo sobre Ortodoncia Invisible con alineadores Invisalign® de la mano de la Dra. Mónica Botero, pionera en Colombia y Latinoamérica. Descubre cómo transformar sonrisas con la técnica más avanzada, cómoda y estética del mercado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  asChild
                  size="lg"
                  className="cera-pro-black-btn bg-[#ffffff] hover:bg-[#FFB4AB] text-[#021D49] font-semibold text-lg px-8 py-6"
                >
                  <a
                    href="https://wa.link/942se9"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Inscribirme al Curso
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="cera-pro-black-btn border-gray-300 text-gray-300 hover:bg-gray-300/10 text-lg px-8 py-6 bg-transparent"
                >
                  Ver Temario
                </Button>
              </div>
            </div>

            {/* Formulario de inscripción */}
            <div className="max-w-2xl mx-auto bg-[#021D49] border border-gray-600 rounded-xl p-8 mb-16 shadow-lg">
              <h2 className="cera-pro text-2xl text-white mb-6 text-center">Formulario de Inscripción</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  <p className="text-center">¡Gracias! Tu información ha sido enviada exitosamente. Te contactaremos pronto.</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  <p className="text-center">Hubo un error al enviar tu información. Por favor, intenta nuevamente o contáctanos directamente.</p>
                </div>
              )}
              
              <form 
                className="space-y-6" 
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  setSubmitStatus('idle');
                  
                  try {
                    const response = await fetch('/api/contact', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(formData),
                    });
                    
                    if (response.ok) {
                      setSubmitStatus('success');
                      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
                    } else {
                      setSubmitStatus('error');
                    }
                  } catch (error) {
                    console.error('Error enviando formulario:', error);
                    setSubmitStatus('error');
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="nombre">Nombre completo *</label>
                  <input 
                    id="nombre" 
                    name="nombre" 
                    type="text" 
                    required 
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    className="w-full rounded-lg border border-gray-400 px-4 py-2 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-[#FFB4AB]" 
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="email">Correo electrónico *</label>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full rounded-lg border border-gray-400 px-4 py-2 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-[#FFB4AB]" 
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="telefono">Teléfono *</label>
                  <input 
                    id="telefono" 
                    name="telefono" 
                    type="tel" 
                    required 
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    className="w-full rounded-lg border border-gray-400 px-4 py-2 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-[#FFB4AB]" 
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="mensaje">Mensaje (opcional)</label>
                  <textarea 
                    id="mensaje" 
                    name="mensaje" 
                    rows={3} 
                    value={formData.mensaje}
                    onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                    className="w-full rounded-lg border border-gray-400 px-4 py-2 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-[#FFB4AB]" 
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="cera-pro-black-btn bg-[#FFB4AB] hover:bg-[#021D49] text-[#021D49] hover:text-white font-semibold text-lg px-8 py-4 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Quiero más información'}
                </Button>
              </form>
            </div>

            {/* Preguntas frecuentes */}
            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="cera-pro text-2xl text-white mb-6 text-center">Preguntas Frecuentes</h2>
              <div className="space-y-4">
                <div className="bg-[#021D49] border border-gray-600 rounded-lg">
                  <details className="p-6 cursor-pointer">
                    <summary className="cera-pro-black text-lg text-white mb-2">¿Qué es Invisalign® y cómo funciona?</summary>
                    <p className="text-gray-300 mt-2">Es un sistema de ortodoncia invisible con alineadores transparentes que mueven tus dientes de forma gradual y cómoda, sin brackets ni alambres.</p>
                  </details>
                </div>
                <div className="bg-[#021D49] border border-gray-600 rounded-lg">
                  <details className="p-6 cursor-pointer">
                    <summary className="cera-pro-black text-lg text-white mb-2">¿Cuánto dura el tratamiento?</summary>
                    <p className="text-gray-300 mt-2">La duración depende de cada caso, pero suele ser más corta que la ortodoncia tradicional. Muchos pacientes ven resultados en menos de 12 meses.</p>
                  </details>
                </div>
                <div className="bg-[#021D49] border border-gray-600 rounded-lg">
                  <details className="p-6 cursor-pointer">
                    <summary className="cera-pro-black text-lg text-white mb-2">¿Es doloroso el tratamiento?</summary>
                    <p className="text-gray-300 mt-2">No, los alineadores ejercen fuerzas suaves y controladas, por lo que el tratamiento es mucho más cómodo y menos doloroso que los brackets convencionales.</p>
                  </details>
                </div>
                <div className="bg-[#021D49] border border-gray-600 rounded-lg">
                  <details className="p-6 cursor-pointer">
                    <summary className="cera-pro-black text-lg text-white mb-2">¿Puedo comer y cepillarme normalmente?</summary>
                    <p className="text-gray-300 mt-2">Sí, los alineadores son removibles, lo que te permite comer, beber y cepillarte los dientes sin restricciones.</p>
                  </details>
                </div>
              </div>
            </div>

            {/* Carrusel de testimonios */}
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="cera-pro text-2xl text-white mb-6 text-center">Testimonios de Participantes</h2>
              <TestimonialsCarousel />
            </div>

            {/* Carrusel de imágenes destacadas */}
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="cera-pro text-2xl text-white mb-6 text-center">Galería de Cursos Anteriores</h2>
              <div className="relative w-full overflow-hidden rounded-2xl">
                <div className="flex animate-scroll-x gap-4">
                  <img src="/img/curso1.jpg" alt="Curso 1" className="rounded-xl w-80 h-56 object-cover" />
                  <img src="/img/curso2.jpg" alt="Curso 2" className="rounded-xl w-80 h-56 object-cover" />
                  <img src="/img/curso3.jpg" alt="Curso 3" className="rounded-xl w-80 h-56 object-cover" />
                  <img src="/img/curso4.jpg" alt="Curso 4" className="rounded-xl w-80 h-56 object-cover" />
                  <img src="/img/curso5.jpg" alt="Curso 5" className="rounded-xl w-80 h-56 object-cover" />
                </div>
              </div>
            </div>
            {/* Ventajas de Invisalign */}
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
              <Card className="bg-[#021D49] border-gray-600">
                <CardContent className="p-8">
                  <h2 className="cera-pro text-2xl text-white mb-4">Ventajas de Invisalign®</h2>
                  <ul className="text-gray-300 text-lg space-y-2 list-disc list-inside">
                    <li>Ortodoncia sin brackets ni alambres molestos</li>
                    <li>Menos dolor durante el tratamiento</li>
                    <li>Alineadores transparentes, estéticos e invisibles</li>
                    <li>Mayor comodidad y facilidad de higiene</li>
                    <li>Resultados más rápidos que la ortodoncia tradicional</li>
                    <li>Respaldo de la marca y garantía internacional</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-[#021D49] border-gray-600">
                <CardContent className="p-8">
                  <h2 className="cera-pro text-2xl text-white mb-4">¿Por qué elegir Invisalign®?</h2>
                  <ul className="text-gray-300 text-lg space-y-2 list-disc list-inside">
                    <li>Más de 10 años de experiencia y cientos de casos exitosos</li>
                    <li>Simulación digital de resultados desde la primera cita</li>
                    <li>Tratamiento cómodo, estético e higiénico</li>
                    <li>Ideal para niños, adolescentes y adultos</li>
                    <li>Seguimiento digital y citas más cortas</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            {/* Tipos de Invisalign */}
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="cera-pro text-2xl text-white mb-6 text-center">Tipos de Invisalign®</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-[#021D49] border-gray-600">
                  <CardContent className="p-6 text-center">
                    <h3 className="cera-pro-black text-xl text-white mb-2">Invisalign® First</h3>
                    <p className="text-gray-300">Ideal para niñ@s de 5 a 10 años. Corrige problemas tempranos y guía el desarrollo dental.</p>
                  </CardContent>
                </Card>
                <Card className="bg-[#021D49] border-gray-600">
                  <CardContent className="p-6 text-center">
                    <h3 className="cera-pro-black text-xl text-white mb-2">Invisalign® Teens</h3>
                    <p className="text-gray-300">Para jóvenes y adolescentes de 9 a 21 años. Discreto, cómodo y compatible con su estilo de vida.</p>
                  </CardContent>
                </Card>
                <Card className="bg-[#021D49] border-gray-600">
                  <CardContent className="p-6 text-center">
                    <h3 className="cera-pro-black text-xl text-white mb-2">Invisalign® Adultos</h3>
                    <p className="text-gray-300">Para adultos de 22 años en adelante. Solución estética y eficaz para cualquier grado de dificultad.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* Llamado a la acción */}
            <div className="max-w-2xl mx-auto text-center mt-12">
              <h2 className="cera-pro text-3xl text-white mb-4">¡Transforma sonrisas con la técnica más avanzada!</h2>
              <p className="text-xl text-gray-300 mb-6">Inscríbete y accede a contenido exclusivo, casos reales, y la experiencia de una pionera en ortodoncia invisible en Colombia y Latinoamérica.</p>
              <Button
                asChild
                size="lg"
                className="cera-pro-black-btn bg-[#FFB4AB] hover:bg-[#021D49] text-[#021D49] hover:text-white font-semibold text-lg px-8 py-6"
              >
                <a
                  href="https://wa.link/942se9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quiero más información
                </a>
              </Button>
            </div>
          </div>
        </section>

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