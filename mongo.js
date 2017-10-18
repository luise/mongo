const { Container, allow } = require('kelda');

const image = 'keldaio/mongo';

function getHostname(c) {
  return c.getHostname();
}

function Mongo(nWorker) {
  this.containers = [];
  for (let i = 0; i < nWorker; i += 1) {
    this.containers.push(new Container('mongo', image));
  }

  const hostnames = this.containers.map(getHostname).join(',');
  this.containers.forEach((m) => {
    m.setEnv('MEMBERS', hostnames);
  });

  // The initiator is choosen completley arbitrarily.
  this.containers[0].setEnv('INITIATOR', 'true');

  allow(this.containers, this.containers, this.port);
}

Mongo.prototype.port = 27017;

Mongo.prototype.deploy = function deploy(deployment) {
  this.containers.forEach(container => container.deploy(deployment));
};

Mongo.prototype.allowFrom = function allowFrom(from, p) {
  allow(from, this.containers, p);
};

Mongo.prototype.uri = function uri(dbName) {
  return `mongodb://${this.containers.map(getHostname).join(',')}/${dbName}`;
};

module.exports = Mongo;
