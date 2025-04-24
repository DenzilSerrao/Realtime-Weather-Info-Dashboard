import React from 'react';
import { MapPin } from 'lucide-react';
import { Location } from '../types/weatherTypes';

interface LocationSelectorProps {
  locations: Location[];
  selectedLocation: Location | null;
  onLocationChange: (location: Location) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  locations, 
  selectedLocation, 
  onLocationChange 
}) => {
  return (
    <div className="relative">
      <label 
        htmlFor="location-select" 
        className="block text-white text-lg font-semibold mb-2"
      >
        Select Location
      </label>
      
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
        
        <select
          id="location-select"
          className="w-full py-3 pl-10 pr-10 rounded-lg bg-white/30 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none transition-all"
          value={selectedLocation?.id || ''}
          onChange={(e) => {
            const locationId = parseInt(e.target.value);
            const location = locations.find(loc => loc.id === locationId);
            if (location) {
              onLocationChange(location);
            }
          }}
        >
          <option value="" disabled>Choose a city...</option>
          {locations.map((location) => (
            <option 
              key={location.id} 
              value={location.id}
              className="text-gray-800"
            >
              {location.name}, {location.country}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg 
            className="h-5 w-5 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;