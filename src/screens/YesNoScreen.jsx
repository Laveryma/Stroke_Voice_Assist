import { useMemo, useState } from 'react';
import TileButton from '../components/TileButton.jsx';
import { yesNoTiles } from '../data/defaultTiles.js';
import { resolveCalibrationQuestion } from '../utils/storage.js';

export default function YesNoScreen({ settings, speakPhrase, haptics }) {
  const [calibrationOpen, setCalibrationOpen] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [lastAnswer, setLastAnswer] = useState('');

  const questions = useMemo(
    () => settings.calibrationQuestions.map((question) => resolveCalibrationQuestion(question, settings)),
    [settings]
  );

  const currentQuestion = questions[questionIndex] || 'No question set.';

  function answer(tile) {
    speakPhrase(tile.phrase);
    setLastAnswer(tile.label);
  }

  function nextQuestion() {
    setQuestionIndex((index) => (index + 1) % Math.max(questions.length, 1));
    setLastAnswer('');
  }

  return (
    <section className="screen" aria-labelledby="yesno-title">
      <header className="screen-heading split-heading">
        <div>
          <p className="screen-kicker">Response</p>
          <h1 id="yesno-title">Yes / No</h1>
        </div>
        <button
          className={`mode-toggle${calibrationOpen ? ' is-active' : ''}`}
          type="button"
          onClick={() => setCalibrationOpen((open) => !open)}
        >
          Check reliability
        </button>
      </header>

      <div className="tile-grid yesno-grid">
        {yesNoTiles.map((tile) => (
          <TileButton
            key={tile.id}
            label={tile.label}
            icon={tile.icon}
            tone={tile.tone}
            className={tile.id === 'know-cannot-say' ? 'wide-tile' : ''}
            haptics={haptics}
            onClick={() => answer(tile)}
          />
        ))}
      </div>

      {calibrationOpen ? (
        <section className="calibration-panel" aria-labelledby="calibration-title">
          <div className="calibration-header">
            <div>
              <p className="screen-kicker">Question {questionIndex + 1}</p>
              <h2 id="calibration-title">{currentQuestion}</h2>
            </div>
            <button className="small-action primary" type="button" onClick={() => speakPhrase(currentQuestion)}>
              Speak question
            </button>
          </div>

          <div className="calibration-actions">
            {yesNoTiles.slice(0, 3).map((tile) => (
              <TileButton
                key={`cal-${tile.id}`}
                label={tile.label}
                icon={tile.icon}
                tone={tile.tone}
                selected={lastAnswer === tile.label}
                haptics={haptics}
                onClick={() => answer(tile)}
              />
            ))}
          </div>

          <div className="screen-actions">
            <p className="inline-status">{lastAnswer ? `Answer: ${lastAnswer}` : 'Answer not recorded yet.'}</p>
            <button className="small-action" type="button" onClick={nextQuestion}>
              Next question
            </button>
          </div>
        </section>
      ) : null}
    </section>
  );
}
