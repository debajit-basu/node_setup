const express = require('express'),
routes = require('./routes/index')
app = express(),
port = process.env.port || 8090;
app.use(express.urlencoded({ extended: true }))

routes(app);
app.listen(port)

console.log(`Api server is running on port: ${port}`)
