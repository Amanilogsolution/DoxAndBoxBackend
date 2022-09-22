const twofactor = require("node-2fa");
const sql = require('mssql')
const sqlConfig = require('../../database/config.js')
const os = require('os')
// const uuidv1 = require("uuid/v1");

const GenerateTwofa = async function(req,res){
    const email = req.body.email;
    const org = req.body.org;
    console.log(email,org)
    try{
      const newSecret = twofactor.generateSecret({ name: org, account: email });
      if(newSecret){
        res.send(newSecret)
      
      }else{
        res.send("ScanAgain")

      }
    }  catch (err) {
        console.log(err)
    }
  }


  const VerifyTwofa = async function (req,res){
    const secret = req.body.secret;
    const otp = req.body.otp;
    const userid = req.body.userid;

    console.log('hlo',secret,otp,userid)
    try{
        await sql.connect(sqlConfig)
      const result = twofactor.verifyToken(secret, otp);
      if(result && result.delta === 0){
        const Twofa = await sql.query(`insert into tbl_authenticator (secretkey,authallow,username) values('${secret}','yes','${userid}')`)
        // const Login = await sql.query(`update FINSDB.dbo.tbl_Login set comp_ip='${req.ip}',login_time=GETDATE(),status='Login',user_system='${userAgent}'  WHERE user_id ='${userid}'`)
        console.log(Twofa)
        res.send("Verify")
      }else{
        res.send("NotVerify")
      }
  
    }catch (err) {
        console.log(err)
    }
  }

  module.exports = {GenerateTwofa,VerifyTwofa}
