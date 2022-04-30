const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersModel = require("../Models/DbSchema");

const signin = (req,res) => {
    let loginContent = req.body;
    usersModel.findOne({email:loginContent.email}, async (err,result)=>{
        if (err) {
            res.json({message: 'Network Error', status: false, err})
        } else if (result) {
            // console.log(result);
            let email = result.email
            let validPassword = await bcrypt.compare(loginContent.password, result.password)
            if(validPassword){
                jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "2h", issuer: "localhost:3000"}, (err, token)=>{
                    if(err){
                        {err.message=="jwt expired"? res.json({message: "Session timed out, kindly login again", status: false}) : null;}
                        console.log(err);
                    } else {
                        console.log(token);
                        res.json({message:"Login Succesfully",token, result , status: true})
                    }
               
            })
            } else {
                res.json({message: "Incorrect Password", status: false})
            }
        }  else if (result==null) {
            res.json({message: "Email not registered", status:false})
        }
    })
}

module.exports = {
    signin
}