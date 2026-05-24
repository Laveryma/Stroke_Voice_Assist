import TileButton from '../components/TileButton.jsx';
import { repairTiles } from '../data/defaultTiles.js';

export default function RepairScreen({ speakPhrase, onBack, haptics }) {
  return (
    <section className="screen" aria-labelledby="repair-title">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <header className="screen-heading">
        <div>
          <p className="screen-kicker">Repair</p>
          <h1 id="repair-title">Conversation</h1>
        </div>
      </header>
      <div className="tile-grid">
        {repairTiles.map((tile) => (
          <TileButton
            key={tile.id}
            label={tile.label}
            icon={tile.icon}
            tone={tile.tone || 'neutral'}
            haptics={haptics}
            onClick={() => speakPhrase(tile.phrase)}
          />
        ))}
      </div>
    </section>
  );
}
