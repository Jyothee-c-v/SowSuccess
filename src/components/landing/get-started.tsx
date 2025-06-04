"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Register on SowSuccess.in",
    description: "Join our community of growth-minded individuals"
  },
  {
    number: "02", 
    title: "Choose your training path",
    description: "Select the journey that aligns with your goals"
  },
  {
    number: "03",
    title: "Refer 4 people to join", 
    description: "Share the opportunity with your network"
  },
  {
    number: "04",
    title: "Earn on every level",
    description: "Watch your income grow with each milestone"
  },
  {
    number: "05",
    title: "Grow your income while growing your soul",
    description: "Achieve financial and personal transformation"
  }
];

// Enhanced background elements to match About section
const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

    {/* Main blinking dots */}
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

    {/* Additional tiny blinking dots */}
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

    {/* Floating subtle shapes */}
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
);

export function GetStartedSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pb-20 md:pb-32 px-6 relative overflow-hidden" style={{backgroundColor: '#FBF9F6'}}>
      
      <FloatingElements />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className={`text-center mb-20 pt-8 md:pt-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 border-2 rounded-full bg-white" 
               style={{
                 borderColor: 'hsl(125, 30%, 75%)', 
                 color: '#2d5a27'
               }}>
            <Sparkles className="w-4 h-4" />
            Your Journey Starts Here
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{color: '#2d5a27'}}>
            Get Started
          </h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{color: '#2a2a2a'}}>
            Follow these simple steps to begin your transformation journey
          </p>
        </div>

        {/* Steps in flowing layout */}
        <div className="space-y-8 mb-16">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`
                group relative p-6 rounded-lg border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer hover:-translate-y-2
                ${index % 2 === 0 ? 'ml-0 mr-12' : 'ml-12 mr-0'}
                ${currentStep === index ? 'transform scale-102' : 'hover:transform hover:scale-101'}
              `}
              style={{
                backgroundColor: 'white',
                borderColor: currentStep === index ? '#7cb342' : 'hsl(125, 30%, 85%)'
              }}
              onClick={() => setCurrentStep(index)}
            >
              
              {/* Hover background effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" style={{backgroundColor: 'hsl(125, 25%, 97%)'}}></div>

              {/* Border hover effect */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{backgroundColor: '#7cb342'}}>
                <div className="absolute inset-[2px] bg-white rounded-lg"></div>
              </div>

              {/* Step number */}
              <div 
                className="absolute -top-3 left-6 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 z-10"
                style={{
                  backgroundColor: currentStep === index ? '#7cb342' : 'hsl(125, 20%, 90%)',
                  color: currentStep === index ? 'white' : '#2d5a27'
                }}
              >
                {step.number}
              </div>

              {/* Content */}
              <div className="pt-3 relative z-10">
                <h3 
                  className="text-xl lg:text-2xl font-bold mb-2 transition-colors duration-300"
                  style={{color: '#2d5a27'}}
                >
                  {step.title}
                </h3>
                <p 
                  className="text-base leading-relaxed transition-colors duration-300"
                  style={{color: '#1a1a1a'}}
                >
                  {step.description}
                </p>
              </div>

              {/* Active indicator */}
              {currentStep === index && (
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10">
                  <div 
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{backgroundColor: '#7cb342'}}
                  />
                </div>
              )}

              {/* Connection line for flowing effect */}
              {index < steps.length - 1 && (
                <div 
                  className={`absolute ${index % 2 === 0 ? 'right-6 top-full' : 'left-6 top-full'} w-px h-8 z-10`}
                  style={{backgroundColor: 'hsl(125, 30%, 75%)'}}
                />
              )}
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className={`text-center space-y-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Seed message */}
          <div className="p-5 border border-gray-200 rounded-lg inline-block bg-white shadow-lg" 
               style={{
                 borderColor: 'hsl(125, 30%, 85%)'
               }}>
            <p className="text-xl font-bold" style={{color: '#2d5a27'}}>
              ✨ Your ₹1800 is your seed. Sow it, and success will grow.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            
            <button 
              className="group px-8 py-3 rounded-lg text-base font-semibold transition-all duration-300 flex items-center gap-2 hover:scale-102 text-white hover:shadow-lg"
              style={{backgroundColor: '#7cb342'}}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2d5a27'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#7cb342'}
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>

            <button 
              className="px-8 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:scale-102 border-2 bg-white"
              style={{
                borderColor: '#7cb342',
                color: '#7cb342'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#7cb342';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = '#7cb342';
              }}
            >
              Refer & Earn
            </button>

            <button 
              className="px-6 py-3 rounded-lg text-base underline transition-all duration-300"
              style={{color: '#2d5a27'}}
              onMouseEnter={(e) => {
                e.target.style.color = '#1a1a1a';
                e.target.style.backgroundColor = 'hsl(125, 25%, 97%)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#2d5a27';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Contact Support
            </button>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center gap-2 mt-12">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  currentStep === index ? 'w-6' : 'w-2'
                }`}
                style={{
                  backgroundColor: currentStep === index 
                    ? '#7cb342' 
                    : 'hsl(125, 30%, 75%)'
                }}
              />
            ))}
          </div>


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
    </div>
  );
}