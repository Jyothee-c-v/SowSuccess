"use client";
import React, { useState, useEffect } from 'react';
import { Lightbulb, Sprout, Users, DollarSign, CheckSquare, GitFork, ArrowRight } from 'lucide-react';

// Updated background component to match About section
const EnhancedBackground = () => (
  <div className="absolute inset-0 pointer-events-none">
    {/* Subtle gradient overlay */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{backgroundColor: 'hsl(125, 30%, 95%)'}}></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl" style={{backgroundColor: 'hsl(140, 25%, 96%)'}}></div>
    </div>

    {/* Subtle geometric lines */}
    <div className="absolute inset-0 opacity-5">
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
    <div className="absolute inset-0">
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
    <div className="absolute inset-0">
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
    <div className="absolute inset-0">
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
  </div>
);

// Named export for the component
export function WhatIsSowSuccessSection() {
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

    const section = document.getElementById('sowsuccess-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="sowsuccess-section" className="relative pb-16 overflow-hidden" style={{ backgroundColor: '#FBF9F6' }}>
      <EnhancedBackground />
      
      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: '#2d5a27' }}>
            What is <span className="relative inline-block" style={{ color: '#2d5a27' }}>
              SowSuccess
              <div className="absolute -bottom-2 left-0 w-full h-1 rounded-full transform scale-x-0 animate-scale-x" style={{backgroundColor: '#7cb342'}}></div>
            </span>
            <span style={{ color: '#2d5a27' }}>?</span>
          </h2>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: '#2a2a2a' }}>
            A Training + Referral Program that helps you learn life-changing skills, earn referral income, and support rural upliftment projects.
          </p>
        </div>

        {/* Main Content - Single Column Layout */}
        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* How It Works Card */}
          <div className="group relative bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-8 md:p-12" 
               style={{ 
                 boxShadow: '0 25px 50px rgba(125, 179, 66, 0.1)'
               }}>
            
            {/* Lighter hover background effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" style={{backgroundColor: 'hsl(125, 25%, 97%)'}}></div>

            {/* Lighter border hover effect */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{backgroundColor: 'hsl(125, 30%, 85%)'}}>
              <div className="absolute inset-[2px] bg-white rounded-3xl"></div>
            </div>
            
            {/* Card Header */}
            <div className="relative text-center mb-10">
              <div className="relative mb-6 inline-block">
                <div className="absolute inset-0 rounded-full opacity-20 scale-150 group-hover:scale-175 transition-transform duration-500" style={{backgroundColor: 'hsl(125, 30%, 75%)'}}></div>
                <div className="relative w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto" style={{ backgroundColor: 'hsl(125, 20%, 90%)' }}>
                  <Sprout className="w-8 h-8" style={{ color: '#2d5a27' }} />
                </div>
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-15 animate-ping" style={{backgroundColor: 'hsl(125, 30%, 75%)'}}></div>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold transition-colors duration-300" style={{ color: '#2d5a27' }}>How It Works</h3>
            </div>

            {/* Content Grid */}
            <div className="relative grid md:grid-cols-3 gap-8">
              
              {/* Contribution Details */}
              <div className="group/card relative rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2" 
                   style={{ 
                     backgroundColor: 'hsl(110, 30%, 85%)',
                     borderColor: 'hsl(120, 40%, 75%)',
                     boxShadow: '0 4px 15px rgba(125, 179, 66, 0.15)'
                   }}>
                <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-2xl" style={{backgroundColor: 'hsl(110, 30%, 80%)'}}></div>
                <div className="relative flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" 
                       style={{ backgroundColor: '#7cb342' }}>
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold" style={{ color: '#2d5a27' }}>Investment</h4>
                </div>
                <div className="relative space-y-3">
                  <div className="text-2xl font-bold mb-3" style={{ color: '#7cb342' }}>₹1800 Total</div>
                  <div className="space-y-2" style={{ color: '#2d5a27' }}>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#7cb342' }}></div>
                      <span className="text-sm">₹300 supports rural projects</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#7cb342' }}></div>
                      <span className="text-sm">₹1500 funds referral earnings</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Training Options */}
              <div className="group/card relative rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2" 
                   style={{ 
                     backgroundColor: 'hsl(120, 40%, 75%)',
                     borderColor: 'hsl(125, 55%, 45%)',
                     boxShadow: '0 4px 15px rgba(125, 179, 66, 0.15)'
                   }}>
                <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-2xl" style={{backgroundColor: 'hsl(120, 40%, 70%)'}}></div>
                <div className="relative flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" 
                       style={{ backgroundColor: '#2d5a27' }}>
                    <CheckSquare className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold" style={{ color: '#2d5a27' }}>Training</h4>
                </div>
                <div className="relative space-y-3">
                  <div className="text-lg font-semibold mb-3" style={{ color: '#2d5a27' }}>Choose 1 Premium Course</div>
                  <div className="space-y-2" style={{ color: '#2d5a27' }}>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#2d5a27' }}></div>
                      <span className="text-sm">Organic Farming Mastery</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#2d5a27' }}></div>
                      <span className="text-sm">Self-Development & Success Blueprint</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Network Model */}
              <div className="group/card relative rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2" 
                   style={{ 
                     backgroundColor: 'hsl(135, 35%, 25%)',
                     borderColor: 'hsl(140, 45%, 12%)',
                     boxShadow: '0 4px 15px rgba(125, 179, 66, 0.15)'
                   }}>
                <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-2xl" style={{backgroundColor: 'hsl(135, 35%, 20%)'}}></div>
                <div className="relative flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" 
                       style={{ backgroundColor: '#7cb342' }}>
                    <GitFork className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Network</h4>
                </div>
                <div className="relative space-y-3">
                  <div className="text-lg font-semibold mb-3 text-white">4×9 Matrix Model</div>
                  <div className="text-white">
                    <div className="flex items-center mb-2">
                      <span className="text-sm">You refer 4</span>
                      <ArrowRight className="w-4 h-4 mx-2" style={{ color: '#7cb342' }} />
                      <span className="text-sm">They refer 4</span>
                    </div>
                    <div className="text-sm" style={{ color: '#7cb342' }}>Up to 9 levels deep</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Flow Indicator */}
            <div className="relative mt-12 flex items-center justify-center">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" 
                     style={{ backgroundColor: '#7cb342' }}>1</div>
                <ArrowRight className="w-6 h-6" style={{ color: '#2d5a27' }} />
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" 
                     style={{ backgroundColor: '#2d5a27' }}>2</div>
                <ArrowRight className="w-6 h-6" style={{ color: '#2d5a27' }} />
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" 
                     style={{ backgroundColor: '#7cb342' }}>3</div>
              </div>
            </div>
            <div className="relative text-center mt-4">
              <p className="text-sm" style={{ color: '#2d5a27' }}>Contribute → Learn → Network → Earn</p>
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
    </section>
  );
}

// Also provide as default export for flexibility
export default WhatIsSowSuccessSection;