"use client";
import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import Link from "next/link";
// ...existing imports...
const programs = [
  {
    id: 1,
    emoji: "🧠",
    title: "Self-Development & Success Blueprint",
    description: "Unlock your full potential and achieve success in various aspects of life",
    topics: [
      "Goal Setting & Personal Vision",
      "Time Management & Productivity", 
      "Networking & Relationship Building",
      "Creativity & Innovation",
      "Leadership & Influence",
      "Confidence Building & Self-Esteem",
      "Decision Making & Problem Solving",
      "Growth Mindset & Overcoming Limiting Beliefs",
      "Personal SWOT Analysis"
    ]
  },
  {
    id: 2,
    emoji: "🌱",
    title: "Organic Farming Mastery",
    description: "Equips you with knowledge and skills for sustainable agriculture and rural entrepreneurship",
    topics: [
      "Soil Health & Natural Fertilizers",
      "Cow-Based Farming Methods", 
      "Creating & Selling Value-Added Farm Products",
      "Self-Sustaining Rural Livelihoods"
    ]
  },
  {
    id: 3,
    emoji: "😊",
    title: "SuperMind for Kids: Focus | Memory | Inner Strength",
    description: "Empowering children (6-16 yrs) through brain training & emotional wellness",
    topics: [
      "Memory Mastery & Visualization",
      "Concentration & Focus Building",
      "Emotional Strength & Energy Balance", 
      "Confidence & Communication Skills",
      "Value-Based Thinking & Positive Beliefs"
    ]
  }
];
const wishFulfillingPyramid = {
  id: "pyramid",
  emoji: "",
  title: "Wish-Fulfilling Pyramid",
  description: "A powerful tool for manifesting desires and promoting spiritual well-being",
  features: [
    "Write and place your wishes inside the pyramid",
    "Ideal for meditation and spiritual practices",
    "Strategic placement in northeast or center (Vastu/Feng Shui)",
    "Amplifies intentions and positive energy",
    "Promotes spiritual growth and well-being"
  ]
};

// Floating background elements component matching About section
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
        />
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
        />
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
          />
        </div>
      ))}
    </div>
  </div>
);

export function TrainingProgramsSection() {
  const [activeProgram, setActiveProgram] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveProgram((prev) => (prev + 1) % programs.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    
    <div id="training-programs" className="pt-20 md:pt-32 px-6 md:px-8 lg:px-12 relative overflow-hidden" style={{backgroundColor: '#FBF9F6'}}>
      
      <FloatingElements />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{color: '#2d5a27'}}>
            Training{" "}
            <span className="relative inline-block" style={{color: '#2d5a27'}}>
              Programs
              <div className="absolute -bottom-2 left-0 w-full h-1 rounded-full transform scale-x-0 animate-scale-x" style={{backgroundColor: '#7cb342'}}></div>
            </span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{color: '#2a2a2a'}}>
            Choose your path to transformation and growth
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {programs.map((program, index) => (
            <div
              key={program.id}
              className={`
                group relative p-6 rounded-lg border cursor-pointer transition-all duration-500 hover:shadow-2xl overflow-hidden
                ${activeProgram === index 
                  ? 'transform scale-105 shadow-xl border-gray-200 bg-white' 
                  : 'hover:transform hover:scale-102 border-gray-200 bg-white hover:-translate-y-2'
                }
              `}
              onClick={() => setActiveProgram(index)}
            >
              
              {/* Hover background effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{backgroundColor: 'hsl(125, 25%, 97%)'}}></div>

              {/* Hover border effect */}
              <div className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${activeProgram === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} style={{backgroundColor: 'hsl(125, 30%, 85%)'}}>
                <div className="absolute inset-[2px] bg-white rounded-lg"></div>
              </div>

              <div className="relative">
                {/* Emoji */}
                <div className="relative mb-6 inline-block">
                  <div 
                    className={`text-3xl group-hover:scale-110 transition-all duration-300 ${
                      activeProgram === index ? 'scale-110' : ''
                    }`}
                  >
                    {program.emoji}
                  </div>
                </div>

                {/* Title */}
                <h3 
                  className="text-xl lg:text-2xl font-bold mb-3 transition-colors duration-300"
                  style={{color: '#2d5a27'}}
                >
                  {program.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{color: '#1a1a1a'}}>
                  {program.description}
                </p>

                {/* Active/Hover indicator */}
                <div className="mt-4 flex justify-center">
                  <div className={`w-12 h-1 rounded-full transform transition-transform duration-500 ${activeProgram === index ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} style={{backgroundColor: '#7cb342'}}></div>
                </div>

                {/* Active indicator dot */}
                {activeProgram === index && (
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 rounded-full animate-pulse" style={{backgroundColor: '#7cb342'}} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Program Details */}
        <div className="rounded-lg p-8 border border-gray-200 bg-white shadow-lg transition-all duration-500" style={{backgroundColor: 'hsl(125, 25%, 97%)'}}>
          <div className="flex items-center gap-4 mb-6">
            <div className="text-2xl">
              {programs[activeProgram].emoji}
            </div>
            <h4 className="text-2xl lg:text-3xl font-bold" style={{color: '#2d5a27'}}>
              {programs[activeProgram].title}
            </h4>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {programs[activeProgram].topics.map((topic, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-md group"
              >
                <div className="relative">
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0 transition-colors duration-300" style={{color: '#7cb342'}} />
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-15 animate-ping" style={{backgroundColor: 'hsl(125, 30%, 75%)'}}></div>
                </div>
                <span className="transition-colors duration-300" style={{color: '#1a1a1a'}}>{topic}</span>
              </div>
            ))}
          </div>
        </div>

     

{/* Existing navigation dots continue here */}

        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mt-8">
          {programs.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveProgram(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                activeProgram === index ? 'w-8' : 'w-3'
              }`}
              style={{backgroundColor: activeProgram === index ? '#7cb342' : 'hsl(125, 20%, 80%)'}}
            />
          ))}
        </div>

{/* Products Section */}
<div className="mt-32">
  <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{color: '#2d5a27'}}>
      Our{" "}
      <span className="relative inline-block" style={{color: '#2d5a27'}}>
        Products
        <div className="absolute -bottom-2 left-0 w-full h-1 rounded-full transform scale-x-0 animate-scale-x" style={{backgroundColor: '#7cb342'}}></div>
      </span>
    </h2>
    <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{color: '#2a2a2a'}}>
      Transform your life with our specially designed products
    </p>
  </div>

  <div className="rounded-lg p-8 border border-gray-200 bg-white shadow-lg transition-all duration-500 hover:shadow-2xl">
    <div className="text-center mb-8">
      <span className="text-4xl mb-4 inline-block">{wishFulfillingPyramid.emoji}</span>
      <h3 className="text-3xl font-bold mb-4" style={{color: '#2d5a27'}}>
        {wishFulfillingPyramid.title}
      </h3>
      <p className="text-lg mb-8 max-w-2xl mx-auto" style={{color: '#1a1a1a'}}>
        {wishFulfillingPyramid.description}
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishFulfillingPyramid.features.map((feature, index) => (
        <div 
          key={index}
          className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-md group"
        >
          <div className="relative">
            <Check className="w-5 h-5 mt-0.5 flex-shrink-0 transition-colors duration-300" style={{color: '#7cb342'}} />
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-15 animate-ping" style={{backgroundColor: 'hsl(125, 30%, 75%)'}}></div>
          </div>
          <span style={{color: '#1a1a1a'}}>{feature}</span>
        </div>
      ))}
    </div>

   
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