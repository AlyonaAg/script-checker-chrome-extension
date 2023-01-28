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

  function getScript(url='') {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
  }
  
  scripts = (Array.from(document.getElementsByTagName("script"))).map(i => {return i.src})

  var scriptsForPost = new Array(); 
  for (index = 0; index < scripts.length; ++index) {
    s = getScript(scripts[index]);
    scriptsForPost.push(btoa(unescape(encodeURIComponent(s))))
  }

  postData('http://localhost:4567/', scriptsForPost)
    .then((data) => {
      console.log(data);
    });
}

