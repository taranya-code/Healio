import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Pill, Clock, Trash2, CheckCircle, Calendar, Repeat } from 'lucide-react';
import { formatTime, sendNotification, requestNotificationPermission } from '../utils/helpers';
import { storage } from '../utils/storage';

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  time: string;
  notes: string;
  frequency: 'daily' | 'monthly';
  dayOfMonth?: number;
  lastTaken?: string;
  completed: boolean;
}

interface MedicineReminderProps {
  onAddToTimeline?: (title: string, description: string) => void;
}

export default function MedicineReminder({ onAddToTimeline }: MedicineReminderProps) {
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    const loadedMedicines = storage.getMedicines();
    setMedicines(loadedMedicines);
  }, []);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    time: '',
    frequency: 'daily' as 'daily' | 'monthly',
    dayOfMonth: new Date().getDate(),
    notes: '',
  });

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const currentDay = now.getDate();

      medicines.forEach((medicine) => {
        const shouldNotify =
          medicine.time === currentTime &&
          (medicine.frequency === 'daily' ||
           (medicine.frequency === 'monthly' && medicine.dayOfMonth === currentDay));

        const lastTakenToday = medicine.lastTaken === now.toDateString();

        if (shouldNotify && !lastTakenToday) {
          sendNotification(
            '💊 Medicine Reminder',
            `Time to take ${medicine.name} - ${medicine.dosage}`
          );
        }
      });
    };

    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [medicines]);

  const addMedicine = async () => {
    if (!formData.name || !formData.time) return;

    await requestNotificationPermission();

    const newMedicine: Medicine = {
      id: Date.now(),
      name: formData.name,
      dosage: formData.dosage,
      time: formData.time,
      frequency: formData.frequency,
      dayOfMonth: formData.frequency === 'monthly' ? formData.dayOfMonth : undefined,
      notes: formData.notes,
      completed: false,
    };

    const updatedMedicines = [...medicines, newMedicine];
    setMedicines(updatedMedicines);
    storage.saveMedicines(updatedMedicines);

    setFormData({
      name: '',
      dosage: '',
      time: '',
      frequency: 'daily',
      dayOfMonth: new Date().getDate(),
      notes: ''
    });
    setShowForm(false);

    const frequencyText = formData.frequency === 'daily'
      ? 'daily'
      : `monthly on day ${formData.dayOfMonth}`;

    if (onAddToTimeline) {
      onAddToTimeline(
        `Medicine Reminder: ${formData.name}`,
        `${formData.dosage} - ${formData.time} (${frequencyText})`
      );
    }

    sendNotification(
      'Medicine Reminder Added',
      `${formData.name} at ${formData.time} (${frequencyText})`
    );
  };

  const toggleComplete = (id: number) => {
    const now = new Date();
    const medicine = medicines.find(m => m.id === id);

    const updatedMedicines = medicines.map(med =>
      med.id === id ? {
        ...med,
        completed: !med.completed,
        lastTaken: !med.completed ? now.toDateString() : med.lastTaken
      } : med
    );

    setMedicines(updatedMedicines);
    storage.saveMedicines(updatedMedicines);

    if (medicine && !medicine.completed) {
      if (onAddToTimeline) {
        onAddToTimeline(
          `Medicine Taken: ${medicine.name}`,
          `${medicine.dosage} - Taken at ${formatTime(now)}`
        );
      }
      sendNotification(
        '✅ Medicine Taken',
        `${medicine.name} marked as taken`
      );
    }
  };

  const deleteMedicine = (id: number) => {
    const updatedMedicines = medicines.filter(med => med.id !== id);
    setMedicines(updatedMedicines);
    storage.saveMedicines(updatedMedicines);
  };

  return (
    <div className="p-6 rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-md border border-green-500/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Pill className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-bold text-white">Medicine Reminders</h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="p-2 rounded-xl bg-green-500 hover:bg-green-600 text-white transition-all"
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 space-y-3"
          >
            <input
              type="text"
              placeholder="Medicine Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-green-500"
            />
            <input
              type="text"
              placeholder="Dosage (e.g., 1 tablet)"
              value={formData.dosage}
              onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-green-500"
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white/60 text-sm mb-2">Frequency</label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value as 'daily' | 'monthly' })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500"
                >
                  <option value="daily">Daily</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              {formData.frequency === 'monthly' && (
                <div>
                  <label className="block text-white/60 text-sm mb-2">Day of Month</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={formData.dayOfMonth}
                    onChange={(e) => setFormData({ ...formData, dayOfMonth: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500"
                  />
                </div>
              )}

              <div className={formData.frequency === 'daily' ? 'col-span-2' : ''}>
                <label className="block text-white/60 text-sm mb-2">Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500"
                />
              </div>
            </div>

            <input
              type="text"
              placeholder="Notes (optional)"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-green-500"
            />
            <button
              onClick={addMedicine}
              className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-all"
            >
              Add Reminder
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {medicines.length === 0 ? (
          <p className="text-center text-white/40 py-8">No reminders yet</p>
        ) : (
          medicines.map((medicine) => (
            <motion.div
              key={medicine.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`p-4 rounded-xl bg-white/5 border border-white/10 ${
                medicine.completed ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-semibold text-white ${
                      medicine.completed ? 'line-through' : ''
                    }`}>
                      {medicine.name}
                    </h4>
                    {medicine.completed && (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                  </div>
                  <p className="text-white/60 text-sm">{medicine.dosage}</p>

                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-white/80 text-sm">{medicine.time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {medicine.frequency === 'daily' ? (
                        <>
                          <Repeat className="w-4 h-4 text-purple-400" />
                          <span className="text-purple-400 text-sm">Daily</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4 text-orange-400" />
                          <span className="text-orange-400 text-sm">
                            Monthly (Day {medicine.dayOfMonth})
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {medicine.lastTaken && (
                    <p className="text-green-400/60 text-xs mt-2">
                      Last taken: {new Date(medicine.lastTaken).toLocaleDateString()}
                    </p>
                  )}

                  {medicine.notes && (
                    <p className="text-white/40 text-sm mt-2">{medicine.notes}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleComplete(medicine.id)}
                    className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-all"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteMedicine(medicine.id)}
                    className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
