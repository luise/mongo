var Mongo = require("github.com/quilt/mongo");
var nWorker = 3;

var deployment = createDeployment({});

var baseMachine = new Machine({
    provider: "Amazon",
    cpu: new Range(2),
    ram: new Range(2),
    sshKeys: githubKeys("ejj"),
});
var mongo = new Mongo(nWorker);

deployment.deploy(baseMachine.asMaster());
deployment.deploy(baseMachine.asWorker().replicate(nWorker));
deployment.deploy(mongo);
