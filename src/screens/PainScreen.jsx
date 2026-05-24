import { useMemo, useState } from 'react';
import CurrentMessage from '../components/CurrentMessage.jsx';
import TileButton from '../components/TileButton.jsx';
import { painChange, painLocations, painSeverity } from '../data/defaultTiles.js';

export default function PainScreen({ speakPhrase, haptics }) {
  const [locations, setLocations] = useState([]);
  const [severity, setSeverity] = useState('');
  const [change, setChange] = useState('');

  const message = useMemo(() => {
    const parts = ['Pain', ...locations, severity, change].filter(Boolean);
    return parts.length > 1 ? `${parts.join('. ')}.` : 'Pain.';
  }, [locations, severity, change]);

  function toggleLocation(tile) {
    setLocations((current) => {
      const exists = current.includes(tile.label);
      return exists ? current.filter((item) => item !== tile.label) : [...current, tile.label];
    });
    speakPhrase(tile.phrase);
  }

  function chooseSeverity(tile) {
    setSeverity(tile.label);
    speakPhrase(tile.phrase);
  }

  function chooseChange(tile) {
    setChange(tile.label);
    speakPhrase(tile.phrase);
  }

  function clearPain() {
    setLocations([]);
    setSeverity('');
    setChange('');
  }

  return (
    <section className="screen" aria-labelledby="pain-title">
      <header className="screen-heading">
        <div>
          <p className="screen-kicker">Pain</p>
          <h1 id="pain-title">Build message</h1>
        </div>
      </header>

      <CurrentMessage message={message} onSpeak={() => speakPhrase(message)} onClear={clearPain} />

      <section className="flow-section" aria-labelledby="pain-where">
        <h2 id="pain-where">Where is the pain?</h2>
        <div className="tile-grid compact-grid">
          {painLocations.map((tile) => (
            <TileButton
              key={tile.id}
              label={tile.label}
              icon={tile.icon}
              selected={locations.includes(tile.label)}
              haptics={haptics}
              onClick={() => toggleLocation(tile)}
            />
          ))}
        </div>
      </section>

      <section className="flow-section" aria-labelledby="pain-bad">
        <h2 id="pain-bad">How bad is it?</h2>
        <div className="tile-grid two-grid">
          {painSeverity.map((tile) => (
            <TileButton
              key={tile.id}
              label={tile.label}
              icon={tile.icon}
              tone={tile.tone}
              selected={severity === tile.label}
              haptics={haptics}
              onClick={() => chooseSeverity(tile)}
            />
          ))}
        </div>
      </section>

      <section className="flow-section" aria-labelledby="pain-new">
        <h2 id="pain-new">Is it new?</h2>
        <div className="tile-grid two-grid">
          {painChange.map((tile) => (
            <TileButton
              key={tile.id}
              label={tile.label}
              icon={tile.icon}
              tone={tile.tone || 'neutral'}
              selected={change === tile.label}
              haptics={haptics}
              onClick={() => chooseChange(tile)}
            />
          ))}
        </div>
      </section>

      <button className="wide-action danger" type="button" onClick={() => speakPhrase(message)}>
        Speak full message
      </button>
    </section>
  );
}
