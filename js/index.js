console.clear();

let button = document.querySelector("#getinfo");
button.addEventListener( "click", clickHandler );

let enterKey = document.querySelector("#formcountry");
enterKey.addEventListener("submit", clickHandler);

function clickHandler(e){
  //document.querySelector("#getinfo").innerHTML = "<i class="fas fa-spinner"></i>";
  let input = document.querySelector("#countryname");
  let value = input.value;
  if ( value == "india"){
  value = "republic of india";
  }
  e.preventDefault();
  if ( value.length > 0 ){
    value = value.toLowerCase();
    value = value.trim();
    document.querySelector("#logo").classList.add("fa-spin");
    $.ajax({
      url: "https://restcountries.eu/rest/v2/name/" + value,
      success: ajaxHandler
      
    
    ,error: function(){
      document.querySelector("#logo").classList.remove("fa-spin");
      document.querySelector("#getinfo").innerHTML = "Get info";
      $("#map").addClass("bg-danger");
      $("#map").addClass("display-4");
      // document.querySelector("#info").innerHTML = "<i class=\"fas fa-exclamation\"></i>";
      document.querySelector("#map").innerHTML = "Maybe this country does not exist 👻",
      document.querySelector("#map").innerHTML +=  "<i class=\"fas fa-exclamation\"></i>";


    }

  
});

  } else {
    alert("Please enter a country");
  }

}







 
// button.addEventListener("keyup", enterHandler);
// function enterHandler(){
//   if (event.keyCode === 13) {
//     event.preventDefault();
//     document.getElementById("#info").click();
//    }
//  };
  





// $.ajax -> ajaxHandler([{ name: "Japan", ... }])

function ajaxHandler( data ){
  let countryData = data[0];
  console.log( countryData.name );
  console.log( countryData.capital );
  console.log( countryData.population );
  console.log( countryData.latlng );
  document.querySelector("#map").innerHTML = "";
  openMap({ 
    lat: countryData.latlng[0],
    lon: countryData.latlng[1]
  });
  document.querySelector("#info").innerHTML = `
    <p>Country: ${countryData.name}</p>
    <p>Capital: ${countryData.capital}</p>
    <p>Population: ${countryData.population}</p>
  `;
  document.querySelector("#logo").classList.remove("fa-spin");

}

function openMap( options ){
  if ( options.zoom === undefined ){
    options.zoom = 4;
  }
  if ( options.target === undefined ){
    options.target = "map";
  }
  let map = new ol.Map({
    target: options.target,
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([ options.lon, options.lat ]),
      zoom: options.zoom
    })
  });
}