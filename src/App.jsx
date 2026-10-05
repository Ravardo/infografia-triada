import React, { useState, useEffect, useRef } from 'react';

// --- COMPONENTE DEL FONDO DE PARTÍCULAS ---
const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let mouse = { x: null, y: null, radius: 120 };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
    window.addEventListener('mouseout', () => {
      mouse.x = undefined;
      mouse.y = undefined;
    });

    class Particle {
      constructor(x, y, dx, dy, size) {
        this.x = x; this.y = y; this.dx = dx; this.dy = dy; this.size = size;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#111827'; // Puntos negros/gris muy oscuro
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

        // Interacción con el mouse
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = forceDirectionX * force * -5;
          const directionY = forceDirectionY * force * -5;
          this.x += directionX;
          this.y += directionY;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let dx = (Math.random() - 0.5) * 1;
        let dy = (Math.random() - 0.5) * 1;
        particlesArray.push(new Particle(x, y, dx, dy, size));
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    };

    // Conecta los puntos cercanos con líneas
    const connect = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                         ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
          if (distance < 12000) {
            let opacity = 1 - (distance / 12000);
            ctx.strokeStyle = 'rgba(17, 24, 39,' + (opacity * 0.3) + ')'; // Líneas negras semitransparentes
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    init();
    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 bg-white" />;
};

// --- APLICACIÓN PRINCIPAL ---
function App() {
  const [activeCard, setActiveCard] = useState(null);

  const toggleCard = (index) => {
    if (activeCard === index) setActiveCard(null);
    else setActiveCard(index);
  };

  return (
    <div className="min-h-screen text-gray-900 font-sans selection:bg-red-500 selection:text-white">
      <ParticlesBackground />
      
      {/* Estilos CSS de la Pirámide adaptada para fondo claro */}
      <style>{`
        @keyframes spin-3d {
          0% { transform: rotateX(-15deg) rotateY(0deg); }
          100% { transform: rotateX(-15deg) rotateY(360deg); }
        }
        .scene {
          width: 200px;
          height: 200px;
          perspective: 800px;
          margin: 0 auto 3rem auto;
          z-index: 20;
        }
        .pyramid {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: spin-3d 10s linear infinite;
        }
        .face {
          position: absolute;
          bottom: 0;
          left: 50%;
          margin-left: -100px;
          width: 0;
          height: 0;
          border-left: 100px solid transparent;
          border-right: 100px solid transparent;
          border-bottom: 180px solid;
          transform-origin: 50% 100%;
          backdrop-filter: blur(2px);
        }
        .front { border-bottom-color: rgba(37, 99, 235, 0.85); transform: translateZ(57px) rotateX(20deg); box-shadow: 0 0 30px rgba(37,99,235,0.3); }
        .right { border-bottom-color: rgba(5, 150, 105, 0.85); transform: rotateY(120deg) translateZ(57px) rotateX(20deg); box-shadow: 0 0 30px rgba(5,150,105,0.3); }
        .left  { border-bottom-color: rgba(220, 38, 38, 0.85); transform: rotateY(240deg) translateZ(57px) rotateX(20deg); box-shadow: 0 0 30px rgba(220,38,38,0.3); }
      `}</style>

      {/* Portada */}
      <div className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 lg:px-8 overflow-hidden">
         <div className="scene mt-8">
           <div className="pyramid">
             <div className="face front"></div>
             <div className="face right"></div>
             <div className="face left"></div>
           </div>
         </div>

         <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6 tracking-tight z-10 drop-shadow-sm">
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-emerald-600 to-red-600">
             La Tríada CIA
           </span>
         </h1>
         <p className="text-xl md:text-2xl text-gray-600 text-center mb-12 max-w-3xl leading-relaxed z-10">
           El corazón de la <span className="text-gray-900 font-bold">Seguridad de la Información</span>.
           Descubre cómo proteger los datos en un mundo digital hostil.
         </p>

         <div 
           className="absolute bottom-10 animate-bounce cursor-pointer flex flex-col items-center text-gray-500 hover:text-gray-900 transition-colors bg-white/50 p-2 rounded-full"
           onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
         >
            <span className="mb-2 text-sm uppercase tracking-widest font-bold">Explorar</span>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
         </div>
      </div>

      {/* Tarjetas */}
      <div className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
          
          <div
            className={`relative bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-8 cursor-pointer transition-all duration-500 overflow-hidden shadow-lg group ${activeCard === 0 ? 'scale-105 shadow-[0_0_40px_-10px_rgba(37,99,235,0.3)]' : 'hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(37,99,235,0.2)]'}`}
            onClick={() => toggleCard(0)}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400"></div>
            <h2 className="text-3xl font-bold text-blue-600 mb-4 transition-colors">Confidencialidad</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-4">
              Garantizar que la información sea accesible <strong>únicamente</strong> para quienes tienen autorización explícita.
            </p>
            <div className={`transition-all duration-500 ${activeCard === 0 ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'} overflow-hidden`}>
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <p className="text-blue-900 text-sm md:text-base">
                  <strong className="block text-blue-700 mb-2 font-bold uppercase tracking-wider">⚡ Aplicación Real:</strong>
                  El cifrado de extremo a extremo en aplicaciones de mensajería o túneles VPN.
                </p>
              </div>
            </div>
            <div className="mt-6 text-blue-600 text-sm font-bold flex items-center gap-2 uppercase tracking-wide">
              {activeCard === 0 ? 'Cerrar detalle ↑' : 'Toca para profundizar ↓'}
            </div>
          </div>

          <div
            className={`relative bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-8 cursor-pointer transition-all duration-500 overflow-hidden shadow-lg group ${activeCard === 1 ? 'scale-105 shadow-[0_0_40px_-10px_rgba(5,150,105,0.3)]' : 'hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(5,150,105,0.2)]'}`}
            onClick={() => toggleCard(1)}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-emerald-400"></div>
            <h2 className="text-3xl font-bold text-emerald-600 mb-4 transition-colors">Integridad</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-4">
              Mantener la exactitud y totalidad de los datos. Evitar cualquier modificación no autorizada o accidental.
            </p>
            <div className={`transition-all duration-500 ${activeCard === 1 ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'} overflow-hidden`}>
              <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
                <p className="text-emerald-900 text-sm md:text-base">
                  <strong className="block text-emerald-700 mb-2 font-bold uppercase tracking-wider">⚡ Aplicación Real:</strong>
                  Uso de funciones Hash (como SHA-256) en bases de datos o al descargar software.
                </p>
              </div>
            </div>
            <div className="mt-6 text-emerald-600 text-sm font-bold flex items-center gap-2 uppercase tracking-wide">
              {activeCard === 1 ? 'Cerrar detalle ↑' : 'Toca para profundizar ↓'}
            </div>
          </div>

          <div
            className={`relative bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-8 cursor-pointer transition-all duration-500 overflow-hidden shadow-lg group ${activeCard === 2 ? 'scale-105 shadow-[0_0_40px_-10px_rgba(220,38,38,0.3)]' : 'hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(220,38,38,0.2)]'}`}
            onClick={() => toggleCard(2)}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-400"></div>
            <h2 className="text-3xl font-bold text-red-600 mb-4 transition-colors">Disponibilidad</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-4">
              Asegurar que la información y los sistemas informáticos estén operativos y listos cuando se necesiten.
            </p>
            <div className={`transition-all duration-500 ${activeCard === 2 ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'} overflow-hidden`}>
              <div className="bg-red-50 p-5 rounded-xl border border-red-100">
                <p className="text-red-900 text-sm md:text-base">
                  <strong className="block text-red-700 mb-2 font-bold uppercase tracking-wider">⚡ Aplicación Real:</strong>
                  Implementación de balanceadores de carga y servidores redundantes (Backups).
                </p>
              </div>
            </div>
            <div className="mt-6 text-red-600 text-sm font-bold flex items-center gap-2 uppercase tracking-wide">
              {activeCard === 2 ? 'Cerrar detalle ↑' : 'Toca para profundizar ↓'}
            </div>
          </div>

        </div>
      </div>

      {/* Marca de agua Horda (Adaptada a modo claro) */}
      <div className="fixed bottom-4 right-4 text-gray-700 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity duration-300 flex items-center gap-3 cursor-default bg-white/90 p-2 rounded-lg backdrop-blur-md shadow-xl border border-gray-200 z-50">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/WoW_Horde_Logo.svg/1024px-WoW_Horde_Logo.svg.png" alt="Logo Horda" className="h-10 w-auto drop-shadow-[0_0_5px_rgba(220,38,38,0.5)]" />
        <span className="hidden md:inline pr-2">Desarrollado por Rodrigo Catalán</span>
      </div>
    </div>
  );
}

export default App;