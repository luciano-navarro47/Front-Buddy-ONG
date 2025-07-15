export const normalizeAuth0User = (auth0User) => {
  
  return {
    first_name: auth0User.given_name,
    last_name: auth0User.family_name,
    username: auth0User.nickname,
    email: auth0User.email,
    role: "user",
    auth0Sub: auth0User.sub,
    email_verified: auth0User.email_verified
  };
};
