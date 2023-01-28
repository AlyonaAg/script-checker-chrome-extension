var is_enabled = "";

check_enable();

function check_enable(){
  chrome.storage.local.get('enabled', function(result){
  is_enabled = result.enabled;
  if (is_enabled == 'true')
  {
    send_scripts()
  }
  });
}

function send_scripts(){
  async function postData(url = '', scripts = '') {
      var obj = new Object();
      obj.count = scripts.length
      obj.scripts = scripts
      obj.url = window.location.href
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
  
  scripts = (Array.from(document.getElementsByTagName("script"))).map(i => {return i.src})

  postData('http://localhost:4567/v1/scripts', scripts)
    .then((data) => {
      console.log(data);
    });
}

