"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from "next/link";
export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  const dynamicTexts = [
    'Together We Rise',
    'Success Starts Here',
    'Growth & Prosperity',
    'Community Building'
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    let timeout;
    const fullText = dynamicTexts[textIndex];
    
    if (isTyping) {
      if (currentText.length < fullText.length) {
        timeout = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, 50);
      } else {
        setIsTyping(true);
        setTextIndex((prev) => (prev + 1) % dynamicTexts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isTyping, textIndex, dynamicTexts]);

  return (
    <section 
      id="home"
      className="hero-animated relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2d5a27 0%, #1b3818 100%)',
        padding: '2rem 1rem'
      }}
    >
      {/* Geometric Shapes */}
      <div className="geometric-shapes absolute inset-0 pointer-events-none z-10">
        <div className="shape-1 absolute opacity-10" />
        <div className="shape-2 absolute opacity-10" />
        <div className="shape-3 absolute opacity-10" />
        <div className="shape-4 absolute opacity-10" />
      </div>

      {/* Particles */}
      <div className="particles absolute inset-0 pointer-events-none z-10">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className={`particle absolute w-1 h-1 rounded-full`} />
        ))}
      </div>

      {/* Main Content */}
      <div className="hero-container relative z-20 max-w-6xl w-full text-center">
        <div className="hero-content" style={{ color: '#f9f7f4' }}>
          
          {/* Title Section */}
          <div className="hero-title-section mb-8">
            <div className="title-animation-wrapper overflow-hidden mb-4">
              <h1 className="hero-main-title m-0" style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 700,
                lineHeight: 1.2
              }}>
                <span 
                  className="title-word inline-block"
                  style={{
                    background: 'linear-gradient(45deg, #f9f7f4, #ffffff)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
                  }}
                >
                  SowSuccess
                </span>
                <span 
                  className="title-subtitle block mt-2"
                  style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                    fontWeight: 300,
                    opacity: 0.9
                  }}
                >
                  by Agriuttpan Solutions Pvt. Ltd.
                </span>
              </h1>
            </div>
          </div>

          {/* Dynamic Tagline */}
          <div className="hero-tagline-dynamic mb-8" style={{
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            fontWeight: 500
          }}>
            <span className="tagline-prefix opacity-90">We believe in </span>
            <span 
              className="tagline-dynamic-text inline-block text-left min-w-48"
              style={{ color: '#ffd700', fontWeight: 600 }}
            >
              {currentText}
              <span 
                className="cursor-blink font-light"
                style={{ 
                  opacity: isTyping ? 1 : 0,
                  transition: 'opacity 0.1s'
                }}
              >
                |
              </span>
            </span>
          </div>

          {/* Description */}
          <div className="hero-description-animated mb-12">
            <p className="hero-desc-text mx-auto opacity-95" style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: 1.6,
              maxWidth: '800px'
            }}>
              A revolutionary training + referral initiative that blends{' '}
              <span 
                className="highlight-text font-semibold"
                style={{
                  background: 'linear-gradient(45deg, #ffd700, #7cb342)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                self-development
              </span>, organic farming mastery, and{' '}
              <span 
                className="highlight-text font-semibold"
                style={{
                  background: 'linear-gradient(45deg, #ffd700, #7cb342)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                community empowerment
              </span>—while helping you grow personally and financially.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="hero-actions-enhanced flex gap-6 justify-center flex-wrap">
            <Link href="/register">
            <button 
              className="cta-primary-enhanced group relative px-8 py-4 border-none rounded-full text-lg font-semibold cursor-pointer overflow-hidden z-10 transition-all duration-300 hover:transform hover:translate-y-[-3px]"
              style={{
                background: 'linear-gradient(45deg, #7cb342, #2d5a27)',
                color: '#ffffff',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 12px 40px rgba(124, 179, 66, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
              }}
            >
              <span className="btn-text relative z-20">Join Now</span>
              <span className="btn-arrow inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="w-5 h-5 inline" />
              </span>
              <div className="btn-bg-animation absolute top-0 left-[-100%] w-full h-full transition-all duration-500 group-hover:left-full" 
                   style={{
                     background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
                   }} />
            </button></Link>
            <Link href="/#training-programs">
            <button 
              className="cta-secondary-enhanced group relative px-8 py-4 border-2 rounded-full text-lg font-semibold cursor-pointer overflow-hidden z-10 transition-all duration-300 hover:transform hover:translate-y-[-3px]"
              style={{
                background: 'rgba(249, 247, 244, 0.1)',
                color: '#f9f7f4',
                borderColor: 'rgba(249, 247, 244, 0.3)',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(249, 247, 244, 0.2)';
                e.target.style.borderColor = 'rgba(249, 247, 244, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(249, 247, 244, 0.1)';
                e.target.style.borderColor = 'rgba(249, 247, 244, 0.3)';
              }}
            >
              <span className="btn-text relative z-20">Explore Programs</span>
              <span className="btn-arrow inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="w-5 h-5 inline" />
              </span>
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        .hero-animated {
          animation: fadeInUp 1.5s ease-out;
        }

        .hero-main-title {
          animation: slideInFromLeft 1.2s ease-out 0.3s both;
        }

        .title-subtitle {
          animation: slideInFromRight 1.2s ease-out 0.6s both;
        }

        .hero-tagline-dynamic {
          animation: fadeInUp 1s ease-out 0.9s both;
        }

        .hero-description-animated {
          animation: fadeInUp 1s ease-out 1.2s both;
        }

        .hero-actions-enhanced {
          animation: fadeInUp 1s ease-out 1.5s both;
        }

        .title-word {
          animation: titleGlow 3s ease-in-out infinite alternate;
        }

        .highlight-text {
          animation: highlightPulse 2s ease-in-out infinite alternate;
        }

        .shape-1 {
          width: 100px;
          height: 100px;
          background: rgba(165, 214, 167, 0.2);
          border-radius: 50%;
          top: 10%;
          left: 10%;
          animation: floatShape1 15s infinite ease-in-out;
        }

        .shape-2 {
          width: 150px;
          height: 150px;
          background: rgba(124, 179, 66, 0.15);
          border-radius: 50%;
          top: 60%;
          right: 15%;
          animation: floatShape2 18s infinite ease-in-out;
        }

        .shape-3 {
          width: 0;
          height: 0;
          border-left: 40px solid transparent;
          border-right: 40px solid transparent;
          border-bottom: 70px solid rgba(249, 247, 244, 0.1);
          top: 20%;
          right: 25%;
          animation: rotateShape 25s infinite linear;
        }

        .shape-4 {
          width: 80px;
          height: 80px;
          background: rgba(165, 214, 167, 0.12);
          bottom: 20%;
          left: 20%;
          animation: pulseShape 12s infinite ease-in-out;
        }

        .particle {
          background: #a5d6a7;
          animation: particleFloat 8s infinite linear;
        }

        .particle:nth-child(1) { left: 10%; animation-delay: 0s; animation-duration: 6s; }
        .particle:nth-child(2) { left: 20%; animation-delay: 1s; animation-duration: 8s; }
        .particle:nth-child(3) { left: 30%; animation-delay: 2s; animation-duration: 7s; }
        .particle:nth-child(4) { left: 40%; animation-delay: 3s; animation-duration: 9s; }
        .particle:nth-child(5) { left: 60%; animation-delay: 1.5s; animation-duration: 6.5s; }
        .particle:nth-child(6) { left: 70%; animation-delay: 2.5s; animation-duration: 7.5s; }
        .particle:nth-child(7) { left: 80%; animation-delay: 0.5s; animation-duration: 8.5s; }
        .particle:nth-child(8) { left: 90%; animation-delay: 3.5s; animation-duration: 6.8s; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes titleGlow {
          from {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
          }
          to {
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
          }
        }

        @keyframes highlightPulse {
          from {
            filter: brightness(1);
          }
          to {
            filter: brightness(1.2);
          }
        }

        @keyframes floatShape1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes floatShape2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(30px) rotate(-180deg); }
        }

        @keyframes rotateShape {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulseShape {
          0%, 100% { transform: scale(1); opacity: 0.12; }
          50% { transform: scale(1.2); opacity: 0.2; }
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .hero-actions-enhanced {
            flex-direction: column;
            align-items: center;
          }
          
          .cta-primary-enhanced, .cta-secondary-enhanced {
            width: 100%;
            max-width: 300px;
          }
          
          .shape-1, .shape-2 {
            width: 60px;
            height: 60px;
          }
          
          .shape-4 {
            width: 50px;
            height: 50px;
          }
        }

        @media (max-width: 480px) {
          .hero-tagline-dynamic {
            font-size: 1rem;
          }
          
          .hero-actions-enhanced {
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  );
}