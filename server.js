const express = require('express')
const app = express()
const port = 3000
const path = require("path");
const reload = require("reload")

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname+"/index.html")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

reload(app);
