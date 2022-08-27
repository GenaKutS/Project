const {createLogger,transports,format } = require ('winston');

//lvl doctupa 
// logger.error("error");
// logger.warn("warn");
// logger.info("info");
// logger.verbose("verbose");
// logger.debug("debug");
// logger.silly("silly");

const customFormat = format.combine(format.timestamp(), format.printf((info) => {
    return `${info.timestamp} [${info.level.toUpperCase().padEnd(7)}]: ${info.message}`
  }))

const logger = createLogger({
    format: customFormat,
    // level: 'debug',
    transports: [
            new transports.Console(),
            new transports.File({filename:  'app.log ', level: ''}),
            new transports.File({filename: 'error.log', level: 'error' }),
    ]
    
});



module.exports = logger;