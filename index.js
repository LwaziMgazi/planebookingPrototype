var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var PORT= process.env.PORT || 4000;
const nodemailer=require('nodemailer');
var ticketData=require('./lib/tickets');
var fs=require('fs');
var path=require('path');
var Clients=require('./lib/client')
var url=require('url');


app.use(express.static(__dirname+'/public'));

app.use(bodyParser.json());

app.get('/available',function(req,res){



    var returnArray= function(callback){

    var dir=path.join(__dirname,'./data/');
    fs.readdir(dir,function(err,data){
         if(!err&&data && data.length>0){
             var ticketsNames=[];
             var flightTicketsList=[];
             data.forEach(function(fileName){
              ticketsNames.push(fileName.replace('.json',''));
            });


            var i=1;
            var limit=ticketsNames.length;
            ticketsNames.forEach(function(ticketN){

              ticketData.read(ticketN,function(err,data){

                   flightTicketsList.push(data);


                   if(i==limit)
                   {
                     callback(flightTicketsList);

                   }
                   i++;
             });

            });

         }


      });
    }



     returnArray(function(flightTickets){

      var payloadString='';
      payloadString=JSON.stringify(flightTickets);
      res.end(payloadString);

    });
});

app.post('/aboutToBook',function(req,res){

    var id=req.body[1].id;
    var flightDepature=req.body[0].flightDepature;
    var date=req.body[0].date;
    var flightArrival=req.body[0].flightArrival;
    var flightTo=req.body[0].flightTo;
    var flightPrice=req.body[0].flightPrice;
    var flightFrom=req.body[0].flightFromG;
    var title=req.body[1].title;
    var firstname=req.body[1].firstname;
    var surname=req.body[1].surname;
    var email=req.body[1].email;
    var clientDOB=req.body[1].ID;
    var cell=req.body[1].cellphone;

    var bookedClient={
        'id':id,
        'title':title,
        'firstname':firstname,
        'surname':surname,
        'email': email,
        'flyFrom':flightFrom,
        'flyTo':flightTo,
        'flyDate':date,
        'flightArrivalTime':flightArrival,
        'flightPrice':flightPrice,
        'DOB': clientDOB,
        'cellPhone':cell

    }


    Clients.create(cell,bookedClient,function(){
      console.log('sucesss');
    })



});

app.post('/success',function(req,res){
     //read data from file
     var bookedClientDetails=req.body.name;


    Clients.read(bookedClientDetails,function(bookedClient){



        var title=bookedClient.title;
        var firstname=bookedClient.firstname;
        var Surname=bookedClient.surname;
        var email=bookedClient.email;
        var clientDOB=bookedClient.DOB;
        var cell=bookedClient.cellPhone;
        var flightFrom=bookedClient.flyFrom;
        var flightTo=bookedClient.flyTo;
        var date=bookedClient.flyDate;

        

    const output= ' <h3>A new Client has Booked</h3><br><ul><li>Name:'+title+firstname+'</li><br><li>Surname:'+Surname+'</li><br><li>email:'+email+'</li><br><li>CellPhone:'+cell+'</li><br><li>DOB:'+clientDOB+'</li><br><li>Flying From:'+flightFrom +'</li><br><li>fly To:'+flightTo +'</li><li>Date: '+ date +'</li> </ul>'

     //create reusable transporter object using the defualt SMTP transport

   let transporter=nodemailer.createTransport({
    host: 'mail.circumfort.co.za',
    port: 587,
    secure: false,//true for 465,false for other ports
    auth: {
      user: 'lwazi@circumfort.co.za',
      pass:  'Iws@CAS2me2',  // generated ethereal password

     },
      tls:{
           rejectUnauthorized:false
         }

 });
//setup mail data with unicorn symbols
  let mailOptions={
   from: '"Air Student "<ntshangasent@gmail.com>',//sender address
   to:'lwazi@circumfort.co.za,ntshangasent@gmail.com,nntshangase3@gmail.com ',//list of receiver
   subject:'New Bookings',
   text:'Hello World!',
   html: output// html body

 };


//send mail with defined transport object
  transporter.sendMail(mailOptions,function(error,info){
    if(error)
    {
       return console.log(error);
     }
     console.log('Message sent:%s',info.messageId);
     console.log('Preview URL:%s',nodemailer.getTestMessageUrl(info));
   });

  });
});

app.delete('/removedBooked/:id',function(req,res){
  var id =req.params.id;
  console.log(id);

  ticketData.delete(id,function(err){
    if(err)
    {
      console.log('file Deleted');
    }
    else
    {
      console.log(err);
    }
  }
  );


});

app.listen(PORT,function(){
    console.log('Running on port 4000');
});
