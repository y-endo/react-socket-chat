const authLoginUser = (loginData: { sessionId: string; userName: string }) => {
  return fetch('/validate_session', {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin',
    body: JSON.stringify(loginData),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export default authLoginUser;
