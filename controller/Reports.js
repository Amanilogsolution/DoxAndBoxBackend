const sql =require('mssql')
const sqlConfig = require('../database/config')

const Reportdata = async (req, res) => {
    const uid_id = req.body.uid_id;
    const location_id = req.body.location_id;
    console.log(uid_id,location_id)
 
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select  distinct s.fileno as Fileno,f.DESCN  as FileName from  tbl_inwardfile as f  with (nolock) left join TBL_INWARDFILESCAN
        as s on f.custid=s.CUSTID and f.WH=s.WH and f.fileNO=s.fileno  where  s.CUSTID='${uid_id}' and s.WH='${location_id}' and   s.fileno is not null order by s.fileno desc `)
        res.send(result.recordset)
    }
    catch(err){
        res.send(err)
        }
}

const ReportdataBoxes = async (req, res) => {
const uid_id = req.body.uid_id;
const location_id = req.body.location_id;
console.log(uid_id,location_id)

try{
    await sql.connect(sqlConfig)
    const result = await sql.query(`select   distinct  s.Boxno,Upper(i.DESCN) as Description  from TBL_INWARDBOXSCAN as s with (nolock) left join tbl_inwardbox as i with (nolock)
    on s.boxno=i.BoxNO and s.CUSTID=i.custid and s.PICKUPNO=i.PICKUPNO
    where isnull(s.boxno,'')<>''  and s.custid='${uid_id}' and s.wh='${location_id}' and s.SCANSTATUS='YES'
    UNION All select  distinct  Boxno,'' as Description from TBL_INWARDFILESCAN with (nolock) where isnull(boxno,'')<>''and custid='${uid_id}'and wh='${location_id}'and SCANSTATUS='YES'`)
    res.send(result.recordset)
}
catch(err){
    res.send(err)
    }
}

const RequestReport = async (req, res) => {
    const cust_id = req.body.cust_id;
    const request_type = req.body.request_type;
    console.log(cust_id,request_type)
    
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select  * from  tbl_rmsrequest with (nolock) where  request_type='${request_type}'  and custid='${cust_id}'`)
        res.send(result.recordset)
    }
    catch(err){
        res.send(err)
        }
    }



module.exports ={Reportdata,ReportdataBoxes,RequestReport}