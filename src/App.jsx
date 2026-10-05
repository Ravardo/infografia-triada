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
        ctx.fillStyle = '#111827'; 
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

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

    const connect = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                         ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
          if (distance < 12000) {
            let opacity = 1 - (distance / 12000);
            ctx.strokeStyle = 'rgba(17, 24, 39,' + (opacity * 0.3) + ')'; 
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
    <div className="min-h-screen text-gray-900 font-sans selection:bg-blue-500 selection:text-white pb-20">
      <ParticlesBackground />
      
      {/* Estilos CSS de la Pirámide adaptada a los colores C.I.A Clásicos */}
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
        .front { border-bottom-color: rgba(37, 99, 235, 0.85); transform: translateZ(57px) rotateX(20deg); box-shadow: 0 0 30px rgba(37,99,235,0.3); } /* Azul */
        .right { border-bottom-color: rgba(5, 150, 105, 0.85); transform: rotateY(120deg) translateZ(57px) rotateX(20deg); box-shadow: 0 0 30px rgba(5,150,105,0.3); } /* Verde */
        .left  { border-bottom-color: rgba(245, 158, 11, 0.85); transform: rotateY(240deg) translateZ(57px) rotateX(20deg); box-shadow: 0 0 30px rgba(245,158,11,0.3); } /* Amarillo/Naranja */
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
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-emerald-600 to-amber-500">
             La Tríada C.I.A
           </span>
         </h1>
         <p className="text-xl md:text-2xl text-gray-600 text-center mb-12 max-w-3xl leading-relaxed z-10">
           El núcleo de la <span className="text-gray-900 font-bold">Gestión de Seguridad de la Información</span>.
           Políticas, protocolos y mecanismos para blindar activos digitales.
         </p>

         <div 
           className="absolute bottom-10 animate-bounce cursor-pointer flex flex-col items-center text-gray-500 hover:text-gray-900 transition-colors bg-white/50 p-2 rounded-full"
           onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
         >
            <span className="mb-2 text-sm uppercase tracking-widest font-bold">Explorar Arquitectura</span>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
         </div>
      </div>

      {/* Tarjetas Interactivas Principales */}
      <div className="flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Conceptos Fundamentales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
          
          {/* Confidencialidad */}
          <div
            className={`relative bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-8 cursor-pointer transition-all duration-500 overflow-hidden shadow-lg group ${activeCard === 0 ? 'scale-105 shadow-[0_0_40px_-10px_rgba(37,99,235,0.3)]' : 'hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(37,99,235,0.2)]'}`}
            onClick={() => toggleCard(0)}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400"></div>
            <h2 className="text-3xl font-bold text-blue-600 mb-4 transition-colors flex items-center gap-3">
              🔒 Confidencialidad
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-4">
              Asegura que los datos estáticos o en tránsito no sean divulgados a individuos, entidades o procesos no autorizados.
            </p>
            <div className={`transition-all duration-500 ${activeCard === 0 ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'} overflow-hidden`}>
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <ul className="list-disc pl-5 text-blue-900 text-sm space-y-2">
                  <li><strong>Mecanismos:</strong> Cifrado simétrico/asimétrico (AES, RSA), Control de Acceso Basado en Roles (RBAC), Autenticación Multifactor (MFA).</li>
                  <li><strong>Vulnerabilidades:</strong> Ataques Man-in-the-Middle (MitM), Phishing, escalamiento de privilegios, ingeniería social.</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 text-blue-600 text-sm font-bold flex items-center gap-2 uppercase tracking-wide">
              {activeCard === 0 ? 'Cerrar detalle ↑' : 'Toca para profundizar ↓'}
            </div>
          </div>

          {/* Integridad */}
          <div
            className={`relative bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-8 cursor-pointer transition-all duration-500 overflow-hidden shadow-lg group ${activeCard === 1 ? 'scale-105 shadow-[0_0_40px_-10px_rgba(5,150,105,0.3)]' : 'hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(5,150,105,0.2)]'}`}
            onClick={() => toggleCard(1)}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-emerald-400"></div>
            <h2 className="text-3xl font-bold text-emerald-600 mb-4 transition-colors flex items-center gap-3">
              ⚙️ Integridad
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-4">
              Garantiza la exactitud, completitud y validez de la información a lo largo de todo su ciclo de vida.
            </p>
            <div className={`transition-all duration-500 ${activeCard === 1 ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'} overflow-hidden`}>
              <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
                <ul className="list-disc pl-5 text-emerald-900 text-sm space-y-2">
                  <li><strong>Mecanismos:</strong> Funciones Hash (SHA-256, MD5), Firmas Digitales, Certificados SSL/TLS, Controles de versiones (Git).</li>
                  <li><strong>Vulnerabilidades:</strong> Inyección SQL, alteraciones no autorizadas en bases de datos, malware que corrompe archivos.</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 text-emerald-600 text-sm font-bold flex items-center gap-2 uppercase tracking-wide">
              {activeCard === 1 ? 'Cerrar detalle ↑' : 'Toca para profundizar ↓'}
            </div>
          </div>

          {/* Disponibilidad */}
          <div
            className={`relative bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-8 cursor-pointer transition-all duration-500 overflow-hidden shadow-lg group ${activeCard === 2 ? 'scale-105 shadow-[0_0_40px_-10px_rgba(245,158,11,0.3)]' : 'hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(245,158,11,0.2)]'}`}
            onClick={() => toggleCard(2)}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-400"></div>
            <h2 className="text-3xl font-bold text-amber-500 mb-4 transition-colors flex items-center gap-3">
              ⏱️ Disponibilidad
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-4">
              Asegura que los sistemas, aplicaciones y datos estén operativos y accesibles cuando los usuarios autorizados los requieran.
            </p>
            <div className={`transition-all duration-500 ${activeCard === 2 ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'} overflow-hidden`}>
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-100">
                <ul className="list-disc pl-5 text-amber-900 text-sm space-y-2">
                  <li><strong>Mecanismos:</strong> Balanceadores de carga, clústeres de alta disponibilidad (HA), Planes de Recuperación ante Desastres (DRP), copias de seguridad distribuidas.</li>
                  <li><strong>Vulnerabilidades:</strong> Ataques de Denegación de Servicio (DDoS), fallas de hardware, desastres naturales, ransomware.</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 text-amber-500 text-sm font-bold flex items-center gap-2 uppercase tracking-wide">
              {activeCard === 2 ? 'Cerrar detalle ↑' : 'Toca para profundizar ↓'}
            </div>
          </div>

        </div>
      </div>

      {/* Sección Adicional: Profundidad Técnica */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center border-b pb-4">Implementación en la Arquitectura de Sistemas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">El Desafío del Equilibrio</h4>
              <p className="mb-4">
                En ingeniería de software, maximizar un pilar suele comprometer otro. Por ejemplo, exigir múltiples capas de cifrado y autenticación (máxima Confidencialidad e Integridad) puede ralentizar el sistema y dificultar el acceso legítimo, afectando la Disponibilidad. El rol del ingeniero es diseñar arquitecturas resilientes que equilibren la tríada según las necesidades del negocio.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Modelos de Control de Acceso</h4>
              <p className="mb-4">
                Para sostener la tríada, se implementan modelos estrictos como <strong>Zero Trust</strong> (no confiar en nadie por defecto, verificar siempre), el <strong>Principio de Menor Privilegio</strong> (otorgar solo los permisos mínimos necesarios para operar) y la segmentación de redes, asegurando que si un atacante vulnera un nodo, no comprometa todo el sistema.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Marca de agua Horda */}
      <div className="fixed bottom-4 right-4 text-gray-700 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity duration-300 flex items-center gap-3 cursor-default bg-white/90 p-2 rounded-lg backdrop-blur-md shadow-xl border border-gray-200 z-50">
        <img src="https://wow.zamimg.com/images/wow/icons/large/achievement_character_troll_male.jpg" alt="Logo Horda" className="h-10 w-auto drop-shadow-[0_0_5px_rgba(220,38,38,0.5)]" />
        <span className="hidden md:inline pr-2">Desarrollado por Rodrigo Catalán</span>
      </div>
    </div>
  );
}

export default App;