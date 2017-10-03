# MongoDB for Quilt

This repository implements a MongoDB specification for Quilt.js.  See
[Quilt](http://quilt.io) for more information.

```javascript
var Mongo = require("github.com/quilt/mongo");

var deployment = createDeployment({});
(new Mongo(3)).deploy(deployment);
```
