const sql =require('mssql')
const sqlConfig = require('../database/config')

const IdCount = async (req, res) => {
    const whid = req.body.whid;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select RMSBookid  from NEWRMSDB.dbo.tbl_whmaster tw where WHid ='${whid}'`)
        res.send(result.recordset)
    }
    catch(err){
        res.send(err)
        }
}

module.exports={IdCount}