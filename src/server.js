const path = require('path')
const express = require('express')

const app = express()
app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use('/data', express.static(path.join(__dirname, '..', 'data')))
app.get('/', (req, res) => {
  res.status(200).send('<html><body style="color: #669F64; background: #222; font-size: 20px; font-family: monospace;">await buildSite("www.moscownodejs.ru");</body></html>')
})
app.listen(process.env['PORT'] || 3000)
