const config = require("config");

const defaultLan = config.get("localization").defaultlanguage;
const languages = config.get("localization").language;

const options={
    locales: languages.split(','),
    directory: './locales',
    languageHeaderField: 'language',
    defaultLocale:defaultLan
  }
module.exports = {
    plugin: require('hapi-i18n'),
    options
  };