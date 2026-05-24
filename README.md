# Clear Voice Stroke Assist

Clear Voice Stroke Assist is a private, family-use Progressive Web App for iPhone. It supports aphasia and stroke communication with large spoken phrase tiles, yes/no responses, pain message building, people tiles, hospital questions, feelings, conversation repair, custom phrases, and local-only personalisation.

It is an original clean-room implementation. It does not use copied app assets, recordings, layouts, analytics, cloud storage, login, or a backend. The published starter tiles are deliberately generic; enter personal names only on the device that will use the app.

## Medical Boundary

Clear Voice is a communication support tool. It does not diagnose, treat, or replace medical care. In an emergency, contact clinical staff immediately.

## Requirements

- Node.js 20 or newer recommended
- npm
- Safari on iPhone for Home Screen installation

## Install Dependencies

From a Windows PowerShell terminal in Visual Studio Code:

```powershell
cd C:\code\CommunicationHelp
npm install
```

## Run Locally

```powershell
cd C:\code\CommunicationHelp
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173/
```

## Build

```powershell
cd C:\code\CommunicationHelp
npm run build
```

## Preview the Production Build

```powershell
cd C:\code\CommunicationHelp
npm run preview
```

## Generate App Icons

The source icon is `public/icons/clear-voice-icon.svg`. PNG icons are generated with:

```powershell
cd C:\code\CommunicationHelp
npm run icons
```

Generated icon files include:

- `public/icons/apple-touch-icon.png` at 180x180
- `public/icons/icon-192.png` at 192x192
- `public/icons/icon-512.png` at 512x512
- `public/icons/icon-maskable-512.png` at 512x512

## Deploy to GitHub Pages

1. Create the GitHub repository `Laveryma/Stroke_Voice_Assist`.
2. Push this project to the repository.
3. Deploy the built app to the `gh-pages` branch:

```powershell
cd C:\code\CommunicationHelp
npm run deploy
```

In GitHub, open the repository settings and set Pages to serve from the `gh-pages` branch.

The Vite build uses relative asset paths so it works under a GitHub Pages repository path such as:

```text
https://Laveryma.github.io/Stroke_Voice_Assist/
```

## Open on iPhone

1. Deploy to GitHub Pages.
2. Open the GitHub Pages URL in iPhone Safari.
3. Use each main section once while online so the service worker can cache the app shell and assets.

## Add to iPhone Home Screen

1. Open the app in Safari.
2. Tap the Share button.
3. Tap Add to Home Screen.
4. Confirm the name, then tap Add.

The app includes iOS PWA metadata and an Apple touch icon for the Home Screen.

## Local Data

All custom data is stored only on the device:

- Settings, custom people, custom phrases, and mood logs use `localStorage`.
- People photos use IndexedDB.
- No normal app feature requires an external API call.
- No analytics, tracking, login, account system, or backend is included.
- The Settings update control refreshes cached app files only and does not remove local customisations.

Clearing Safari website data, removing the PWA, or using Reset all local data in Settings can delete saved customisations.

## Main Scripts

```powershell
npm run dev
npm run build
npm run preview
npm run deploy
```
