export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'mild':
      return { bg: 'bg-green-500/20', border: 'border-green-500', text: 'text-green-400' };
    case 'moderate':
      return { bg: 'bg-yellow-500/20', border: 'border-yellow-500', text: 'text-yellow-400' };
    case 'high':
      return { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-400' };
    default:
      return { bg: 'bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-400' };
  }
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation not supported'));
    }
  });
};

export const parsePrescription = (text: string): string => {
  const conversions: Record<string, string> = {
    'Tab PCM': 'Paracetamol Tablet',
    'Cap': 'Capsule',
    'Syr': 'Syrup',
    'Inj': 'Injection',
    'bd': 'twice daily',
    'od': 'once daily',
    'tid': 'three times daily',
    'qid': 'four times daily',
    'hs': 'at bedtime',
    'ac': 'before meals',
    'pc': 'after meals',
    'prn': 'as needed',
  };

  let parsed = text;
  for (const [key, value] of Object.entries(conversions)) {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    parsed = parsed.replace(regex, value);
  }

  return parsed;
};

export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

export const sendNotification = (title: string, body: string) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/healio-icon.png',
      badge: '/healio-badge.png',
    });
  }
};
