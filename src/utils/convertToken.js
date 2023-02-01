const decodeToken = token => {
  let newToken = atob(token);
  return newToken.replace(process.env.VUE_APP_TOKEN, "");
};

export { decodeToken };
