

var username = ""; //Put your Geonames username/API key here
var request = new XMLHttpRequest();
var markers = [];
var marker;
var latitude;
var map;
var longitude;
var x,y,z;
var postalcode;

//initMap() which initiates map to a location
function initMap() {
var url= {lat:32.75,lng:-97.13};
var latitude;
var longitude;
map= new google.maps.Map(document.getElementById('map'),
{
zoom: 17,   
center: url
});

marker= new google.maps.Marker({
position: url,
map: map
});

var infowindow = new google.maps.InfoWindow();//Window to display the weather parameters
var geocoder = new google.maps.Geocoder(); //Geocoder to determine the latitude and longitude parameters

google.maps.event.addListener(map,'click',function (position){
 latitude = position.latLng.lat(); //Determine the latitude
 longitude = position.latLng.lng();//Determine the longitude
var latlng = new google.maps.LatLng({lat: latitude, lng: longitude});
reversegeocode(geocoder,map,infowindow,latlng); 
sendRequest(latitude,longitude);
removemarker();
var pocode = postalcode;
var temperature = x;
var windspeed = y;
var clouds = z;
//document.getElementById("outputtxt").innerHTML = document.getElementById("outputtxt").innerHTML+"\n"+"Results:"+"\n"+
  
//marker.setMap(null);

 });      //Initialize a mouse click event on map which then calls reversegeocode function
 
}

//function to remove the marker
function remove()
{
  var x = document.getElementById("outputtxt").value;
   x = " ";
    document.getElementById("outputtxt").innerHTML = x;
}

// Reserse Geocoding 
function reversegeocode(geocoder,map,infowindow,latlng) {

geocoder.geocode({'latLng':latlng}, function(results,status)
{
  if(status === 'OK')
  {

    if(results[1])
    {

      map.setZoom(17);
     marker = new google.maps.Marker({
      position: latlng,
      map: map
      });

     marker.setMap(map);
    
     postalcode = results[1].formatted_address;
    
     
      //alert(results[0].address_components[7].long_name);
      
     // infowindow.open(map,marker);

      }
      else
      {
        window.alert("No result");
      }  
    }
      else
      {
        window.alert("Reverse Geocoder error due to:"+ status);
      }
    });
  
  }
  // end of geocodeLatLng()

                                  //get the latitude and longitude from the mouse click and get the address.
 function removemarker()
 {
  marker.setMap(null);
   

 }                                //call geoname api asynchronously with latitude and longitude 

function sendRequest (latitude,longitude) {
     var lat = latitude;
     var lng = longitude;
   
  
   request.open("GET"," http://api.geonames.org/findNearByWeatherXML?lat="+lat+"&lng="+lng+"&username="+username,true);
//request.setRequestHeader("Accept","application/xml");
//request.withCredentials = "true";
request.send();     

 
request.onreadystatechange = displayResult;
   /* {
      if(request.readyState == 4){
      displayResult(this);
    }
    }*/

    //request.setRequestHeader("Accept","text/xml");
    
    
}
 


function displayResult (xml) { // get the weather parameters from Geonames using API key
    if (request.readyState == 4) {
      try{
    var infowindow = new google.maps.InfoWindow();
    var xmlDoc = request.responseXML.documentElement;
   var pocode = postalcode;
     x = xmlDoc.getElementsByTagName("temperature")[0].textContent;
     y = xmlDoc.getElementsByTagName("windSpeed")[0].textContent;
  z = xmlDoc.getElementsByTagName("clouds")[0].textContent;
 
     infowindow.open(map,marker);
  infowindow.setContent("<p>"+"PostalAddress:"+pocode+"</br>"+"Temperature: " + x+"C"+"</br>"+"WindSpeed:"+y+"km/hr"+"</br>"+"Clouds:"+z+"</p>");
document.getElementById("outputtxt").innerHTML = document.getElementById("outputtxt").innerHTML+"\n"+"Results:"+"\n"+
  "PostalCode:"+pocode+"\n"+"Temperature: " + x +"C"+"\n"+"WindSpeed:"+y+"km/hr"+"\n"+"Clouds:"+z;
     //alert(x);
  
    
}
  catch(e)
  {
    alert(e.toString());
  }




       

    }
}

