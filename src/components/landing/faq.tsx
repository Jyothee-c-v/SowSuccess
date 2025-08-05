"use client";
import { useState } from "react";

const faqs = [
  {
    question: "Is this a donation or investment?",
    answer: "No. It's a community-driven training and income model where you receive training worth ₹3999 and referral-based rewards.",
  },
  {
    question: "Do I need special skills to refer?",
    answer: "No. Anyone can do it. We'll even provide training to help you share this opportunity.",
  },
  {
    question: "Can I do both trainings?",
    answer: "Yes, after your first course, you can enroll in others with benefits and discounts.",
  },
];

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section relative pb-20 md:pb-32 overflow-hidden" style={{backgroundColor: '#FBF9F6'}}>
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
        <div className="faq-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{color: '#2d5a27'}}>
            Frequently Asked{" "}
            <span className="relative inline-block" style={{color: '#2d5a27'}}>
              Questions
              <div className="absolute -bottom-2 left-0 w-full h-1 rounded-full transform scale-x-0 animate-scale-x" style={{backgroundColor: '#7cb342'}}></div>
            </span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{color: '#2a2a2a'}}>
            Get answers to common questions about our program
          </p>
        </div>
        
        <div className="faq-accordion max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="faq-item group mb-6 last:mb-0"
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <span>{faq.question}</span>
                <div className={`faq-toggle ${activeIndex === index ? 'active' : ''}`}>
                  <div className="toggle-line toggle-line-1"></div>
                  <div className="toggle-line toggle-line-2"></div>
                </div>
              </div>
              <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
                <div className="faq-answer-content">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2">
            <div className="w-8 h-1 rounded-full" style={{backgroundColor: '#7cb342'}}></div>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{backgroundColor: '#2d5a27'}}></div>
            <div className="w-8 h-1 rounded-full" style={{backgroundColor: '#7cb342'}}></div>
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

        .faq-item {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid rgba(125, 179, 66, 0.1);
        }

        .faq-item:hover {
          box-shadow: 0 10px 30px rgba(125, 179, 66, 0.15);
          transform: translateY(-2px);
        }

        .faq-question {
          padding: 25px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.1rem;
          font-weight: 600;
          color: #2d5a27;
          background: white;
          transition: all 0.3s ease;
        }

        .faq-item:hover .faq-question {
          background: hsl(125, 25%, 97%);
        }

        .faq-toggle {
          position: relative;
          width: 20px;
          height: 20px;
          transition: transform 0.3s ease;
        }

        .toggle-line {
          position: absolute;
          background: #7cb342;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .toggle-line-1 {
          width: 20px;
          height: 2px;
          top: 9px;
          left: 0;
        }

        .toggle-line-2 {
          width: 2px;
          height: 20px;
          top: 0;
          left: 9px;
        }

        .faq-toggle.active .toggle-line-2 {
          transform: rotate(90deg);
          opacity: 0;
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .faq-answer.active {
          max-height: 200px;
        }

        .faq-answer-content {
          padding: 0 30px 25px;
          color: #2a2a2a;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}