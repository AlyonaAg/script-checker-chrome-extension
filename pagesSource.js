var scripts = document.getElementsByTagName("script");
var scriptsArray = Array.from(scripts);

scriptsArray = scriptsArray.
  map(function(obj){{ return btoa(unescape(encodeURIComponent(obj.innerText))) }}).
  filter(script => script.length > 0);

async function postData(url = '', scripts = '') {
    var obj = new Object();
    obj.count = scripts.length
    obj.scripts = scripts
    const response = await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(obj)
    });
    return response;
}
 
postData('http://localhost:4567/', scriptsArray)
  .then((data) => {
    console.log(data);
  });

