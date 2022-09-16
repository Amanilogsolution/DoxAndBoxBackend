const sql =require('mssql')
const sqlConfig1 = require('../database/config1')

const lastcount = async (req, res) => { 
    const whid = req.body.whid 
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select COUNT(DISTINCT(requestid)) from NEWRMSDB.dbo.tbl_rmsrequest where whid ='GGN2'`)
        res.send(result.recordset)
        console.log(result.recordset)
    }
    catch(err){
        res.send(err)
        }
}

module.exports={lastcount}