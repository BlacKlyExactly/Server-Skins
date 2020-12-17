const withTM = require('next-plugin-transpile-modules');
 
module.exports = withTM({
  transpileModules: [ 'gsap' ]
});