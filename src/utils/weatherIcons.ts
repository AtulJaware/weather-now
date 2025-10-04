import { Sun, Cloud, CloudRain, CloudSnow, CloudDrizzle, CloudLightning, CloudFog, Wind, Video as LucideIcon } from 'lucide-react';

export function getWeatherIcon(condition: string): LucideIcon {
  switch (condition.toLowerCase()) {
    case 'clear':
      return Sun;
    case 'clouds':
      return Cloud;
    case 'rain':
      return CloudRain;
    case 'drizzle':
      return CloudDrizzle;
    case 'snow':
      return CloudSnow;
    case 'thunderstorm':
      return CloudLightning;
    case 'mist':
    case 'fog':
    case 'haze':
      return CloudFog;
    case 'smoke':
    case 'dust':
    case 'sand':
      return Wind;
    default:
      return Cloud;
  }
}
