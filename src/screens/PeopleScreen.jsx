import { useEffect, useMemo, useState } from 'react';
import TileButton from '../components/TileButton.jsx';
import {
  deleteImageBlob,
  getImageBlob,
  loadPeople,
  saveImageBlob,
  savePeople
} from '../utils/storage.js';

const emptyForm = {
  id: '',
  name: '',
  relationship: '',
  phrase: '',
  icon: 'person',
  photoId: ''
};

export default function PeopleScreen({ speakPhrase, haptics }) {
  const [people, setPeople] = useState(() => loadPeople());
  const [photoUrls, setPhotoUrls] = useState({});
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [pendingPhoto, setPendingPhoto] = useState(null);
  const [removePhoto, setRemovePhoto] = useState(false);
  const [photoNotice, setPhotoNotice] = useState('');
  const [manageMode, setManageMode] = useState(false);

  const sortedPeople = useMemo(() => people, [people]);

  useEffect(() => {
    savePeople(people);
  }, [people]);

  useEffect(() => {
    let isMounted = true;
    const urlsToRevoke = [];

    Promise.all(
      people.map(async (person) => {
        if (!person.photoId) {
          return [person.id, null];
        }

        try {
          const blob = await getImageBlob(person.photoId);
          if (!blob) {
            return [person.id, null];
          }
          const url = URL.createObjectURL(blob);
          urlsToRevoke.push(url);
          return [person.id, url];
        } catch {
          return [person.id, null];
        }
      })
    ).then((entries) => {
      if (!isMounted) {
        urlsToRevoke.forEach((url) => URL.revokeObjectURL(url));
        return;
      }

      setPhotoUrls(Object.fromEntries(entries.filter(([, url]) => Boolean(url))));
    });

    return () => {
      isMounted = false;
      urlsToRevoke.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [people]);

  function beginAdd() {
    setEditing('new');
    setForm(emptyForm);
    setPendingPhoto(null);
    setRemovePhoto(false);
    setPhotoNotice('');
  }

  function beginEdit(person) {
    setEditing(person.id);
    setForm(person);
    setPendingPhoto(null);
    setRemovePhoto(false);
    setPhotoNotice('');
  }

  function cancelEdit() {
    setEditing(null);
    setForm(emptyForm);
    setPendingPhoto(null);
    setRemovePhoto(false);
  }

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = form.name.trim();
    if (!trimmedName) {
      return;
    }

    const id = form.id || `person-${Date.now()}`;
    let photoId = form.photoId || '';

    if (removePhoto && photoId) {
      await deleteImageBlob(photoId).catch(() => undefined);
      photoId = '';
    }

    if (pendingPhoto) {
      photoId = `photo-${id}`;
      try {
        await saveImageBlob(photoId, pendingPhoto);
      } catch {
        photoId = '';
        setPhotoNotice('Photo could not be saved on this device.');
      }
    }

    const savedPerson = {
      ...form,
      id,
      name: trimmedName,
      relationship: form.relationship.trim(),
      phrase: form.phrase.trim() || `I want ${trimmedName}`,
      icon: form.icon || 'person',
      photoId
    };

    setPeople((current) => {
      const exists = current.some((person) => person.id === id);
      return exists
        ? current.map((person) => (person.id === id ? savedPerson : person))
        : [...current, savedPerson];
    });

    cancelEdit();
  }

  function deletePerson(person) {
    const confirmed = window.confirm(`Delete ${person.name}?`);
    if (!confirmed) {
      return;
    }

    if (person.photoId) {
      deleteImageBlob(person.photoId).catch(() => undefined);
    }
    setPeople((current) => current.filter((item) => item.id !== person.id));
  }

  return (
    <section className="screen" aria-labelledby="people-title">
      <header className="screen-heading split-heading">
        <div>
          <p className="screen-kicker">People</p>
          <h1 id="people-title">Family and care team</h1>
        </div>
        <div className="heading-actions">
          <button className="mode-toggle" type="button" onClick={beginAdd}>
            Add person
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

      <div className="tile-grid people-grid">
        {sortedPeople.map((person) => (
          <div className="managed-tile" key={person.id}>
            <TileButton
              label={person.name}
              sublabel={person.relationship}
              icon={person.icon || 'person'}
              imageUrl={photoUrls[person.id]}
              haptics={haptics}
              onClick={() => speakPhrase(person.phrase || `I want ${person.name}`)}
            />
            {manageMode ? (
              <div className="tile-manage-actions">
                <button type="button" onClick={() => beginEdit(person)}>
                  Edit
                </button>
                <button type="button" onClick={() => deletePerson(person)}>
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {editing ? (
        <form className="edit-panel" onSubmit={handleSubmit}>
          <h2>{editing === 'new' ? 'Add person' : 'Edit person'}</h2>
          <label>
            Name
            <input value={form.name} onChange={(event) => updateField('name', event.target.value)} />
          </label>
          <label>
            Relationship
            <input value={form.relationship} onChange={(event) => updateField('relationship', event.target.value)} />
          </label>
          <label>
            Spoken phrase
            <input
              value={form.phrase}
              placeholder={form.name ? `I want ${form.name}` : 'I want my family'}
              onChange={(event) => updateField('phrase', event.target.value)}
            />
          </label>
          <label>
            Optional photo
            <input type="file" accept="image/*" onChange={(event) => setPendingPhoto(event.target.files?.[0] || null)} />
          </label>
          {form.photoId ? (
            <label className="checkbox-row">
              <input type="checkbox" checked={removePhoto} onChange={(event) => setRemovePhoto(event.target.checked)} />
              Remove saved photo
            </label>
          ) : null}
          {photoNotice ? <p className="inline-status warning-text">{photoNotice}</p> : null}
          <div className="form-actions">
            <button className="wide-action" type="button" onClick={cancelEdit}>
              Cancel
            </button>
            <button className="wide-action primary" type="submit">
              Save person
            </button>
          </div>
        </form>
      ) : null}
    </section>
  );
}
