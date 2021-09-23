const mongoose = require("mongoose");
var dotenv = require('dotenv');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

dotenv.config();

class Database {
    constructor() {
        this.connect();
    } 
    connect() {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => {
                console.log("Database Connection Successful");
            })
            .catch((err) => {
                console.log("Database Connection Error "+ err);
            })
    }
}

module.exports = new Database();