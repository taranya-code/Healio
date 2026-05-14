import { motion } from 'motion/react';
import { MapPin, Phone, Navigation, Hospital, Ambulance, Pill } from 'lucide-react';
import { nearbyHospitals } from '../data/healthData';

export default function NearbyHospitals() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Hospital':
        return <Hospital className="w-5 h-5 text-red-400" />;
      case 'Ambulance':
        return <Ambulance className="w-5 h-5 text-blue-400" />;
      case 'Pharmacy':
        return <Pill className="w-5 h-5 text-green-400" />;
      default:
        return <MapPin className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-md border border-cyan-500/20">
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="w-6 h-6 text-cyan-400" />
        <h3 className="text-xl font-bold text-white">Nearby Healthcare</h3>
      </div>

      <div className="space-y-3">
        {nearbyHospitals.map((place, index) => (
          <motion.div
            key={place.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl bg-white/5 border ${
              place.emergency ? 'border-red-500/30' : 'border-white/10'
            } hover:bg-white/10 transition-all`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/5">
                {getIcon(place.type)}
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{place.name}</h4>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span className="flex items-center gap-1">
                    <Navigation className="w-4 h-4" />
                    {place.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {place.phone}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    place.emergency
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {place.type}
                  </span>
                  {place.emergency && (
                    <span className="px-2 py-1 rounded-full text-xs bg-orange-500/20 text-orange-400">
                      24/7 Emergency
                    </span>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-all"
              >
                Navigate
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-white/40 text-xs text-center mt-4">
        Powered by live geolocation - Ready for Google Maps API integration
      </p>
    </div>
  );
}
