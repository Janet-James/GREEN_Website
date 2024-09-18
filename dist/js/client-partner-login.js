var GlobalPassword = ''
var Client_Name = ''
var Client_Id = ''
var serivceSiteLocation = ''
var Client_PersonEmail = ''
var Client_Comp_ID = ''

// ---- Enter Key Press ---- 
$(document).ready(function () {
    $('#clientpartner_username').keypress(function (e) {
        var key = e.which;
        if (key == 13) {
            UserNameEmailVerification();
            setTimeout(function () {
                $('#clientpartner_password').focus();
            }, 10);
        }
    });
    $('#clientpartner_password').keypress(function(e) {
      var key = e.which;
      if (key == 13)
      {
      ClientPartnerLoginBtn();
      }
    });
  });
  
  // ---- Client - Partner Email Verification ----
  function UserNameEmailVerification() {
    var clientpartner_username = $("#clientpartner_username").val();
    if(clientpartner_username === '') {
      Lobibox.notify('warning', {
        position: 'top right',
        msg: 'Please enter your registered Email ID'
      });
     }else{
      $('#emailValidationBtn').prop('disabled', true);
      $('#emailValidationBtn').css('cursor', 'not-allowed');
      $.ajax({
        url: 'https://app-gsolve.green.com.pg/clientpartner_email_verification/',
        type: 'post',
        data: {'client_username': clientpartner_username} 
      }).done(function (json_data) {
        var data = JSON.parse(json_data);
        if (data.Code === "000"){
          $('#emailValidationBtn').prop('disabled', false);
          $('#emailValidationBtn').css('cursor', 'pointer');
          Lobibox.notify('warning', {
            position: 'top right',
            msg: 'Your Email ID is not registered in our System. Kindly contact our Service Team'
          });
          $('#emailValidationBtn').prop('disabled', false);
          $('#emailValidationBtn').css('cursor', 'pointer');
        }if (data.Code === "002"){
          Lobibox.notify('warning', {
            position: 'top right',
            msg: 'Email not Sent'
          });
          $('#emailValidationBtn').prop('disabled', false);
          $('#emailValidationBtn').css('cursor', 'pointer');
        }if (data.Code === "004"){
          Lobibox.notify('warning', {
            position: 'top right',
            msg: 'Error'
          });
          $('#emailValidationBtn').prop('disabled', false);
          $('#emailValidationBtn').css('cursor', 'pointer');
        }if(data.Code === "001"){
          // Lobibox.notify('success', {
          //   position: 'top right',
          //   msg: 'Please check your email for the login credentials.'
          // });
          GlobalPassword = data.Password
          Client_Id = data.Client_ID
          Client_Name = data.Client_CompanyName
          Client_PersonEmail = data.Client_PersonEmail
          Client_Comp_ID = data.Client_CompanyId
           //alert(GlobalPassword)
          $(".clientLoginInput, .onForgotPassword").removeClass("show");
          $(".clientLoginPassword, .onBackLoginInput").addClass("show");
          $('.register-link').show();
          localStorage.setItem('Client_Id', JSON.stringify(Client_Id)); // Store in localStorage
          localStorage.setItem('Client_Name', JSON.stringify(Client_Name)); // Store in localStorage
          localStorage.setItem('Client_PersonEmail', JSON.stringify(Client_PersonEmail)); // Store in localStorage
          localStorage.setItem('Client_Comp_ID', JSON.stringify(Client_Comp_ID)); // Store in localStorage
        }
      })
    }
  }

  function encryptId(originalId) {
    var encryptedId = btoa(originalId);
    return encryptedId;
  }
  
  // ---- Client Partner Login ---- 
  function ClientPartnerLoginBtn() {
    var clientpartner_password = $("#clientpartner_password").val();
    if (clientpartner_password == GlobalPassword) {
      Lobibox.notify('success', {
        position: 'top right',
        msg: 'Authentication Successful. Welcome!',
        delay: 2000,
        sound: false,
      });
      setTimeout(function() {
        var encryptedClientId = encryptId(Client_Id);
        var url = "client-partner.html?id=" + encryptedClientId;
        window.location.href = url;
      }, 2000);
    } else {
      Lobibox.notify('warning', {
        position: 'top right',
        msg: 'Incorrect Password',
        delay: 2000
      });
    }
  }
  
