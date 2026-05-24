const CACHE_PREFIX = 'clear-voice-stroke-assist-';

function currentAppScope() {
  return new URL(import.meta.env.BASE_URL, window.location.href).href;
}

export async function refreshInstalledApp() {
  if (!('serviceWorker' in navigator)) {
    return {
      ok: false,
      message: 'App refresh is not supported in this browser.'
    };
  }

  if (!navigator.onLine) {
    return {
      ok: false,
      message: 'Connect to the internet, then try again.'
    };
  }

  try {
    const scope = currentAppScope();
    const registrations = await navigator.serviceWorker.getRegistrations();
    const appRegistrations = registrations.filter((registration) => registration.scope === scope);

    await Promise.all(appRegistrations.map((registration) => registration.unregister()));

    if ('caches' in window) {
      const cacheKeys = await caches.keys();
      const appCacheKeys = cacheKeys.filter((key) => key.startsWith(CACHE_PREFIX));
      await Promise.all(appCacheKeys.map((key) => caches.delete(key)));
    }

    const workerUrl = new URL(`${import.meta.env.BASE_URL}sw.js`, window.location.href);
    workerUrl.searchParams.set('refresh', Date.now().toString());
    await fetch(workerUrl, { cache: 'no-store' });

    const reloadUrl = new URL(import.meta.env.BASE_URL, window.location.href);
    reloadUrl.searchParams.set('refresh', Date.now().toString());
    window.location.replace(reloadUrl.href);

    return {
      ok: true,
      message: 'Reloading the latest app version...'
    };
  } catch {
    return {
      ok: false,
      message: 'Could not refresh app files. Check the internet connection and try again.'
    };
  }
}
