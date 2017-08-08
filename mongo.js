const { Container, Service } = require('@quilt/quilt');

const image = 'quilt/mongo';

function Mongo(nWorker) {
  const members = new Container(image).replicate(nWorker);
  this.members = new Service('mongo', members);

  const children = this.members.children().join(',');
  members.forEach((m) => {
    m.setEnv('MEMBERS', children);
  });

  // The initiator is choosen completley arbitrarily.
  members[0].setEnv('INITIATOR', 'true');

  this.members.allowFrom(this.members, this.port);
}

Mongo.prototype.port = 27017;

Mongo.prototype.deploy = function deploy(deployment) {
  deployment.deploy(this.services());
};

Mongo.prototype.services = function services() {
  return [this.members];
};

Mongo.prototype.allowFrom = function allowFrom(from, p) {
  const services = from.services();
  services.forEach((serv) => {
    this.members.allowFrom(serv, p);
  });
};

Mongo.prototype.uri = function uri(dbName) {
  return `mongodb://${this.members.children().join(',')}/${dbName}`;
};

module.exports = Mongo;
