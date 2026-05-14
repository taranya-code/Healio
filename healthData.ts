export const symptoms = [
  { id: 1, name: 'Fever', icon: '🌡️', severity: 'moderate' },
  { id: 2, name: 'Cold', icon: '🤧', severity: 'mild' },
  { id: 3, name: 'Headache', icon: '🤕', severity: 'mild' },
  { id: 4, name: 'Cough', icon: '😷', severity: 'moderate' },
  { id: 5, name: 'Fatigue', icon: '😴', severity: 'mild' },
  { id: 6, name: 'Chest Pain', icon: '💔', severity: 'high' },
  { id: 7, name: 'Body Ache', icon: '🦴', severity: 'moderate' },
  { id: 8, name: 'Nausea', icon: '🤢', severity: 'moderate' },
];

export const symptomPrecautions: Record<string, {
  severity: 'mild' | 'moderate' | 'high';
  precautions: string[];
  seekHelp: string;
}> = {
  Fever: {
    severity: 'moderate',
    precautions: [
      'Rest and stay hydrated',
      'Take paracetamol as directed',
      'Monitor temperature regularly',
      'Avoid cold water baths',
    ],
    seekHelp: 'If fever persists for more than 3 days or exceeds 103°F',
  },
  Cold: {
    severity: 'mild',
    precautions: [
      'Get plenty of rest',
      'Drink warm fluids',
      'Use steam inhalation',
      'Avoid cold foods and drinks',
    ],
    seekHelp: 'If symptoms worsen after 5-7 days',
  },
  Headache: {
    severity: 'mild',
    precautions: [
      'Rest in a quiet, dark room',
      'Apply cold compress',
      'Stay hydrated',
      'Avoid screen time',
    ],
    seekHelp: 'If severe or accompanied by vision changes',
  },
  Cough: {
    severity: 'moderate',
    precautions: [
      'Drink warm water with honey',
      'Use steam inhalation',
      'Avoid cold and dusty environments',
      'Cover your mouth while coughing',
    ],
    seekHelp: 'If cough persists for more than 2 weeks or blood is present',
  },
  Fatigue: {
    severity: 'mild',
    precautions: [
      'Get adequate sleep (7-8 hours)',
      'Eat nutritious meals',
      'Stay hydrated',
      'Take short breaks during work',
    ],
    seekHelp: 'If fatigue is severe and persistent',
  },
  'Chest Pain': {
    severity: 'high',
    precautions: [
      'Sit down and rest immediately',
      'Loosen tight clothing',
      'Take slow, deep breaths',
      'DO NOT ignore this symptom',
    ],
    seekHelp: 'SEEK IMMEDIATE MEDICAL ATTENTION - Call emergency services',
  },
  'Body Ache': {
    severity: 'moderate',
    precautions: [
      'Rest and avoid strenuous activities',
      'Apply warm compress',
      'Take pain relievers as directed',
      'Gentle stretching exercises',
    ],
    seekHelp: 'If pain is severe or persists beyond a week',
  },
  Nausea: {
    severity: 'moderate',
    precautions: [
      'Eat small, frequent meals',
      'Avoid spicy and oily foods',
      'Drink ginger tea',
      'Rest after meals',
    ],
    seekHelp: 'If accompanied by severe vomiting or dehydration',
  },
};

export const healthTips = [
  'Drink at least 8 glasses of water daily to stay hydrated',
  'Get 7-8 hours of quality sleep each night',
  'Take a 10-minute walk after meals to aid digestion',
  'Practice deep breathing exercises to reduce stress',
  'Wash your hands frequently to prevent infections',
  'Eat a balanced diet with fruits and vegetables',
  'Limit screen time before bed for better sleep',
  'Take regular breaks during work to rest your eyes',
];

export const nearbyHospitals = [
  {
    id: 1,
    name: 'City General Hospital',
    type: 'Hospital',
    distance: '1.2 km',
    phone: '+91-9876543210',
    emergency: true,
  },
  {
    id: 2,
    name: 'Apollo Clinic',
    type: 'Clinic',
    distance: '0.8 km',
    phone: '+91-9876543211',
    emergency: false,
  },
  {
    id: 3,
    name: 'Emergency Ambulance Service',
    type: 'Ambulance',
    distance: '0.5 km',
    phone: '108',
    emergency: true,
  },
  {
    id: 4,
    name: 'MedPlus Pharmacy',
    type: 'Pharmacy',
    distance: '0.3 km',
    phone: '+91-9876543212',
    emergency: false,
  },
  {
    id: 5,
    name: 'Life Care Hospital',
    type: 'Hospital',
    distance: '2.1 km',
    phone: '+91-9876543213',
    emergency: true,
  },
];

export const translations = {
  en: {
    appName: 'Healio',
    tagline: 'Your Personal Healthcare Companion',
    symptoms: 'Symptoms',
    emergency: 'Emergency SOS',
    medicines: 'Medicine Reminders',
    scanner: 'Prescription Scanner',
    timeline: 'Health Timeline',
    hospitals: 'Nearby Hospitals',
    tips: 'Health Tips',
    voiceAssistant: 'Voice Assistant',
    selectLanguage: 'Select Language',
  },
  ta: {
    appName: 'ஹீலியோ',
    tagline: 'உங்கள் தனிப்பட்ட சுகாதார துணை',
    symptoms: 'அறிகுறிகள்',
    emergency: 'அவசர SOS',
    medicines: 'மருந்து நினைவூட்டல்கள்',
    scanner: 'மருந்துச் சீட்டு ஸ்கேனர்',
    timeline: 'சுகாதார காலவரிசை',
    hospitals: 'அருகிலுள்ள மருத்துவமனைகள்',
    tips: 'சுகாதார குறிப்புகள்',
    voiceAssistant: 'குரல் உதவியாளர்',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
  },
  hi: {
    appName: 'हीलियो',
    tagline: 'आपका व्यक्तिगत स्वास्थ्य साथी',
    symptoms: 'लक्षण',
    emergency: 'आपातकालीन SOS',
    medicines: 'दवा अनुस्मारक',
    scanner: 'प्रिस्क्रिप्शन स्कैनर',
    timeline: 'स्वास्थ्य समयरेखा',
    hospitals: 'नजदीकी अस्पताल',
    tips: 'स्वास्थ्य सुझाव',
    voiceAssistant: 'वॉयस असिस्टेंट',
    selectLanguage: 'भाषा चुनें',
  },
  kn: {
    appName: 'ಹೀಲಿಯೊ',
    tagline: 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಆರೋಗ್ಯ ಸಹಚರ',
    symptoms: 'ಲಕ್ಷಣಗಳು',
    emergency: 'ತುರ್ತು SOS',
    medicines: 'ಔಷಧಿ ಜ್ಞಾಪನೆಗಳು',
    scanner: 'ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಸ್ಕ್ಯಾನರ್',
    timeline: 'ಆರೋಗ್ಯ ಟೈಮ್‌ಲೈನ್',
    hospitals: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳು',
    tips: 'ಆರೋಗ್ಯ ಸಲಹೆಗಳು',
    voiceAssistant: 'ಧ್ವನಿ ಸಹಾಯಕ',
    selectLanguage: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
  },
};
