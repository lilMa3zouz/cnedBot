let input = document.querySelector('#input')
let result = document.querySelector('#result')
let btn = document.querySelector('#btn')
let heure = document.querySelector('#heure')
let minute = document.querySelector('#minute')
function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var hDisplay = h > 0 ? h : "00";
  var mDisplay = m > 0 ? ":"+ m : ":00";
  var sDisplay = s > 0 ? ":"+ s : "";
  return hDisplay + mDisplay + sDisplay; 
}

function onclick(){
    let progTime = heure.value*3600 + minute.value*60
    var compteur = setInterval(()=>{
      let now = new Date()
      let nowSec = now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds()
      difference = progTime - nowSec
      document.querySelector('#state').innerHTML = "vous serez connecté dans<br> <span id='compteur'>" +secondsToHms(difference) + '</span>'
      if(difference==0){
        clearInterval(compteur)
        url = input.value
        const options = {
          method: 'POST',
          body: JSON.stringify({link: url}),
          headers: {
            'Content-Type': 'application/json'
          }
        }
        fetch(`http://127.0.0.1:5001/cv`,options).then((data)=>{      
          return data.text(); 
        }).then((text)=>{
          document.querySelector('#state').innerHTML = "vous êtes connectés à " + text;
        }).catch(e=>{
          document.querySelector('#state').innerHTML = e;
        })
        }
    },1000)    
  }
  
  btn.addEventListener('click', () => {
    onclick();
  });


 