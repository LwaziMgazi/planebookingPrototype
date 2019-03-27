document.getElementById('ind').addEventListener('click',removeA,false);
document.getElementById('group').addEventListener('click',removeAgroup,false);

function removeA (){
 var individual=document.getElementById('ind');
 var groupB=document.getElementById('group');
 individual.classList.add('active');
 groupB.classList.remove('active');
 var platform=document.getElementById('displayAnimationI');
 var bodyA=document.getElementById('AnimationParent');
 bodyA.removeChild(platform);
}

function removeAgroup(){
    var groupB=document.getElementById('group');
    var individual=document.getElementById('ind');
    groupB.classList.add('active');
    individual.classList.remove('active');
    var platform=document.getElementById('displayAnimationI');
    var bodyA=document.getElementById('AnimationParent');
    bodyA.removeChild(platform);
}

//temporarily button not working

document.getElementById('logIn').addEventListener('click',alertUser,false);
document.getElementById('res').addEventListener('click',alertUser,false);

function alertUser(){
    alert("Feature coming Soon to allow students to get vouchers")
} 

//Moving the plane in a loop

/*var distance=0;
var airplane=document.getElementById('airplane');
    airplane.style.position="absolute";
 function weFly(){
     
       airplane.style.left=distance+distance+distance+"%";
       airplane.style.bottom=distance+"%";
        distance=distance+0.02;
     
     
      var fly=window.requestAnimationFrame(weFly);
        
       if (distance>15)
       {
           
           
                 //airplane.style.left=distance+"%";
                  airplane.style.bottom=20-(distance+0.02)+"%"; 
                    
                 
                  if(distance>27)
                  {
                  
                    distance=0;
                  }
           
           
       }
        }
        weFly();*/

//Displaying the about page

var about=document.getElementById('aboutDisplay');


about.style.display='none';

var aboutShow=document.getElementById('aboutShow');

aboutShow.addEventListener('click',showAbout,false);

function showAbout(){
    about.style.display='block';
    console.log("Im listening")
}
var hideAbout=document.getElementById('hideAbout');
hideAbout.addEventListener('click',hideAboutus,false);
function hideAboutus(){
    about.style.display='none';
    console.log("I Am working");
}
//Displaying the services page

var servicesShow=document.getElementById('services');
var services1=document.getElementById('portfolioModal2');

services1.style.display='none';

servicesShow.addEventListener('click',hideService,false);

function hideService(){
    services1.style.display='block'
}

document.getElementById('closeService').addEventListener('click',closeServicePage,false);
function closeServicePage(){
    services1.style.display='none';
}
//Displaying thecustomer review page
var servicesShow=document.getElementById('review');
var services1=document.getElementById('portfolioModal3');

services1.style.display='none';

servicesShow.addEventListener('click',hideService,false);

function hideService(){
    services1.style.display='block'
}

document.getElementById('closereview').addEventListener('click',closeServicePage,false);
function closeServicePage(){
    services1.style.display='none';
}
