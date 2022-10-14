$(document).ready(function() {
    let dv__1 = $('#dv_pop__01');
    let dv__2 = $('#dv_pop__02');
    dv__1.hide();
    dv__2.hide();
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
    let dv__1 = $('#dv_pop__01');
    dv__1.hide();

    let dv__2 = $('#dv_pop__02');
    dv__2.show();
}

function env_end()
{
    let dv__2 = $('#dv_pop__02');
    dv__2.hide();

    $('#token').val('');
}