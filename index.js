var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", "fe0f2c8d1504bf980adc5f40cd131e1e");
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://v3.football.api-sports.io/leagues", requestOptions)
  .then(response => response.json()) 
  .then(result => appendData(result))
  .catch(error => console.log('error', error));

let appendData = (data) => {
    console.log(data);
  let div = document.getElementById("div");
  div.innerHTML = "";

  const upcomingEvents = [];

  data.response.forEach(item => {
    item.seasons.forEach(season => {
      if (season.current) {
        upcomingEvents.push({
          league: item.league.name,
          country: item.country.name,
          season: season.year,
          start: season.start,
          end: season.end,
          logo: item.league.logo
        });

        let cont = document.createElement("div");
        cont.className = "card";

        let img = document.createElement("img");
        img.src = item.league.logo;

        let name = document.createElement("h3");
        name.innerText = `${item.league.name} (${season.year})`;

        let date = document.createElement("p");
        date.innerText = `Starts: ${season.start} | Ends: ${season.end}`;

        let btn = document.createElement("a");
        btn.className = "btn";
        btn.innerText = "Watch Live";
        btn.href = "#"; // You can change this to a real stream URL
        btn.target = "_blank";

        cont.append(img, name, date, btn);
        div.append(cont);
      }
    });
  });

  console.log("Upcoming Events:", upcomingEvents);
};
