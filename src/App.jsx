import { useCallback, useEffect, useMemo, useState } from 'react';
import BottomNav from './components/BottomNav.jsx';
import IconGlyph from './components/IconGlyph.jsx';
import CustomPhrasesScreen from './screens/CustomPhrasesScreen.jsx';
import FeelingsScreen from './screens/FeelingsScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import HospitalQuestionsScreen from './screens/HospitalQuestionsScreen.jsx';
import MoreScreen from './screens/MoreScreen.jsx';
import PainScreen from './screens/PainScreen.jsx';
import PeopleScreen from './screens/PeopleScreen.jsx';
import RepairScreen from './screens/RepairScreen.jsx';
import SettingsScreen from './screens/SettingsScreen.jsx';
import YesNoScreen from './screens/YesNoScreen.jsx';
import { defaultSettings, loadSettings, resetAllLocalData, saveSettings } from './utils/storage.js';
import { speak, speechSupported } from './utils/speech.js';

const moreScreens = new Set(['hospital', 'feelings', 'repair', 'custom', 'settings']);

export default function App() {
  const [screen, setScreen] = useState('home');
  const [settings, setSettings] = useState(() => loadSettings());
  const [lastSpoken, setLastSpoken] = useState('');
  const [speechNotice, setSpeechNotice] = useState(() =>
    speechSupported() ? '' : 'Speech is not available in this browser. Selected phrases will still appear on screen.'
  );

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    if (!speechNotice) {
      return undefined;
    }
    const timeout = window.setTimeout(() => setSpeechNotice(''), 6000);
    return () => window.clearTimeout(timeout);
  }, [speechNotice]);

  const appClassName = useMemo(
    () =>
      [
        'app-shell',
        `text-${settings.textSize}`,
        settings.highContrast ? 'high-contrast' : '',
        settings.handedMode === 'left' ? 'hand-left' : 'hand-right'
      ]
        .filter(Boolean)
        .join(' '),
    [settings]
  );

  const activeNav = moreScreens.has(screen) ? 'more' : screen;

  const updateSettings = useCallback((patch) => {
    setSettings((current) => ({ ...current, ...patch }));
  }, []);

  const speakPhrase = useCallback(
    (phrase) => {
      const text = String(phrase || '').trim();
      if (!text) {
        return;
      }

      setLastSpoken(text);
      const result = speak(text, settings);
      if (!result.ok) {
        setSpeechNotice(result.reason);
      }
    },
    [settings]
  );

  async function handleReset() {
    const confirmed = window.confirm('Reset all custom people, photos, phrases, settings, and mood log entries?');
    if (!confirmed) {
      return;
    }

    await resetAllLocalData();
    setSettings(defaultSettings);
    setLastSpoken('');
    setScreen('home');
  }

  function renderScreen() {
    const common = {
      speakPhrase,
      haptics: settings.haptics
    };

    switch (screen) {
      case 'yesno':
        return <YesNoScreen {...common} settings={settings} />;
      case 'pain':
        return <PainScreen {...common} />;
      case 'people':
        return <PeopleScreen {...common} />;
      case 'more':
        return <MoreScreen {...common} onNavigate={setScreen} />;
      case 'hospital':
        return <HospitalQuestionsScreen {...common} onBack={() => setScreen('more')} />;
      case 'feelings':
        return <FeelingsScreen {...common} onBack={() => setScreen('more')} />;
      case 'repair':
        return <RepairScreen {...common} onBack={() => setScreen('more')} />;
      case 'custom':
        return <CustomPhrasesScreen {...common} onBack={() => setScreen('more')} />;
      case 'settings':
        return (
          <SettingsScreen
            settings={settings}
            updateSettings={updateSettings}
            onReset={handleReset}
            onBack={() => setScreen('more')}
            speakPhrase={speakPhrase}
          />
        );
      case 'home':
      default:
        return <HomeScreen {...common} onNavigate={setScreen} patientName={settings.patientName} />;
    }
  }

  return (
    <div className={appClassName}>
      <header className="app-topbar">
        <div className="brand-mark" aria-hidden="true">
          <IconGlyph name="message" />
        </div>
        <div className="brand-copy">
          <span>Clear Voice</span>
          <strong>{settings.patientName || 'Stroke Assist'}</strong>
        </div>
      </header>

      {speechNotice ? <div className="notice-banner">{speechNotice}</div> : null}

      {lastSpoken ? (
        <div className="spoken-strip" aria-live="polite">
          <span>Last spoken</span>
          <strong>{lastSpoken}</strong>
        </div>
      ) : null}

      <main>{renderScreen()}</main>

      <BottomNav activeScreen={activeNav} onNavigate={setScreen} haptics={settings.haptics} />
    </div>
  );
}
