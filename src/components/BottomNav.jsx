import IconGlyph from './IconGlyph.jsx';

const navItems = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'yesno', label: 'Yes/No', icon: 'yes' },
  { id: 'pain', label: 'Pain', icon: 'pain' },
  { id: 'people', label: 'People', icon: 'people' },
  { id: 'more', label: 'More', icon: 'choices' }
];

export default function BottomNav({ activeScreen, onNavigate, haptics = true }) {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <div className="bottom-nav-inner">
        {navItems.map((item) => (
          <button
            type="button"
            key={item.id}
            className={`nav-button${activeScreen === item.id ? ' is-active' : ''}`}
            onClick={() => {
              if (haptics && 'vibrate' in navigator) {
                navigator.vibrate(8);
              }
              onNavigate(item.id);
            }}
            aria-current={activeScreen === item.id ? 'page' : undefined}
          >
            <IconGlyph name={item.icon} className="nav-icon" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
