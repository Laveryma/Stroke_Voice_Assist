const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

const icons = {
  pain: (
    <>
      <path {...common} d="M12 21s-7-4.5-8.7-9.4C2.1 8.2 4.1 5 7.4 5c1.9 0 3.4 1 4.6 2.6C13.2 6 14.7 5 16.6 5c3.3 0 5.3 3.2 4.1 6.6C19 16.5 12 21 12 21Z" />
      <path {...common} d="M5 13h4l1.8-3.7 2.9 7.4 2.2-6.3 1.4 2.6H20" />
    </>
  ),
  toilet: (
    <>
      <path {...common} d="M8 4h8v8a4 4 0 0 1-4 4h0a4 4 0 0 1-4-4V4Z" />
      <path {...common} d="M7 20h10" />
      <path {...common} d="M12 16v4" />
      <path {...common} d="M16 7h3v4a2 2 0 0 1-2 2h-1" />
    </>
  ),
  drink: (
    <>
      <path {...common} d="M7 4h10l-1 16H8L7 4Z" />
      <path {...common} d="M8 9h8" />
      <path {...common} d="M10 2h7" />
    </>
  ),
  hot: (
    <>
      <circle {...common} cx="12" cy="12" r="4" />
      <path {...common} d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  cold: (
    <>
      <path {...common} d="M12 2v20M4 6l16 12M20 6 4 18" />
      <path {...common} d="m8 4 4 4 4-4M8 20l4-4 4 4M3 10l5 2-5 2M21 10l-5 2 5 2" />
    </>
  ),
  medical: (
    <>
      <path {...common} d="M8 4v5a4 4 0 0 0 8 0V4" />
      <path {...common} d="M6 4h4M14 4h4M12 13v2a5 5 0 0 0 10 0v-1" />
      <circle {...common} cx="20" cy="13" r="1.5" />
    </>
  ),
  people: (
    <>
      <circle {...common} cx="9" cy="8" r="3" />
      <circle {...common} cx="17" cy="9" r="2.5" />
      <path {...common} d="M3 20a6 6 0 0 1 12 0" />
      <path {...common} d="M14 16a5 5 0 0 1 7 4" />
    </>
  ),
  person: (
    <>
      <circle {...common} cx="12" cy="8" r="4" />
      <path {...common} d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  worry: (
    <>
      <path {...common} d="M5 16a5 5 0 0 1 1.4-9.8A6.5 6.5 0 0 1 19 9.5 4 4 0 0 1 18 17H7" />
      <path {...common} d="M12 9v4M12 16h.01" />
    </>
  ),
  question: (
    <>
      <circle {...common} cx="12" cy="12" r="9" />
      <path {...common} d="M9.6 9a2.7 2.7 0 0 1 4.8 1.7c0 2-2.4 2.2-2.4 4" />
      <path {...common} d="M12 18h.01" />
    </>
  ),
  rest: (
    <>
      <path {...common} d="M4 11V5M4 16h17M4 16v4M21 16v4" />
      <path {...common} d="M4 11h6a3 3 0 0 1 3 3v2" />
      <path {...common} d="M13 10h5a3 3 0 0 1 3 3v3" />
    </>
  ),
  yes: (
    <>
      <circle {...common} cx="12" cy="12" r="9" />
      <path {...common} d="m8 12 2.6 2.6L16.5 9" />
    </>
  ),
  no: (
    <>
      <circle {...common} cx="12" cy="12" r="9" />
      <path {...common} d="m9 9 6 6M15 9l-6 6" />
    </>
  ),
  unsure: (
    <>
      <circle {...common} cx="12" cy="12" r="9" />
      <path {...common} d="M8 12h.01M12 12h.01M16 12h.01" />
    </>
  ),
  repeat: (
    <>
      <path {...common} d="M17 2v5h-5" />
      <path {...common} d="M7 22v-5h5" />
      <path {...common} d="M19 9a7 7 0 0 0-11.9-4.9L4 7" />
      <path {...common} d="M5 15a7 7 0 0 0 11.9 4.9L20 17" />
    </>
  ),
  message: (
    <>
      <path {...common} d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
      <path {...common} d="M8 10h8M8 13h5" />
    </>
  ),
  head: (
    <>
      <path {...common} d="M8 19v-2.8A7 7 0 1 1 17.8 10c0 2.5-1.2 4.1-2.6 5.1V19" />
      <path {...common} d="M8 22h8" />
    </>
  ),
  face: (
    <>
      <circle {...common} cx="12" cy="12" r="9" />
      <path {...common} d="M9 10h.01M15 10h.01M9 15c1.7 1.2 4.3 1.2 6 0" />
    </>
  ),
  mouth: (
    <>
      <path {...common} d="M4 13c3-4 5.5-4 8-2 2.5-2 5-2 8 2-3 4-13 4-16 0Z" />
      <path {...common} d="M6 13h12" />
    </>
  ),
  chest: (
    <>
      <path {...common} d="M8 21V8a4 4 0 0 1 8 0v13" />
      <path {...common} d="M4 12c1-3 2.5-5 5-6M20 12c-1-3-2.5-5-5-6" />
    </>
  ),
  stomach: (
    <>
      <path {...common} d="M12 3v5c0 2-1.5 2.5-3.2 3.3A5.2 5.2 0 0 0 6 16a5 5 0 0 0 10 0c0-2.7-2-3.4-3.7-4.3" />
      <path {...common} d="M16 9c2.2.8 3.8 2.7 3.8 5.2A6.8 6.8 0 0 1 13 21" />
    </>
  ),
  arm: <path {...common} d="M6 21c2-6 3.5-10.5 5.5-13.5 1.2-1.8 3.9-1.2 4.2 1l.5 3.5 2.8 2.2a2 2 0 0 1-2.3 3.2L13 15l-2 6" />,
  hand: (
    <>
      <path {...common} d="M8 12V5a1.5 1.5 0 0 1 3 0v6" />
      <path {...common} d="M11 11V4a1.5 1.5 0 0 1 3 0v7" />
      <path {...common} d="M14 12V6a1.5 1.5 0 0 1 3 0v8" />
      <path {...common} d="M17 14v-3a1.5 1.5 0 0 1 3 0v4a7 7 0 0 1-14 0v-3a2 2 0 0 1 3.4-1.4L11 12" />
    </>
  ),
  leg: <path {...common} d="M10 3v8l-3 9a2 2 0 0 0 3.8 1.2L14 12V3M14 12l3 8.5a2 2 0 0 0 3.8-1.3L18 11V3" />,
  foot: <path {...common} d="M6 18c2 1.5 5.5 2.5 10.5 2.5 2.2 0 3.5-.9 3.5-2.2 0-1.8-2.1-2.3-4.2-2.3H12V5a2 2 0 0 0-4 0v10.4L6 18Z" />,
  back: (
    <>
      <path {...common} d="M12 3v18" />
      <path {...common} d="M8 5c-2 3-2 5.5 0 8M16 5c2 3 2 5.5 0 8M7 18h10" />
    </>
  ),
  left: <path {...common} d="M19 12H5M11 6l-6 6 6 6" />,
  right: <path {...common} d="M5 12h14M13 6l6 6-6 6" />,
  level1: <path {...common} d="M5 20V10M10 20v-4M15 20v-2M20 20v-1" />,
  level2: <path {...common} d="M5 20V8M10 20V9M15 20v-5M20 20v-3" />,
  level3: <path {...common} d="M5 20V5M10 20V6M15 20V9M20 20v-7" />,
  level4: <path {...common} d="M5 20V4M10 20V4M15 20V4M20 20V4" />,
  new: <path {...common} d="M12 5v14M5 12h14" />,
  same: <path {...common} d="M6 9h12M6 15h12" />,
  worse: <path {...common} d="m5 16 5-5 4 4 5-7M15 8h4v4" />,
  better: <path {...common} d="m5 8 5 5 4-4 5 7M15 16h4v-4" />,
  heart: (
    <>
      <path {...common} d="M12 21s-7-4.5-8.7-9.4C2.1 8.2 4.1 5 7.4 5c1.9 0 3.4 1 4.6 2.6C13.2 6 14.7 5 16.6 5c3.3 0 5.3 3.2 4.1 6.6C19 16.5 12 21 12 21Z" />
    </>
  ),
  shield: <path {...common} d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />,
  brain: (
    <>
      <path {...common} d="M9 4a4 4 0 0 0-4 4 4 4 0 0 0 0 8 4 4 0 0 0 4 4" />
      <path {...common} d="M15 4a4 4 0 0 1 4 4 4 4 0 0 1 0 8 4 4 0 0 1-4 4" />
      <path {...common} d="M9 4v16M15 4v16M9 9h6M9 15h6" />
    </>
  ),
  food: (
    <>
      <path {...common} d="M7 3v8M10 3v8M7 11a3 3 0 0 0 6 0V3" />
      <path {...common} d="M10 14v7M18 3v18" />
    </>
  ),
  home: (
    <>
      <path {...common} d="m3 11 9-8 9 8" />
      <path {...common} d="M5 10v10h14V10" />
      <path {...common} d="M10 20v-6h4v6" />
    </>
  ),
  write: (
    <>
      <path {...common} d="M4 20h16" />
      <path {...common} d="m14 4 6 6-9 9H5v-6l9-9Z" />
      <path {...common} d="m12 6 6 6" />
    </>
  ),
  slow: (
    <>
      <circle {...common} cx="12" cy="12" r="9" />
      <path {...common} d="M12 7v5l3 2" />
    </>
  ),
  choices: (
    <>
      <path {...common} d="M5 7h14M5 12h14M5 17h14" />
      <path {...common} d="M3 7h.01M3 12h.01M3 17h.01" />
    </>
  ),
  frustrated: (
    <>
      <circle {...common} cx="12" cy="12" r="9" />
      <path {...common} d="M8 9h.01M16 9h.01M8 16c2-1.5 6-1.5 8 0" />
    </>
  ),
  sad: (
    <>
      <circle {...common} cx="12" cy="12" r="9" />
      <path {...common} d="M8 9h.01M16 9h.01M8 17c2-2 6-2 8 0" />
    </>
  ),
  angry: (
    <>
      <circle {...common} cx="12" cy="12" r="9" />
      <path {...common} d="m8 8 3 2M16 8l-3 2M8 17c2-1.5 6-1.5 8 0" />
    </>
  ),
  restart: <path {...common} d="M4 4v6h6M20 20v-6h-6M20 10A8 8 0 0 0 6.3 4.4L4 10M4 14a8 8 0 0 0 13.7 5.6L20 14" />,
  picture: (
    <>
      <rect {...common} x="4" y="5" width="16" height="14" rx="2" />
      <path {...common} d="m4 16 4-4 4 4 3-3 5 5" />
      <circle {...common} cx="15" cy="9" r="1.5" />
    </>
  ),
  time: (
    <>
      <circle {...common} cx="12" cy="12" r="9" />
      <path {...common} d="M12 6v6l4 2" />
    </>
  ),
  later: <path {...common} d="M5 12h14M13 6l6 6-6 6M5 5v14" />,
  hospital: (
    <>
      <path {...common} d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" />
      <path {...common} d="M9 21v-6h6v6M9 8h6M12 5v6M7 11h10" />
    </>
  ),
  repair: (
    <>
      <path {...common} d="M4 6h10a4 4 0 0 1 0 8H9" />
      <path {...common} d="m9 10-4 4 4 4" />
      <path {...common} d="M18 18h2" />
    </>
  ),
  settings: (
    <>
      <circle {...common} cx="12" cy="12" r="3" />
      <path {...common} d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.1 2.1-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20h-3v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-2.1-2.1.1-.1A1.7 1.7 0 0 0 5 15a1.7 1.7 0 0 0-1.5-1H3v-3h.5A1.7 1.7 0 0 0 5 10a1.7 1.7 0 0 0-.3-1.9l-.1-.1 2.1-2.1.1.1A1.7 1.7 0 0 0 8.7 6a1.7 1.7 0 0 0 1-1.5V4h3v.5a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1L18 7.7l-.1.1A1.7 1.7 0 0 0 17.6 10a1.7 1.7 0 0 0 1.5 1h.9v3h-.6a1.7 1.7 0 0 0-1.5 1Z" />
    </>
  )
};

export default function IconGlyph({ name = 'message', className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {icons[name] || icons.message}
    </svg>
  );
}
