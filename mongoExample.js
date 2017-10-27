const { Infrastructure, Machine, Range } = require('kelda');
const Mongo = require('./mongo.js');

const nWorker = 3;

const baseMachine = new Machine({
  provider: 'Amazon',
  cpu: new Range(2),
  ram: new Range(2),
});

const mongo = new Mongo(nWorker);

const infra = new Infrastructure(baseMachine, baseMachine.replicate(nWorker));
mongo.deploy(infra);
