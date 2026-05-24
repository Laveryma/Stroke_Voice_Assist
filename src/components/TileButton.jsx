import IconGlyph from './IconGlyph.jsx';

export default function TileButton({
  label,
  sublabel,
  icon = 'message',
  emoji,
  imageUrl,
  tone = 'neutral',
  selected = false,
  className = '',
  onClick,
  children,
  haptics = true,
  type = 'button'
}) {
  function handleClick(event) {
    if (haptics && 'vibrate' in navigator) {
      navigator.vibrate(12);
    }
    onClick?.(event);
  }

  return (
    <button
      type={type}
      className={`tile-button tile-${tone}${selected ? ' is-selected' : ''} ${className}`.trim()}
      onClick={handleClick}
      aria-pressed={selected || undefined}
    >
      <span className="tile-visual" aria-hidden="true">
        {imageUrl ? (
          <img className="tile-photo" src={imageUrl} alt="" />
        ) : emoji ? (
          <span className="tile-emoji">{emoji}</span>
        ) : (
          <IconGlyph name={icon} className="tile-icon" />
        )}
      </span>
      <span className="tile-copy">
        <span className="tile-label">{label}</span>
        {sublabel ? <span className="tile-sublabel">{sublabel}</span> : null}
      </span>
      {children}
    </button>
  );
}
