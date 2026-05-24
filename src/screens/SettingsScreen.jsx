import { useEffect, useMemo, useState } from 'react';
import { refreshInstalledApp } from '../utils/appUpdate.js';
import { defaultSettings, resolveCalibrationQuestion } from '../utils/storage.js';
import { getVoices } from '../utils/speech.js';

export default function SettingsScreen({ settings, updateSettings, onReset, onBack, speakPhrase }) {
  const [voices, setVoices] = useState([]);
  const [testPhrase, setTestPhrase] = useState('This is Clear Voice.');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshStatus, setRefreshStatus] = useState(
    'Use this if the Home Screen app is showing an older published version.'
  );

  useEffect(() => {
    getVoices().then(setVoices);
  }, []);

  const resolvedQuestions = useMemo(
    () => settings.calibrationQuestions.map((question) => resolveCalibrationQuestion(question, settings)),
    [settings]
  );

  function updateQuestion(index, value) {
    const nextQuestions = settings.calibrationQuestions.map((question, questionIndex) =>
      questionIndex === index ? value : question
    );
    updateSettings({ calibrationQuestions: nextQuestions });
  }

  function addQuestion() {
    updateSettings({ calibrationQuestions: [...settings.calibrationQuestions, ''] });
  }

  function removeQuestion(index) {
    const nextQuestions = settings.calibrationQuestions.filter((_, questionIndex) => questionIndex !== index);
    updateSettings({
      calibrationQuestions: nextQuestions.length ? nextQuestions : defaultSettings.calibrationQuestions
    });
  }

  async function handleRefreshInstalledApp() {
    setIsRefreshing(true);
    setRefreshStatus('Clearing the saved app version and fetching the latest files...');

    const result = await refreshInstalledApp();
    setRefreshStatus(result.message);

    if (!result.ok) {
      setIsRefreshing(false);
    }
  }

  return (
    <section className="screen" aria-labelledby="settings-title">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <header className="screen-heading">
        <div>
          <p className="screen-kicker">Clear Voice</p>
          <h1 id="settings-title">Settings</h1>
        </div>
      </header>

      <section className="settings-panel" aria-labelledby="personal-title">
        <h2 id="personal-title">Personalisation</h2>
        <label>
          Patient name
          <input
            value={settings.patientName}
            onChange={(event) => updateSettings({ patientName: event.target.value })}
            placeholder="Patient"
          />
        </label>
        <label>
          Birthday or known fact
          <input
            value={settings.birthdayFact}
            onChange={(event) => updateSettings({ birthdayFact: event.target.value })}
            placeholder="14 March"
          />
        </label>
        <label>
          Preferred voice
          <select value={settings.voiceURI} onChange={(event) => updateSettings({ voiceURI: event.target.value })}>
            <option value="">Device default</option>
            {voices.map((voice) => (
              <option key={voice.voiceURI} value={voice.voiceURI}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </label>
        <label>
          Speech rate
          <select value={settings.speechRate} onChange={(event) => updateSettings({ speechRate: event.target.value })}>
            <option value="slow">Slow</option>
            <option value="normal">Normal</option>
          </select>
        </label>
        <label>
          Test phrase
          <input value={testPhrase} onChange={(event) => setTestPhrase(event.target.value)} />
        </label>
        <button className="wide-action primary" type="button" onClick={() => speakPhrase(testPhrase)}>
          Test voice
        </button>
      </section>

      <section className="settings-panel" aria-labelledby="display-title">
        <h2 id="display-title">Display and touch</h2>
        <label>
          Handed mode
          <select value={settings.handedMode} onChange={(event) => updateSettings({ handedMode: event.target.value })}>
            <option value="right">Right-handed</option>
            <option value="left">Left-handed</option>
          </select>
        </label>
        <label>
          Text size
          <select value={settings.textSize} onChange={(event) => updateSettings({ textSize: event.target.value })}>
            <option value="normal">Normal</option>
            <option value="large">Large</option>
            <option value="extra">Extra large</option>
          </select>
        </label>
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={settings.highContrast}
            onChange={(event) => updateSettings({ highContrast: event.target.checked })}
          />
          High contrast
        </label>
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={settings.haptics}
            onChange={(event) => updateSettings({ haptics: event.target.checked })}
          />
          Haptic tap feedback
        </label>
      </section>

      <section className="settings-panel" aria-labelledby="cal-title">
        <div className="log-heading">
          <h2 id="cal-title">Yes/no check questions</h2>
          <button className="small-action" type="button" onClick={addQuestion}>
            Add
          </button>
        </div>
        {settings.calibrationQuestions.map((question, index) => (
          <div className="question-editor" key={`${index}-${question}`}>
            <label>
              Question {index + 1}
              <input value={question} onChange={(event) => updateQuestion(index, event.target.value)} />
            </label>
            <p className="preview-text">{resolvedQuestions[index]}</p>
            <button className="small-action" type="button" onClick={() => removeQuestion(index)}>
              Remove
            </button>
          </div>
        ))}
      </section>

      <section className="settings-panel" aria-labelledby="about-title">
        <h2 id="about-title">About</h2>
        <p>
          Clear Voice is a communication support tool. It does not diagnose, treat, or replace medical care. In an
          emergency, contact clinical staff immediately.
        </p>
        <p className="copyright-mark">&copy; 2026 Mark Lavery</p>
      </section>

      <section className="settings-panel" aria-labelledby="install-title">
        <h2 id="install-title">Add to iPhone Home Screen</h2>
        <ol className="install-list">
          <li>Open this site in Safari.</li>
          <li>Tap the Share button.</li>
          <li>Choose Add to Home Screen.</li>
          <li>Tap Add.</li>
        </ol>
      </section>

      <section className="settings-panel" aria-labelledby="update-title">
        <h2 id="update-title">App updates</h2>
        <p>Refreshes installed app files without removing saved people, photos, phrases, or settings.</p>
        <button
          className="wide-action primary"
          type="button"
          onClick={handleRefreshInstalledApp}
          disabled={isRefreshing}
        >
          {isRefreshing ? 'Refreshing app...' : 'Refresh installed app'}
        </button>
        <p className="inline-status" aria-live="polite">
          {refreshStatus}
        </p>
      </section>

      <section className="settings-panel danger-panel" aria-labelledby="reset-title">
        <h2 id="reset-title">Reset local data</h2>
        <p>Custom people, photos, phrases, settings, and mood log entries are stored only on this device.</p>
        <button className="wide-action danger" type="button" onClick={onReset}>
          Reset all local data
        </button>
      </section>
    </section>
  );
}
