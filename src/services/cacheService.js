const cache = new Map();
const versions = new Map();

const CACHE_DURATION = 30 * 1000;

export function getCachedData(key) {
  const entry = cache.get(key);

  if (!entry) {
    return { hit: false };
  }

  if (Date.now() > entry.expiration) {
    cache.delete(key);
    return { hit: false };
  }

  return {
    hit: true,
    data: entry.data
  };
}

export function setCachedData(key, data) {
  cache.set(key, {
    data,
    expiration: Date.now() + CACHE_DURATION
  });
}

export function invalidateCache(prefix) {
  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) {
      cache.delete(key);
    }
  }

  versions.set(prefix, (versions.get(prefix) || 0) + 1);
}

export function getCacheVersion(prefix) {
  return versions.get(prefix) || 0;
}



export async function cachedRequest(key, prefix, request) {
  const cached = getCachedData(key);

  if (cached.hit) {
    console.log("CACHE HIT:", key);
    return cached.data;
  }

  console.log("CACHE MISS:", key);

  const version = getCacheVersion(prefix);
  const data = await request();

  if (version === getCacheVersion(prefix)) {
    setCachedData(key, data);
  }

  return data;
}
