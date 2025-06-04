"use client";
import React, { useState, useEffect } from 'react';
import { Target, Heart, Zap } from "lucide-react";

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      icon: Target,
      title: "Our Vision",
      content: "To uplift society by empowering underprivileged individuals—especially women and children—through education, livelihood support, and self-development techniques.",
      delay: "0ms"
    },
    {
      icon: Heart,
      title: "Our Mission",
      content: "We strive to build emotionally resilient and economically empowered communities through healthcare, organic practices, self-growth training, and spiritual awareness.",
      delay: "200ms"
    },
    {
      icon: Zap,
      title: "Our Why",
      content: "Founded by transformation coach Dr. Jyothi Vasudev, SowSuccess believes that anyone can rise with the right tools, training, and support. You don't just grow; you help your entire community thrive.",
      delay: "400ms"
    }
  ];

  return (
    <section id="about" className="relative pt-12 pb-20 md:pt-16 md:pb-32 overflow-hidden" style={{backgroundColor: '#FBF9F6'}}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{backgroundColor: 'hsl(125, 30%, 95%)'}}></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl" style={{backgroundColor: 'hsl(140, 25%, 96%)'}}></div>
      </div>

      {/* Subtle geometric lines */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(125, 40%, 50%)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Subtle blinking dots background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-pulse opacity-15"
            style={{
              backgroundColor: 'hsl(125, 40%, 60%)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Additional tiny blinking dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute w-0.5 h-0.5 rounded-full opacity-10"
            style={{
              backgroundColor: 'hsl(140, 35%, 55%)',
              left: `${5 + Math.random() * 90}%`,
              top: `${10 + Math.random() * 80}%`,
              animation: `blink ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      {/* Floating subtle shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className="absolute opacity-5"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${15 + Math.random() * 70}%`,
              animation: `float-gentle ${8 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`
            }}
          >
            <div 
              className={`${i % 3 === 0 ? 'w-3 h-3 rounded-full' : i % 3 === 1 ? 'w-2 h-6 rounded-full' : 'w-4 h-1 rounded-full'}`}
              style={{backgroundColor: 'hsl(125, 30%, 70%)'}}
            ></div>
          </div>
        ))}
      </div>

      <div className="container max-w-screen-xl relative z-10 px-6 md:px-8 lg:px-12">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{color: '#2d5a27'}}>
            About{" "}
            <span className="relative inline-block" style={{color: '#2d5a27'}}>
              Us
              <div className="absolute -bottom-2 left-0 w-full h-1 rounded-full transform scale-x-0 animate-scale-x" style={{backgroundColor: '#7cb342'}}></div>
            </span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{color: '#2a2a2a'}}>
            Empowering communities through transformation and growth
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className={`transform transition-all duration-1000 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: card.delay }}
              >
                <div className="group relative h-full bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  {/* Lighter hover background effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{backgroundColor: 'hsl(125, 25%, 97%)'}}></div>

                  {/* Lighter border hover effect */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{backgroundColor: 'hsl(125, 30%, 85%)'}}>
                    <div className="absolute inset-[2px] bg-white rounded-lg"></div>
                  </div>

                  <div className="relative items-center pt-8 pb-6 text-center">
                    <div className="relative mb-6 inline-block">
                      <div className="absolute inset-0 rounded-full opacity-20 scale-150 group-hover:scale-175 transition-transform duration-500" style={{backgroundColor: 'hsl(125, 30%, 75%)'}}></div>
                      <div className="relative w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto" style={{backgroundColor: 'hsl(125, 20%, 90%)'}}>
                        <IconComponent className="w-8 h-8 transition-colors duration-300" style={{color: '#2d5a27'}} />
                      </div>
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-15 animate-ping" style={{backgroundColor: 'hsl(125, 30%, 75%)'}}></div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl text-center font-bold mb-6 transition-colors duration-300" style={{color: '#2d5a27'}}>
                      {card.title}
                    </h3>
                  </div>

                  <div className="relative text-center px-6 pb-8">
                    <p className="leading-relaxed text-base transition-colors duration-300" style={{color: '#1a1a1a'}}>
                      {card.content}
                    </p>
                    <div className="mt-6 flex justify-center">
                      <div className="w-12 h-1 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{backgroundColor: '#7cb342'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.25; }
        }
        @keyframes scale-x {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-8px) translateX(4px) rotate(2deg); }
          50% { transform: translateY(-4px) translateX(-2px) rotate(-1deg); }
          75% { transform: translateY(-12px) translateX(6px) rotate(1deg); }
        }
        .animate-scale-x { animation: scale-x 1s ease-out 0.5s forwards; }
      `}</style>
    </section>
  );
}