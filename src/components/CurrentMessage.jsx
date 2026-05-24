export default function CurrentMessage({ message, label = 'Current message', onSpeak, onClear }) {
  return (
    <aside className="current-message" aria-live="polite">
      <div>
        <p className="current-message-label">{label}</p>
        <p className="current-message-text">{message || 'No message selected yet.'}</p>
      </div>
      <div className="current-message-actions">
        {onSpeak ? (
          <button className="small-action primary" type="button" onClick={onSpeak} disabled={!message}>
            Speak
          </button>
        ) : null}
        {onClear ? (
          <button className="small-action" type="button" onClick={onClear} disabled={!message}>
            Clear
          </button>
        ) : null}
      </div>
    </aside>
  );
}
