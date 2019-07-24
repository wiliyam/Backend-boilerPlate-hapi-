const i18n = require("i18n");
const {options} = require('../web/middleware/localization');

i18n.configure(options);

module.exports = i18n;