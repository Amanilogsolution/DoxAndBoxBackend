const sql =require('mssql')
const sqlConfig = require('../config')

const ProfileDetails = async (req, res) => {
    const uid_id = req.body.uid_id;
 
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT custname,custemail,custadd ,custadd1 ,custcity ,custstate ,custpin ,custcountry ,
        convert(varchar(15),custdoe,105) as custdoe,custcontactno  
        from NEWAWLDB.dbo.tbl_customer tc  with (nolock) where custid ='${uid_id}'`)
        res.send(result.recordset[0])
    }
    catch(err){
        res.send(err)
        }
}
module.exports ={ProfileDetails}