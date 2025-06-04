"use client";

export function WhyJoinSection() {
  const benefits = [
    { emoji: "🏆", text: "Access top-tier training worth ₹3999" },
    { emoji: "💰", text: "Earn lakhs in referral income" },
    { emoji: "👥", text: "Uplift others while growing yourself" },
    { emoji: "📈", text: "Become part of a nationwide success movement" },
  ];

  return (
    <section className="relative px-4 overflow-hidden" style={{backgroundColor: '#FBF9F6'}}>
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

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{color: '#2d5a27'}}>
            Why join {" "}
            <span className="relative inline-block" style={{color: '#2d5a27'}}>
              Us?
              <div className="absolute -bottom-2 left-0 w-full h-1 rounded-full transform scale-x-0 animate-scale-x" style={{backgroundColor: '#7cb342'}}></div>
            </span>
          </h2>
          <div className="w-16 h-1 bg-green-600 mx-auto"></div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-green-50 p-6 rounded-lg border border-green-200 text-center"
            >
              <div className="text-4xl mb-4">{benefit.emoji}</div>
              <p className="text-lg font-medium text-green-900">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>

        {/* Income Potential */}
        <div className="bg-green-800 text-white p-8 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-3">
            Income Potential (Full Network):
          </h3>
          <div className="text-4xl font-bold mb-3">
            Up to ₹10+ Crores
          </div>
          <p className="text-lg opacity-90">
            Complete your 4×9 levels. Simple math, massive impact.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.25; }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-8px) translateX(4px) rotate(2deg); }
          50% { transform: translateY(-4px) translateX(-2px) rotate(-1deg); }
          75% { transform: translateY(-12px) translateX(6px) rotate(1deg); }
        }
      `}</style>
    </section>
  );
}