import TileButton from '../components/TileButton.jsx';
import { hospitalQuestionTiles } from '../data/defaultTiles.js';

export default function HospitalQuestionsScreen({ speakPhrase, onBack, haptics }) {
  return (
    <section className="screen" aria-labelledby="hospital-title">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <header className="screen-heading">
        <div>
          <p className="screen-kicker">Hospital</p>
          <h1 id="hospital-title">Questions</h1>
        </div>
      </header>
      <div className="tile-grid">
        {hospitalQuestionTiles.map((tile) => (
          <TileButton
            key={tile.id}
            label={tile.label}
            icon={tile.icon}
            tone="neutral"
            haptics={haptics}
            onClick={() => speakPhrase(tile.phrase)}
          />
        ))}
      </div>
    </section>
  );
}
