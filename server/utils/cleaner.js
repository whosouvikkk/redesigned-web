function cleanPayload(data, keyOwnerReplacement = 'MoonWitch') {
  if (!data || typeof data !== 'object') return data;
  
  const fieldsToRemove = [
    'developer', 'expiry', 'expiration', 'requests_left', 'uses_left', 
    'powered_by', 'api_info', 'status', 'created', 'remaining', 
    'limit', 'dailyRemaining', 'username', 'query_time_ms', 'credit'
  ];

  fieldsToRemove.forEach(field => delete data[field]);
  if (data.key_owner) {
    data.key_owner = keyOwnerReplacement;
  }
  return data;
}

module.exports = { cleanPayload };
