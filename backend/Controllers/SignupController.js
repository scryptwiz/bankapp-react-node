const usersModel = require("../Models/DbSchema");

const signup = (req,res) => {
    // console.log(req.body);
    let { firstname, lastname, email, password } = req.body;
    const account_no = Math.floor(10000000000 + Math.random() * 90000000000)
    const signup = new usersModel({ firstname, lastname, email, password, account_no })
    signup.save((err)=> {
        if(!err) {
            res.json({message:"Signed Up Successfully", status: true});
        } else {
            if (err.keyPattern.email==1) {
                res.json({message:"Email Already Existed", status: false})
            } else {
                res.json({message:err, status:false})
            }
        }
    })
}

module.exports = {
    signup
}