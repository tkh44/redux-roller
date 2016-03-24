import config from './rollup.config';

config.format = 'umd';
config.dest = 'dist/redux-roller.umd.js';
config.moduleName = 'roller';

export default config;
