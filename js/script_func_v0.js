var cantIntentos_glo = 0;

$(document).ready(function() {
    let dv__1 = $('#dv_pop__01');
    let dv__2 = $('#dv_pop__02');
    let dv__3 = $('#dv_pop__03');
    dv__1.hide();
    dv__2.hide();
    dv__3.hide();

    var dateFunction = localStorage.getItem('dateFunction');
    var numIntent = localStorage.getItem('numIntent');

    if(numIntent)
        cantIntentos_glo = numIntent;

    if(cantIntentos_glo>5){
        alert('You exceeded your attempt limit');
        return;
    }

    if (dateFunction){
        console.log("si");
        dv__3.show();
        queryAgree(dateFunction, cantIntentos_glo);
    } 
});

function env_token()
{
    console.log("token: "+ $('#token').val());
    let dv__2 = $('#dv_pop__01');
    dv__2.show();
}

function env_disagree()
{
    let dv__1 = $('#dv_pop__01');
    dv__1.hide();
}

function env_agree()
{
    let token__number = $('#token').val();
    let callsign = $('#callsign').val();

    let dv__1 = $('#dv_pop__01');
    let dv__2 = $('#dv_pop__02');
    let dv__3 = $('#dv_pop__03');

    if(token__number!="" && callsign!=""){
        console.log('Logic 1');
        dv__2.show();
        dv__1.hide();
        dv__3.hide();

        if(localStorage.getItem('numIntent'))
            localStorage.removeItem('numIntent');
            cantIntentos_glo = 0;
    }else{
        dv__1.hide();
        dv__3.show();

        //Logica para obtener fecha y hora y esperar 60 segundos, se usará el localStorage
        cantIntentos_glo++;
        localStorage.setItem('numIntent', cantIntentos_glo);

        if(cantIntentos_glo <= 5){
            dv__1.hide();
            dv__2.hide();

            let date = moment().add(60, "s")._d;
            localStorage.setItem('dateFunction', date);
            let message = "<a onclick='close__dv3();'>Retry Now</a>"
            countdown(date, 'txt__pops__3', message, cantIntentos_glo);
        }else{
            alert('You exceeded your attempt limit');
            dv__3.hide();
        }

    }
}

function queryAgree(dateFunction, intentos){
    let message = "<a onclick='close__dv3();'>Retry Now</a>"
    countdown(dateFunction, 'txt__pops__3', message, intentos);
}

function close__dv3() { 
    localStorage.removeItem('dateFunction');
    $('#dv_pop__01').hide(); 
    $('#dv_pop__02').hide(); 
    $('#dv_pop__03').hide(); 
}

function env_end()
{
    let dv__2 = $('#dv_pop__02');
    dv__2.hide();

    $('#token').val('');
    $('#callsign').val('');
}


const getRemainTime = deadline => {
    let now = new Date(),
    remainTime = (new Date(deadline) - now + 1000) / 1000,
    remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
    remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
    remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
    remainDays = Math.floor(remainTime / (3600 * 24));

    return {
        remainTime,
        remainSeconds,
        remainMinutes,
        remainHours,
        remainDays
    }
}

const countdown = (deadline, elem, finalMessage, intentos) => {
    const el = document.getElementById(elem);

    const timerUpdate = setInterval( () => {
        let t = getRemainTime(deadline);
        el.innerHTML = `Retry in ${t.remainSeconds} seconds <br>Remaining Attemps (${intentos}/5)`;

        if(t.remainTime <= 1){
            clearInterval(timerUpdate);
            el.innerHTML = finalMessage;
        }
    }, 1000);
}