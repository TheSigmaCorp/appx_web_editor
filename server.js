import express from 'express'
const app = express()
const port = 3000
import path from "path";
import reload from "reload"
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname+"/index.html")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

reload(app);
