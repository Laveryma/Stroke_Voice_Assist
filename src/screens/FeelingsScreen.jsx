import { useEffect, useState } from 'react';
import TileButton from '../components/TileButton.jsx';
import { feelingsTiles } from '../data/defaultTiles.js';
import { loadMoodLog, saveMoodLog } from '../utils/storage.js';

function formatTime(value) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export default function FeelingsScreen({ speakPhrase, onBack, haptics }) {
  const [note, setNote] = useState('');
  const [moodLog, setMoodLog] = useState(() => loadMoodLog());
  const [lastSaved, setLastSaved] = useState('');

  useEffect(() => {
    saveMoodLog(moodLog);
  }, [moodLog]);

  function chooseMood(tile) {
    speakPhrase(tile.phrase);
    const entry = {
      id: `mood-${Date.now()}`,
      mood: tile.label,
      note: note.trim(),
      timestamp: new Date().toISOString()
    };
    setMoodLog((current) => [entry, ...current].slice(0, 30));
    setLastSaved(tile.label);
    setNote('');
  }

  return (
    <section className="screen" aria-labelledby="feelings-title">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <header className="screen-heading">
        <div>
          <p className="screen-kicker">Feelings</p>
          <h1 id="feelings-title">Mood</h1>
        </div>
      </header>

      <label className="note-field">
        Optional note
        <input value={note} onChange={(event) => setNote(event.target.value)} placeholder="Short note" />
      </label>

      <div className="tile-grid">
        {feelingsTiles.map((tile) => (
          <TileButton
            key={tile.id}
            label={tile.label}
            icon={tile.icon}
            tone={tile.tone}
            haptics={haptics}
            onClick={() => chooseMood(tile)}
          />
        ))}
      </div>

      {lastSaved ? <p className="inline-status">Saved: {lastSaved}</p> : null}

      <section className="log-panel" aria-labelledby="mood-log-title">
        <div className="log-heading">
          <h2 id="mood-log-title">Mood log</h2>
          <button className="small-action" type="button" onClick={() => setMoodLog([])} disabled={!moodLog.length}>
            Clear log
          </button>
        </div>
        {moodLog.length ? (
          <ul className="log-list">
            {moodLog.slice(0, 6).map((entry) => (
              <li key={entry.id}>
                <strong>{entry.mood}</strong>
                <span>{formatTime(entry.timestamp)}</span>
                {entry.note ? <p>{entry.note}</p> : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-state">No mood entries yet.</p>
        )}
      </section>
    </section>
  );
}
