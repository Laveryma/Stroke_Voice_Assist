import { useState } from 'react';
import CurrentMessage from '../components/CurrentMessage.jsx';
import TileButton from '../components/TileButton.jsx';
import { urgentTiles } from '../data/defaultTiles.js';

export default function HomeScreen({ speakPhrase, onNavigate, haptics, patientName }) {
  const [selectedTile, setSelectedTile] = useState(null);

  function chooseTile(tile) {
    speakPhrase(tile.phrase);
    setSelectedTile(tile);
  }

  return (
    <section className="screen" aria-labelledby="home-title">
      <header className="screen-heading">
        <div>
          <p className="screen-kicker">{patientName ? patientName : 'Clear Voice'}</p>
          <h1 id="home-title">Urgent needs</h1>
        </div>
      </header>

      <div className="tile-grid urgent-grid">
        {urgentTiles.map((tile) => (
          <TileButton
            key={tile.id}
            label={tile.label}
            icon={tile.icon}
            tone={tile.tone}
            onClick={() => chooseTile(tile)}
            haptics={haptics}
          />
        ))}
      </div>

      {selectedTile ? (
        <div className="confirmation-panel" role="status">
          <CurrentMessage
            label="Selected"
            message={selectedTile.phrase}
            onSpeak={() => speakPhrase(selectedTile.phrase)}
            onClear={() => setSelectedTile(null)}
          />
          {selectedTile.id === 'pain' ? (
            <button className="wide-action danger" type="button" onClick={() => onNavigate('pain')}>
              Open pain details
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
