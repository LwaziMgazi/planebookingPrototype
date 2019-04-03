var fs=require('fs');
var path=require('path');


var tickets={};
//Base directory of data folder
tickets.baseDir=path.join(__dirname,'/../data/');

tickets.read=function(file,callback){
      fs.readFile(tickets.baseDir+file+'.json','utf8',function(err,data){
          if(!err&&data)
          {
              var parsedData=JSON.parse(data);
              callback(false,parsedData);
          }
          else
          {
              callback(err,data);
          }
      })


};

//delete a file
tickets.delete=function(id,callback){
    var idC=typeof(id)=='string'?id:false;
    console.log(idC);
    fs.unlink(tickets.baseDir+id+'.json',function(err){
        if(err){
            callback(false);
            console.log('according to this im deleted');
        }
        else{
            callback(err);
        }
    });
}

//list all the items in a dierecto

//export the object
module.exports=tickets;
