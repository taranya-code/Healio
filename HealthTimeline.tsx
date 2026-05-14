import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, FileText, Pill, AlertTriangle, Clock, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { formatDate, formatTime } from '../utils/helpers';
import { storage, TimelineEvent } from '../utils/storage';

interface HealthTimelineProps {
  onEventsChange?: (events: TimelineEvent[]) => void;
}

export default function HealthTimeline({ onEventsChange }: HealthTimelineProps) {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    type: 'custom' as TimelineEvent['type'],
    title: '',
    description: '',
  });

  useEffect(() => {
    const loadedEvents = storage.getTimeline();
    setEvents(loadedEvents);
  }, []);

  const reloadEvents = () => {
    const loadedEvents = storage.getTimeline();
    setEvents(loadedEvents);
  };

  useEffect(() => {
    if (onEventsChange) {
      onEventsChange(events);
    }
  }, [events, onEventsChange]);

  const addEvent = () => {
    if (!formData.title) return;

    storage.addTimelineEvent({
      type: formData.type,
      title: formData.title,
      description: formData.description,
      timestamp: new Date().toISOString(),
    });

    reloadEvents();
    setFormData({ type: 'custom', title: '', description: '' });
    setShowForm(false);
  };

  const startEdit = (event: TimelineEvent) => {
    setEditingId(event.id);
    setFormData({
      type: event.type,
      title: event.title,
      description: event.description,
    });
  };

  const saveEdit = () => {
    if (!editingId || !formData.title) return;

    storage.updateTimelineEvent(editingId, {
      type: formData.type,
      title: formData.title,
      description: formData.description,
    });

    reloadEvents();
    setEditingId(null);
    setFormData({ type: 'custom', title: '', description: '' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ type: 'custom', title: '', description: '' });
  };

  const deleteEvent = (id: number) => {
    storage.deleteTimelineEvent(id);
    reloadEvents();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'symptom':
        return <Activity className="w-5 h-5 text-blue-400" />;
      case 'prescription':
        return <FileText className="w-5 h-5 text-green-400" />;
      case 'medicine':
        return <Pill className="w-5 h-5 text-purple-400" />;
      case 'emergency':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'symptom':
        return 'border-blue-500';
      case 'prescription':
        return 'border-green-500';
      case 'medicine':
        return 'border-purple-500';
      case 'emergency':
        return 'border-red-500';
      default:
        return 'border-gray-500';
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-md border border-indigo-500/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-indigo-400" />
          <h3 className="text-xl font-bold text-white">Health Timeline</h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="p-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white transition-all"
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
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as TimelineEvent['type'] })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="custom">Custom Event</option>
              <option value="symptom">Symptom</option>
              <option value="prescription">Prescription</option>
              <option value="medicine">Medicine</option>
              <option value="emergency">Emergency</option>
            </select>

            <input
              type="text"
              placeholder="Event Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-indigo-500"
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 resize-none"
            />

            <button
              onClick={addEvent}
              className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-all"
            >
              Add Event
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative space-y-6">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10" />

        {events.length === 0 ? (
          <p className="text-center text-white/40 py-8">No events recorded yet</p>
        ) : (
          events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex gap-4"
          >
            <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border-2 ${getColor(event.type)} flex items-center justify-center z-10`}>
              {getIcon(event.type)}
            </div>

            <div className="flex-1 pb-6">
              {editingId === event.id ? (
                <div className="p-4 rounded-xl bg-white/5 border border-indigo-500 space-y-3">
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as TimelineEvent['type'] })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="custom">Custom Event</option>
                    <option value="symptom">Symptom</option>
                    <option value="prescription">Prescription</option>
                    <option value="medicine">Medicine</option>
                    <option value="emergency">Emergency</option>
                  </select>

                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />

                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 resize-none"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      className="flex-1 px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex-1 px-3 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 group hover:border-indigo-500/30 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white">{event.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/40">
                        {formatTime(new Date(event.timestamp))}
                      </span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <button
                          onClick={() => startEdit(event)}
                          className="p-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-all"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="p-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mb-2">{event.description}</p>
                  <p className="text-white/40 text-xs">{formatDate(new Date(event.timestamp))}</p>
                </div>
              )}
            </div>
          </motion.div>
        ))
        )}
      </div>

      <p className="text-white/30 text-xs text-center mt-4">
        All events are automatically saved to your device
      </p>
    </div>
  );
}
