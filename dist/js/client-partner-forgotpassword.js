var client_email;
var client_id;
var temp_code;

function customDecrypt(value) {
    return decodeURIComponent(atob(value));
}

$(document).ready(function () {
    $("#loading").hide();
    var urlSearchParams = new URLSearchParams(window.location.search);
    var encodedEmail = urlSearchParams.get('email');
    var userId = urlSearchParams.get('id');
    var codeId = urlSearchParams.get('c');
    client_email = customDecrypt(encodedEmail);
    client_id = parseInt(customDecrypt(userId));
    temp_code = customDecrypt(codeId);
    if(codeId){
        $("#temporary_code").val(temp_code);
        $("#clientpartner_emailid").val(client_email);
    }else{
        $("#clientpartner_emailid").val(client_email);
        var inputField = document.getElementById('temporary_code');
        function onBlur() {
            document.body.style.cursor = 'wait'
            setTimeout(function() {
                document.body.style.cursor = 'auto';
            }, 1000)
            var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
            $.ajax({
                url: 'https://app-gsolve.green.com.pg/client_partner_temporary_code_check/',
                type: 'post',
                data: {
                    'client_email': client_email,
                    'temporary_code': inputField.value,
                    csrfmiddlewaretoken: csrf_data
                },
                success: function (json_data) {
                    var jsonObject = JSON.parse(json_data);
                    console.log(" --- RESET JSON --- ", jsonObject)
                    if (jsonObject.Code === "001") { 
                        Lobibox.notify('success', {
                            position: 'top right',
                            msg: 'Code Matched'
                        });
                    } else if (jsonObject.Code === "002") { 
                        Lobibox.notify('warning', {
                            position: 'top right',
                            msg: 'Code Enterd is not Valid'
                        });$("#temporary_code").val('');
                    }else{
                        Lobibox.notify('error', {
                            position: 'top right',
                            msg: 'Service Run Time Error Please Try After Some Times'
                        })
                    }
                }
            });
        }
        inputField.addEventListener('blur', onBlur);
    }
});

function ForgotPassowordcheckEnter(event){
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        ClientPartnerForgotPassword();
    }
}

function ClientPartnerForgotPassword() {
    var newpassword = $("#clientpartner_newpassword").val();
    var confirmpassword = $("#clientpartner_confirmpassword").val();
    var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
    if (newpassword !== confirmpassword) {
        Lobibox.notify('error', {
            position: 'top right',
            msg: 'Mismatched New and Confirm Passwords.'
        });
        return;
    }if(newpassword && confirmpassword){
        $('#forgotpasswordBtn').prop('disabled', true);
        $('#forgotpasswordBtn').css('cursor', 'not-allowed');
        $.ajax({
            url: 'https://app-gsolve.green.com.pg/update_forgotpassword/',
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
                if (jsonObject.Code === "001") {
                    setTimeout(function() {
                        Lobibox.notify('success', {
                            position: 'top right',
                            msg: 'Your Password Has Been Changed'
                        });
                        setTimeout(function() {
                            window.location.replace('client-partner-login.html');
                        }, 2000);
                    
                    }, 1000);
                } else {
                    Lobibox.notify('warning', {
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
            msg: 'All the field is Manditory'
        });
    }
}
