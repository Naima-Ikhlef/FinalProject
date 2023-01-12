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

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}8&lon=${long}&exclude=daily,minutely,alerts&units=metric&lang=fr&appid=${CLEAPI}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        console.log(data);

       resultatsAPI = data;
        temps.innerText = resultatsAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`
        localisation.innerText = resultatsAPI.timezone;


        // les heures, par tranche de 2, avec leur température

        let heureActuelle = new Date().getHours();

        for(let i = 0; i < heure.length; i++){
            let heureIncr = heureActuelle + i *2;

            if(heureIncr > 24){
                heure[i].innerText = `${heureIncr - 24}h`;
            }else if(heureIncr === 24){
                heure[i].innerText = "00h";
            }else{
                heure[i].innerText = `${heureIncr}h`;
            }
        }

        // temp pour heure 
        
        for(let j = 0; j < tempPourH.length; j++){
            tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j *2].temp)}°`;
        }
    })

}
