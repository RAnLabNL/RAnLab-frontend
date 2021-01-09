/**
 * Generated headers for an internal API request
 * @param token api auth token
 */
export const getHeaders = (token: string | null | undefined): Headers => {
  return new Headers({
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });
};
