const express = require('express');
const app = express();
const port = 8008
const sql = require('mssql')
const router = require('./router/router');
const bodyParser = require('body-parser')
const cors = require('cors')
const ejs = require("ejs");
const path = require("path");


const sgMail = require('@sendgrid/mail');
const Api_Key = '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';

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs');

app.use('/api',router)

app.get('/',function(req,res){
res.send('Hlo')
})

app.post('/mail',async(req,res)=>{
    const {Subject,message} = req.body

    console.log(Subject,message)   
    if(Subject === 'RecordPickup'){ 
    var html = await ejs.renderFile(path.join(__dirname, `./templates/request.ejs`), message)
    }
    else if(Subject === 'Report'){
    }

    try{
    sgMail.setApiKey(Api_Key);
    const msg= {
      to:["swishlohan420@gmail.com","aman@ilogsolution.com"],
      from:"reports@doxandbox.co.in",
      subject:Subject,
      html:html
                }
    sgMail.send(msg)
     .then(res =>console.log("Mail Send Successfully"))
       .catch(error => console.log(error))
  }

  catch(err){
    console.log(err)

          }
     }
)




app.listen(port, (err, req, res, next) => {
    if (err)
      console.log("Ouch! Something went wrong")
    console.log(`server listen on: ${port}`)
  })
