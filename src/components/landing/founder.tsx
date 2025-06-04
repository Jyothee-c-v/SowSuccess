"use client";
import { CheckCircle, Heart, Star } from "lucide-react";
import { useState, useEffect } from "react";

export function FounderSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pb-20 md:pb-32 overflow-hidden" style={{backgroundColor: '#FBF9F6'}}>
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

      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Creative Layout - Diagonal Split */}
        <div className="relative">
          
          {/* Header with floating animation */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-5xl font-bold text-gray-800 mb-4 relative inline-block">
              Meet Our 
              <span className="block mt-2 relative" style={{color: '#2d5a27'}}>
                Founder
                <Star className="absolute -top-2 -right-6 w-8 h-8 animate-spin" style={{color: '#7cb342', animationDuration: '4s'}} />
              </span>
            </h2>
            <div className="w-32 h-1 mx-auto rounded-full mt-6" style={{backgroundColor: '#2d5a27'}}></div>
          </div>

          {/* Unique Zigzag Layout */}
          <div className="space-y-12">
            
            {/* Name Section - Left aligned */}
            <div className={`flex justify-start transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="p-8 rounded-3xl border-l-8 shadow-lg max-w-2xl relative" style={{backgroundColor: 'rgba(45, 90, 39, 0.05)', borderLeftColor: '#2d5a27'}}>
                <h3 className="text-4xl font-bold text-gray-800 mb-3">Dr. Jyothi Vasudev</h3>
                <p className="text-xl font-semibold" style={{color: '#2d5a27'}}>
                  Transformation Coach | Founder, Vishakyaa Foundation
                </p>
              </div>
            </div>

            {/* Description Section - Right aligned */}
            <div className={`flex justify-end transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="p-8 rounded-3xl border-r-8 shadow-lg max-w-2xl relative" style={{backgroundColor: 'rgba(124, 179, 66, 0.1)', borderRightColor: '#7cb342'}}>
                <p className="text-lg text-gray-700 leading-relaxed">
                  With over <span className="font-bold" style={{color: '#2d5a27'}}>27 years</span> in corporate training, healing therapies, 
                  meditation, and personal coaching, Dr. Jyothi has helped <span className="font-bold" style={{color: '#2d5a27'}}>thousands</span> discover their inner strength.
                </p>
              </div>
            </div>

            {/* Certifications Section - Center with expanding cards */}
            <div className={`flex justify-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="text-center max-w-4xl">
                <h4 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                  Certified Excellence
                </h4>
                
                {/* Certification Cards in Creative Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Spiritual Mastery", desc: "Vedanta, Kundalini Yoga, and Kriya Yoga", delay: '0.7s' },
                    { title: "Healing Arts", desc: "Reiki, Pranic Healing, and Fire-Sound Therapy", delay: '0.9s' },
                    { title: "Leadership Excellence", desc: "Communication, and Parenting Excellence", delay: '1.1s' }
                  ].map((cert, index) => (
                    <div 
                      key={index}
                      className={`bg-white p-6 rounded-2xl border-2 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                      style={{transitionDelay: cert.delay, borderColor: 'rgba(124, 179, 66, 0.3)'}}
                    >
                      <div className="relative mb-4">
                        <CheckCircle className="w-12 h-12 mx-auto animate-pulse" style={{color: '#2d5a27'}} />
                        <div className="absolute inset-0 w-12 h-12 rounded-full mx-auto animate-ping opacity-20" style={{backgroundColor: '#7cb342'}}></div>
                      </div>
                      <h5 className="text-lg font-bold text-gray-800 mb-2">{cert.title}</h5>
                      <p className="text-sm text-gray-600">{cert.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mission Statement - Full width with creative border */}
            <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="relative">
                {/* Creative border */}
                <div className="absolute inset-0 rounded-3xl border-4 border-dashed animate-pulse" style={{borderColor: 'rgba(124, 179, 66, 0.4)'}}></div>
                
                {/* Content */}
                <div className="p-12 rounded-3xl m-4 text-center relative" style={{background: 'linear-gradient(to right, rgba(45, 90, 39, 0.05), rgba(124, 179, 66, 0.08))'}}>
                  <Heart className="w-16 h-16 mx-auto mb-6 animate-pulse" style={{color: '#2d5a27'}} />
                  <p className="text-2xl font-semibold text-gray-800 leading-relaxed">
                    Committed to <span style={{color: '#2d5a27'}}>rural job creation</span>, 
                    <span style={{color: '#2d5a27'}}> women entrepreneurship</span>, 
                    and <span style={{color: '#2d5a27'}}>natural living</span>.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}