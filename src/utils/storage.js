import { defaultCustomPhrases, defaultPeople } from '../data/defaultTiles.js';

export const STORAGE_KEYS = {
  settings: 'clearVoice.settings.v1',
  people: 'clearVoice.people.v1',
  customPhrases: 'clearVoice.customPhrases.v1',
  moodLog: 'clearVoice.moodLog.v1'
};

const DB_NAME = 'clearVoiceLocalAssets';
const DB_VERSION = 1;
const IMAGE_STORE = 'images';

export const defaultSettings = {
  patientName: 'Patient',
  birthdayFact: '',
  voiceURI: '',
  speechRate: 'slow',
  handedMode: 'right',
  textSize: 'large',
  highContrast: false,
  haptics: true,
  calibrationQuestions: [
    'Is your name [Name]?',
    'Are you in hospital?',
    'Is this someone you know?',
    'Is your birthday [date]?'
  ]
};

export function readJSON(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function loadSettings() {
  const stored = readJSON(STORAGE_KEYS.settings, {});
  return {
    ...defaultSettings,
    ...stored,
    calibrationQuestions:
      Array.isArray(stored.calibrationQuestions) && stored.calibrationQuestions.length
        ? stored.calibrationQuestions
        : defaultSettings.calibrationQuestions
  };
}

export function saveSettings(settings) {
  return writeJSON(STORAGE_KEYS.settings, settings);
}

export function loadPeople() {
  const people = readJSON(STORAGE_KEYS.people, null);
  return Array.isArray(people) ? people : defaultPeople;
}

export function savePeople(people) {
  return writeJSON(STORAGE_KEYS.people, people);
}

export function loadCustomPhrases() {
  const phrases = readJSON(STORAGE_KEYS.customPhrases, null);
  return Array.isArray(phrases) ? phrases : defaultCustomPhrases;
}

export function saveCustomPhrases(phrases) {
  return writeJSON(STORAGE_KEYS.customPhrases, phrases);
}

export function loadMoodLog() {
  const log = readJSON(STORAGE_KEYS.moodLog, []);
  return Array.isArray(log) ? log : [];
}

export function saveMoodLog(log) {
  return writeJSON(STORAGE_KEYS.moodLog, log);
}

export function resolveCalibrationQuestion(question, settings) {
  return question
    .replaceAll('[Name]', settings.patientName || 'the patient')
    .replaceAll('[date]', settings.birthdayFact || 'the known date');
}

function openImageDb() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB is not available'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IMAGE_STORE)) {
        db.createObjectStore(IMAGE_STORE);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function runImageTransaction(mode, callback) {
  return openImageDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const transaction = db.transaction(IMAGE_STORE, mode);
        const store = transaction.objectStore(IMAGE_STORE);
        const request = callback(store);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
        transaction.oncomplete = () => db.close();
        transaction.onerror = () => {
          db.close();
          reject(transaction.error);
        };
      })
  );
}

export function saveImageBlob(id, blob) {
  return runImageTransaction('readwrite', (store) =>
    store.put(
      {
        blob,
        type: blob.type,
        updatedAt: new Date().toISOString()
      },
      id
    )
  );
}

export function getImageBlob(id) {
  return runImageTransaction('readonly', (store) => store.get(id)).then((record) => record?.blob || null);
}

export function deleteImageBlob(id) {
  return runImageTransaction('readwrite', (store) => store.delete(id));
}

export function clearImageDb() {
  return new Promise((resolve) => {
    if (!('indexedDB' in window)) {
      resolve();
      return;
    }

    const request = window.indexedDB.deleteDatabase(DB_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => resolve();
    request.onblocked = () => resolve();
  });
}

export async function resetAllLocalData() {
  Object.values(STORAGE_KEYS).forEach((key) => window.localStorage.removeItem(key));
  await clearImageDb();
}
