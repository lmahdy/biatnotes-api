const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})//we use this to send the index.html file to the client when they request the root directory or the index.html file itself

module.exports = router



/*The point of this code is to define a router in Express.js that handles a specific route (^/$|/index(.html)?) and sends the index.html file located in the views directory to the client when they request the root directory or the index.html file itself. The router is then exported to be used in other modules.*/