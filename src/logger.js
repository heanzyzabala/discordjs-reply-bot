const log4js = require('log4js');

function Logger() {
  const logger = log4js.getLogger();

  this.info = (msg) => {
    logger.level = 'info';
    logger.info(msg);
  };

  this.error = (msg) => {
    logger.level = 'error';
    logger.error(msg);
  };
}
module.export = new Logger();
