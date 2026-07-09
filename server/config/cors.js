const LOCAL_ORIGINS = ['http://localhost:5173', 'http://127.0.0.1:5173'];

function getAllowedOrigins() {
  const origins = [...LOCAL_ORIGINS];

  if (process.env.CLIENT_URL) {
    origins.push(process.env.CLIENT_URL);
  }

  return origins;
}

function isOriginAllowed(origin) {
  if (!origin) {
    return true;
  }

  const allowedOrigins = getAllowedOrigins();

  if (allowedOrigins.includes(origin)) {
    return true;
  }

  if (origin.endsWith('.vercel.app')) {
    return true;
  }

  return false;
}

export { getAllowedOrigins, isOriginAllowed };
