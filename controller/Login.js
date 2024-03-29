const sql =require('mssql')
const sqlConfig1 = require('../database/config1')

const UserLogin = async (req, res) => {
    const uid_id = req.body.uid_id;
    const uid_pass = req.body.uid_pass;
    console.log(uid_id,uid_pass)
    // console.log(`select UID,uPWD,uName,CUST_ID,cust_name,WHID from User_Rights 
    // with(nolock) WHERE uID='${uid_id}  ' AND uPWD='${uid_pass}' AND ISNULL(CUST_NAME,'')<>'' 
    // AND ISNULL(CUST_ID,'')<>'' and ISNULL(uActive,'')='1'`)
    try{
        const pool = new sql.ConnectionPool(sqlConfig1);
        await pool.connect();
        const result = await pool.query(`select UID,uPWD,uName,CUST_ID,cust_name,WHID,uwh from User_Rights 
        with(nolock) WHERE uID='${uid_id}  ' AND uPWD='${uid_pass}' AND ISNULL(CUST_NAME,'')<>'' 
        AND ISNULL(CUST_ID,'')<>'' and ISNULL(uActive,'')='1'`)
        await pool.close()  
        console.log(result)
        res.send(result.recordset[0])
    }
    catch(err){
        res.send(err)
        console.log(err)
        }
}

const UserPasswordChange = async (req, res) => {
    const uid_id = req.body.uid_id;
    const uid_pass = req.body.uid_pass;
    const whid = req.body.whid;
    const new_password = req.body.new_password;
    console.log(uid_id,uid_pass,whid,new_password)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`
        select * from NEWRMSDB.dbo.User_Rights
        with(nolock) WHERE uID='${uid_id}' AND uPWD='${uid_pass}' 
        AND ISNULL(CUST_NAME,'')<>'' AND ISNULL(CUST_ID,'')<>'' and ISNULL(WHID,'')='${whid}'
        and ISNULL(uActive,'')='1'`)
        console.log(result.recordset[0])
        if(result.recordset[0]){
            const UpdatePassword = await sql.query(`UPDATE  NEWRMSDB.dbo.User_Rights  set uPWD ='${new_password}'
            WHERE uID='${uid_id}' AND uPWD='${uid_pass}' 
           AND ISNULL(CUST_NAME,'')<>'' AND ISNULL(CUST_ID,'')<>'' and ISNULL(WHID,'')='${whid}'
           and ISNULL(uActive,'')='1'`)
           console.log(UpdatePassword)
           res.send('PasswordChanged')
        }
        else{
            res.send('Invalid User')
        }
    }
    catch(err){
        res.send(err)
        console.log(err)
        }
}
module.exports ={UserLogin,UserPasswordChange}