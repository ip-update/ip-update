//(c)2022, MIT Style License <ip-update.net/LICENSE.txt>
// Feel free to copy, change and improve,
// but do consider to leave your feedback and suggestions on:
// https://github.com/ip-update/ip-update/discussions
"use strict";
var $ipuo_check = function () {
  function showmsg() {
	var t_style = document.createElement("style");
	t_style.innerHTML = `
#ipupop {
  padding: 14px;
  background: #fff;
  border: 2px solid rgba(0, 191, 56, 0.7);
  border-radius: 5px;
  max-width: 30%;
  position: absolute;
  top: 2em;
  right: 2em;
  transition: all 250ms ease-in-out;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
}
#ipupop.hidden {
    transform: translateY(-130%);
    visibility: hidden;
    opacity: 0;
}
#ipupop .close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}
#ipupop a:hover {
  color: #00BF38;
}
#ipupop div {
  max-height: 10%;
  overflow: auto;
}
@media (prefers-color-scheme: dark) {
  #ipupop {
    background: #333;
    color: #fff;
  }
  #ipupop .close {
    color: #888;
  }
}`;
	var t_body = document.getElementsByTagName("body")[0] || document.body;
	var t_div = document.createElement("div");
	t_div.id = "ipupop";
	var def_div_class = "hidden";
	t_div.className = def_div_class;
  t_body.insertBefore(t_div, t_body.firstChild);

	var t_a = document.createElement("a");
	t_a.className = "close";
	t_a.href = "#";
	t_a.onclick = () => { t_div.className = def_div_class; return false; };
	t_a.innerHTML = "&times;";
  var t_m = document.createElement("div");
	t_m.innerHTML = 'Your internet connection does not seem to support current internet standards. Please contact your internet provider and ask them about IPv6. Read more at <a href="https://ip-update.net/#NoIPv6" target="_blank" rel="noopener">ip-update.net</a>.';
	t_div.appendChild(t_a)
	t_div.appendChild(t_m)
  t_div.className = ""; // actually trigger show

	// adding style first, goal to have other styles be able to override
	var t_head = document.getElementsByTagName("head")[0] || document.body;
	t_head.insertBefore(t_style, t_head.firstChild);
  }
  // possible alternative API: https://jsonip.com
  fetch('https://api6.ipify.org/?format=json', { mode: 'cors', credentials: 'omit'})
  .then(r => {
        //console.log("ipv6 response", r);
        if (!r.ok) { // this is fine
            // throw Error(r.statusText);
            return r.status;
        }
        return r.json();
    })
  //.then(r => console.log("ipv6 data", r))
  .catch(e => { // no connection for some reason, assume no IPv6
    console.error("no ipv6?", e);
	showmsg(e);
  });

};
$ipuo_check();
