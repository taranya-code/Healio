export interface TimelineEvent {
  id: number;
  type: 'symptom' | 'prescription' | 'medicine' | 'emergency' | 'custom';
  title: string;
  description: string;
  timestamp: string;
}

const TIMELINE_KEY = 'healio_timeline';
const MEDICINES_KEY = 'healio_medicines';

export const storage = {
  getTimeline: (): TimelineEvent[] => {
    try {
      const data = localStorage.getItem(TIMELINE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading timeline:', error);
      return [];
    }
  },

  saveTimeline: (events: TimelineEvent[]) => {
    try {
      localStorage.setItem(TIMELINE_KEY, JSON.stringify(events));
    } catch (error) {
      console.error('Error saving timeline:', error);
    }
  },

  addTimelineEvent: (event: Omit<TimelineEvent, 'id'>) => {
    const events = storage.getTimeline();
    const newEvent: TimelineEvent = {
      ...event,
      id: Date.now(),
    };
    events.unshift(newEvent);
    storage.saveTimeline(events);
    return newEvent;
  },

  updateTimelineEvent: (id: number, updates: Partial<TimelineEvent>) => {
    const events = storage.getTimeline();
    const updatedEvents = events.map(event =>
      event.id === id ? { ...event, ...updates } : event
    );
    storage.saveTimeline(updatedEvents);
  },

  deleteTimelineEvent: (id: number) => {
    const events = storage.getTimeline();
    const filteredEvents = events.filter(event => event.id !== id);
    storage.saveTimeline(filteredEvents);
  },

  getMedicines: (): any[] => {
    try {
      const data = localStorage.getItem(MEDICINES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading medicines:', error);
      return [];
    }
  },

  saveMedicines: (medicines: any[]) => {
    try {
      localStorage.setItem(MEDICINES_KEY, JSON.stringify(medicines));
    } catch (error) {
      console.error('Error saving medicines:', error);
    }
  },
};
