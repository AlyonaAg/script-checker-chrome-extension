initialize();
listen();

function initialize() {
	var isEnabled = "";
	chrome.storage.local.get('enabled', function(result){
		set_checkbox(result.enabled);
	});
}

function set_checkbox(isEnabled)
{
	if (isEnabled == 'true') {
		document.getElementById("state").checked = true;
	}
	else if (isEnabled == 'false'){
		document.getElementById("state").checked = false;
	}
	else if (typeof isEnabled === 'undefined')
	{
		isEnabled = true;
		chrome.storage.local.set({'enabled': 'true'}, function(){
			set_checkbox('true');
		});
	}
	listen();
}

function listen()
{
	document.addEventListener("DOMContentLoaded", function (event) {
	    var _selector = document.querySelector('input[id="state"]');
	    _selector.addEventListener('change', function (event) {
	        if (_selector.checked) {
				chrome.storage.local.set({'enabled': 'true'}, function(){
					set_checkbox('true');
				});
	        } else {
	     		chrome.storage.local.set({'enabled': 'false'}, function(){
	     			set_checkbox('false');
	     		});
	        }
	    });
	});
}