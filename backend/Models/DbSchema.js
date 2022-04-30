const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname:{
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    account_no: {
        type: String,
        unique: true,
        require: true
    },
    bvn: {
        type: String,
    },
    phone_no: {
        type: String,
    },
    password: {
        type: String
    },
    verify_acc: {
        type: Boolean,
        default: false,
        require: true
    }
}, { timestamps:true });

userSchema.pre('save', async function (next) {
    let { password } = this;
    const saltRound = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, saltRound)
    next()
})

const usersModel = mongoose.model("user", userSchema);

module.exports = usersModel;