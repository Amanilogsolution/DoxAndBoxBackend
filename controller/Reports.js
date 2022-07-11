const sql =require('mssql')
const sqlConfig = require('../config')

const Reportdata = async (req, res) => {
    const uid_id = req.body.uid_id;
 
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT distinct f.DESCN as fileno FROM  tbl_inwardfile AS f WHERE ( f.custid='${uid_id}') and f.DESCN like '%ndd%'
        union  SELECT distinct  fs.fileno FROM TBL_INWARDFILESCAN AS fs  WHERE ( fs.custid='${uid_id}') and fs.fileno like '%f-000%' `)
        res.send(result.recordset)
    }
    catch(err){
        res.send(err)
        }
}
module.exports ={Reportdata}