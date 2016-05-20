const express = require('express')

const app = express()
app.use((req, res) => res.status(200).send('affe0b804bd2'));
app.listen(8123);
