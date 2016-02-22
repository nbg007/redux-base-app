export function applyHeaders(request, token) {
  if (token) {
    request.headers = request.headers || {}
    request.headers['authorization'] = 'Bearer ' + token
  }
  return {
    ...request,
    headers: {
      ...request.headers,
      'content-type': 'application/json',
      'accept': 'application/json',
      }
    };
}
