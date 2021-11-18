const express = require("express")
const path = require("path")
const Rollbar = require("rollbar")

var rollbar = new Rollbar({
    accessToken: 'f0be67b939be45f4913905343bc12c41',
    captureUncaught: true,
    captureUnhandledRejections: true,
  })
  
  // record a generic message and send it to Rollbar
  rollbar.log('Hello world!')

const app = express()
 app.use(express.json())
  
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"))
    rollbar.info("HTML file served successfully")
    })
    
app.use(rollbar.errorHandler())

const port = process.env.PORT || 4004

app.listen(port, () => {
    console.log(`The force is strong on ${port}`)
})