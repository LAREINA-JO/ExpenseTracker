const { merge } = require('webpack-merge');
const commonConfig =
require('../../../build-common-config/stylelint.config.js');

/** @type {import('stylelint').Config} */
module.exports = merge(commonConfig, {});