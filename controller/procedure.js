const sql =require('mssql')
const sqlConfig = require('../config')

const Data = async (req,res) => {
    const startDate = req.body.startDate;
    const reportType = req.body.reportType;
    const endDate = req.body.endDate;
    const custId = req.body.custId;
    console.log(startDate,reportType,endDate,custId)
   
    try{
        const pool = new sql.ConnectionPool(sqlConfig);
        await pool.connect();
        const result = await pool.request()
        .input('startDate',startDate)
        .input('reportType',reportType)
        .input('endDate',endDate)
        .input('custId',custId)
        .execute('RMSREPORT')
        res.send(result.recordset)
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

    console.log(request_type,location,noof_files,request_date,request_time,file_name,retrival_type,delivery_type,noof_pages,onsite,activity,remark,entry_by)
   
    try{
        const pool = new sql.ConnectionPool(sqlConfig);
        await pool.connect();
        const result = await pool.request()
        .input('request_type',request_type)
        .input('location',location)
        .input('noof_files',noof_files)
        .input('request_date',request_date)
        .input('request_time',request_time)
        .input('file_name',file_name)
        .input('retrival_type',retrival_type)
        .input('delivery_type',delivery_type)
        .input('noof_pages',noof_pages)
        .input('activity',activity)
        .input('remark',remark)
        .input('entry_by',entry_by)
        .execute('RMSrequest')

        // console.log(result.rowsAffected[0])
        res.send(statusCodes.OK)
    }
    catch (err){
        res.send(err)
    }
}

module.exports ={Data,AddRequest}