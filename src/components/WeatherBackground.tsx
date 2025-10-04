interface WeatherBackgroundProps {
  condition: string;
}

export function WeatherBackground({ condition }: WeatherBackgroundProps) {
  const getBackgroundStyle = () => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-500';
      case 'clouds':
        return 'bg-gradient-to-br from-gray-400 via-slate-400 to-gray-500';
      case 'rain':
      case 'drizzle':
        return 'bg-gradient-to-br from-slate-600 via-gray-700 to-slate-800';
      case 'snow':
        return 'bg-gradient-to-br from-blue-100 via-slate-200 to-blue-200';
      case 'thunderstorm':
        return 'bg-gradient-to-br from-slate-800 via-gray-900 to-slate-900';
      case 'mist':
      case 'fog':
      case 'haze':
        return 'bg-gradient-to-br from-gray-300 via-slate-300 to-gray-400';
      default:
        return 'bg-gradient-to-br from-sky-400 via-blue-400 to-cyan-500';
    }
  };

  const renderWeatherEffects = () => {
    switch (condition.toLowerCase()) {
      case 'rain':
      case 'drizzle':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 bg-white/30 animate-rain"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  height: `${Math.random() * 30 + 20}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${Math.random() * 0.5 + 0.5}s`
                }}
              />
            ))}
          </div>
        );

      case 'snow':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full animate-snow"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 3 + 4}s`,
                  opacity: Math.random() * 0.6 + 0.4
                }}
              />
            ))}
          </div>
        );

      case 'thunderstorm':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 animate-lightning"></div>
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 bg-white/40 animate-rain"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  height: `${Math.random() * 40 + 30}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${Math.random() * 0.3 + 0.4}s`
                }}
              />
            ))}
          </div>
        );

      case 'clear':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-300/30 rounded-full blur-3xl animate-pulse"></div>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/40 rounded-full animate-twinkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 2 + 2}s`
                }}
              />
            ))}
          </div>
        );

      case 'clouds':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white/10 rounded-full blur-3xl animate-cloudMove"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 200 + 150}px`,
                  height: `${Math.random() * 100 + 80}px`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 20 + 20}s`
                }}
              />
            ))}
          </div>
        );

      case 'mist':
      case 'fog':
      case 'haze':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white/20 blur-3xl animate-fog"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 400 + 300}px`,
                  height: `${Math.random() * 200 + 150}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 10 + 15}s`
                }}
              />
            ))}
          </div>
        );

      default:
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-float-slow"></div>
          </div>
        );
    }
  };

  return (
    <div className={`absolute inset-0 transition-all duration-1000 ${getBackgroundStyle()}`}>
      {renderWeatherEffects()}
    </div>
  );
}
