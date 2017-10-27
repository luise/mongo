const { Infrastructure, Machine, Range, githubKeys } = require('kelda');
const Mongo = require('./mongo.js');

const nWorker = 3;

const baseMachine = new Machine({
  provider: 'Amazon',
  cpu: new Range(2),
  ram: new Range(2),
  sshKeys: githubKeys('ejj'),
});

const mongo = new Mongo(nWorker);

const infra = new Infrastructure(baseMachine, baseMachine.replicate(nWorker));
mongo.deploy(infra);
