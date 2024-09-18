var client_email;
var client_id;

function customDecrypt(value) {
    return decodeURIComponent(atob(value));
}


$(document).ready(function () {
    $("#loading").hide();
    var urlSearchParams = new URLSearchParams(window.location.search);
    var encodedEmail = urlSearchParams.get('email');
    var userId = urlSearchParams.get('id');
    client_email = customDecrypt(encodedEmail);
    client_id = parseInt(customDecrypt(userId));
    $("#clientpartner_resetemailid").val(client_email);
    var inputField = document.getElementById('clientpartner_resetoldpassword');
    function onBlur() {
        document.body.style.cursor = 'wait'
        setTimeout(function() {
            document.body.style.cursor = 'auto';
        }, 1000)
        var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
        $.ajax({
            url: 'https://app-gsolve.green.com.pg/client_partner_oldpasswordcheck/',
            type: 'post',
            data: {
                'client_email': client_email,
                'oldpassword': inputField.value,
                csrfmiddlewaretoken: csrf_data
            },
            success: function (json_data) {
                var jsonObject = JSON.parse(json_data);
                console.log(" --- RESET JSON --- ", jsonObject)
                if (jsonObject.Code === "001") { 
                    Lobibox.notify('success', {
                        position: 'top right',
                        msg: 'Old Password Matched'
                    });
                } else {
                    Lobibox.notify('warning', {
                        position: 'top right',
                        msg: 'Old Password Does Not Match'
                    });$("#clientpartner_resetoldpassword").val('');
                }
            }
        });
    }
    inputField.addEventListener('blur', onBlur);
});

function ResetPassowordcheckEnter(event){
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        ClientPartnerResetPassword();
    }
}

function ClientPartnerResetPassword() {
    var newpassword = $("#clientpartner_resetnewpassword").val();
    var confirmpassword = $("#clientpartner_resetconfirmpassword").val();
    var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
    if (newpassword !== confirmpassword) {
        Lobibox.notify('error', {
            position: 'top right',
            msg: 'Mismatched New and Confirm Passwords.'
        });
        return;
    }
    if(newpassword && confirmpassword){
        $('#resetBtn').prop('disabled', true);
        $('#resetBtn').css('cursor', 'not-allowed');
        $.ajax({
            url: 'https://app-gsolve.green.com.pg/client_partner_resetpassword/',
            type: 'post',
            data: {
                'client_id': client_id,
                'newpassword': newpassword,
                'confirmpassword': confirmpassword,
                'client_email': client_email,
                csrfmiddlewaretoken: csrf_data
            },
            success: function (json_data) {
                var jsonObject = JSON.parse(json_data);
                console.log(" --- RESET JSON --- ", jsonObject)
                if (jsonObject.Code === "001") { 
                    setTimeout(function() {
                        Lobibox.notify('success', {
                            position: 'top right',
                            msg: 'Your Password Has Been Reset'
                        });
                        setTimeout(function() {
                            window.location.replace('client-partner-login.html');
                        }, 2000);
                    
                    }, 1000);
                } else {
                    Lobibox.notify('error', {
                        position: 'top right',
                        msg: 'Password Change Failed. Please Retry.'
                    });
                    setTimeout(function() {
                        window.location.replace('client-partner-login.html');
                    }, 2000);
                }
            }
        });
    }else{
        Lobibox.notify('warning', {
            position: 'top right',
            msg: 'All the fields are mandatory.'
        });
    }
}
