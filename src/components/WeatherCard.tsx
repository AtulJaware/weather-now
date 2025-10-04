import { Droplets, Wind, Eye, Gauge, MapPin, Clock } from 'lucide-react';
import type { WeatherData } from '../types/weather';
import { getWeatherIcon } from '../utils/weatherIcons';

interface WeatherCardProps {
  weather: WeatherData;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const WeatherIcon = getWeatherIcon(weather.weather[0].main);

  const localTime = new Date((weather.dt + weather.timezone) * 1000);
  const formatLocalTime = () => {
    return localTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC'
    });
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 animate-fadeIn hover:scale-[1.02] hover:shadow-3xl border border-white/50">
      {/* Main Weather Info */}
      <div className="p-10 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 drop-shadow-lg" />
            <h2 className="text-4xl font-bold drop-shadow-lg">
              {weather.name}, {weather.sys.country}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/90 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <Clock className="w-4 h-4" />
            <span className="font-semibold">{formatLocalTime()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-6 rounded-3xl backdrop-blur-sm shadow-lg">
              <WeatherIcon className="w-28 h-28 drop-shadow-xl" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-7xl font-bold drop-shadow-2xl">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="text-2xl capitalize mt-2 text-white/95 font-semibold drop-shadow-lg">
                {weather.weather[0].description}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 mt-8 text-white/95">
          <div className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="text-sm font-medium">Feels like</span>
            <span className="font-bold text-lg">{Math.round(weather.main.feels_like)}°C</span>
          </div>
          <div className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
          <div className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="text-sm font-medium">High</span>
            <span className="font-bold text-lg">{Math.round(weather.main.temp_max)}°C</span>
          </div>
          <div className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
          <div className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="text-sm font-medium">Low</span>
            <span className="font-bold text-lg">{Math.round(weather.main.temp_min)}°C</span>
          </div>
        </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="p-10 grid grid-cols-2 gap-8">
        <div className="flex items-center gap-4 animate-fadeIn bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-2xl hover:shadow-lg transition-all group" style={{ animationDelay: '0.1s' }}>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
            <Droplets className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="text-sm text-gray-600 font-medium">Humidity</div>
            <div className="text-2xl font-bold text-gray-800">
              {weather.main.humidity}%
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 animate-fadeIn bg-gradient-to-br from-cyan-50 to-teal-50 p-5 rounded-2xl hover:shadow-lg transition-all group" style={{ animationDelay: '0.2s' }}>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
            <Wind className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="text-sm text-gray-600 font-medium">Wind Speed</div>
            <div className="text-2xl font-bold text-gray-800">
              {weather.wind.speed} m/s
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 animate-fadeIn bg-gradient-to-br from-orange-50 to-amber-50 p-5 rounded-2xl hover:shadow-lg transition-all group" style={{ animationDelay: '0.3s' }}>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
            <Gauge className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="text-sm text-gray-600 font-medium">Pressure</div>
            <div className="text-2xl font-bold text-gray-800">
              {weather.main.pressure} hPa
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 animate-fadeIn bg-gradient-to-br from-sky-50 to-blue-50 p-5 rounded-2xl hover:shadow-lg transition-all group" style={{ animationDelay: '0.4s' }}>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
            <Eye className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="text-sm text-gray-600 font-medium">Visibility</div>
            <div className="text-2xl font-bold text-gray-800">
              {(weather.visibility / 1000).toFixed(1)} km
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
