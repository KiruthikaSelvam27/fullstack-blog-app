const LOCAL_ORIGINS = ['http://localhost:5173', 'http://127.0.0.1:5173'];

function parseEnvOrigins() {
  const raw = process.env.ALLOWED_ORIGINS ?? '';
  return raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function getAllowedOrigins() {
  return [...LOCAL_ORIGINS, process.env.CLIENT_URL, ...parseEnvOrigins()].filter(
    Boolean
  );
}

function isOriginAllowed(origin) {
  if (!origin) {
    return true;
  }

  const allowedOrigins = getAllowedOrigins();

  if (allowedOrigins.includes(origin)) {
    return true;
  }

  if (process.env.ALLOW_VERCEL_PREVIEWS === 'true' && origin.endsWith('.vercel.app')) {
    return true;
  }

  return false;
}

export { getAllowedOrigins, isOriginAllowed };
