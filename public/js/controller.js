

myApp=angular.module("myApp",["ngRoute"]);

myApp.config(function($routeProvider){
    $routeProvider.when("/available",{
        templateUrl:"/partials/flyFrom.html",
        controller:"ToFlightCtrl"
    }).when("/enterDetails",{
        templateUrl:"/partials/personalDetails.html",
        controller:"personDetails"
    }).when("/contactUs",{
        templateUrl:"/partials/contactUs.html",
        controller:"contactForm"

    }).when("/confirmation",{
        templateUrl:"/partials/confrim.html",
        controller:"confirmCtrl"

    }).when("/groupBooking",{
        templateUrl:"/partials/Unavailable .html",
        controller:"groupCtrl"
    }).when("/groupDetails",{
        templateUrl:"/partials/groupDetails.html",
        controller:"groupDetailsCtrl"
    }).when("/success/:id/:booked",{
         templateUrl:"/partials/sucessful.html",
         controller:"successPay"
    }).when("/unsuccessful",{
        templateUrl:"/partials/unsucessful.html",
        controller:"unsuccessfulPay"

    }).otherwise({
        redirectTo:"/available"
    });

});

myApp.factory("ToFlightService",function($http,$q){



   var BookedFlightTicket={};
   var fromCity;


    return{
        getAvailable:function(){return flightDetails},
        setBookedFlight:function(flights){
             BookedFlightTicket=flights;

            return BookedFlightTicket},
        getBookedFlight:function(){return BookedFlightTicket;},
        setFromCity:function(city){ fromCity=city;},
        getFromCity:function(){return fromCity}
    }



});

myApp.factory("clientService",function(){
   var ClientDetails={};

   return{
       setDetails:function(client){
           ClientDetails=client;
       },
       getDetails:function(){return ClientDetails}
   }
});

myApp.factory("groupService",function(){
    var groupSize;

    return{
        SetNoOfPeople: function(noOfPersons){ groupSize=noOfPersons; },
        getNoOfPeople: function(){return groupSize}

    }

})


myApp.controller("ToFlightCtrl",function($scope,$http,ToFlightService){

    var test=function(callback){
        $http.get('/available').then(function(response){
            callback(response);
        })
    }

 test(function(data){





    var flightDetails=data.data;
    console.log(flightDetails);
    $scope.available=function(){
        var sortedFlight=[];
        var nonAvaliable=document.getElementById("notAvailable");

        if($scope.flight.from)
        {
            console.log($scope.flight.from)


                   for(var i=0;i<flightDetails.length;++i)
                   {
                        if($scope.flight.from!==flightDetails[i].flightTo&&$scope.flight.from===flightDetails[i].flightFromG)
                         {
                            sortedFlight.push(flightDetails[i]);
                          }
                    }

                    console.log(sortedFlight);
                    if(sortedFlight.length>0)
                    {
                   $scope.flightDetails=sortedFlight;

                    ToFlightService.setFromCity($scope.flight.from);
                    nonAvaliable.style.display="none";
                   }
                   else
                   {
                       nonAvaliable.style.display="block";
                    nonAvaliable.innerHTML="<strong>There are no flights Available</strong>";
                    $scope.flightDetails=sortedFlight;
                   }

        }
        else
        {
            nonAvaliable.innerHTML="There are no flight Available";
        }

    }



    $scope.bookedFlight=function(flights)
    {

          $scope.bookedFlight.flightFrom=ToFlightService.getFromCity();
          $scope.bookedFlight=ToFlightService.setBookedFlight(flights);
          console.log($scope.bookedFlight);


    }




});

});

myApp.controller("personDetails",function($scope,ToFlightService,clientService){

    $scope.FLIGHTFROM=ToFlightService.getFromCity();
    $scope.FLIGHTTO=ToFlightService.getBookedFlight().flightTo;
    $scope.DateTo=ToFlightService.getBookedFlight().date;
    $scope.TimeFrom=ToFlightService.getBookedFlight().flightDepature;
    $scope.TimeTo=ToFlightService.getBookedFlight().flightDepature;

    $scope.clientDetails=function(client)
    {
       $scope.client=client;
       console.log($scope.client);
       clientService.setDetails($scope.client);
       var message=document.getElementById("message");

       var cellphone1=$scope.client.cellphone.trim().length==10? $scope.client:false;
       var email=$scope.client.email.trim().length>0 && $scope.client.email.indexOf('@')>-1? $scope.client.email: false;
       if(email && cellphone1){
        window.location='#!/confirmation';
       }
    else{
          message.innerHTML="Some fields are invalid";
       }


    }



});
myApp.controller("confirmCtrl",function($scope,$http,ToFlightService,clientService){

    $scope.amount=ToFlightService.getBookedFlight().flightPrice;
    $scope.FLIGHTFROM=ToFlightService.getFromCity();
    $scope.FLIGHTTO=ToFlightService.getBookedFlight().flightTo;
    $scope.DateTo=ToFlightService.getBookedFlight().date;
    $scope.TimeFrom=ToFlightService.getBookedFlight().flightDepature;
    $scope.TimeTo=ToFlightService.getBookedFlight().flightDepature;
    $scope.flightID=ToFlightService.getBookedFlight().id;
    $scope.flightPrice=ToFlightService.getBookedFlight().flightPrice;

     $scope.ClientBooked=clientService.getDetails();
     console.log($scope.ClientBooked);
     $scope.title=$scope.ClientBooked.title;
     $scope.fname=$scope.ClientBooked.firstname;
     $scope.lname=$scope.ClientBooked.surname;
     $scope.email=$scope.ClientBooked.email;
     $scope.cel_No=$scope.ClientBooked.cellphone;
     $scope.dob=$scope.ClientBooked.ID;
     $scope.bookedPerson=$scope.ClientBooked.cellphone;

     console.log(ToFlightService.getBookedFlight());
  console.log(clientService.getDetails());
  var bookedClientAndFlight=[];

  bookedClientAndFlight.push(ToFlightService.getBookedFlight());
  bookedClientAndFlight.push(clientService.getDetails());
  var bookedFlight=ToFlightService.getBookedFlight();
  var id =bookedFlight.id;
    console.log(id);



  $http.post('/aboutToBook',bookedClientAndFlight);

});

myApp.controller("groupCtrl",function($scope,ToFlightService,groupService){


    $scope.available=function(){




       var bookedgroupflight=[];
       var FlightDetailsG=ToFlightService.getAvailable();
          console.log($scope.groupClient.NoOfPeople);
          groupService.SetNoOfPeople( $scope.groupClient.NoOfPeople);
        for(var i=0;i<FlightDetailsG.length;++i)
        {
            if($scope.groupClient.from===FlightDetailsG[i].flightFromG && $scope.groupClient.to===FlightDetailsG[i].flightTo)
            {
               bookedgroupflight.push(FlightDetailsG[i]);
            }
        }
    $scope.flightDetails=bookedgroupflight;

    };

    $scope.bookedgroupFlight=function(flights){
        ToFlightService.setBookedFlight(flights);
    }
});

myApp.controller("groupDetailsCtrl",function($scope,groupService,ToFlightService){

    $scope.people=[];
    var bookedGroup=[];
    var ticket=ToFlightService.getBookedFlight();

   var y=groupService.getNoOfPeople();


    var i=0;
    while(i<y){


      $scope.people.push({"number":(i+1)});
      ++i;

    }

    $scope.getBookedGroupD=function(groupClient)
    {
         $scope.groups=groupClient;
         bookedGroup.push($scope.groups);
        console.log($scope.groups);
        console.log("Im here");
    }

    $scope.getBookedGroupTotal=function()
    {
         bookedGroup.push(ticket);
        console.log(bookedGroup);
    }

});
myApp.controller("successPay",function($http,$routeParams){

 var id=$routeParams.id;
 var booked=$routeParams.booked;
 console.log(id,booked);
    var bookedClient={
        name:booked
    };


  $http.post('/success',bookedClient);
  $http.delete('/removedBooked/'+id);
});
