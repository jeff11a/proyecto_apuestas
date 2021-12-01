const btnDashboard = document.getElementById('btn-dashboard');
const btnUsers = document.getElementById('btn-users');
const btnBets = document.getElementById('btn-bets');
const btnReports = document.getElementById('btn-reports');


if(btnDashboard){
    btnDashboard.addEventListener('click', function(){
        //btnDashboard.classList.add('active');
    });
}

if(btnUsers){
    btnUsers.addEventListener('click', function() {
        //activar(btnUsers);
    });
}

if(btnBets){
    btnBets.addEventListener('click', () => {
        // activar(btnBets);
     });
}

if(btnReports){
    btnReports.addEventListener('click', () => {
        //activar(btnReports);
    });
}