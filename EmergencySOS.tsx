import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, MapPin, Phone, User, Droplet } from 'lucide-react';
import { getCurrentLocation } from '../utils/helpers';

interface EmergencySOSProps {
  onAddToTimeline?: (title: string, description: string) => void;
}

export default function EmergencySOS({ onAddToTimeline }: EmergencySOSProps) {
  const [emergency, setEmergency] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const activateEmergency = async () => {
    setLoading(true);
    try {
      const location = await getCurrentLocation();

      const emergencyData = {
        timestamp: new Date().toISOString(),
        location: {
          lat: location.lat,
          lng: location.lng,
          address: `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`,
        },
        patient: {
          name: 'User',
          bloodGroup: 'O+',
          allergies: 'None',
          emergencyContact: '+91-9876543210',
        },
        symptoms: ['Chest Pain', 'Breathing Difficulty'],
      };

      setEmergency(emergencyData);

      if (onAddToTimeline) {
        onAddToTimeline(
          '🚨 Emergency SOS Activated',
          `Location: ${emergencyData.location.address} - Symptoms: ${emergencyData.symptoms.join(', ')}`
        );
      }
    } catch (error) {
      console.error('Error getting location:', error);
      const mockData = {
        timestamp: new Date().toISOString(),
        location: {
          lat: 12.9716,
          lng: 77.5946,
          address: 'Bangalore, Karnataka',
        },
        patient: {
          name: 'User',
          bloodGroup: 'O+',
          allergies: 'None',
          emergencyContact: '+91-9876543210',
        },
        symptoms: ['Chest Pain', 'Breathing Difficulty'],
      };
      setEmergency(mockData);

      if (onAddToTimeline) {
        onAddToTimeline(
          '🚨 Emergency SOS Activated',
          `Location: ${mockData.location.address} - Symptoms: ${mockData.symptoms.join(', ')}`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-md border border-red-500/20">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="w-6 h-6 text-red-400" />
        <h3 className="text-xl font-bold text-white">Emergency SOS</h3>
      </div>

      {!emergency ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={activateEmergency}
          disabled={loading}
          className="w-full py-6 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-lg transition-all disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full"
              />
              Activating...
            </div>
          ) : (
            'Activate Emergency Mode'
          )}
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 animate-pulse">
            <p className="text-red-400 font-bold text-center">🚨 EMERGENCY MODE ACTIVE 🚨</p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-white/60 text-sm">Location</p>
                <p className="text-white">{emergency.location.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-white/60 text-sm">Patient</p>
                <p className="text-white">{emergency.patient.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Droplet className="w-5 h-5 text-red-400" />
              <div>
                <p className="text-white/60 text-sm">Blood Group</p>
                <p className="text-white">{emergency.patient.bloodGroup}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-white/60 text-sm">Emergency Contact</p>
                <p className="text-white">{emergency.patient.emergencyContact}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-all">
              Call 108
            </button>
            <button
              onClick={() => setEmergency(null)}
              className="flex-1 py-3 rounded-xl bg-gray-500 hover:bg-gray-600 text-white font-semibold transition-all"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
