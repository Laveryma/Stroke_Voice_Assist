let cachedVoices = [];

export function speechSupported() {
  return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

export function getVoices() {
  if (!speechSupported()) {
    return Promise.resolve([]);
  }

  const voices = window.speechSynthesis.getVoices();
  if (voices.length) {
    cachedVoices = voices;
    return Promise.resolve(voices);
  }

  return new Promise((resolve) => {
    const timeout = window.setTimeout(() => resolve(cachedVoices), 700);

    window.speechSynthesis.onvoiceschanged = () => {
      window.clearTimeout(timeout);
      cachedVoices = window.speechSynthesis.getVoices();
      resolve(cachedVoices);
    };
  });
}

export function speak(text, settings = {}) {
  const cleanText = String(text || '').trim();

  if (!cleanText) {
    return { ok: false, reason: 'No phrase to speak.' };
  }

  if (!speechSupported()) {
    return { ok: false, reason: 'Speech is not available in this browser.' };
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(cleanText);
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice = voices.find((voice) => voice.voiceURI === settings.voiceURI);

  if (selectedVoice) {
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;
  }

  utterance.rate = settings.speechRate === 'slow' ? 0.78 : 0.96;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
  return { ok: true };
}
