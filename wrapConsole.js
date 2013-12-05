// From https://github.com/Strider-CD/strider/blob/master/lib/logging.js?source=c

var config    = require('./config');
var winston   = require('winston');
var util      = require('util');

var logger;

var transports = [];

if (config.logging.console_enabled) {
	transports.push(new winston.transports.Console(config.logging.console));
}
if (config.logging.file_enabled) {
	transports.push(new winston.transports.File(config.logging.file));
}
if (config.logging.loggly_enabled) {
	transports.push(new winston.transports.Loggly(config.logging.loggly));
}

logger = new winston.Logger({
	transports: transports,
	exitOnError: config.logging.exitOnError
});


function formatArgs(args){
	return [util.format.apply(util.format, Array.prototype.slice.call(args))];
}

console.log = function(){
	logger.info.apply(logger, formatArgs(arguments));
};

console.debug = function(){
	logger.debug.apply(logger, formatArgs(arguments));
};
console.info = function(){
	logger.info.apply(logger, formatArgs(arguments));
};
console.warn = function(){
	logger.warn.apply(logger, formatArgs(arguments));
};
console.error = function(){
	logger.error.apply(logger, formatArgs(arguments));
};


module.exports = logger;



/* Contents of .config.js */
envDefaults.server_name = envDefaults.server_name + ":" + envDefaults.port;

var defaults = _.extend({
  // Logging configuration
  logging: {
    exitOnError: true,
    loggly_enabled: false,
    file_enabled: false,
    console: {
      // Log everything
      level: 0,
      colorize: true,
      timestamp: true
    },
    console_enabled: true
  },
  viewpath: path.join(__dirname, '../views')
}, envDefaults);