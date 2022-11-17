const CLEAPI = '0b65386df87af2fd106b7d6ff47345ef' ;
let resultatsAPI;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {

        //console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long,lat);

    }, () => {
        alert(`Vous avez refusez la géolocalisation, l'application ne peut pas 
        fonctionner, veuillez l'activer !`)
    })
} 

function AppelAPI(long, lat){

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
       console.log(data);

       resultatsAPI = data;
        temps.innerText = resultatsAPI.weather[0].description;
        temperature.innerText = `${Math.trunc(resultatsAPI.main.temp)}°`
        localisation.innerText = resultatsAPI.name;


        // les heures, par tranche de 3, avec leur température

        let heureActuelle = new Date().getHours();

        for(let i = 0; i < heure.length; i++) {

            let heureIncr = heureActuelle + i * 3;

            heure[i].innerText = `${heureIncr} h`;

        }
    })

}
