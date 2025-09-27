export const HOST = process.env.REACT_APP_API_URL;

export const header = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};