// const express = require('express')
// const app = express()

// app.get('/', (req, res) => {
//   res.send('Hello World')
// })

// app.listen(5000, () => {
//   console.log('Start server at port 5000.')
// })
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('import-export');
require('./app');