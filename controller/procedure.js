const sql =require('mssql')
const sqlConfig = require('../database/config')

const Data = async (req,res) => {
    const startDate = req.body.startDate;
    const reportType = req.body.reportType;
    const endDate = req.body.endDate;
    const custId = req.body.custId;
    const Whid = req.body.Whid;
    console.log(reportType,custId,Whid,startDate,endDate)
   
    try{
        const pool = new sql.ConnectionPool(sqlConfig);
        await pool.connect();
        const result = await pool.request()
        .input('startDate',startDate)
        .input('endDate',endDate)
        .input('custId',custId)
        .input('Whid',Whid)
        .input('reportType',reportType)
        .execute('DBOXREPORT')
        res.send(result.recordset)
        console.log(result)
    }
    catch (err){
        res.send(err)
    }
}

const AddRequest = async (req,res) => {
    const request_type = req.body.request_type
    const location = req.body.location;
    const noof_files = req.body.noof_files;
    const request_date = req.body.request_date;
    const request_time = req.body.request_time;
    const file_name = req.body.file_name;
    const retrival_type = req.body.retrival_type;
    const delivery_type = req.body.delivery_type;
    const noof_pages = req.body.noof_pages;
    const onsite = req.body.onsite;
    const activity = req.body.activity;
    const remark = req.body.remark;
    const entry_by = req.body.entry_by;
    const FILEID = req.body.FILEID;
    const WHID = req.body.WHID;
    const requestid = req.body.requestid;
    const custid = req.body.custid;
    const TYPE = req.body.TYPE;
    const Contactperson = req.body.Contactperson;
    const Personno = req.body.Personno;
    const Deparment = req.body.Deparment;
    const Boxno = req.body.Boxno;
    const DESCN = req.body.DESCN

    console.log(request_type,location,noof_files,request_date,request_time,file_name,retrival_type,delivery_type,noof_pages,onsite,activity,remark,entry_by,FILEID,WHID,requestid,custid,TYPE,Contactperson,Personno,Deparment,Boxno,DESCN)
   
    try{
        const pool = new sql.ConnectionPool(sqlConfig);
        await pool.connect();
        const result = await pool.request()
        .input('request_type',request_type)
        .input('location',location)
        .input('noof_files',noof_files)
        .input('onsite',onsite)
        .input('request_date',request_date)
        .input('request_time',request_time)
        .input('file_name',file_name)
        .input('retrival_type',retrival_type)
        .input('delivery_type',delivery_type)
        .input('noof_pages',noof_pages)
        .input('activity',activity)
        .input('remark',remark)
        .input('entry_by',entry_by)
        .input('FILEID',FILEID)
        .input('WHID',WHID)
        .input('requestid',requestid)
        .input('custid',custid)
        .input('TYPE',TYPE)
        .input('Contactperson',Contactperson)
        .input('Personno',Personno)
        .input('Deparment',Deparment)
        .input('Boxno',Boxno)
        .input('DESCN',DESCN)
        .execute('RMSrequest')
        // console.log(result)
        res.send(statusCodes.OK)
    }
    catch (err){
        res.send(err)
    }
}

module.exports ={Data,AddRequest}