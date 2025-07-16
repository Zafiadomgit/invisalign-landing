"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Carolina M.",
    role: "Ejecutiva de Marketing",
    image: "/img/placeholder-user.jpg",
    text: "La Dra. Monica hizo que mi experiencia con Invisalign fuera muy sencilla. Me encantó poder quitármelos para reuniones importantes. ¡Mi sonrisa se ve increíble ahora!",
    rating: 5,
  },
  {
    id: 2,
    name: "Miguel R.",
    role: "Profesor de Secundaria",
    image: "/img/placeholder-user.jpg",
    text: "Como profesor, estaba preocupado por cómo se verían los brackets. Invisalign fue perfecto - ¡ninguno de mis estudiantes notó que los estaba usando!",
    rating: 5,
  },
  {
    id: 3,
    name: "Daniela L.",
    role: "Empresaria",
    image: "/img/placeholder-user.jpg",
    text: "Todo el proceso fue muy profesional y cómodo. La experiencia de la Dra. Monica realmente se nota - ¡Estoy encantada con mi nueva sonrisa!",
    rating: 5,
  },
  {
    id: 4,
    name: "Carlos P.",
    role: "Ingeniero",
    image: "/img/placeholder-user.jpg",
    text: "Invisalign cambió mi vida. Pude mantener mi confianza durante todo el tratamiento y los resultados superaron mis expectativas. Altamente recomendado.",
    rating: 5,
  },
  {
    id: 5,
    name: "Ana S.",
    role: "Doctora",
    image: "/img/placeholder-user.jpg",
    text: "Como profesional de la salud, aprecio la precisión y tecnología detrás de Invisalign. La Dra. Monica es excepcional en su trabajo.",
    rating: 5,
  },
  {
    id: 6,
    name: "Roberto M.",
    role: "Abogado",
    image: "/img/placeholder-user.jpg",
    text: "El tratamiento fue discreto y efectivo. Perfecto para mi trabajo donde las presentaciones son constantes. Excelente servicio y resultados.",
    rating: 5,
  },
  {
    id: 7,
    name: "Roberto M.",
    role: "Abogado",
    image: "/img/placeholder-user.jpg",
    text: "El tratamiento fue discreto y efectivo. Perfecto para mi trabajo donde las presentaciones son constantes. Excelente servicio y resultados.",
    rating: 5,
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
    );
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1
    );
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <>
      {/* Custom Font Styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap");

        .ghuten-bloost-testimonial {
          font-family: "Playfair Display", serif;
          font-weight: 400;
          font-style: italic;
          line-height: 1.6;
        }

        .ghuten-bloost-name {
          font-family: "Playfair Display", serif;
          font-weight: 600;
          font-style: normal;
        }

        .ghuten-bloost-role {
          font-family: "Playfair Display", serif;
          font-weight: 400;
          font-style: normal;
        }
      `}</style>

      <div className="relative max-w-4xl mx-auto">
        {/* Main Carousel */}
        <div className="relative overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0">
                <Card className="bg-[#E4D2BD]/20 backdrop-blur-md border-[#E4D2BD]/30 mx-4">
                  <CardContent className="p-8 md:p-12 text-center">
                    {/* Stars */}
                    <div className="flex items-center justify-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-[#FFB4AB] text-[#FFB4AB] mx-1"
                        />
                      ))}
                    </div>

                    {/* Testimonial Text with Custom Font */}
                    <blockquote className="ghuten-bloost-testimonial text-xl md:text-2xl text-[#E4D2BD] leading-relaxed mb-8">
                      "{testimonial.text}"
                    </blockquote>

                    {/* Patient Info */}
                    <div className="flex items-center justify-center space-x-4">
                      <Image
                        src={testimonial.image || "/img/placeholder-user.jpg"}
                        alt={`${testimonial.name} testimonial`}
                        width={60}
                        height={60}
                        className="rounded-full border-2 border-[#FFB4AB]"
                      />
                      <div className="text-left">
                        <div className="ghuten-bloost-name text-[#F5F5F1] text-lg">
                          {testimonial.name}
                        </div>
                        <div className="ghuten-bloost-role text-[#B1B1B1] text-sm">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[#E4D2BD]/80 border-[#E4D2BD]/50 text-[#021D49] hover:bg-[#E4D2BD]/90 backdrop-blur-sm"
          onClick={goToPrevious}
          aria-label="Testimonio anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-[#E4D2BD]/80 border-[#E4D2BD]/50 text-[#021D49] hover:bg-[#E4D2BD]/90 backdrop-blur-sm"
          onClick={goToNext}
          aria-label="Siguiente testimonio"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Dot Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#FFB4AB] scale-125"
                  : "bg-[#B1B1B1]/50 hover:bg-[#B1B1B1]/70"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-[#B1B1B1]/30 rounded-full h-1 overflow-hidden">
          <div
            className="h-full bg-[#FFB4AB] transition-all duration-100 ease-linear"
            style={{
              width: isAutoPlaying ? "100%" : "0%",
              animation: isAutoPlaying ? "progress 5s linear infinite" : "none",
            }}
          />
        </div>
      </div>
      

        <style jsx>{`
          @keyframes progress {
            from {
              width: 0%;
            }
            to {
              width: 100%;
            }
          }
        `}</style>
    </>
  );
}
