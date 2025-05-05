module.exports = {
  '{src,tests}/**/*.{js,jsx,ts,tsx,json,css,scss,md,d.ts}': (filenames) =>
    filenames.map((filename) => `prettier --write '${filename}'`),
};
