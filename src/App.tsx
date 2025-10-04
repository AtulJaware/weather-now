import { useState, useEffect } from 'react';
import { Search, Cloud, Loader2, MapPin, Clock } from 'lucide-react';
import { WeatherCard } from './components/WeatherCard';
import { SearchBar } from './components/SearchBar';
import { ErrorMessage } from './components/ErrorMessage';
import { WeatherBackground } from './components/WeatherBackground';
import { fetchWeather } from './services/weatherService';
import type { WeatherData } from './types/weather';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSearch = async (searchCity: string) => {
    if (!searchCity.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeather(searchCity);
      setWeather(data);
      setCity('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLocationLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await fetchWeather(`${latitude},${longitude}`);
          setWeather(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
        } finally {
          setLocationLoading(false);
        }
      },
      () => {
        setError('Unable to retrieve your location');
        setLocationLoading(false);
      }
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Weather Background */}
      <WeatherBackground condition={weather?.weather[0].main || 'default'} />

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12 animate-slideDown">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cloud className="w-16 h-16 text-white drop-shadow-2xl animate-bounce-slow" strokeWidth={1.5} />
            <h1 className="text-6xl font-bold text-white tracking-tight drop-shadow-2xl">
              WeatherNow
            </h1>
          </div>
          <p className="text-white/95 text-xl font-light drop-shadow-lg">
            Discover weather conditions anywhere in the world
          </p>

          {/* Current Date and Time */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-white/95">
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-5 py-3 rounded-full animate-fadeIn shadow-lg hover:bg-white/20 transition-all">
              <Clock className="w-5 h-5" />
              <span className="font-semibold text-lg">{formatTime(currentTime)}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-5 py-3 rounded-full animate-fadeIn shadow-lg hover:bg-white/20 transition-all" style={{ animationDelay: '0.2s' }}>
              <span className="font-semibold">{formatDate(currentTime)}</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <SearchBar
            value={city}
            onChange={setCity}
            onSearch={handleSearch}
            loading={loading}
          />

          {/* Current Location Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleGetCurrentLocation}
              disabled={locationLoading || loading}
              className="flex items-center gap-3 px-8 py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed group border border-white/30"
            >
              <MapPin className={`w-5 h-5 ${locationLoading ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
              {locationLoading ? 'Getting Location...' : 'Use My Location'}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-12 h-12 text-white animate-spin" />
          </div>
        )}

        {/* Weather Card */}
        {weather && !loading && <WeatherCard weather={weather} />}

        {/* Empty State */}
        {!weather && !loading && !error && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-16 text-center animate-scaleIn border border-white/50">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow shadow-lg">
              <Search className="w-12 h-12 text-white" strokeWidth={2} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Start Your Weather Journey
            </h2>
            <p className="text-gray-600 text-lg">
              Enter any city name or use your location to discover real-time weather conditions
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-white/90 text-sm font-medium drop-shadow-lg">
          Made with ❤️ by Atul Jaware Patil
        </div>
      </div>
    </div>
  );
}

export default App;
