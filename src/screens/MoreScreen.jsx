import TileButton from '../components/TileButton.jsx';
import { moreSections } from '../data/defaultTiles.js';

export default function MoreScreen({ onNavigate, speakPhrase, haptics }) {
  return (
    <section className="screen" aria-labelledby="more-title">
      <header className="screen-heading">
        <div>
          <p className="screen-kicker">More</p>
          <h1 id="more-title">More options</h1>
        </div>
      </header>

      <div className="tile-grid">
        {moreSections.map((section) => (
          <TileButton
            key={section.id}
            label={section.label}
            icon={section.icon}
            tone={section.id === 'settings' ? 'quiet' : 'neutral'}
            haptics={haptics}
            onClick={() => {
              speakPhrase(section.phrase);
              onNavigate(section.id);
            }}
          />
        ))}
      </div>
    </section>
  );
}
