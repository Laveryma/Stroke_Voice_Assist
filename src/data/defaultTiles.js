export const urgentTiles = [
  { id: 'pain', label: 'Pain', phrase: 'I am in pain', icon: 'pain', tone: 'urgent' },
  { id: 'toilet', label: 'Toilet', phrase: 'I need the toilet', icon: 'toilet', tone: 'care' },
  { id: 'drink', label: 'Drink', phrase: 'I need a drink', icon: 'drink', tone: 'care' },
  { id: 'hot', label: 'Too hot', phrase: 'I am too hot', icon: 'hot', tone: 'warm' },
  { id: 'cold', label: 'Too cold', phrase: 'I am too cold', icon: 'cold', tone: 'cool' },
  { id: 'nurse', label: 'Nurse / doctor', phrase: 'I need a nurse or doctor', icon: 'medical', tone: 'care' },
  { id: 'family', label: 'Family', phrase: 'I want my family', icon: 'people', tone: 'neutral' },
  { id: 'worried', label: 'I am worried', phrase: 'I am worried', icon: 'worry', tone: 'warning' },
  {
    id: 'not-understand',
    label: 'I do not understand',
    phrase: 'I do not understand',
    icon: 'question',
    tone: 'neutral'
  },
  { id: 'tired', label: 'I am tired', phrase: 'I am tired', icon: 'rest', tone: 'neutral' }
];

export const yesNoTiles = [
  { id: 'yes', label: 'Yes', phrase: 'Yes', icon: 'yes', tone: 'positive' },
  { id: 'no', label: 'No', phrase: 'No', icon: 'no', tone: 'negative' },
  { id: 'not-sure', label: 'Not sure', phrase: 'I am not sure', icon: 'unsure', tone: 'warning' },
  {
    id: 'ask-another-way',
    label: 'Ask another way',
    phrase: 'Please ask me another way',
    icon: 'repeat',
    tone: 'neutral'
  },
  {
    id: 'know-cannot-say',
    label: 'I know what I mean but cannot say it',
    phrase: 'I know what I mean but cannot say it',
    icon: 'message',
    tone: 'neutral'
  }
];

export const painLocations = [
  { id: 'head', label: 'Head', phrase: 'Head pain', icon: 'head' },
  { id: 'face', label: 'Face', phrase: 'Face pain', icon: 'face' },
  { id: 'mouth', label: 'Mouth', phrase: 'Mouth pain', icon: 'mouth' },
  { id: 'chest', label: 'Chest', phrase: 'Chest pain', icon: 'chest' },
  { id: 'stomach', label: 'Stomach', phrase: 'Stomach pain', icon: 'stomach' },
  { id: 'arm', label: 'Arm', phrase: 'Arm pain', icon: 'arm' },
  { id: 'hand', label: 'Hand', phrase: 'Hand pain', icon: 'hand' },
  { id: 'leg', label: 'Leg', phrase: 'Leg pain', icon: 'leg' },
  { id: 'foot', label: 'Foot', phrase: 'Foot pain', icon: 'foot' },
  { id: 'back', label: 'Back', phrase: 'Back pain', icon: 'back' },
  { id: 'left-side', label: 'Left side', phrase: 'Left side', icon: 'left' },
  { id: 'right-side', label: 'Right side', phrase: 'Right side', icon: 'right' }
];

export const painSeverity = [
  { id: 'mild', label: 'Mild', phrase: 'Mild pain', icon: 'level1', tone: 'positive' },
  { id: 'medium', label: 'Medium', phrase: 'Medium pain', icon: 'level2', tone: 'warning' },
  { id: 'severe', label: 'Severe', phrase: 'Severe pain', icon: 'level3', tone: 'urgent' },
  { id: 'worst', label: 'Worst pain', phrase: 'Worst pain', icon: 'level4', tone: 'urgent' }
];

export const painChange = [
  { id: 'new', label: 'New pain', phrase: 'New pain', icon: 'new' },
  { id: 'same', label: 'Same pain', phrase: 'Same pain', icon: 'same' },
  { id: 'worse', label: 'Getting worse', phrase: 'Getting worse', icon: 'worse', tone: 'urgent' },
  { id: 'better', label: 'Getting better', phrase: 'Getting better', icon: 'better', tone: 'positive' }
];

export const defaultPeople = [
  { id: 'person-loved-one', name: 'Loved one', relationship: 'Family', phrase: 'I want my loved one', icon: 'heart' },
  { id: 'person-partner', name: 'Partner', relationship: 'Family', phrase: 'I want my partner', icon: 'heart' },
  { id: 'person-child', name: 'Son / daughter', relationship: 'Family', phrase: 'I want my son or daughter', icon: 'person' },
  { id: 'person-relative', name: 'Relative', relationship: 'Family', phrase: 'I want my relative', icon: 'person' },
  { id: 'person-close-friend', name: 'Close friend', relationship: 'Friend', phrase: 'I want my close friend', icon: 'person' },
  { id: 'person-nurse', name: 'Nurse', relationship: 'Care team', phrase: 'I want the nurse', icon: 'medical' },
  { id: 'person-doctor', name: 'Doctor', relationship: 'Care team', phrase: 'I want the doctor', icon: 'medical' },
  { id: 'person-care-assistant', name: 'Care assistant', relationship: 'Care team', phrase: 'I want the care assistant', icon: 'medical' },
  { id: 'person-family', name: 'Family', relationship: 'Family', phrase: 'I want my family', icon: 'people' },
  { id: 'person-friend', name: 'Friend', relationship: 'Friend', phrase: 'I want my friend', icon: 'person' }
];

export const hospitalQuestionTiles = [
  { id: 'what-happened', label: 'What happened?', phrase: 'What happened?', icon: 'question' },
  { id: 'safe', label: 'Am I safe?', phrase: 'Am I safe?', icon: 'shield' },
  { id: 'bleed-clot', label: 'Was it a bleed or a clot?', phrase: 'Was it a bleed or a clot?', icon: 'brain' },
  { id: 'eat', label: 'Can I eat?', phrase: 'Can I eat?', icon: 'food' },
  { id: 'drink', label: 'Can I drink?', phrase: 'Can I drink?', icon: 'drink' },
  { id: 'home', label: 'When can I go home?', phrase: 'When can I go home?', icon: 'home' },
  {
    id: 'explain-again',
    label: 'I want the doctor to explain again',
    phrase: 'I want the doctor to explain again',
    icon: 'repeat'
  },
  { id: 'family-hear', label: 'I want family to hear this', phrase: 'I want my family to hear this', icon: 'people' },
  { id: 'privacy', label: 'I want privacy', phrase: 'I want privacy', icon: 'shield' },
  { id: 'write-down', label: 'Please write it down', phrase: 'Please write it down', icon: 'write' },
  { id: 'speak-slowly', label: 'Please speak slowly', phrase: 'Please speak slowly', icon: 'slow' },
  { id: 'give-choices', label: 'Please give me choices', phrase: 'Please give me choices', icon: 'choices' }
];

export const feelingsTiles = [
  { id: 'scared', label: 'I am scared', phrase: 'I am scared', icon: 'worry', tone: 'warning' },
  { id: 'frustrated', label: 'I am frustrated', phrase: 'I am frustrated', icon: 'frustrated', tone: 'warning' },
  { id: 'sad', label: 'I am sad', phrase: 'I am sad', icon: 'sad', tone: 'cool' },
  { id: 'angry', label: 'I am angry', phrase: 'I am angry', icon: 'angry', tone: 'urgent' },
  { id: 'confused', label: 'I am confused', phrase: 'I am confused', icon: 'question', tone: 'neutral' },
  { id: 'embarrassed', label: 'I am embarrassed', phrase: 'I am embarrassed', icon: 'face', tone: 'neutral' },
  { id: 'okay', label: 'I am okay', phrase: 'I am okay', icon: 'yes', tone: 'positive' },
  { id: 'break', label: 'I need a break', phrase: 'I need a break', icon: 'rest', tone: 'neutral' }
];

export const repairTiles = [
  { id: 'start-again', label: 'Start again', phrase: 'Please start again', icon: 'restart' },
  { id: 'another-way', label: 'Ask me another way', phrase: 'Please ask me another way', icon: 'repeat' },
  { id: 'two-choices', label: 'Give me two choices', phrase: 'Please give me two choices', icon: 'choices' },
  { id: 'pictures', label: 'Show me pictures', phrase: 'Please show me pictures', icon: 'picture' },
  { id: 'write', label: 'Write it down', phrase: 'Please write it down', icon: 'write' },
  { id: 'again', label: 'Say that again', phrase: 'Please say that again', icon: 'slow' },
  { id: 'time', label: 'I need more time', phrase: 'I need more time', icon: 'time' },
  { id: 'tired', label: 'I am tired', phrase: 'I am tired', icon: 'rest' },
  { id: 'later', label: 'Come back later', phrase: 'Please come back later', icon: 'later' },
  { id: 'not-mean', label: 'That is not what I mean', phrase: 'That is not what I mean', icon: 'no', tone: 'warning' }
];

export const moreSections = [
  { id: 'hospital', label: 'Hospital Questions', phrase: 'Hospital questions', icon: 'hospital' },
  { id: 'feelings', label: 'Feelings / Mood', phrase: 'Feelings and mood', icon: 'heart' },
  { id: 'repair', label: 'Conversation Repair', phrase: 'Conversation repair', icon: 'repair' },
  { id: 'custom', label: 'Custom Phrases', phrase: 'Custom phrases', icon: 'message' },
  { id: 'settings', label: 'Settings', phrase: 'Settings', icon: 'settings' }
];

export const defaultCustomPhrases = [
  {
    id: 'custom-comfortable',
    label: 'I am comfortable',
    phrase: 'I am comfortable',
    category: 'Care',
    emoji: 'OK'
  },
  {
    id: 'custom-love',
    label: 'I love you',
    phrase: 'I love you',
    category: 'Family',
    emoji: 'Love'
  }
];
