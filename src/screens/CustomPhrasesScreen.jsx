import { useEffect, useMemo, useState } from 'react';
import TileButton from '../components/TileButton.jsx';
import { loadCustomPhrases, saveCustomPhrases } from '../utils/storage.js';

const emptyPhrase = {
  id: '',
  label: '',
  phrase: '',
  category: '',
  emoji: ''
};

export default function CustomPhrasesScreen({ speakPhrase, onBack, haptics }) {
  const [phrases, setPhrases] = useState(() => loadCustomPhrases());
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyPhrase);
  const [manageMode, setManageMode] = useState(false);

  useEffect(() => {
    saveCustomPhrases(phrases);
  }, [phrases]);

  const groupedPhrases = useMemo(() => {
    return phrases.reduce((groups, phrase) => {
      const category = phrase.category?.trim() || 'Custom';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(phrase);
      return groups;
    }, {});
  }, [phrases]);

  function beginAdd() {
    setEditing('new');
    setForm(emptyPhrase);
  }

  function beginEdit(phrase) {
    setEditing(phrase.id);
    setForm(phrase);
  }

  function cancelEdit() {
    setEditing(null);
    setForm(emptyPhrase);
  }

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function savePhrase(event) {
    event.preventDefault();
    const label = form.label.trim();
    const spokenPhrase = form.phrase.trim() || label;

    if (!label || !spokenPhrase) {
      return;
    }

    const id = form.id || `custom-${Date.now()}`;
    const saved = {
      ...form,
      id,
      label,
      phrase: spokenPhrase,
      category: form.category.trim() || 'Custom',
      emoji: form.emoji.trim()
    };

    setPhrases((current) => {
      const exists = current.some((phrase) => phrase.id === id);
      return exists ? current.map((phrase) => (phrase.id === id ? saved : phrase)) : [...current, saved];
    });
    cancelEdit();
  }

  function deletePhrase(phrase) {
    const confirmed = window.confirm(`Delete "${phrase.label}"?`);
    if (confirmed) {
      setPhrases((current) => current.filter((item) => item.id !== phrase.id));
    }
  }

  return (
    <section className="screen" aria-labelledby="custom-title">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <header className="screen-heading split-heading">
        <div>
          <p className="screen-kicker">Custom</p>
          <h1 id="custom-title">Phrases</h1>
        </div>
        <div className="heading-actions">
          <button className="mode-toggle" type="button" onClick={beginAdd}>
            Add phrase
          </button>
          <button
            className={`mode-toggle${manageMode ? ' is-active' : ''}`}
            type="button"
            onClick={() => setManageMode((current) => !current)}
          >
            {manageMode ? 'Done' : 'Manage'}
          </button>
        </div>
      </header>

      {Object.entries(groupedPhrases).map(([category, items]) => (
        <section className="flow-section" key={category} aria-labelledby={`category-${category}`}>
          <h2 id={`category-${category}`}>{category}</h2>
          <div className="tile-grid">
            {items.map((phrase) => (
              <div className="managed-tile" key={phrase.id}>
                <TileButton
                  label={phrase.label}
                  sublabel={phrase.phrase !== phrase.label ? phrase.phrase : ''}
                  emoji={phrase.emoji}
                  icon="message"
                  haptics={haptics}
                  onClick={() => speakPhrase(phrase.phrase)}
                />
                {manageMode ? (
                  <div className="tile-manage-actions">
                    <button type="button" onClick={() => beginEdit(phrase)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => deletePhrase(phrase)}>
                      Delete
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ))}

      {!phrases.length ? <p className="empty-state">No custom phrases yet.</p> : null}

      {editing ? (
        <form className="edit-panel" onSubmit={savePhrase}>
          <h2>{editing === 'new' ? 'Add phrase' : 'Edit phrase'}</h2>
          <label>
            Label
            <input value={form.label} onChange={(event) => updateField('label', event.target.value)} />
          </label>
          <label>
            Spoken phrase
            <input
              value={form.phrase}
              placeholder={form.label || 'What should be spoken?'}
              onChange={(event) => updateField('phrase', event.target.value)}
            />
          </label>
          <label>
            Category
            <input value={form.category} placeholder="Care" onChange={(event) => updateField('category', event.target.value)} />
          </label>
          <label>
            Optional icon text
            <input value={form.emoji} maxLength="8" placeholder="OK" onChange={(event) => updateField('emoji', event.target.value)} />
          </label>
          <div className="form-actions">
            <button className="wide-action" type="button" onClick={cancelEdit}>
              Cancel
            </button>
            <button className="wide-action primary" type="submit">
              Save phrase
            </button>
          </div>
        </form>
      ) : null}
    </section>
  );
}
