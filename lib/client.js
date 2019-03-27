var fs=require('fs');
var path=require('path');

var client={};

//Base directory of data folder
client.baseDir=path.join(__dirname,'/../client/');

client.create=function(file,data,callback){
    //Open the file for writting
    fs.open(client.baseDir+file+'.json','wx',function(err,fileDescriptor){

        if(!err&&fileDescriptor)
        {
                //convert data to string
                var stringData=JSON.stringify(data);

                //write file and close it 
                fs.writeFile(fileDescriptor,stringData,function(){
                    if(!err){
                        fs.close(fileDescriptor,function(err){
                            if(!err){
                                 console.log("Successs");
                                 callback();
                            }else{
                                console.log('Error closing file');
                            }
                        }) 
                  }else{
                      console.log('Error writting to new file');
                  }
                });

        }
        else
        {
            console.log("coundnt open file");
        }

    });

}

client.read=function(file,callback){
       fs.readFile(client.baseDir+file+'.json','utf8',function(err,data){

        if(!err&&data){
            var parsedData=JSON.parse(data);
            callback(parsedData);
        }else{
           console.log('There was an error reading file');
        }

       });
};

//export the object
module.exports=client;