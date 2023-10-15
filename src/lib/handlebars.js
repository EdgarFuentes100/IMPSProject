const helpers = require('handlebars');
const moment = require('moment');

// Este helper nos permite comparar 2 valores en la plantilla handlebars
helpers.registerHelper('eq', function (a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this); // Utlizamos un if ternario
});

// Helper que permite darle formato a una fecha (lo estamos utilizando como un pipe)
helpers.registerHelper('formatDate', function(date, format) {
  return moment(date).format(format);
});

helpers.registerHelper('convertDate', function(fecha) {
  const date = new Date(fecha);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Se le suma 1 al mes, porque el getMonth() cuenta desde 0.
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
});

module.exports = helpers;