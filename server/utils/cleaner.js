const cleanOSINTResponse = (data) => {
  if (!data || typeof data !== 'object') return data;

  const fieldsToRemove = [
    'developer', 'expiry', 'expiration', 'requests_left', 'uses_left',
    'powered_by', 'api_info', 'status', 'created', 'remaining',
    'limit', 'dailyRemaining', 'username', 'query_time_ms', 'credit'
  ];

  const cleaned = Array.isArray(data) ? [...data] : { ...data };

  if (Array.isArray(cleaned)) {
    return cleaned.map(item => cleanOSINTResponse(item));
  }

  for (const key of Object.keys(cleaned)) {
    if (fieldsToRemove.includes(key)) {
      delete cleaned[key];
    } else if (key === 'key_owner') {
      cleaned[key] = process.env.KEY_OWNER_REPLACEMENT || 'MoonWitch';
    } else if (typeof cleaned[key] === 'object' && cleaned[key] !== null) {
      cleaned[key] = cleanOSINTResponse(cleaned[key]);
    }
  }

  return cleaned;
};

module.exports = cleanOSINTResponse;
