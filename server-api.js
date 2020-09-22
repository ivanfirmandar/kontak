let mongoose = require("mongoose");
let express = require("express");
let app = express();
let bodyParser = require('body-parser');
const {
    send
} = require("process");
let Schema = mongoose.Schema
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/kontak", {
    useNewUrlParser: true
}, (err) => {
    if (err) throw err;
    console.log("Berhasil Connect ke Database");
});

let kontak = new Schema({
    _id: Number,
    name: String,
    nomor: Number
});

let KontakBaru = mongoose.model("telepons", kontak);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//GET DATA
app.get("/kontak", function (req, res) {
    if (req.query.id) {
        KontakBaru.find({
            "_id": req.query.id
        }, function (err, doc) {
            if (err) console.error(err);
            res.json(doc);
            res.end();
        })
    } else {
        KontakBaru.find({},
            function (err, doc) {
                if (err) throw err;
                res.json(doc);
                res.end();
            })
    }

})
//POST DATA
app.post("/kontak", function (req, res) {

    let KontakBaru1 = new KontakBaru({
        _id: req.body.id,
        name: req.body.name,
        nomor: req.body.telepon
    })
    KontakBaru1.save(function (err, kontak) {
        if (err) throw err;
        res.json(kontak);
    })
})

//UPDATE DATA
app.put("/kontak", function (req, res) {
    KontakBaru.findOneAndUpdate({
        _id: req.body.id
    }, req.body, {
        new: true
    }, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
})
app.delete("/kontak", function (req, res) {
    KontakBaru.remove({
        _id: req.body.id
    }, function (err, kontak) {
        if (err)
            res.send(err);
        res.json({
            message: 'Kontak successfully deleted'
        });
    });
});

app.listen(3000);