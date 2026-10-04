// sharp 0.35 resolves to its ESM typings (`export default`) under this project's CommonJS
// module resolution, while the runtime build is CommonJS (`module.exports = sharp`).
// Point the module at the CommonJS typings so `import sharp = require('sharp')` type-checks.
declare module 'sharp' {
  import sharp = require('../../node_modules/sharp/dist/index.d.cts');
  export = sharp;
}
