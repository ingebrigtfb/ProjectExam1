//Vise brukernavn ved innlogging til admin 

var usernameData = localStorage.getItem('name');

if(usernameData) {
    document.getElementById('userName').innerText = usernameData;
} else {
    document.getElementById('userName').innerText = 'No data'
}

