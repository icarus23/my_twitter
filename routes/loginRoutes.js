const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const User = require("../schemas/UserSchema");
const bcrypt = require("bcrypt");
const router = express.Router();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    res.status(200).render("login");
})

router.post("/", async (req, res, next) => {
    var payload = req.body;
    if( req.body.logUsername && req.body.logPassword ) {
        var user = await User.findOne({
            $or: [
                {username: req.body.logUsername},
                {email: req.body.logUsername}
            ]
        })
        .catch((err) => {
            console.log(err);
            payload.errorMessage = "Something went wrong.";
            res.status(200).render("login", payload);
        });
        if(user != null) {
            var result = await bcrypt.compare(req.body.logPassword, user.password);

            if(result === true) {
                req.session.user = user;
                return res.redirect("/");
            }
        }
        payload.errorMessage = "Incorrect Login Credentials.";
        return res.status(200).render("login", payload);
    }
    payload.errorMessage = "Make sure both fields have a valid value.";
    res.status(200).render("login");
})

module.exports = router;