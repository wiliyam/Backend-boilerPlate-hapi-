const cluster = require("cluster");
const winston = require("winston");
const numCPUs = require("os").cpus().length;
const moment=require('moment')


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logfile.log' })
  ]
});

if (cluster.isMaster) {
  logger.info(`Master ${process.pid} is running`);
  // Fork workers.
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
    logger.info(`${moment()} Forking process number ${i}...`);
  }

  // Listen for dying workers
  cluster.on("exit", worker => {
    // Replace the dead worker,
    // we're not sentimental
    logger.info(`${moment()}  worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  // load .env in local development
  const server = require("./server");
  server.startServer();
}
