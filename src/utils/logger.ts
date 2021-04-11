import { openAPIGraphLibConfig } from '.';
import { LogLevel } from 'openapi-graph-types'

const logger = require('pino')({
  prettyPrint: {
    ignore: 'time,pid,hostname',
    singleLine: true
  },
  level: 20
})

export function log(msg: string, level: LogLevel = LogLevel.INFO, ignoreConfig = false): any {
  if (!openAPIGraphLibConfig.verbose && !ignoreConfig) {
    return;
  }
  switch (level) {
    case LogLevel.INFO:
      logger.info(msg)
      break;
    case LogLevel.WARN:
      logger.warn(msg);
      break;
    case LogLevel.DEBUG:
      if (openAPIGraphLibConfig.debug) {
        logger.debug(msg);
      }
      break;
    default:
      break;
  }
}
