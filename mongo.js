const {Container, Service} = require("@quilt/quilt");
var image = "quilt/mongo";

function Mongo(nWorker) {
  var members = new Container(image).replicate(nWorker);
  this._members = new Service("mongo", members);

  var children = this._members.children().join(",");
  members.forEach(function(m) {
    m.setEnv("MEMBERS", children);
  })

  // The initiator is choosen completley arbitrarily.
  members[0].setEnv("INITIATOR", "true");

  this._members.connect(this.port, this._members);
};

Mongo.prototype.port = 27017;

Mongo.prototype.deploy = function(deployment) {
  deployment.deploy(this.services());
};

Mongo.prototype.services = function() {
  return [this._members];
};

Mongo.prototype.connect = function(p, to) {
  var services = to.services();
  for (i = 0; i < services.length; i++) {
    this._members.connect(p, services[i]);
  }
};

Mongo.prototype.uri = function(dbName) {
  return "mongodb://" + this._members.children().join(",") + "/" + dbName;
};

module.exports = Mongo;
