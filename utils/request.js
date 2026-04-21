export function buildRequestConfig(authToken, tag = {}) {
  return {
    headers: authToken
      ? {
          Authorization: `Bearer ${authToken}`,
        }
      : {},
    tags: {
      flow: 'user_flow',
      ...tag,
    },
  };
}