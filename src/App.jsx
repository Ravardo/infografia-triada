import React, { useState } from 'react';

function App() {
  // Estado para controlar qué tarjeta está abierta
  const [activeCard, setActiveCard] = useState(null);

  const toggleCard = (index) => {
    if (activeCard === index) {
      setActiveCard(null); // Si ya está abierta, la cierra
    } else {
      setActiveCard(index); // Abre la nueva tarjeta
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-red-500 selection:text-white">
      
      {/* Sección 1: Portada a pantalla completa */}
      <div className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 lg:px-8 overflow-hidden">
         {/* Luces de fondo difuminadas para darle estilo hacker/gamer */}
         <div className="absolute top-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

         <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6 tracking-tight">
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-red-500">
             La Tríada CIA
           </span>
         </h1>
         <p className="text-xl md:text-2xl text-gray-400 text-center mb-12 max-w-3xl leading-relaxed">
           El corazón de la <span className="text-white font-semibold">Seguridad de la Información</span>.
           Descubre cómo proteger los datos en un mundo digital hostil.
         </p>

         {/* Indicador para hacer Scroll (Baja) */}
         <div 
           className="absolute bottom-10 animate-bounce cursor-pointer flex flex-col items-center text-gray-500 hover:text-white transition-colors"
           onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
         >
            <span className="mb-2 text-sm uppercase tracking-widest font-bold">Inicia la exploración</span>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
         </div>
      </div>

      {/* Sección 2: Las Tarjetas Interactivas con Profundidad */}
      <div className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
          
          {/* Confidencialidad */}
          <div
            className={`relative bg-gray-900 border border-gray-800 rounded-2xl p-8 cursor-pointer transition-all duration-500 overflow-hidden hover:border-blue-500/50 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)] group ${activeCard === 0 ? 'scale-105 border-blue-500/50 shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)]' : 'hover:-translate-y-2'}`}
            onClick={() => toggleCard(0)}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-700 to-blue-400"></div>
            <h2 className="text-3xl font-bold text-blue-400 mb-4 group-hover:text-blue-300 transition-colors">Confidencialidad</h2>
            <p className="text-gray-400 leading-relaxed text-lg mb-4">
              Garantizar que la información sea accesible <strong>únicamente</strong> para quienes tienen autorización explícita.
            </p>
            {/* Contenido oculto que se despliega */}
            <div className={`transition-all duration-500 ${activeCard === 0 ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'} overflow-hidden`}>
              <div className="bg-blue-950/30 p-5 rounded-xl border border-blue-900/50">
                <p className="text-blue-100 text-sm md:text-base">
                  <strong className="block text-blue-400 mb-2 font-bold uppercase tracking-wider">⚡ Aplicación Real:</strong>
                  El cifrado de extremo a extremo en aplicaciones de mensajería o túneles VPN. Si alguien intercepta la red (Ataque Man-in-the-Middle), solo verá texto ilegible sin la llave criptográfica.
                </p>
              </div>
            </div>
            <div className="mt-6 text-blue-500/70 text-sm font-bold flex items-center gap-2 uppercase tracking-wide">
              {activeCard === 0 ? 'Cerrar detalle ↑' : 'Toca para profundizar ↓'}
            </div>
          </div>

          {/* Integridad */}
          <div
            className={`relative bg-gray-900 border border-gray-800 rounded-2xl p-8 cursor-pointer transition-all duration-500 overflow-hidden hover:border-emerald-500/50 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)] group ${activeCard === 1 ? 'scale-105 border-emerald-500/50 shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)]' : 'hover:-translate-y-2'}`}
            onClick={() => toggleCard(1)}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-700 to-emerald-400"></div>
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 group-hover:text-emerald-300 transition-colors">Integridad</h2>
            <p className="text-gray-400 leading-relaxed text-lg mb-4">
              Mantener la exactitud y totalidad de los datos. Evitar cualquier modificación no autorizada o accidental.
            </p>
            {/* Contenido oculto que se despliega */}
            <div className={`transition-all duration-500 ${activeCard === 1 ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'} overflow-hidden`}>
              <div className="bg-emerald-950/30 p-5 rounded-xl border border-emerald-900/50">
                <p className="text-emerald-100 text-sm md:text-base">
                  <strong className="block text-emerald-400 mb-2 font-bold uppercase tracking-wider">⚡ Aplicación Real:</strong>
                  Uso de funciones Hash (como SHA-256) en bases de datos o al descargar software. Si un atacante altera un solo bit del archivo original, el hash resultante cambiará por completo, revelando la manipulación.
                </p>
              </div>
            </div>
            <div className="mt-6 text-emerald-500/70 text-sm font-bold flex items-center gap-2 uppercase tracking-wide">
              {activeCard === 1 ? 'Cerrar detalle ↑' : 'Toca para profundizar ↓'}
            </div>
          </div>

          {/* Disponibilidad */}
          <div
            className={`relative bg-gray-900 border border-gray-800 rounded-2xl p-8 cursor-pointer transition-all duration-500 overflow-hidden hover:border-red-500/50 hover:shadow-[0_0_40px_-10px_rgba(239,68,68,0.4)] group ${activeCard === 2 ? 'scale-105 border-red-500/50 shadow-[0_0_40px_-10px_rgba(239,68,68,0.4)]' : 'hover:-translate-y-2'}`}
            onClick={() => toggleCard(2)}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-700 to-red-400"></div>
            <h2 className="text-3xl font-bold text-red-400 mb-4 group-hover:text-red-300 transition-colors">Disponibilidad</h2>
            <p className="text-gray-400 leading-relaxed text-lg mb-4">
              Asegurar que la información y los sistemas informáticos estén operativos y listos cuando se necesiten.
            </p>
            {/* Contenido oculto que se despliega */}
            <div className={`transition-all duration-500 ${activeCard === 2 ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'} overflow-hidden`}>
              <div className="bg-red-950/30 p-5 rounded-xl border border-red-900/50">
                <p className="text-red-100 text-sm md:text-base">
                  <strong className="block text-red-400 mb-2 font-bold uppercase tracking-wider">⚡ Aplicación Real:</strong>
                  Implementación de balanceadores de carga y servidores redundantes (Backups). Protege la infraestructura contra ataques de Denegación de Servicio (DDoS) o fallos de hardware críticos.
                </p>
              </div>
            </div>
            <div className="mt-6 text-red-500/70 text-sm font-bold flex items-center gap-2 uppercase tracking-wide">
              {activeCard === 2 ? 'Cerrar detalle ↑' : 'Toca para profundizar ↓'}
            </div>
          </div>

        </div>
      </div>

      {/* Marca de agua Horda con efecto Glow */}
      <div className="fixed bottom-4 right-4 text-gray-400 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity duration-300 flex items-center gap-3 cursor-default bg-gray-950/80 p-2 rounded-lg backdrop-blur-md shadow-2xl border border-gray-800 z-50">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/WoW_Horde_Logo.svg/1024px-WoW_Horde_Logo.svg.png" alt="Logo Horda" className="h-10 w-auto drop-shadow-[0_0_10px_rgba(220,38,38,1)] animate-pulse" />        <span className="hidden md:inline pr-2">Desarrollado por Rodrigo Catalán</span>
      </div>
    </div>
  );
}

export default App;