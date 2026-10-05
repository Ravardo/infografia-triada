import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 hover:scale-105 transition-transform duration-300">
        La Tríada de la Seguridad de la Información
      </h1>
      <p className="text-lg md:text-xl text-gray-400 text-center mb-12 max-w-2xl">
        Los tres pilares fundamentales para mantener tus datos a salvo, explicados de forma sencilla.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Confidencialidad */}
        <div className="bg-gray-800 rounded-2xl p-8 border-t-4 border-blue-500 shadow-lg hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Confidencialidad</h2>
          <p className="text-gray-300 leading-relaxed">
            Solo las personas autorizadas pueden ver la información. Imagina que es un diario íntimo cerrado con llave; solo tú puedes leerlo.
          </p>
        </div>

        {/* Integridad */}
        <div className="bg-gray-800 rounded-2xl p-8 border-t-4 border-emerald-500 shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-2 transition-all duration-300">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4">Integridad</h2>
          <p className="text-gray-300 leading-relaxed">
            Los datos no han sido modificados por extraños. Es como enviar una carta en un sobre sellado con cera; sabes si alguien lo abrió.
          </p>
        </div>

        {/* Disponibilidad */}
        <div className="bg-gray-800 rounded-2xl p-8 border-t-4 border-red-500 shadow-lg hover:shadow-red-500/20 hover:-translate-y-2 transition-all duration-300">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Disponibilidad</h2>
          <p className="text-gray-300 leading-relaxed">
            La información está lista siempre que la necesites. Piensa en un cajero automático que funciona las 24 horas del día, los 7 días de la semana.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;