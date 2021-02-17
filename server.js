// server.js
// where your node app starts

const path = require('path');
const app = require("express")()
const yts = require("youtube-search-api")


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Add headers
const indexView = (req, res) => {
    res.sendFile(path.resolve("./public/landing.html"));
}

const getSearch = async (req, res) => {
    try {
        const { searchTerm } = req.params
        const r = await yts.GetListByKeyword(searchTerm, true)
        return res.status(200).json(r)

    } catch (error) {
        console.log(error);
        return res.status(200).json(error)
    }
}

const iconView = (req, res) => {
    res.sendFile(path.resolve("./public/favicon.png"));
}

// Routes
app.get('/', indexView)
app.get("/search/:searchTerm", getSearch)
app.get('/favicon.ico', iconView)

const PORT = process.env.PORT || 4001
app.listen(PORT, () => console.log(`Running on ${PORT}`))
