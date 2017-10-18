# MongoDB for Kelda

This repository implements a MongoDB specification for Kelda.js.  See
[Kelda](http://kelda.io) for more information.

```javascript
var Mongo = require("github.com/kelda/mongo");

var deployment = createDeployment({});
(new Mongo(3)).deploy(deployment);
```
