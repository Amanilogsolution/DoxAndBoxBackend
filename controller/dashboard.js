const sql =require('mssql')
const sqlConfig = require('../database/config')

const dashboardetails = async (req, res) => { 
    const CUSTID = req.body.CUSTID;
    const wh = req.body.wh;
    console.log(CUSTID,wh)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select  count(distinct fileno) as Current_month_activefile,(select  count(distinct fileno) as total from TBL_INWARDFILESCAN where
        CUSTID='${CUSTID}' and WH='${wh}'  and OUTSTATUS is null) as LTActivefile,(select  count(distinct fileno) as Current_month_activefile
        from TBL_INWARDFILESCAN where CUSTID='${CUSTID}' and WH='${wh}'
         and  CONVERT(date,ENTRYON) between DATEADD(month, DATEDIFF(month, 0,getdate()), 0) and getdate()) as CurrentMonthFile,
        (select  count(distinct fileno) as Current_month_activefile
        from TBL_INWARDFILESCAN where CUSTID='${CUSTID}' and WH='${wh}') as  InwardFileMonth,(select  COUNT(fileno) as Fileno from tbl_RMDN where  CUSTID='${CUSTID}' and WH='${wh}' and
          CONVERT(date,ENTRYDATE) between DATEADD(month, DATEDIFF(month, 0,getdate()), 0) and getdate()) as OUTCURRENTMONTH,
          (select  COUNT(fileno) as Fileno from tbl_RMDN where  CUSTID='${CUSTID}' and WH='${wh}' and
          MDN_POSTdate is  not null ) as TotalOUT,( select  count (boxno)  from TBL_INWARDBOXSCAN where OUTSTATUS is  null and CUSTID='${CUSTID}' and WH='${wh}'
          and CONVERT(date,ENTRYON) between DATEADD(month, DATEDIFF(month, 0,getdate()), 0) and getdate()) as CurrentMonthActiveBOX,(select  count (boxno) 
          from TBL_INWARDBOXSCAN where OUTSTATUS is null and CUSTID='${CUSTID}' and WH='${wh}') as Lifettimeactivebox,
        (select  count (boxno) from TBL_INWARDBOXSCAN where   CUSTID='${CUSTID}' and WH='${wh}'
           and CONVERT(date,ENTRYON) between DATEADD(month, DATEDIFF(month, 0,getdate()), 0) and getdate() ) as CurrentInwardbox,
           (select  count (boxno) from TBL_INWARDBOXSCAN where   CUSTID='${CUSTID}' and WH='${wh}') as TotalLIFETIMEInwardbox,(
        select  count (BOXNO)  from tbl_RMDNBOX where CUSTID='${CUSTID}' and WH='${wh}' and Mdn_post is not null and 
          CONVERT(date,ENTRYDATE) between DATEADD(month, DATEDIFF(month, 0,getdate()), 0) and getdate()
        ) as CurrentOutBox,(select  count (BOXNO)  from tbl_RMDNBOX where CUSTID='${CUSTID}' and WH='${wh}' and Mdn_post is not null) as outboxLifetime
           from TBL_INWARDFILESCAN where CUSTID='${CUSTID}' and WH='${wh}'
         and OUTSTATUS is null and  CONVERT(date,ENTRYON) between DATEADD(month, DATEDIFF(month, 0,getdate()), 0) and getdate()`)
        res.send(result.recordset[0])
    }
    catch(err){
        res.send(err)
        }
}

const dashbaordetailsBar = async(req,res) =>{
  const arr =[];
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
'July', 'August', 'September', 'October', 'November', 'December'];

  try{
    await sql.connect(sqlConfig)
    const result = await sql.query(`select  distinct count(fileno) as nooffile, DATENAME(mm, entrydate) AS Month  from tbl_inwardfile  where wh='GGN2' and custid='ORBIS' group by DATENAME(mm, entrydate)
    `)
    const data = result.recordset

    for(i=0;i<months.length;i++){
      for(j=0;j<data.length;j++){
          if(months[i] === data[j].Month){
              arr.push({"Active":data[j].nooffile,"Month":data[j].Month})
          }
      }
  }
    res.send(arr)

  }
  catch(err){
    res.send(err)
    }

}

const dashbaordetailsPie = async(req,res) =>{
  const CUSTID = req.body.CUSTID;
  const wh = req.body.wh;
  // console.log('Pie',CUSTID,wh)

  const arr =[]
  const name =["RecordPickup","RecorRetrival","ShreddingRequest","Scanning","OtherRequest"]


  try{
    await sql.connect(sqlConfig)
    const result = await sql.query(`select  COUNT(*) as RecordPickup,(select  COUNT(*) as RecorRetrival  from  tbl_rmsrequest
    where request_type='RecorRetrival' and custid='${CUSTID}' and whid='${wh}') as RecorRetrival, (select  COUNT(*) as RecorRetrival  from  tbl_rmsrequest
    where request_type='ShreddingRequest' and custid='${CUSTID}' and whid='${wh}') as ShreddingRequest,(select  COUNT(*) as RecorRetrival  from  tbl_rmsrequest
    where request_type='Scaning' and custid='${CUSTID}' and whid='${wh}') as Scanning,(select  COUNT(*) as RecorRetrival  from  tbl_rmsrequest
    where request_type='OtherRequest' and custid='${CUSTID}' and whid='${wh}') as OtherRequest from  tbl_rmsrequest
    where request_type='RecordPickup' and custid='${CUSTID}' and whid='${wh}'`)
    // console.log((result.recordset))
    const data = result.recordset[0]

    for(let i=0;i<5;i++){
      arr.push({"name":name[i],"value":data[name[i]]})
    }
    res.send(arr)

    console.log(arr)

    

  }
  catch(err){
    res.send(err)
    }

}

module.exports = {dashboardetails,dashbaordetailsBar,dashbaordetailsPie}