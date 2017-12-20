const express = require("express");
const app = express();
const jsonData = require('./data.json');

app.set("port", process.env.PORT || 3001);
console.log('server port', app.get('port'));
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}


const err = (err) => {
    console.log({err});
};

app.get("/api/products", (req, res) => {
    res.json(jsonData);
});

app.get("/api/product/:number", (req, res) => {
    const params = {...req.params};

    if (!(params.number)) {
        res.json({
            error: "Missing required parameter number, params: " + JSON.stringify(params)
        });
        return;
    }
    console.log(params);

    res.json(...jsonData.filter(product => product.number === params.number));
});

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
