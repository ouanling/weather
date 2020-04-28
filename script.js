  var mydata;
  const weathericon = document.querySelector(".weathericon");
  const inputform = document.getElementById("cityform");
  const loadscreen = document.querySelector(".loadscreen");
 
  async function loadCity() {
      let mycity = inputform.value;
      loady();
      
      await apiCall(mycity);
      loadscreen.style.display = "none";
      mydata.makeIcon();

  };
  function loady() {
      loadscreen.style.display = "block";
  };

 async function apiCall(ville) {
    const city = ville;
    try {
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=87a95af944f4be2049342e98d239419d`, {mode: 'cors'});
    const data = await api_call.json();
    if (data.cod !== 200) {
        alert(data.message);}
        else {
            mydata = handleData(data);
            
            
        }
        ;}
    catch (error) {
        console.log('error' + error);
    };
}

const handleData = (data) => {
    const Celcius = Math.floor(data.main.temp - 273.15);
    const Feels = Math.floor(data.main.feels_like - 273.15);
    const makeIcon = () => {
        weathericon.innerHTML = "";
        let iconloc = data.weather[0].icon;
        let descript = data.weather[0].description
        let thetemp = "Temp: " + mydata.Celcius + "°C";
        let thefeels = "Feels like: " + mydata.Feels + "°C";
        let newimg = document.createElement("IMG");
        let newdescript = document.createElement("p");
        let newtemp = document.createElement("P");
        let newfeels = document.createElement("P");
        let fbutton = document.createElement("button");
        fbutton.onclick = function() { alert("Read celcius murican boy");};
        fbutton.innerHTML = "Change to Fahrenheit";
        newdescript.innerText = descript;
        newimg.src = `https://openweathermap.org/img/w/${iconloc}.png`;
        newtemp.innerText = thetemp;
        newfeels.innerText = thefeels;
        weathericon.append(newimg);
        weathericon.append(newdescript);
        weathericon.append(newtemp);
        weathericon.append(newfeels);
        weathericon.append(fbutton);
    };
    return {Celcius, Feels, makeIcon};
};

