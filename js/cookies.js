function setSimpleCookie(nom,valeur){
	document.cookie=nom+'='+escape(valeur);
}

function setCookie(nom,valeur,jours){
	var expDate=new Date();
	expDate.setTime(expDate.getTime()+(jours*86400000));
	document.cookie=nom+'='+escape(valeur)+';expires='+expDate.toGMTString();
}

function getCookie(nom){
	deb = document.cookie.indexOf(nom+'=');
	if (deb>=0) {
		deb+=nom.length+1;
		fin = document.cookie.indexOf(';',deb);
		if (fin<0) fin=document.cookie.length;
		return unescape(document.cookie.substring(deb,fin));
	}
	return false;
	alert('false');
}

function delCookie(nom){setCookie(nom,"-1_0",-1);}