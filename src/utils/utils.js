const encodeURL = (method, url) => {
  return `/${method}/${encodeURLpoweredbyMartini(url)}`;
};

const encodeURLpoweredbyMartini = url => {
  return url.replace(/\//g, "&v&");
};

export { encodeURL };
