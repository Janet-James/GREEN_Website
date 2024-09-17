var serviceCallLogDocumentUpload = []
var serviceRequestDocumentUpload = []
var dynamicTime = ''
var customer_chat_date = ''
var GlobalPassword = ''
var Client_Name = ''
var Client_Id = ''
let previousTitle;
var serivceSiteLocation = ''
var Client_PersonEmail = ''
var Client_Comp_ID = ''
var globalProjectId = ''
var CarbonEmissionFilterYear = ''
let myChart;
let map;
let mappoint;
let scoreChart;
var revenueFilterYear;
var accountsStmtCurrencyType;
var scoreFilterValue;
var fetchFilterData = '';
var financialRoiCurrencyType;
global_roi_currency_logo='PGK'
global_accounts_currency_logo='PGK'
var user_activities = [];
var moduleName = ''
var UserActivityId;
var financialROI_value;
var user_geolocation;
var userCountry;

function initializeMap(lat, lng) {
  if (map) {
    let marker = L.marker([lat, lng]).addTo(map);
    map.setView([lat, lng], 13);
  } else {
    map = L.map("map", {
      center: [lat, lng],
      zoom: 13,
    });
    let tileLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 18,
        id: "mapbox.streets",
      }
    ).addTo(map);
    let marker = L.marker([lat, lng]).addTo(map);
  }
}

function getUserInfo() {
$.get("https://ipinfo.io", function(response) {
     user_geolocation = response
     getCountry(response.ip);
}, "jsonp");
}

function getCountry(ip) {
$.get("https://ipapi.co/" + ip + "/json/", function(response) {
     userCountry = response.country_name
});
}

$(document).ready(function () {
  getUserInfo();
  $("#scoreFilter").trigger("change");
  getCurrentTime();
  chatCurrentDateTime();
  // CustomerChatHistory();
  var client_email = localStorage.getItem('Client_PersonEmail');
  Client_PersonEmail = JSON.parse(client_email)
  var client_company_id = localStorage.getItem('Client_Comp_ID');
  Client_Comp_ID = JSON.parse(client_company_id)
  var client_name = localStorage.getItem('Client_Name');
  Client_Name = JSON.parse(client_name)
  var client_id = localStorage.getItem('Client_Id');
  Client_Id = JSON.parse(client_id)
  var storedUserActivityId = localStorage.getItem('UserActivityId');
  UserActivityId = JSON.parse(storedUserActivityId)
  Client_PartnerActivityStatus();
})

function Client_PartnerActivityStatus(){
  if (UserActivityId){
  }else{
  const user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  chatCurrentDateTime()
  logged_in_time = customer_chat_date.split(' GMT')[0]
  var csrf_data = $("input[name=csrfmiddlewaretoken]").val();

  if (user_geolocation && user_geolocation.country !== undefined && user_geolocation.country !== '') {
    // Access the country property safely
    var user_country_code = user_geolocation.country;
  } else {
    // Handle the case where user_geolocation or its country property is undefined or empty
    var user_country_code = '';
  }
  $.ajax({
      url: 'https://gprogress.green.com.pg/client_partner_database_insertion/',
      type: 'post',
      data: {
              'clientID': Client_Id,
              'companyID': Client_Comp_ID,
              'client_email': Client_PersonEmail,
              'client_name': Client_Name,
              'logged_in_status': true,
              'logged_in_time': logged_in_time,
              'user_timezone': user_timezone,
              'user_geolocation': JSON.stringify(user_geolocation),
              'user_country': userCountry,
              'user_country_code': user_country_code,
              csrfmiddlewaretoken: csrf_data
            },success: function (json_data) {
                var jsonObject = JSON.parse(json_data);
                UserActivityId = jsonObject.data_base_id;
                localStorage.setItem('UserActivityId', JSON.stringify(UserActivityId));
            }
      })
  }
}

// Function to format the time as 12-hour
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

// --- Today's Date ---
function getCurrentTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var currentTime = hours + ':' + minutes + ' ' + ampm;
  return currentTime;
}

// ---- Update time ----
setInterval(function () {
  dynamicTime = getCurrentTime();
  var liveDate = `<p class="time"><i class="fa fa-clock-o" aria-hidden="true"></i> Today | ${dynamicTime}</p>`;
  $('#live_chat_date_and_time').html(liveDate);
}, 1000);

function chatCurrentDateTime(){
  const now = new Date();
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };
  customer_chat_date = now.toLocaleString('en-US', options).replace(/,/g, '');
}

// ---- Talk to Us Enter Click ---- 
function checkEnter(event) {
  if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      $("#chat-container").animate({ scrollTop: $('#chat-container').prop("scrollHeight")}, 1000);
      SentMessage();
  }
}

// ---- Sent Customer Message ---- 
function SentMessage(){
  chatCurrentDateTime()
  customer_message = $('#customer_text_message').val();
  if(customer_message){
  chat_append = `
  '<div class="message">'
  <div class="row align-items-end">
  <div class="col-auto">
  <div class="green-icon">
  </div>
  </div>
  <div class="col user-chat">
  <div class="chat-single-data">
  <p>${customer_message}</p>
  <p class="time"><i class="fa fa-clock-o" aria-hidden="true"></i> Today | ${dynamicTime} </p>
  </div>
  </div>
  <div class="col-auto">
  <div class="user-icon">
  <img src="dist/images/client-partner/user.png" />
  </div>
  </div>
  </div>
  </div>`
  $('#chat-container').append(chat_append)
  $('#customer_text_message').val('');
  chat_date = customer_chat_date
  source_of_meaasge = 3396
  var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
  $.ajax({
    url: 'https://gprogress.green.com.pg/customer/chat_box/',
    type: 'post',
    data: {
      'client_id': Client_Id,
      'company_id': Client_Comp_ID,
      'customer_message': customer_message,
      'chat_date': chat_date,
      'source_of_meaasge': source_of_meaasge,
      'client_name': Client_Name,
      'client_email_id': Client_PersonEmail,
      "project_id": globalProjectId,
      csrfmiddlewaretoken: csrf_data
    }
    }).done(function(json_data) {
  });
}
}


function customEncrypt(value) {
  return btoa(encodeURIComponent(value));
}

// ---- Forgot Password and Reset Password Button Click ---- 
function ForgotPasswordBtn() {
  $('#forgot_passwordBtn').prop('disabled', true);
  $('#forgot_passwordBtn').css('cursor', 'not-allowed');
  
  $.ajax({
    url: 'https://gprogress.green.com.pg/client_partner_forgotpassword/',
    type: 'post',
    data: {'client_id': Client_Id, 'client_email': Client_PersonEmail} 
  }).done(function (json_data) {
    var data = JSON.parse(json_data);
    if (data.Code === "001") {
      Lobibox.notify('success', {
        position: 'top right',
        msg: 'Check Your Email for Reset Instructions',
        delay: 2000,
        sound: false,
      });

      var encodedEmail = customEncrypt(Client_PersonEmail);
      var encodedId = customEncrypt(Client_Id.toString());
      
      var url = "client-partner-forgotpassword.html?email=" + encodedEmail + "&id=" + encodedId;
      
      setTimeout(function () {
        window.location.href = url;
      }, 2000);
    } else if (data.Code === "002") {
      Lobibox.notify('warning', {
        position: 'top right',
        msg: 'Failed to Change the Password. Try Again',
        delay: 2000,
        sound: false,
      });
      
      var url = "client-partner-login.html"
      setTimeout(function () {
        window.location.href = url;
      }, 2000);
    }
  });
}


function PasswordResetBtn(){
    var encodedEmail = customEncrypt(Client_PersonEmail);
    var encodedId = customEncrypt(Client_Id.toString());
    var url = "client-partner-resetpassword.html?email="+encodedEmail+"&id="+encodedId;
    window.location.href = url;
}

// --- Company Name Append --- 
$(document).ready(function () {
  var storedData = localStorage.getItem('Client_Name');
  Client_Name = JSON.parse(storedData)
  var raisedBy = localStorage.getItem('Client_PersonEmail');
  Client_PersonEmail = JSON.parse(raisedBy)
  Client_NameAppend = `
  <h4 class="font-semibold">Dear ${Client_Name}</h4>
  <h5 class="sub-title-line-dsn">Welcome to GREEN Value Engineering</h5>`
  $('#CustomerCompanyName').append(Client_NameAppend)
  $('#service_call_raisedBy').val(Client_PersonEmail)
  $('#request_person_name').val(Client_Name)
  $('#request_person_email').val(Client_PersonEmail)
});

// --- Get User Login Details Form Bitrix ---
$(document).ready(function () {
  var storedClientID = localStorage.getItem('Client_Id');
  Client_Id = JSON.parse(storedClientID)
  var storedClientComID = localStorage.getItem('Client_Comp_ID');
  Client_Comp_ID = JSON.parse(storedClientComID)
  if (Client_Id) {
    $.ajax({
      url: 'https://gprogress.green.com.pg/customer/chat_history/',
      type: 'post',
      data: {
          'clientID': Client_Id,
          'companyID': Client_Comp_ID,
      },
      success: function (json_data) {
        var responseData = JSON.parse(json_data);
        ChatHistoryResponse(responseData);
      },
      error: function () {
          Lobibox.notify('error',{
            position: 'top right',
            msg: 'Unable to Retrieve Details'
          });
      }
      });
  } else {
    // window.location.replace("client-partner-login.html");
  }
});

function ChatHistoryResponse(response){
    var replayedMessages = response.paired_messages;
    var project_data = response.project_data;
    if(replayedMessages == ''){
      var chatContainer = $('#chat-container');
      messageHTMLL = `
      <div class="message">
      <div class="row align-items-end">
      <div class="col-auto">
      <div class="green-icon">
      <div class="icon">
      <img src="dist/images/client-partner/green.png" />
      </div>
      </div>
      </div>
      <div class="col  green-chat">
      <div class="chat-single-data ">
      <p>Welcome to GREEN Value Engineering !</p>
      <p>Let us know how can we help you today!</p>
      </div>
      </div>
      <div class="col-auto">
      <div class="user-icon">
      </div>
      </div>
      </div>
      </div>`
      chatContainer.append(messageHTMLL);
    }
    if(replayedMessages){
      var chatContainer = $('#chat-container');
      replayedMessages.forEach(function (replayedMessage) {
        var messageHTML = '<div class="message">';
        var client_message = replayedMessage.sent_message;
        var client_msg_date = replayedMessage.sent_date;
        var replayed_message = replayedMessage.replayed_message;
        var replayed_msg_date = replayedMessage.replayed_date;
        messageHTML += `
        <div class="row align-items-end">
        <div class="col-auto">
        <div class="green-icon">
        </div>
        </div>
        <div class="col user-chat">
        <div class="chat-single-data">
        <p>${client_message}</p>
        <p class="time"><i class="fa fa-clock-o" aria-hidden="true"></i> ${client_msg_date} </p>
        </div>
        </div>
        <div class="col-auto">
        <div class="user-icon">
        <img src="dist/images/client-partner/user.png" />
        </div>
        </div>
        </div>`;
        if(replayed_message == '') {
          messageHTML += ``;
        }else{messageHTML += `<div class="row align-items-end">
        <div class="col-auto">
        <div class="green-icon">
        <div class="icon">
        <img src="dist/images/client-partner/green.png" />
        </div>
        </div>
        </div>
        <div class="col  green-chat">
        <div class="chat-single-data ">
        <p>${replayed_message}</p>
        <p class="time"><i class="fa fa-clock-o" aria-hidden="true"></i> ${replayed_msg_date} </p>  
        </div>
        </div>
        <div class="col-auto">
        <div class="user-icon">
        </div>
        </div>
        </div>`;
      }
      messageHTML += '</div>';
      chatContainer.append(messageHTML);
    });
    }if (project_data) {
      project_data.forEach(function (project, index) {
          var project_id;
          var project_title = project.project_title;
          var project_url = project.project_url;
          var project_latitude = project.project_latitude;
          var project_longitude = project.project_longitude;
          project_id = project.project_id
          // project_id = project_title.replace(/[.&]+$/, '').replace(/[^a-zA-Z0-9]/g, '');
          solar_project = `
          <li>
          <div id="${project_id}" class="site-item" style="background: url('${project_url}') no-repeat; background-size: cover;">
          <p class="status online">Online</p>
          <div class="detail">
          <h4>${project_title}</h4>
          </div>
          </div>
          </li>`
          $('#solar_projects').append(solar_project);
          $(document).on('click', `#${project_id}`, function() {
              globalProjectId = project_id
              ClientPartnerServiceCallHistory();
              ClientPartnerServiceRequestHistory();
              if (previousTitle && previousTitle !== `#${project_id}`) {
                  $(previousTitle).css({
                      'border-image': ''
                  });
              }
              $(this).css({
                  'border-image': 'linear-gradient(to right top, #36dd68, #dddf78) 1'
              });
              initializeMap(project_latitude, project_longitude);
              $("#serivce_call_site_location").val(project_title);
              previousTitle = `#${project_id}`;
              serivceSiteLocation = project_title
          });
          if (index === 0) {
              $(`#${project_id}`).click();
          }
      });
  }
  moduleName = "Service and Support"
  UserActivityTracking()
}

// --- Client Partner Logut ---
function LogOutCustomer(){
  moduleName = "UserLogOut"
  UserActivityTracking();
  Lobibox.notify('success',{
    position: 'top right',
    msg: 'Thanks for Visiting and Adding Value'
    });
    setTimeout(function() {
    localStorage.clear();
    window.location.replace("client-partner-login.html");
    }, 1000);
}

// ---- Service Related Document Upload ---- 
$('#service_call_document').on('change', function (e) {
    var files = e.target.files;
    for (var i = 0; i < files.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(files[i]);
        (function (currentReader) {
            currentReader.onload = function () {
                var inputData = currentReader.result;
                var replaceValue = (inputData.split(',')[0]);
                var fileData = inputData.replace(replaceValue, "");
                serviceCallLogDocumentUpload.push(fileData);
                if (serviceCallLogDocumentUpload.length === files.length) {
                }
            };
        })(reader);
    }
});

// ---- Service Request Related Doc ----
$('#service_request_document').on('change', function (e) {
  var files = e.target.files;
  for (var i = 0; i < files.length; i++) {
      var reader = new FileReader();
      reader.readAsDataURL(files[i]);
      (function (currentReader) {
          currentReader.onload = function () {
              var inputData = currentReader.result;
              var replaceValue = (inputData.split(',')[0]);
              var fileData = inputData.replace(replaceValue, "");
              serviceRequestDocumentUpload.push(fileData);
              if (serviceRequestDocumentUpload.length === files.length) {
              }
          };
      })(reader);
  }
});

// ---- Submit Service Call Log ---- 
function SubmitServiceCallLog(){
    chatCurrentDateTime();
    serviceCallLogFormValid = $('#serviceCallLogForm').valid();
    if(serviceCallLogFormValid){
    var service_call_title = $("#service_call_title").val();
    var serivce_call_site_location = $("#serivce_call_site_location").val();
    // var service_call_raisedBy = $("#service_call_raisedBy").val();
    var service_call_issues = $('#service_call_issues').find(":selected").val();
    var service_call_priority = $("#service_call_priority").find(":selected").val();
    var service_call_description = $("#service_call_description").val();
    $('#serviceCallSubmitButton').prop('disabled', true);
    $('#serviceCallSubmitButton').css('cursor', 'not-allowed');
    var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
    $.ajax({
        url: 'https://gprogress.green.com.pg/submit/client_partner/service_call_log/',
        type: 'post',
        data: {
          'service_call_title': service_call_title,
          'serivce_call_site_location': serivce_call_site_location,
          'service_call_raisedBy': Client_Name,
          'service_call_issues': service_call_issues,
          'service_call_priority': service_call_priority,
          "service_call_description": service_call_description,
          "service_call_document": serviceCallLogDocumentUpload,
          "client_id": Client_Id,
          "client_company_id": Client_Comp_ID,
          "client_email_id": Client_PersonEmail,
          "current_date_time":customer_chat_date,
          csrfmiddlewaretoken: csrf_data
        }
      }).done(function(json_data) {
      data = JSON.parse(json_data);
      if (data.Code === "001") {
        Lobibox.notify('success', {
          position: 'top right',
          msg: 'Your Service Call is Registered. You will receive acknowledgement from our Service Team'
        });
        clearServiceCallLog()
      }else if (data.Code === "002") {
        Lobibox.notify('warning', {
          position: 'top right',
          msg: 'Service Call Registration Failed'
        });
      }else{
        Lobibox.notify('warning', {
          position: 'top right',
          msg: 'Error Occured. Please Refresh the Page and Try Again'
        });
      }
   });
  }
}

// ---- Submit Service Request ---- 
function SubmitServiceRequest(){
  chatCurrentDateTime();
  serviceRequestFormValid = $('#serviceRequestForm').valid();
  if(serviceRequestFormValid){
  var service_req_common_service = $("#service_req_common_service").find(":selected").val();
  var service_request_type = $("#service_request_type").find(":selected").val();
  var service_req_priority = $("#service_req_priority").find(":selected").val();
  var preferred_date = $('#preferred_date').val();
  var request_person_name = $("#request_person_name").val();
  var request_person_email = $("#request_person_email").val();
  // var request_person_contact_no = $("#request_person_contact_no").val();
  var service_request_description = $("#service_req_description").val();
  $('#serviceRequestBtn').prop('disabled', true);
  $('#serviceRequestBtn').css('cursor', 'not-allowed');
  var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
  $.ajax({
      url: 'https://gprogress.green.com.pg/submit/client_partner/service_request/',
      type: 'post',
      data: {
        'service_req_common_service': service_req_common_service,
        'service_request_type': service_request_type,
        'service_req_priority': service_req_priority,
        'preferred_date': preferred_date,
        "request_person_name": request_person_name,
        "request_person_email": request_person_email,
        // "request_person_contact_no": request_person_contact_no,
        "service_req_document_upload": serviceRequestDocumentUpload,
        "client_id": Client_Id,
        "client_company_id": Client_Comp_ID,
        "service_request_site_location": serivceSiteLocation,
        "service_request_description": service_request_description,
        "current_date_time":customer_chat_date,
        csrfmiddlewaretoken: csrf_data
      }
    }).done(function(json_data) {
    data = JSON.parse(json_data);
    if (data.Code === "001") {
      Lobibox.notify('success', {
        position: 'top right',
        msg: 'Your Service Request is Registered. You will receive acknowledgement from our Service Team'
      });
      clearServiceRequest()
    }else if (data.Code === "002") {
      Lobibox.notify('warning', {
        position: 'top right',
        msg: 'Service Request Registration Failed'
      });
    }else{
      Lobibox.notify('warning', {
        position: 'top right',
        msg: 'Error Occured Please Refresh the Page and Try Again'
      });
    }
 });
}
}

// ---- Clear Form ---- 
function clearServiceCallLog() {
    $("#service_call_title").val('');
    $('select#service_call_issues').val('');
    $("select#service_call_priority").val('');
    $("#service_call_description").val('');
    // $("#service_call_document").val('');
    serviceCallLogDocumentUpload = [];
    $('#serviceCallSubmitButton').prop('disabled', false);
    $('#serviceCallSubmitButton').css('cursor', 'pointer');
    ServiceCallFileUploadHtml = `<span class="drop-zone__prompt">
    <img src="dist/images/upload-file.png" />
    <span class="content">Select a file or drag and drop here<span>JPG, PNG,PDF or TXT format  ( file size no more than 10 MB )</span></span>
    <span class="file">Select File</span>
    </span>
    <input type="file" id="service_call_document" name="service_call_document" class="drop-zone__input" multiple></input>`
    $("#serviceCallFileAppend").html(ServiceCallFileUploadHtml)
}

function clearServiceRequest() {
  $("select#service_req_common_service").val('');
  $("select#service_request_type").val('');
  $("select#service_req_priority").val('');
  $('#preferred_date').val('');
  // $("#request_person_name").val('');
  // $("#request_person_email").val('');
  // $("#request_person_contact_no").val('');
  $("#service_req_description").val('');
  serviceRequestDocumentUpload = [];
  $('#serviceRequestBtn').prop('disabled', false);
  $('#serviceRequestBtn').css('cursor', 'pointer');
  FileUploadHtml = `<span class="drop-zone__prompt">
  <img src="dist/images/upload-file.png" />
  <span class="content">Select a file or drag and drop here<span>JPG, PNG,PDF or TXT format  ( file size no more than 10 MB )</span></span>
  <span class="file">Select File</span>
  </span>
  <input type="file" id="service_request_document" name="" class="drop-zone__input" multiple></input>`
  $("#serviceRequestFileAppend").html(FileUploadHtml)
}

// --- Service Call Log Form Validation ---
$('#serviceCallLogForm').validate({
    rules:{
        service_call_title:{required:true},
        // serivce_call_site_location:{required:true},
        service_call_raisedBy:{required:true},
        service_call_issues:{required:true},
        service_call_priority:{required:true},
        service_call_description:{required:true},
    },
    messages:{
        service_call_title:{required:"Enter Title"},
        serivce_call_site_location:{required:"Enter Site Location"},
        service_call_raisedBy:{required:"Enter RaisedBy"},
        service_call_issues:{required:"Select Service Issue"},
        service_call_priority:{required:"Select the Priority"},
        service_call_description:{required:"Enter Description"},
    },
    errorElement: 'div',
     errorPlacement: function(error, element) {
         console.log('Error:', error);
         var placement = $(element).data('error');
         if (placement) {
             $(placement).append(error)
         } else {
             error.insertAfter(element);
         }
     },
});

// --- Service Request Form Validation ---
$('#serviceRequestForm').validate({
  rules:{
      service_request_type:{required:true},
      service_req_priority:{required:true},
      request_person_name:{required:true},
      request_person_email:{required:true},
      service_req_description:{required:true},
      // request_person_contact_no: {
      //   maxlength: 15,
      //   minlength: 7
      // },
  },
  messages:{
      service_request_type:{required:"Select Type"},
      service_req_priority:{required:"Select Priority"},
      request_person_name:{required:"Enter Name"},
      request_person_email:{required:"Enter Email"},
      service_req_description:{required:"Enter Description"},
      // request_person_contact_no: {
      //   maxlength: "Enter Valid Mobile Number",
      //   minlength: "Enter Valid Mobile Number"
      // },
  },
  errorElement: 'div',
   errorPlacement: function(error, element) {
       console.log('Error:', error);
       var placement = $(element).data('error');
       if (placement) {
           $(placement).append(error)
       } else {
           error.insertAfter(element);
       }
   },
});

// --- TelePhone Flag ---- 
// var input = document.querySelector('#request_person_contact_no');
// intlTelInput(input, {
//   initialCountry: "auto",
//   geoIpLookup: function (success, failure) {
//     $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
//       var countryCode = (resp && resp.country) ? resp.country : "us";
//       success(countryCode);
//     });
//   },
// })


// ---------------------------- CLIENT PARTNER HISTORY ----------------------------
// ---->>>>>>---- SERVICE CALL LOG
const itemsPerPage = 4;
let currentPage = 1;
let response;

function ClientPartnerServiceCallHistory() {
  CustomerReviewChart();
  CalculateAverageResponseTime();
  $("#ServiceCallTicketStatus").trigger("change");
}

function ServiceCallHistoryResult() {
  var totalPages = Math.ceil(response.service_call_history.length / itemsPerPage);
  renderItems();
  renderPagination(totalPages);
}

function renderItems() {
  $('#ServiceCallHistoryAppend').empty();
  var history_data = response.service_call_history;
  var startIndex = (currentPage - 1) * itemsPerPage;
  var endIndex = startIndex + itemsPerPage;
  var displayedItems = history_data.slice(startIndex, endIndex);

  displayedItems.forEach(function (data, index) {
    // --- Append Start Here ---
    var issueDescription = data.issue_description;
    var title = data.title;
    var priority = data.priority;
    var raisedBy = data.raised_by;
    var siteLocation = data.site_location;
    var ticketStatus = data.status;
    var serviceRequestType = data.service_request_type;
    var ticket_raised_date = data.ticket_raised_date
    var ticket_id = data.ticket_id
    var related_document_link = data.related_document_link
    if(related_document_link){
      serviceCallDocLink = `<a class="doc-details" href="${related_document_link}" download><img src="dist/images/client-partner/attachment-icon.png"/> <span>Attachment</span></a>`
    }else{
      serviceCallDocLink = `<div class="noattachment" download><img src="dist/images/client-partner/attachment-icon.png"/> <span>No Attachment</span></div>`
    }
    ServiceCallHistory = `
    <div class="history-block">
    <div class="row">
    <div class="col-md-7 history-data">
    <div class="row">
    <div class="col-auto">
    <h5>${title}  (${ticket_id})</h5>
    </div>
    <div class="col-auto">
    <p class="status ${ticketStatus.toLowerCase()}">${ticketStatus}</p>
    </div>
    <div class="col-auto">
    <p class="date">${ticket_raised_date}</p>
    </div>
    </div>
    <div class="row">
    <div class="col-auto">
    <p class="data-topic">Side Location</p>
    <p class="data"><img src="dist/images/client-partner/map-icon.png" />${siteLocation}</p>
    </div>
    <div class="col-auto">
    <p class="data-topic">Raised by </p>
    <p class="data">${raisedBy}</p>
    </div>
    <div class="col-auto">
    <p class="data-topic">Service / Issue Type</p>
    <p class="data">${serviceRequestType}</p>
    </div>
    <div class="col-auto">
    <p class="data-topic">Priority</p>
    <p class="data priority ${priority.toLowerCase()}">${priority}</p>
    </div>
    <div class="col-auto">
    <p class="data-topic">Related Document</p>
    ${serviceCallDocLink}
    </div>
    </div>
    </div>
    <div class="col-md-5 history-about">
    <p>Description</p>
    <p>${issueDescription}</p>
    </div>
    </div>
    </div>`;
    $('#ServiceCallHistoryAppend').append(ServiceCallHistory);
  });
}

function renderPagination(totalPages) {
  var paginationContainer = $('#ServiceCallHistoryAppend');
  var paginationHTML = `
  <div class="row justify-content-end align-items-center history-pagination">
  <div class="col-auto">
  <p class="small mb-0"><b>${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
    currentPage * itemsPerPage,
    response.service_call_history.length
  )}</b> of ${response.service_call_history.length}</p>
  </div>
  <div class="col-auto d-flex">
  <button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">Prev</button>
  <button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">Next</button>
  </div>
  </div>`;
  paginationContainer.append(paginationHTML);
}

function changePage(newPage) {
  currentPage = newPage;
  renderItems();
  renderPagination(Math.ceil(response.service_call_history.length / itemsPerPage));
}

// -------------------------------------- END SERVICE CALL LOG --------------------------------------

// ----->>>>>>>----- SERVICE REQUEST
const ServiceReqitemsPerPage = 4;
let ServiceReqcurrentPage = 1;
let ServiceReqresponse;

function ClientPartnerServiceRequestHistory(){
  var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
  $.ajax({
    url: 'https://gprogress.green.com.pg/client_partner/service_request/history/',
    type: 'post',
    data: {
      'client_id': Client_Id,
      "solar_project_id": globalProjectId,
      csrfmiddlewaretoken: csrf_data
    }
  }).done(function(json_data) {
      ServiceReqresponse = JSON.parse(json_data);
      GetServiceRequestHistory(ServiceReqresponse)
  });
}

function GetServiceRequestHistory() {
  var ServiceReqtotalPages = Math.ceil(ServiceReqresponse.service_request_history.length / ServiceReqitemsPerPage);
  ServiceReqrenderItems();
  ServiceReqrenderPagination(ServiceReqtotalPages);
}

function ServiceReqrenderItems(){
  $('#ServiceRequestHistoryAppend').empty();
  var history_data = ServiceReqresponse.service_request_history
  var startIndex = (ServiceReqcurrentPage - 1) * ServiceReqitemsPerPage;
  var endIndex = startIndex + ServiceReqitemsPerPage;
  var displayedItems = history_data.slice(startIndex, endIndex);

  displayedItems.forEach(function (data, index) {
      var serviceName = data.service_name;
      var servicePriority = data.service_priority;
      var serviceRequestType = data.service_request_type;
      var preferredDate = data.preferred_date;
      var requestPersonName = data.request_person_name;
      var requestPersonMail = data.request_person_mail;
      // var contactNo = data.contact_no;
      var serviceDescription = data.service_description;
      var serviceReqId = data.service_request_id
      var document_link = data.document_link;
      var request_prefered_date = data.request_prefered_date;
      var RequestRaisedDate = data.RequestRaisedDate;
      if(document_link){
        serviceRequestDocLink = `<a class="doc-details" href="${document_link}" download><img src="dist/images/client-partner/attachment-icon.png"/> <span>Attachment</span></a>`
      }else{
        serviceRequestDocLink = `<div class="noattachment" download><img src="dist/images/client-partner/attachment-icon.png"/><span>No Attachment</span></div>`
      }
      ServiceRequestHistory = `
      <div class="history-block service">
      <div class="row">
      <div class="col-md-7 history-data">
      <div class="row">
      <div class="col-auto">
      <h5>${serviceName}(${serviceReqId})</h5>
      </div>
      <div class="col-auto">
      <p class="date">${RequestRaisedDate}</p>
      </div>
      </div>
      <div class="row">
      <div class="col-auto">
      <p class="data-topic">Request Type</p>
      <p class="data">${serviceRequestType}</p>
      </div>
      <div class="col-auto">
      <p class="data-topic">Priority</p>
      <p class="data priority high">${servicePriority}</p>
      </div>
      <div class="col-auto">
      <p class="data-topic">Preferred Date / Desired Completion </p>
      <p class="data">${request_prefered_date} </p>
      </div>
      <div class="col-auto">
      <p class="data-topic">Related Document</p>
      ${serviceRequestDocLink}
      </div>
      </div>
      <div class="row">
      <div class="col-auto">
      <p class="data-topic">Request Person Name</p>
      <p class="data">${requestPersonName}</p>
      </div>
      <div class="col-auto">
      <p class="data-topic">Mail ID</p>
      <p class="data">${requestPersonMail}</p>
      </div>
      </div>
      </div>
      <div class="col-md-5 history-about">
      <p>Description</p>
      <p>${serviceDescription}</p>
      </div>
      </div>
      </div>`
      $('#ServiceRequestHistoryAppend').append(ServiceRequestHistory)
  });
}

function ServiceReqrenderPagination(totalPages) {
  var paginationContainer = $('#ServiceRequestHistoryAppend');
  var paginationHTML = `
  <div class="row justify-content-end align-items-center history-pagination">
  <div class="col-auto">
  <p class="small mb-0"><b>${(ServiceReqcurrentPage - 1) * ServiceReqitemsPerPage + 1}-${Math.min(
    ServiceReqcurrentPage * ServiceReqitemsPerPage,
    ServiceReqresponse.service_request_history.length
  )}</b> of ${ServiceReqresponse.service_request_history.length}</p>
  </div>
  <div class="col-auto d-flex">
  <button ${ServiceReqcurrentPage === 1 ? 'disabled' : ''} onclick="ServiceReqchangePage(${ServiceReqcurrentPage - 1})">Prev</button>
  <button ${ServiceReqcurrentPage === totalPages ? 'disabled' : ''} onclick="ServiceReqchangePage(${ServiceReqcurrentPage + 1})">Next</button>
  </div>
  </div>`;
  paginationContainer.append(paginationHTML);
}

function ServiceReqchangePage(newPage) {
  ServiceReqcurrentPage = newPage;
  ServiceReqrenderItems();
  ServiceReqrenderPagination(Math.ceil(ServiceReqresponse.service_request_history.length / ServiceReqitemsPerPage));
}

// -------------------------------------- END SERVICE REQUEST --------------------------------------

// ------------------------------------- SERVICE HISTORY FILTER TICKETS START HERE -------------------------
// ----->>>>>> Filter Tickets
$("#ServiceCallTicketStatus").change(function(){
  var selectedValue = $(this).val();
  if (selectedValue === "open") {
      selectedValue = "1850"
  } else if (selectedValue === "close") {
    selectedValue = "1858"
  } else{
    selectedValue = "all"
  }
  var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
  if(Client_Id){
  $.ajax({
    url: 'https://gprogress.green.com.pg/client_partner/service_call/history/',
    type: 'post',
    data: {
      'client_id': Client_Id,
      "ticket_status": selectedValue,
      "solar_project_id": globalProjectId,
      csrfmiddlewaretoken: csrf_data
    }
  }).done(function(json_data) {
      response = JSON.parse(json_data);
      ServiceCallHistoryResult(response)
  });
 }
});

// --------------------------- SERVICE HISTORY FILTER TICKETS END HERE -----------------------

// ------------------------ CLIENT PARTNER HISTORY CSAT CHART START HERE ---------------------
function convertToHoursMinutes(value) {
  var hours = Math.floor(value);
  var minutes = Math.round((value % 1) * 60);
  var hoursString = (hours > 0) ? hours + "H: " : "";
  var minutesString = (minutes < 10) ? "0" + minutes + "M" : minutes + "M";
  return hoursString + minutesString;
}
  
function CalculateAverageResponseTime() {
  var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
  if(Client_Id){
  $.ajax({
       url: 'https://gprogress.green.com.pg/calculate/client_partner/average_response_time/',
       type: 'post',
       data: {
           'client_id': Client_Id,
           csrfmiddlewaretoken: csrf_data
       }
  }).done(function (json_data) {
       avg_data = JSON.parse(json_data);
       //console.log("---- AVG ---- ", avg_data)
       if(avg_data == ""){
       var low = "0:0"
       var high = "0:0"
       var critical = "0:0"
       var lowPercentage = "0:0"
       var highPercentage = "0:0"
       var criticalPercentage = "0:0"
       var total_hours= "0:0"
       }else{
       var low = convertToHoursMinutes(avg_data.low);
       var high = convertToHoursMinutes(avg_data.high);
       var critical = convertToHoursMinutes(avg_data.critical);
       var maxHours = 24; // Assuming a full day as the maximum value
       var lowPercentage = (avg_data.low / maxHours) * 100;
       var highPercentage = (avg_data.high / maxHours) * 100;
       var criticalPercentage = (avg_data.critical / maxHours) * 100;
       var total_hours=Math.round(avg_data.low+avg_data.high+avg_data.critical)}
       // var Average_Response_chart = `<div class="row align-items-center">
       // <div class="col">
       // <h5>Average Response Time </h5>
       // </div>
       // <div class="col-auto">
       // <p class="btn-br-grey">Past 7 Days</p>
       // </div>
       // </div>
       // <div class="history-process-data-grp">                                
       // <h6>Low Priority Ticket Response Time <span>${low}</span> </h6>
       // <div class="history-process-data dsn-1"><span class="data" style="width: ${lowPercentage}%;"></span> </div>                                
       // </div>
       // <div class="history-process-data-grp">                                
       // <h6>Critical Priority Ticket Response Time <span>${high}</span> </h6>
       // <div class="history-process-data dsn-2"><span class="data" style="width: ${highPercentage}%;"></span> </div>                                
       // </div>
       // <div class="history-process-data-grp">                                
       // <h6>High Priority Ticket Response Time <span>${critical}</span> </h6>
       // <div class="history-process-data dsn-3"><span class="data" style="width: ${criticalPercentage}%;"></span> </div>                                
       // </div>
       // <div class="text-center history-process-img pt-4">
       // <img src="dist/images/client-partner/time.png" />
       // <div class="row">
       // <p class="col-auto">0</p>
       // <p class="col cl-grey">hrs</p>
       // <p class="col-auto">${total_hours} hrs</p>
       // </div>
       // </div>`;
       var Average_Response_chart = `<div class="row align-items-center">
       <div class="col">
       <h5>Average Response Time </h5>
       </div>
       <div class="col-auto">
       </div>
       </div>
       <div class="history-process-data-grp">                                
       <h6>Low Priority Ticket Response Time <span>${low}</span> </h6>
       <div class="history-process-data dsn-1"><span class="data" style="width: ${lowPercentage}%;"></span> </div>                                
       </div>
       <div class="history-process-data-grp">                                
       <h6>Critical Priority Ticket Response Time <span>${critical}</span> </h6>
       <div class="history-process-data dsn-2"><span class="data" style="width: ${criticalPercentage}%;"></span> </div>                                
       </div>
       <div class="history-process-data-grp">                                
       <h6>High Priority Ticket Response Time <span>${high}</span> </h6>
       <div class="history-process-data dsn-3"><span class="data" style="width: ${highPercentage}%;"></span> </div>                                
       </div>
       <div class="text-center history-process-img pt-4">
       <img src="dist/images/client-partner/time.png" />
       <div class="row">
       <p class="col-auto">0</p>
       <p class="col cl-grey">hrs</p>
       <p class="col-auto">${total_hours} hrs</p>
       </div>
       </div>`;
       $('#averageResponseTimeGraph').html(Average_Response_chart);
  });
  }
}

function CustomerReviewChart(){
  if(Client_Id){
  $.ajax({
       url: 'https://gprogress.green.com.pg/calculate/client_partner/customer_score/',
       type: 'post',
       data: {
           'client_id': Client_Id,
           "solar_project_id": globalProjectId,
       }
  }).done(function (json_data) {
      data = JSON.parse(json_data);
      CustomersScore(data)
  })
}
}
function CustomersScore(response){
      data = response
      //console.log(" -- CUSTOMER SCORE --- ", data)
      var total_positive_score=data.total_positive_feedback
      // var weekly_total_positive_score=data.percentage_positive_whole_week
      var total_tickets_count_by_status=data.tickets_count_list
      // var past_seven_days_values = Object.values(pastSevenDaysData);
      // past_seven_days_values=[0,0,0,100,0,0,0]
      // console.log(past_seven_days_values)
      // var ChartPersentage = today_total_positive_score
      // if(scoreFilterValue == "Today"){
      // var ChartPersentage = today_total_positive_score
      // }if(scoreFilterValue == "this_week"){
      // var ChartPersentage = weekly_total_positive_score
      // }
      // if(today_total_positive_score == ''){
      // var ChartPersentage = 0
      // }
      // if(weekly_total_positive_score == ""){
      // var ChartPersentage = 0
      // }
      // customer_score_chart1=
      // `<div class="row align-items-center">
      // <div class="col">
      // <h5>CSAT</h5>
      // </div>
      // <div class="col-auto">
      // <select class="drp-dsn" id="scoreFilter">
      // <option value="today" selected>All</option>
      // <option value="today">Today</option>
      // <option value="this_week">This Week</option>
      // </select>
      // </div>
      // </div>
      // <div id="app"></div>
      // <h4>${ChartPersentage}</h4>`
      customer_score_chart1=
      `<div class="row align-items-center">
      <div class="col">
      <h5>CSAT</h5>
      </div>
      <div class="col-auto">
      <select class="drp-dsn" id="scoreFilter">
      <option value="today" selected>All</option>
  
      </select>
      </div>
      </div>
      <div id="app"></div>
      <h4>${total_positive_score}</h4>`
      $('#customer_score_div1').html(customer_score_chart1);
      if (scoreChart){
       scoreChart.destroy();
      }
      // const speed = ChartPersentage;
          const speed = total_positive_score;
  
      let animationAngle = 0;
      const chartData = {
      datasets: [
       {
          label: '# of Votes',
          data: [34, 33, 33],
          backgroundColor: [
              'rgba(241, 88, 123, 1)',
              'rgba(255, 158, 68, 1)',
              'rgba(49, 221, 3, 1)'
          ],
          borderWidth: 0
       }
      ]
      };
      const options = {
      circumference: 180,
      rotation: -90,
      cutout: "80%",
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.5,
      animation: {
       animateRotate: true
      },
      plugins: {
       legend: { display: true },
       tooltip: { enabled: false }
      }
      };
      const guageNeedle = {
      id: "guageNeedle",
      afterDatasetsDraw: function (chart) {
          const {
          ctx,
          chartArea: { width }
          } = chart;
          ctx.save();
  
          const angle = Math.PI + (1 / 100) * speed * Math.PI;
  
          const cx = width / 2;
          const cy = chart._metasets[0].data[0].y;
  
          ctx.translate(cx, cy);
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(0, -8);
          ctx.lineTo(cx, 0);
          ctx.lineTo(0, 8);
          ctx.fillStyle = "black";
          ctx.fill();
          ctx.rotate(-angle);
  
          ctx.translate(-cx, -cy);
          ctx.beginPath();
          ctx.arc(cx, cy, 10, 0, 10);
          ctx.fill();
          ctx.restore();
      }
      };
      const speedLabel = {
      id: "speedLabel",
      afterDatasetsDraw: function (chart) {
          const { ctx } = chart;
  
          var data = chart._metasets[0].data[0];
          var centerX = data.x;
          var centerY = data.y;
  
          ctx.fillStyle = "black";
          ctx.font = `bolder 1.5em sans-serif`;
          ctx.textAlign = "center";
          // ctx.fillText(speed+'%', centerX, centerY + 35);
      }
      };
      const labels = {
      id: "labels",
      afterDatasetsDraw: function (chart) {
          const {
          ctx,
          chartArea: { width }
          } = chart;
          ctx.save();
          const cy = chart._metasets[0].data[0].y;
          ctx.fillStyle = "rgb(144, 144, 144)";
          ctx.font = `bolder 1em roboto`;
          ctx.textAlign = "center";
          ctx.fillText(0, 10, cy + 15);
          ctx.fillText(100, width - 20, cy + 15);
      }
      };
      // Create a canvas element for the chart
      const chartCanvas = document.createElement("canvas");
      chartCanvas.width = 300; // Set your desired width
      chartCanvas.height = 200; // Set your desired height
      document.getElementById("app").appendChild(chartCanvas);
      // Create and configure the Doughnut chart
      const doughnutChart = new Chart(chartCanvas.getContext("2d"), {
      type: 'doughnut',
      data: chartData,
      options: options,
      plugins: [speedLabel, guageNeedle]
      });
      //////////////////////////////
      const ctx = document.getElementById('myChart');
  scoreChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["Open", "Answered", "Resolved", "Verified", "Closed", "Reopen"],
          datasets: [{
              label: null,
              data: total_tickets_count_by_status,
              backgroundColor: [
                  '#F1587B',
                  '#31DD03',
                  '#FF9E44',
                  '#F1587B',
                  '#31DD03',
                  '#FF9E44',
                  '#F1587B'
              ],
              borderWidth: 5
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true,
                  title: {
                      display: true,
                      text: 'Total Counts'
                  },
                  ticks: {
                      min: 0,
                      max: 10,
                      stepSize: 1
                  }
              }
          },
          legend: {
              display: true
          },
          tooltips: {
              callbacks: {
                  label: function (tooltipItem) {
                      //console.log(tooltipItem);
                      return tooltipItem.yLabel;
                  }
              }
          }
      }
  });
  
  $("#scoreFilter").change(function () {
      scoreFilterValue = $(this).val();
      CustomerReviewChart();
  });
}

// ---------------------------------------- CSAT CHART END HERE ------------------------------

// --- Customer Review Score Filter --- 
// $("#scoreFilter").change(function() {
//   scoreFilterValue = $(this).val();
//   CustomerReviewChart()
// })


// ------------------------- FINANCIAL ROI START HERE ------------------
var financialRoiCurrencyType = "PGK";

$(".financial-roi-currency-conversion").click(function() {
financialRoiCurrencyType = $(this).data("value");
FinancialROI();
// CalculateLCOE();
// PayBackChart();
// InternalRateReturnChart();
// ROIChart();

});

// --- FINANCIAL ROI ---
function FinancialROI(){
var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
$.ajax({
    url: 'https://gprogress.green.com.pg/clientPartner_finacial_calc/',
    type: 'post',
    data: {
        'client_id': Client_Id,
        "solar_project_id": globalProjectId,
        "financial_roi_currency_type": financialRoiCurrencyType,
        csrfmiddlewaretoken: csrf_data
    }
}).done(function (json_data) {
     data = JSON.parse(json_data);
    // console.log("financiallllllllllllllll data ",data)
     var financialData = data.financial_roi_data[0];

     filter_currency=financialData.Currency_Type
     initial_investment=Math.round(financialData.initial_investment).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
     total_saving=Math.round(financialData.total_saving).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
     //console.log("filter_currency",filter_currency)
     if (filter_currency === "INR"){
        var initial_investment_html = "₹ " + initial_investment;
        var total_saving_html = "₹ " + total_saving;
         global_roi_currency_logo = "₹"
     }if (filter_currency === "USD"){
        var initial_investment_html = "$ " + initial_investment;
        var total_saving_html = "$ " + total_saving;
         global_roi_currency_logo = "$"
     }if (filter_currency === "PGK"){
        var initial_investment_html = "K " + initial_investment;
        var total_saving_html = "K " + total_saving;
         global_roi_currency_logo = "K"
     }if (filter_currency === "SGD"){
        var initial_investment_html = "S$ " + initial_investment;
        var total_saving_html = "S$ " + total_saving;
         global_roi_currency_logo = "S$"
     }if (filter_currency === "AUD"){
        var initial_investment_html = "A$ " + initial_investment;
        var total_saving_html = "A$ " + total_saving;
     global_roi_currency_logo = "A$"
     }
    
     var financialData = data.financial_roi_data[0];
     financialROI_value = financialData.roi
     $('#invested_amount_div').html(`<h4>${initial_investment_html}</h4><span></span></h4>`);
     $('#total_saving_div').html(`<h4> ${total_saving_html}</h4><span class="up">`);
     payback_period_html=`<h4>${financialData.payback_period} years</h4><span class="up"></span>`
     $('#payback_period').html(payback_period_html);
     roi_html=`<h4>${financialData.roi} %</h4><span class="up"></span>`
     $('#total_roi_div').html(roi_html);
     CalculateLCOE();
     PayBackChart();
     InternalRateReturnChart();
     ROIChart();
})
}


function CalculateLCOE() {
var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
$.ajax({
    url: 'https://gprogress.green.com.pg/calculate/calculate_lcoe/',
    type: 'post',
    data: {
     'client_id': Client_Id,
     "solar_project_id": globalProjectId,
     "financial_roi_currency_type": financialRoiCurrencyType,
     csrfmiddlewaretoken: csrf_data
    }
}).done(function (json_data) {
    var data = JSON.parse(json_data);
    var solarProjectData = data['2'];
    var lcoeValue = solarProjectData['LCOE'];
    var currencyType = solarProjectData['Currency_Type'];
    if (filter_currency === "INR"){
     var lcoeValue_html = "₹ " + lcoeValue;
     global_roi_currency_logo = "₹"
    }
    if (filter_currency === "SGD"){
     var lcoeValue_html = "S$ " + lcoeValue;
     global_roi_currency_logo = "S$"
    }
    if (currencyType === "USD"){
     var lcoeValue_html = "$ " + lcoeValue;
     global_roi_currency_logo = "$"
    }if (currencyType === "PGK"){
     var lcoeValue_html = "K " + lcoeValue;
     global_roi_currency_logo = "K"
    }if (currencyType === "AUD"){
     var lcoeValue_html = "A$ " + lcoeValue;
     global_roi_currency_logo = "A$"
    }


    lcoe_html = `<h4> ${lcoeValue_html}/kWh </h4><span></span>`
    $('#lcoe_div').html(lcoe_html);

//console.log("LCOE Value:", lcoeValue);
    //console.log("Currency Type:", currencyType);
});
}

function PayBackChart() {
var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
$.ajax({
    url: 'https://gprogress.green.com.pg/clientPartner_payback/',
    type: 'post',
    data: {
        'client_id': Client_Id,
        "solar_project_id": globalProjectId,
        "financial_roi_currency_type": financialRoiCurrencyType,
        csrfmiddlewaretoken: csrf_data
    }
}).done(function (json_data) {
    let cumulativeData = json_data.cummulative;
    let paybackdata=json_data.payback_balance;
    let cumulativeCostSavingData = cumulativeData.map(item => item.cumulative_cost_saving);
    let paybackdataSaving = paybackdata.map(item => item.payback_balance);
    let paybackyear= paybackdata.map(item => item.year);
   // console.log("Cumulative Cost Saving Data:", paybackdataSaving);
   // console.log("Cumulative Cost Saving Data:", cumulativeCostSavingData);
    var options = {
     series: [
        {
         name: 'PayBack',
         data: paybackdataSaving,
        },
        {
         name: 'Cummulative Saving',
         data: cumulativeCostSavingData,
        }
     ],
     chart: {
        type: 'bar',
        height: 350
     },
     plotOptions: {
        bar: {
         distributed: false,
         columnWidth: '20%',
        }
     },
     dataLabels: {
        enabled: false,
     },
     //colors: ['#B6E94A', '#31DD03', '#FF9E44', '#EAD610', '#54CBF1'],
     colors: ['#FF9E44', '#B6E94A'],
     fill: {
        opacity: 1,
     },
     yaxis: {
        // reversed: true, // Remove this line to display negative values at the lower end
        tickAmount: 5,
        labels: {
         formatter: function (y) {
            return global_roi_currency_logo+' ' + Math.round(y).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); ;
         }
        },
        axisTicks: {
         show: true
        },
        axisBorder: {
         show: true
        },
        title: {
         text: '',
         offsetX: 20,
        },
        tickPositions: [-10000000, -500000, 0, 500000, 10000000] // Adjust tick positions as needed
     },
     xaxis: {
        type: 'year',
        title: {
         text: 'Years',
         offsetY: 10,
        },
        categories: paybackyear,
        labels: {
         rotate: -90
        }
     },
     tooltip: {
        enabled: true,
     },
     legend: {
        show: true,
        showForSingleSeries: true,
        position: 'top',
        horizontalAlign: 'right',
        title: {
         text: "Payback Period Graph ",
        }
     },
     grid: {
        show: true,
        borderColor: '#E5E4E4',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
         lines: {
            show: true
         }
        },
        yaxis: {
         lines: {
            show: true
         }
        },
     }
    };
    var chart1 = new ApexCharts(document.querySelector("#chart"), options);
    chart1.render();
    })
}

function ROIChart() {
    var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
    $.ajax({
     url: 'https://gprogress.green.com.pg/clientPartner_calculate_roi/',
     type: 'post',
     data: {
         'client_id': Client_Id,
         "solar_project_id": globalProjectId,
         "financial_roi_currency_type": financialRoiCurrencyType,
         csrfmiddlewaretoken: csrf_data
     }
    }).done(function (json_data) {
     data = JSON.parse(json_data)
     console.log("roii dataaaaaaaaaaaaaa",data)
     var cumulativeCostSavingValues = [];
     var ROIPercentageValues = [];
     var years = Object.keys(data);
     years.forEach(function(year) {
        cumulativeCostSavingValues.push(parseFloat(data[year].cumulative_cost_saving).toFixed(2));
        ROIPercentageValues.push(parseInt(data[year].roi).toFixed(2).replace(/\.00$/, "")+ '%');
     });
     var lastYearIndex = ROIPercentageValues.length - 1;
     var lastYearPercentage = ROIPercentageValues[lastYearIndex];
     var roundedLastYearPercentage = parseFloat(lastYearPercentage).toFixed(0);
     var ROI_years = Object.keys(data);
     roi_chart_div_html=` <h4>Return on Investment <sup>#</sup> ~ ${financialROI_value}% <span>25 Years</span></h4><div class="" id="roi-chart"></div><span class="note">YoY per unit tariff escalation is assumed as 2%</span>`
     $('#rio_chart_div').html(roi_chart_div_html);
     var options = {
         series: [{
         name: 'Percentage',
         type: 'line',
         data: ROIPercentageValues
        },{
            name: 'Amount',
            type: 'bar',
            data: cumulativeCostSavingValues,
            
         }],
         chart: {
            type: 'line',
            height: 250
         },
         plotOptions: {
            bar: {
             columnWidth: '50%',
             colors: {
                 backgroundBarOpacity: 0,
             }
            }
         },
         dataLabels: {
            enabled: false,
         },
         stroke: {
         width: [2, 0]
        },
         colors: ["#FF9E44", "#31DD03"],        
         yaxis: [{
         opposite: false,
         title: {
            text: ''
         },
       //  tickAmount: 5,
         axisBorder: {
             show: true,
             color: '#E5E4E4',
             offsetX: 0,
             offsetY: 0
            },
            labels: {
             formatter: function (y) {
             // return + y;
             return y+' %' // Add comma for every thousand
             }
         }

         }, {
            opposite: true,
            min: 0,
            tickAmount: 4,
            axisBorder: {
             show: true,
             color: '#E5E4E4',
             offsetX: -5,
             offsetY: 0
            },
            title: {
             text: '',
            
            },
            labels: {
             formatter: function (y) {
             return global_roi_currency_logo + ' ' + Math.round(y).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add comma for every thousand
             }
            }
            
            
         }],
         xaxis: {
            type: 'year',
            title: {
             text: '',
            
            },
            categories: ROI_years,
            labels: {
             rotate:0
            
            }
         },
         tooltip: {
             enabled: true,
         },
         legend: {
             show: true,
             showForSingleSeries: true,
             position: 'top',
             horizontalAlign: 'right',
             title: {
                 text: "Payback Period Graph ",
             }
         },
         grid: {
            show: false,
         }
         };
         var chart2 = new ApexCharts(document.querySelector("#roi-chart"), options);
         chart2.render();
     })
}

function irrYAxisLabel(value) {
    if (Math.abs(value) >= 100000) {
        return (value / 100000).toFixed(2) + ' ';
    } else if (Math.abs(value) >= 1000) {
        return (value / 1000).toFixed(2) + ' ';
    } else {
        return value.toFixed(2);
}
}

function InternalRateReturnChart() {
var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
$.ajax({
     url: 'https://gprogress.green.com.pg/calculate/internal_rate_of_return/',
     type: 'post',
     data: {
         'client_id': Client_Id,
         "solar_project_id": globalProjectId,
         "financial_roi_currency_type": financialRoiCurrencyType,
         csrfmiddlewaretoken: csrf_data
     }
}).done(function (json_data) {
     var data = JSON.parse(json_data);
     var discountRates = data.discount_rates
     var irrvalue =data.irr;
     var npvValues = data.npv_values;
     var roundedNpvValues = npvValues.map(value => Math.round(value));
     // Calculate the minimum value from npvValues
     var minNpvValue = Math.min(...roundedNpvValues);
     var maxNpvValue = Math.max(...roundedNpvValues);
     var roundedMinNpvValue = Math.round(minNpvValue);
     var roundedMaxNpvValue = Math.round(maxNpvValue);

     var options1 = {
     series: [{
         name: 'NPV',
         data: roundedNpvValues
     }],
     colors: ['#2ECF03', '#333333'],
     chart: {
         type: 'line',
         height: 350,
         tools: {
         zoom: false,
         zoomin: false,
         zoomout: false,
         download: false,
         },
         events: {
         selection: function(chartContext, { xaxis, yaxis }) {
             //console.log(xaxis.min);
         }
         }
     },
     plotOptions: {
         bar: {
         horizontal: false,
         columnWidth: '9',
         borderRadius: 3,
         borderRadiusApplication: 'end',
         },
     },
     dataLabels: {
         enabled: false
     },
     stroke: {
         curve: 'monotoneCubic',
         width: [1],
         colors: 'rgba(0, 0, 0, 0.70)',
     },
     labels: discountRates,
     annotations: {
        // xaxis: [{
        //    x: irrvalue,
        //    borderColor: '#B9BBBD',
        //    strokeDashArray: 4,
        //    label: {
        //     text: "IRR",
        //    },
        // }],
     },
     xaxis: {
         type: 'numeric',
         tickPlacement: 'on',
         min: 0,
         stepSize: 25,
         max: 150,
         tickAmount: 6,
         zoom: {
         enabled: false
         },
         title: {
         text: '',
         offsetX: 200,
         },
         labels: {
         offsetY: 0,
         align: 'center',
         formatter: (val) => {
             return val + '%';
         }
         },
         axisTicks: {
         height: 9,
         offsetY: 5,
         color: '#B9BBBD',
         },
         axisBorder: {
         offsetX: -12,
         }
     },
     yaxis: {
         show: true,
         textCoords: 'on',
         min: roundedMinNpvValue,
         max: roundedMaxNpvValue,
         tickAmount: 8,
         title: {
         text: '',
         offsetX: 20,
         },
         labels: {
         align: 'right',
         offsetX: -10,
         formatter: irrYAxisLabel
         },
         axisBorder: {
         show: true,
         color: '#E5E4E4',
         },
     },
     fill: {
         opacity: 1,
     },
     tooltip: {
         enabled: true,
     },
     legend: {
         show: true,
         showForSingleSeries: true,
         position: 'top',
         horizontalAlign: 'center',
         floating: true,
         offsetY: 10,
         offsetX: -5,
         customLegendItems: ['NPV'],
     },
     grid: {
         show: false,
     },
     markers: {
         size: 5,
         colors: ['#2ECF03', '#FFA856', '#E06965', '#E06965', '#E06965'],
         strokeColors: '#fff',
         strokeWidth: 0,
         strokeOpacity: 0.9,
         strokeDashArray: 0,
         fillOpacity: 1,
         discrete: [{
         seriesIndex: 0,
         dataPointIndex: 0,
         fillColor: '#B6E94A',
         strokeColor: '#fff',
         size: 5,
         shape: "circle" // "circle" | "square" | "rect"
         }, {
         seriesIndex: 0,
         dataPointIndex: 1,
         fillColor: '#2ECF03',
         strokeColor: '#eee',
         size: 5,
         shape: "circle" // "circle" | "square" | "rect"
         }, {
         seriesIndex: 0,
         dataPointIndex: 2,
         fillColor: '#FF9E44',
         strokeColor: '#eee',
         size: 5,
         shape: "circle" // "circle" | "square" | "rect"
         }, {
         seriesIndex: 0,
         dataPointIndex: 3,
         fillColor: '#EAD610',
         strokeColor: '#eee',
         size: 5,
         shape: "circle" // "circle" | "square" | "rect"
         }, {
         seriesIndex: 0,
         dataPointIndex: 4,
         fillColor: '#54CBF1',
         strokeColor: '#eee',
         size: 5,
         shape: "circle" // "circle" | "square" | "rect"
         }],
         shape: "circle",
         radius: 2,
     }
     };

     // Ensure the element with id "dot-chart" exists in your HTML
     chart3 = new ApexCharts(document.querySelector("#dot-chart"), options1);
     chart3.render();
});
}
// ----------------- FINANCIAL ROI END HERE ---------------------

//  --------------- ACCOUNTS AND STMT START HERE ----------------

$(".accounts-stmt-currency-conversion").click(function() {
  accountsStmtCurrencyType = $(this).data("value");
  $("#RevenueReportFilter").trigger("change");
});

function AccountsandStatement(){
  $("#RevenueReportFilter").trigger("change");
  
}

$("#RevenueReportFilter").change(function() {
  revenueFilterYear = $(this).val();
  var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
  $.ajax({
    url: 'https://gprogress.green.com.pg/accounts_and_statement_cal/',
    type: 'post',
    data: {
        'client_id': Client_Id,
        'revenue_filter_year': revenueFilterYear,
        "solar_project_id": globalProjectId,
        "currency_type": accountsStmtCurrencyType,
        csrfmiddlewaretoken: csrf_data
    }
  }).done(function (json_data) {
      accounts_stmt_data = json_data
     // console.log("accounts_stmt_data",accounts_stmt_data)
      InvoiceOverView(accounts_stmt_data);
  })
})


function InvoiceOverView(response) {
  invoice_data = response;
//  console.log("accounts_stmt_data",accounts_stmt_data)
  var outstanding_total = Math.round(invoice_data.outstanding_total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  var invoice_paid_total = Math.round(invoice_data.invoice_paid_total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  var total_invoice_paid_precentage = invoice_data.total_paid_invoice_precentage;
  // console.log("total_invoice_paid_precentage",total_invoice_paid_precentage)
  var total_overdue_invoice_precentage = invoice_data.over_due_total_invoice_precentage;
  // console.log("total_overdue_invoice_precentage",total_overdue_invoice_precentage)
  
  var transaction_history = invoice_data.transaction_history;
  var pending_invoice = invoice_data.pending_invoice_list;
  var overdue_invoice_title = invoice_data.overdue_invoice_title;
//  console.log("overdue_invoice_title",overdue_invoice_title)
  var invoice_overdue_days = invoice_data.invoice_overdue_days;
//  console.log("invoice_overdue_days",invoice_overdue_days)
  var total_paid_quoter_list = invoice_data.total_paid_quoter_list;
  var outstanding_quoter_paid_list = invoice_data.outstanding_quoter_paid_list;
  var Revenue_FilterYear = invoice_data.Revenue_FilterYear;
  var filter_currency = invoice_data.filter_currency;
  if (filter_currency === "INR"){
       var outstanding_total_append = "₹ " + outstanding_total;
       var invoice_paid_total_append = "₹ " + invoice_paid_total;
       global_accounts_currency_logo = "₹"
  }if (filter_currency === "USD"){
       var outstanding_total_append = "$ " + outstanding_total;
       var invoice_paid_total_append = "$ " + invoice_paid_total;
       global_accounts_currency_logo = "$"
  }if (filter_currency === "PGK"){
       var outstanding_total_append = "K " + outstanding_total;
       var invoice_paid_total_append = "K " + invoice_paid_total;
       global_accounts_currency_logo= "K"
  }if (filter_currency === "SGD"){
       var outstanding_total_append = "S$ " + outstanding_total;
       var invoice_paid_total_append = "S$ " + invoice_paid_total;
       global_accounts_currency_logo = "$"
  }if (filter_currency === "AUD"){
       var outstanding_total_append = "A$ " + outstanding_total;
       var invoice_paid_total_append = "A$ " + invoice_paid_total;
       global_accounts_currency_logo = "A$"
  }
  var invoice_paid_precentage_append = total_invoice_paid_precentage+"%";
  var overdue_invoice_precentage_append = total_overdue_invoice_precentage+"%";
  // var total_invoice_paid_style_precentage = `<div class="percentage-bar"><span style="width:${total_invoice_paid_precentage}%;"></span></div>`
  // var total_invoice_due_style_precentage = `<div class="percentage-bar"><span style="width:${total_overdue_invoice_precentage}%"</span></div>`;
  $('#total_outstanding_amount').html(`<h4>${outstanding_total_append}</h4>`);
  $('#total_paid_amount').html(`<h4>${invoice_paid_total_append}</h4>`);
  $('#total_invoice_paid_precentage').html(`<h4>${invoice_paid_precentage_append}</h4>`);
  $('#total_invoice_due_precentage').html(`<h4>${overdue_invoice_precentage_append}</h4>`);
  // $('#total_invoice_paid_style').html(`<h4>${total_invoice_paid_style_precentage}</h4>`);
  // $('#total_invoice_due_style').html(`<h4>${total_invoice_due_style_precentage}</h4>`);
  
  // $('#total_outstanding_amount').html(outstanding_total_append);
  // $('#total_paid_amount').html(invoice_paid_total_append);
  // $('#total_invoice_paid_precentage').html(invoice_paid_precentage_append);
  // $('#total_invoice_due_precentage').html(overdue_invoice_precentage_append);
  // $('#total_invoice_paid_style').html(total_invoice_paid_style_precentage);
  // $('#total_invoice_due_style').html(total_invoice_due_style_precentage);
  
  pastDueChartID = `pastduechart_${Revenue_FilterYear}`
  pastDueChartHTML = `<div id="${pastDueChartID}"></div>`;
  $('#PastDueChartAppend').html(pastDueChartHTML)
  
  revenueChartID = `revenuechart_${Revenue_FilterYear}`
  revenueChartHTML = `<div id="${revenueChartID}"></div>`;
  $('#RevenueChartAppend').html(revenueChartHTML)
  
  setTimeout(function(){
      $( ".transaction-history table, .pending-invoice table" ).each( function( index, tableID ) {
       $( tableID ).find( "thead tr th" ).each( function( index ) {
           index += 1;
           $( tableID ).find( "tbody tr td:nth-child(" + index + ")" ).prepend(`<span class="mbl-th" style="display:none">${$(this).text()}: </span>`);
       });
  });
  }, 500);
  
  // Transaction History Table
  var Transaction_HistoryHTML = '';
  
  // Define a custom date parsing function
  function parseCustomDate(dateString) {
  var parts = dateString.split('/');
  var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var monthIndex = monthNames.indexOf(parts[1]);
  var formattedDate = new Date(parts[2], monthIndex, parts[0]);
  return formattedDate;
  }
  
  // Assuming transaction_history is an array of objects with a 'date' property
  transaction_history.sort(function(a, b) {
  // Convert the date strings to Date objects for comparison
  var dateA = parseCustomDate(a.date);
  var dateB = parseCustomDate(b.date);
  
  // Compare the dates
  return dateA - dateB; // Change to dateB - dateA for descending order
  });
  
  for (var i = 0; i < transaction_history.length; i++) {
      var transaction = transaction_history[i];
 //     console.log(" -- transaction_history -- ", transaction);
      var transaction_amount=Math.round(transaction.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      if(`${transaction.status}` === "overdue"){
       var overdue_append = `<span class="${transaction.status}">${transaction.status} - ${transaction.delay_days} ${transaction.days_text}</span>`
      }else{
       var overdue_append = `<span class="${transaction.status}">${transaction.status}</span>`
      }
      Transaction_HistoryHTML += `
          <tr>
          <td>${transaction.title}</td>
          <td>${transaction.date}</td>
          <td>${global_accounts_currency_logo} ${transaction_amount}</td>
          <td>${overdue_append}</td>
          </tr>`;
      }
  $('#transaction_history_table_append').html(Transaction_HistoryHTML);
  
  
  // Pending Invoice
  var Pending_InvoiceHTML = '';
  for (var i = 0; i < pending_invoice.length; i++) {
      var pending_invoice_data = pending_invoice[i];
  //    console.log(" -- transaction_history -- ", transaction)
      var due_date_amount=Math.round(pending_invoice_data.due_date_amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      Pending_InvoiceHTML += `
      <tr>
      <td>${pending_invoice_data.title}</td>
      <td>${global_accounts_currency_logo} ${due_date_amount}</td>
      <td>${pending_invoice_data.invoice_overdue_date}</td>
      <td class="invoice-col"><a href="${pending_invoice_data.invoice_doc_link}" target="_blank">Invoice(${pending_invoice_data.title})</a></td>
      <td class="invoice-col"><a href="${pending_invoice_data.support_doc_link}" target="_blank">Support(${pending_invoice_data.title})</a></td>
      </tr>`
  }
  $('#pending_invoice_append').html(Pending_InvoiceHTML);
  
  // Past Due Report Chart
  
  
  // Past Due Report Chart
  
  
  var optionsp = {
    chart: {
       height: 400,
       type: "line"
    },
    series: [
       {
          name: "Invoices",
          data:invoice_overdue_days
       }
    ],
    colors: ['#F1587B'],
    stroke: {
       width: [1],
       curve: 'straight',
       colors: '#333333',
    },
    markers: {
       size: 8,
       colors: '#F1587B',
       strokeWidth: 0,
    },
    title: {
       text: ""
    },
    plotOptions: {
        bar: {
          horizontal: false,
          columnWidth:'60%',
        },
      },
    dataLabels: {
       enabled: false,
    },
    // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    labels: overdue_invoice_title,
    xaxis: {
       type: "",
       tickPlacement: 'between',
       
       axisBorder: {
          show: true,
          color: '#E5E4E4',
       },
       
    },
    yaxis: {
       labels: {
          formatter: function (y) {
             return y +' days ';
          },
       },
       min:0,
       tickAmount: 6,
       stepSize: 100,
       axisBorder: {
          show: true,
          color: '#E5E4E4',
          offsetX: 0
       },
    },
    grid: {
       show: false,
    }
       
    };

    var chart2 = new ApexCharts(document.querySelector(`#${pastDueChartID}`), optionsp);

    chart2.render();
  
      
  
      // --------------------------------------------------------------------------------------------------------------------
  
      // Year Based Chart
      /* Account and Statement Charts */
      var optionsr = {
       series: [{
       name: 'Paid',
       data: total_paid_quoter_list
       }, {
       name: 'Outstanding',
       data: outstanding_quoter_paid_list
       }],
       chart: {
       type: 'bar',
       height: 330,
       stacked: false,
       stackType: 'normal',
       toolbar: {
           show: true
       },
       zoom: {
           enabled: true
       }
       },
       colors: ['#31DD03', '#FF9E44'],
      
       responsive: [{
       breakpoint: 480,
       options: {
           legend: {
           position: 'bottom',
           offsetX: -10,
           offsetY: 0
           }
       }
       }],
       plotOptions: {
       bar: {
           horizontal: false,
           columnWidth:'50%',
       },
       },
       dataLabels: {
           enabled: false,
       },
       xaxis: {
       type: 'category',
       categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
       axisBorder: {
           show: true,
           color: '#303030',
       },
      
       },
       yaxis: {
       axisBorder: {
           show: true,
           color: '#303030',
       },
       tickAmount: 6,
       labels: {
       formatter: function (y) {
       // return + y;
       return global_accounts_currency_logo +' ' + Math.round(y).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add comma for every thousand
       }
  }
  
       },
       legend: {
       show: true,
       position: 'top',
       horizontalAlign: 'left',
       fontSize: '13px',
       fontFamily: 'Raleway',
       offsetY: 0,
       offsetX: -25
       },
       fill: {
       opacity: 1
       },
       grid: {
       show: false,
       borderColor: '#979797',
       strokeDashArray: 5,
       }
  
       };
  
  var chart1 = new ApexCharts(document.querySelector(`#${revenueChartID}`), optionsr);
  chart1.render();
  
  
  // $('.as-right-panel .top-panel select.year').on('change', function(){
  // chart1.updateSeries([{
  //     name: 'Paid',
  //     data: [180000, 80000, 90000, 120000]
  //     }, {
  //     name: 'Outstanding',
  //     data: [90000, 10000, 60000, 120000]
  //     }])
  // });
  
  // $('.as-right-panel .top-panel select.month').on('change', function(){
  // chart1.updateSeries([{
  //     name: 'Paid',
  //     data: [180000, 80000, 90000, 120000]
  //     }, {
  //     name: 'Outstanding',
  //     data: [90000, 10000, 60000, 120000]
  //     }])
  // });
  }

//  ------------ ACCOUNT AND STMT END HERE --------------------

// -------------- ENVIRONMENTAL SAVING START HERE --------------

// --- Environmental Saving ---- 
function EnvironmentalSaving(){
  $("#CarbonEmissionYearFilter").trigger("change");
}

// --- Filter Carbon Emission Year ---
$("#CarbonEmissionYearFilter").change(function(){
  CarbonEmissionFilterYear = $(this).val();
  var currentDate = new Date();
  var isoDateString = currentDate.toISOString();
  var timezoneOffset = currentDate.getTimezoneOffset();
  var browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
  $.ajax({
    url: 'https://gprogress.green.com.pg/environmental_saving/calculation/',
    type: 'post',
    data: {
        client_id:Client_Id, date:isoDateString, timezoneOffset:timezoneOffset, browserTimezone:browserTimezone, CarbonEmissionFilterYear: CarbonEmissionFilterYear,
        solar_project_id:globalProjectId, csrfmiddlewaretoken: csrf_data
    }
  }).done(function (json_data) {
      saving_data = json_data
      EnvironmentalSavingData(saving_data);
  })
})

function EnvironmentalSavingData(response){
  co2_data = response
  var Todate_CO2_Saved_KG = co2_data.Todate_CO2_Saved_KG.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  var Trees_Planted = co2_data.Trees_Planted.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  var Disel_Saved = co2_data.Disel_Saved.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  // var Fossil_Fuel_Saved = co2_data.Fossil_Fuel_Saved.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  var LightBulbs_Powered = co2_data.LightBulbs_Powered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  var CarsTaken_of_the_road = co2_data.CarsTaken_of_the_road.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  var Total_Production = co2_data.Total_Production;
  var Total_Consumption = co2_data.Total_Consumption;
  var Emission_Yearly_List = co2_data.Emission_Yearly_List
  var Emission_Month_List = co2_data.Emission_Month_List
  // var Total_Production_Presentage = co2_data.Total_Production_Presentage
  // var Total_Consumption_Presentage = co2_data.Total_Consumption_Presentage
  // alert(Total_Production_Presentage)
  // alert(Total_Consumption_Presentage)
  
  Co2_savedHTML = `<div class="envir-data"><h4>CO<sub>2</sub> Replaced <span>(Kgs)</span></h4><img src="dist/images/client-partner/carbon-1.png" /></div>    
  <h5>${Todate_CO2_Saved_KG}</h5>`
  $("#Co2_saved").html(Co2_savedHTML)
  
  Trees_PlantedHTML = `<div class="envir-data"><h4>Trees Planted  <span>(Nos.)</span></h4>
  <img src="dist/images/client-partner/carbon-2.png" /> </div>        
  <h5>${Trees_Planted} </h5>`
  $("#trees_planted").html(Trees_PlantedHTML)
  
  Disel_SavedHTML = `<div class="envir-data"><h4>Homes Powered <span>(Nos.)</span></h4>
  <img src="dist/images/client-partner/carbon-3.png" /> </div>    
  <h5>14 </h5>`
  $("#diesal_saved").html(Disel_SavedHTML)
  
  Fossil_savedHTML = `<div class="envir-data"><h4>Diesel Saved <span>(Lts)</span></h4> <img src="dist/images/client-partner/carbon-4.png" /> </div>    
  <h5>${Disel_Saved} </h5>`
  $("#fossil_fuel_saved").html(Fossil_savedHTML)
  
  LightBulbHTML = `<div class="envir-data"><h4>Light Bulbs Powered <span>(Nos.)</span></h4> <img src="dist/images/client-partner/carbon-5.png" /> </div>    
  <h5>${LightBulbs_Powered} <span class="sml">(60 W Bulb)</span> </h5>`
  $("#light_bulb_powerd").html(LightBulbHTML)
  
  CarsTakenHTML = `<div class="envir-data"><h4>Cars Taken off the Road <span>(Nos.)</span></h4> <img src="dist/images/client-partner/carbon-6.png" />    </div>
  <h5>${CarsTaken_of_the_road} </h5>`
  $("#cars_taken_of_road").html(CarsTakenHTML)
  // Co2_savedHTML = `<h4>CO2 Saved</h4>    
  // <h5>27000 <span class="big">KG</span></h5>`
  // $("#Co2_saved").append(Co2_savedHTML)
  // Co2_savedHTML = `<h4>CO2 Saved</h4>    
  // <h5>27000 <span class="big">KG</span></h5>`
  // $("#Co2_saved").append(Co2_savedHTML)
  TotalProductionHTML = `
  <h5>Total Production <span >- 18,248 kWh</span></h5>
  <div class="carbon-process-dsn">
       <span class="data" style="width: 18.24%;"></span>    
  </div>
  <p class="data-name">Production</p>`
  $("#total_production").html(TotalProductionHTML)
  
  TotalConsumptionHTML = `
  <h5>Total Consumption <span >- 17,110 kWh</span></h5>
  <div class="carbon-process-dsn">
       <span class="data" style="width: 17.11%;"></span>
  </div>
  <p class="data-name">Usage</p>`
  $("#total_consumption").html(TotalConsumptionHTML)
  
  if (myChart) {
      myChart.destroy();
  }
  
  // Create a new chart
  const ctx = document.getElementById('carbonChart');
  myChart = new Chart(ctx, {
       type: 'bar',
       data: {
       labels: Emission_Month_List,
       datasets: [{
           label: 'Carbon Emission Saved',
           data: Emission_Yearly_List,
           backgroundColor: '#54CBF1',
           borderWidth: 1
       }]
       },
       options: {
       legend: {
           display: false
       },
       tooltips: {
           callbacks: {
           label: function (tooltipItem) {
               return tooltipItem.yLabel;
           }
  
       }
      }
  }
  });
  }
//  ----------------------- ENVIRONMENATL SAVING END HERE --------------------- 

// --------------------- SITE MONITORING START HERE ------------------

function SiteMonitoring(){
  CurrentDayHistoryMetrix();
  var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
  if(Client_Id){
  $.ajax({
      url: 'https://gprogress.green.com.pg/solarhistorylist/',
      type: 'post',
      data: {
          'client_id': Client_Id,
          'solar_project_id': globalProjectId,
          csrfmiddlewaretoken: csrf_data
  }
  }).done(function (json_data) {
       data = JSON.parse(json_data);
       //console.log("site monitering data",data)
       var productionValue = data.solar_plant_data[0].plant_real_data[0].production;
       var capacityValue = data.solar_plant_data[1].station_data[0].capacity;
       var gridvalue=data.solar_plant_data[0].plant_real_data[0].grid;
       var consumption=data.solar_plant_data[0].plant_real_data[0].consumption;
       var battery=Math.abs(data.solar_plant_data[0].plant_real_data[0].battery_power);
       capacity_div_html = `<h5>${capacityValue} kWp </h5>`
       $('#capacity_div').html(capacity_div_html);
       production_html=`<h5>18,248 kWh</h5>`
       $('#production_div').html(production_html);
       grid_div_html=`<h5>${gridvalue} W </h5>`
       $('#grid_div').html(grid_div_html);
       consumption_div_html=`<h5>17,110 kWh</h5>`
       $('#consumption_div').html(consumption_div_html);
       production_html2=`<span class="small-heading">Production</span>
       <span class="power-values">${productionValue} kW</span>`
       $('#production_div2').html(production_html2);
       battery_html2=` <span class="small-heading">Battery</span>
       <span class="power-values">${battery} kW</span>`
       $('#battery_div').html(battery_html2);
       grid_div_html2=`  <span class="small-heading">Grid</span>
       <span class="power-values">${gridvalue} W</span>`
       $('#grid_div2').html(grid_div_html2);
       consumption_div_html2=`<span class="small-heading">Consumption</span>
       <span class="power-values">${consumption} kW</span>`
       $('#consumption_div2').html(consumption_div_html2);
  })
}
}

function formatYAxisLabel(value) {
    if (Math.abs(value) >= 100000) {
          return (value / 100000).toFixed(2) + ' L';
    } else if (Math.abs(value) >= 1000) {
          return (value / 1000).toFixed(0) + ' K';
    } else {
          return value.toFixed(2);
    }
 }
 


// ----- Day Month Year Picker -----
$(document).ready(function () {
  $(".dayPicker").datepicker({
      dateFormat: 'dd/mm/yy',
      onSelect: function (dateText, inst) {
          // Trigger SiteMonitoringHistoryFilter() when the date is selected
          SiteMonitoringHistoryFilter(fetchFilterData);
      }
  });

  // $( ".dayPicker" ).datepicker();

  $( ".datetimepicker" ).datepicker();
  
  $(document).on('click', '.ui-datepicker-select-year td a', function(){
     var Year = $(this).text();
     $('.ui-datepicker-select-month, .ui-datepicker-header').hide();
     $('.hasDatepicker').val(Year);
     $('#ui-datepicker-div').hide();
     $( ".dayPicker" ).attr('onclick', "")
  });

  function convertMonthYear(monthYearString) {
  // Parse the month and year from the string
  const [month, year] = monthYearString.split(' ');

  // Create a Date object with the parsed month and year
  const date = new Date(month + ' 1, ' + year);

  // Format the month to two digits and concatenate with the year
  const formattedMonthYear = ('0' + (date.getMonth() + 1)).slice(-2) + '/' + year;

  return formattedMonthYear;
  }

  $(document).on('click', '.ui-datepicker-select-month td a', function(){
     var month = $(this).attr('data-mm');
     var month = parseInt(month) + 1;
     var year = $('.ui-datepicker-title a').text();
     text = year.replace(/\u00A0/g, ' '); 
     const originalDate = text;
     const formattedDate = convertMonthYear(originalDate);

     $('.ui-datepicker-calendar, .ui-datepicker-header').hide();
     $('.hasDatepicker').val(formattedDate);
     $('#ui-datepicker-div').hide();
     $( ".dayPicker" ).attr('onclick', "")
  });


  $('.days-hours button').each(function () {
      var _picker = $('.dayPicker');
      $(this).click(function () {
          $(this).siblings().removeClass('active');
          $(this).addClass('active');

          var _id = $(this).attr('data-id');
          _picker.trigger('focus');

          if (_id == 1) {
              jQuery.datepicker._toggleDisplay_MonthYearPicker('.dayPicker', 1);
              _picker.attr('onclick', "jQuery.datepicker._toggleDisplay_MonthYearPicker('.dayPicker', 1); return false;")
          } else if (_id == 2) {
              jQuery.datepicker._toggleDisplay_MonthYearPicker('.dayPicker', 2);
              _picker.attr('onclick', "jQuery.datepicker._toggleDisplay_MonthYearPicker('.dayPicker', 2); return false;")
          } else if (_id == 3) {
              jQuery.datepicker._toggleDisplay_MonthYearPicker('.dayPicker', 3);
              _picker.attr('onclick', "jQuery.datepicker._toggleDisplay_MonthYearPicker('.dayPicker', 3); return false;")
          }
          return false;
      })
  });
});

function fetchDateValue(){
  setTimeout(()=>{
    var selectedDate = $('#siteMonitoringDatePicker').val();
   // console.log("--- filtered_data ---",selectedDate);
    SiteMonitoringHistoryFilter(fetchFilterData);
  },3000)
}

function CurrentDayHistoryMetrix(filterData){
  console.log('excecuted')
  fetchFilterData = filterData;
  var defaultDate = '09/11/2023';
  $('#siteMonitoringDatePicker').val(defaultDate);
  $("#siteMonitoringDatePicker").trigger("change");
  var currentDate = new Date();
  var isoDateString = currentDate.toISOString();
  var timezoneOffset = currentDate.getTimezoneOffset();
  var browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var filtered_date = $("#siteMonitoringDatePicker").val();
  console.log("--- filtered_date ---",filtered_date)
  if (filtered_date.length === 4) {
      selectedDate = moment(currentDate).year(filtered_date).endOf('year');
  } else if (filtered_date.length === 7) {
       const [month, year] = filtered_date.split('/');
       const formattedDate = `${year}-${month.padStart(2, '0')}-01`;
       selectedDate = moment(formattedDate).endOf('month');
  } else {
       selectedDate = moment(filtered_date, "DD/MM/YYYY");
  }
  
  console.log("selectedDate", selectedDate);
  if (selectedDate.isValid()) {
       selectedDate.endOf('day');
       isoDateString = selectedDate.toISOString();
  }
  var timezoneOffset = selectedDate.utcOffset();
  var browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  $.ajax({
       url: 'https://gprogress.green.com.pg/clientpartner_site_monitering/',
       type: 'post',
       data: { date: isoDateString, timezoneOffset: timezoneOffset, browserTimezone:browserTimezone, filterdData:"days", solar_project_id:globalProjectId},
      }).done(function (json_data) {
       data = JSON.parse(json_data)
       var monthly_solar_production_data = data.monthly_solar_production_data;
       var firstElement = monthly_solar_production_data[0];
       var consumptionHoursList = firstElement.consumption_hours_list;
       var filterData = firstElement.filterd_data;
       var generationHoursList = firstElement.generation_hours_list;
  
       var minimum_date_day = firstElement.minimum_date;
       var maximum_date_day = firstElement.maximum_date;
       var ChartID = 'sitemonitoring-chart-'+filterData
       SiteMonitoringHTML = `<div id="${ChartID}" class="bar-chart"></div>`
       $("#sitemonitoring-chart-append").html(SiteMonitoringHTML)
       console.log("generationHoursList",generationHoursList)
       console.log("consumptionHoursList",consumptionHoursList)
  
       var optionss = {
          series: [
              {
                  name: 'Production',
                  data: generationHoursList
              },
              {
                  name: 'Consumption',
                  data: consumptionHoursList
              }
          ],
          chart: {
              type: 'area',
              height: 370,
              tools: {
                  zoom: false,
                  zoomin: false,
                  zoomout: false,
                  download: false,
              },
              events: {
                  selection: function (chartContext, { xaxis, yaxis }) {
                      console.log(xaxis.min);
                  },
              },
          },
          plotOptions: {
              bar: {
                  horizontal: false,
                  columnWidth: '17',
                  borderRadius: 0,
              },
          },
          dataLabels: {
              enabled: false,
          },
          stroke: {
              show: true,
              width: 2,
              colors: ['transparent'],
          },
          xaxis: {
              type: 'datetime',
              labels: {
                  rotate: -45,
                  formatter: function (val) {
                      const timeZone = 'Pacific/Port_Moresby';
                      const options = {
                          
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                          timeZone: timeZone,
                      };
                      return new Intl.DateTimeFormat('en-US', options).format(new Date(val));
                  },
              },
              axisBorder: {
                  show: true,
                  color: '#E5E4E4',
              },
              min: new Date(minimum_date_day).setHours(0, 0, 0, 0),
              max: new Date(maximum_date_day).setHours(23, 59, 59, 999),
              tickAmount: 24,
          },
          yaxis: {
              min: 0,
              max: 20,
              stepSize: 5,
              title: {
                  text: '',
              },
              labels: {
                  align: 'right',
                  offsetX: -10,
                  formatter: function (val) {
                      return val.toFixed(1) + ' kWh';
                  },
              },
              axisBorder: {
                  show: true,
                  color: '#E5E4E4',
              },
          },
          fill: {
              opacity: 1,
              colors: ['#71D875', '#E06965'],
          },
          tooltip: {
              enabled: true,
              x: {
                  formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                      const timeZone = 'Pacific/Port_Moresby';
                      const options = {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                          timeZone: timeZone,
                      };
                      return new Intl.DateTimeFormat('en-US', options).format(new Date(value));
                  },
              },
              // You can customize the tooltip for each series here
              // Refer to the ApexCharts documentation for more customization options
              shared: true,
              custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                  const value = w.globals.series[seriesIndex][dataPointIndex];
                  const seriesName = w.config.series[seriesIndex].name;
      
                  return `<span style="color: ${w.config.series[seriesIndex].color}">${seriesName}:</span> ${value} kWh`;
              },
          },
          legend: {
              show: false,
          },
          grid: {
              show: false,
          },
      };
      
      var chart4 = new ApexCharts(document.querySelector(`#${ChartID}`), optionss);
      chart4.render();
  })
}
  
function SiteMonitoringHistoryFilter(filterData){
  console.log('excecuted')
  fetchFilterData = filterData;
  $("#siteMonitoringDatePicker").trigger("change");
  var currentDate = new Date();
  var isoDateString = currentDate.toISOString();
  var timezoneOffset = currentDate.getTimezoneOffset();
  var browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var filtered_date = $("#siteMonitoringDatePicker").val();
  console.log("--- filtered_date ---",filtered_date)
  if (filtered_date.length === 4) {
      selectedDate = moment(currentDate).year(filtered_date).endOf('year');
  } else if (filtered_date.length === 7) {
       const [month, year] = filtered_date.split('/');
       const formattedDate = `${year}-${month.padStart(2, '0')}-01`;
       selectedDate = moment(formattedDate).endOf('month');
  } else {
       selectedDate = moment(filtered_date, "DD/MM/YYYY");
  }
  
  console.log("selectedDate", selectedDate);
  if (selectedDate.isValid()) {
       selectedDate.endOf('day');
       isoDateString = selectedDate.toISOString();
  }
  var timezoneOffset = selectedDate.utcOffset();
  var browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  $.ajax({
       url: 'https://gprogress.green.com.pg/clientpartner_site_monitering/',
       type: 'post',
       data: { date: isoDateString, timezoneOffset: timezoneOffset, browserTimezone:browserTimezone, filterdData:filterData, solar_project_id:globalProjectId},
  }).done(function (json_data) {
       data = JSON.parse(json_data)
       console.log(" -- JSON DATA -- ", data)
       var monthly_solar_production_data = data.monthly_solar_production_data;
  
       if (monthly_solar_production_data.length > 0) {
          var firstElement = monthly_solar_production_data[0];
          var consumptionHoursList = firstElement.consumption_hours_list;
          var consumptionYearlyList = firstElement.consumption_yearly_list;
          var dataCountList = firstElement.data_count_list;
          var filterData = firstElement.filterd_data;
          var generationHoursList = firstElement.generation_hours_list;
          var generationYearlyList = firstElement.generation_yearly_list;
          var generationMonthlyList = firstElement.generation_monthy_list;
          var consumptionMonthlyList = firstElement.consumption_monthy_list;
          var minimum_date_day = firstElement.minimum_date;
          var maximum_date_day = firstElement.maximum_date;        
          var minimum_date_month = firstElement.minimum_date_month
          var maximum_date_month = firstElement.maximum_date_month
          var year_minimum_date = firstElement.year_minimum_date
          console.log("min", minimum_date_day)
          console.log("max", maximum_date_day)
          var ChartID = 'sitemonitoring-chart-'+filterData
          SiteMonitoringHTML = `<div id="${ChartID}" class="bar-chart"></div>`
          $("#sitemonitoring-chart-append").html(SiteMonitoringHTML)
          if(filterData==="month"){
           var optionss = {
              series: [{
                  name: 'Production',
                  data: generationMonthlyList
              }, {
                  name: 'Consumption',
                  data: consumptionMonthlyList
              }],
              chart: {
                  type: 'area',
                  height: 370,
                  tools: {
                      zoom: false,
                      zoomin: false,
                      zoomout: false,
                      download: false,
                  },
                  events: {
                      selection: function(chartContext, { xaxis, yaxis }) {
                          console.log(xaxis.min)
                      }
                  }
              },
              plotOptions: {
                  bar: {
                      horizontal: false,
                      columnWidth: '17',
                      borderRadius:0,
                  },
              },
              dataLabels: {
                  enabled: false
              },
              stroke: {
                  show: true,
                  width: 2,
                  colors: ['transparent']
              },
              xaxis: {
               type: 'datetime',
               tickAmount: 10,
               labels: {
                   rotate: -45,
                   formatter: function(val) {
                       return new Date(val).toLocaleDateString('en-US');
                   }
               },
               axisBorder: {
                   show: true,
                   color: '#E5E4E4',
               },
               min: new Date(minimum_date_month).getTime(), // Set minimum x-axis value
               max: new Date(maximum_date_month).getTime(), // Set maximum x-axis value
           },
           yaxis: {
              min: 0,
              max: 200, // Set the maximum y-axis value to 2000 kWh
              stepSize: 50, // Adjust the stepSize according to your preference
              title: {
                  text: ''
              },
              labels: {
                  align: 'right',
                  offsetX: -10,
                  formatter: function (val) {
                      // Ensure the value is displayed with one decimal place
                      return val.toFixed(1) + ' kWh';
                  }
              },
              axisBorder: {
                  show: true,
                  color: '#E5E4E4',
              },
          },
              fill: {
                  opacity: 1,
                  colors: ['#71D875', '#E06965']
              },
              tooltip: {
                  enabled: true,
              },
              legend: {
                  show: false,
              },
              grid: {
                  show: false,
              }
          };
          var chart1 = new ApexCharts(document.querySelector(`#${ChartID}`), optionss);
          chart1.render();
          }if(filterData==="year"){
           console.log(" ---GEN H- ", generationYearlyList)
           console.log(" ---CON H- ", consumptionYearlyList)
           var optionss = {
           series: [{
               name: 'Production',
               data: generationYearlyList
           }, {
               name: 'Consumption',
               data: consumptionYearlyList
           }],
           chart: {
               type: 'area',
               height: 370,
               tools: {
                   zoom: false,
                   zoomin: false,
                   zoomout: false,
                   download: false,
               },
               events: {
                   selection: function(chartContext, { xaxis, yaxis }) {
                       console.log(xaxis.min)
                   }
               }
           },
           plotOptions: {
               bar: {
                   horizontal: false,
                   columnWidth: '17',
                   borderRadius:0,
               },
           },
           dataLabels: {
               enabled: false
           },
           stroke: {
               show: true,
               width: 2,
               colors: ['transparent']
           },
           xaxis: {
              type: 'datetime',
              tickAmount: 10,
              labels: {
                  rotate: -45,
                  formatter: function(val) {
                      return new Date(val).toLocaleDateString('en-US');
                  }
              },
              axisBorder: {
                  show: true,
                  color: '#E5E4E4',
              },
              min: new Date(year_minimum_date).getTime(), // Set minimum x-axis value
              max: new Date(maximum_date_month).getTime(), // Set maximum x-axis value
           },
           yaxis: {
              min: 0,
              max: 4000, // Set the maximum y-axis value to 2000 kWh
              stepSize: 1000, // Adjust the stepSize according to your preference
              title: {
                  text: ''
              },
              labels: {
                  align: 'right',
                  offsetX: -10,
                  formatter: function (val) {
                      // Ensure the value is displayed with one decimal place
                      return val.toFixed(1) + ' kWh';
                  }
              },
              axisBorder: {
                  show: true,
                  color: '#E5E4E4',
              },
           },
           fill: {
               opacity: 1,
               colors: ['#71D875', '#E06965']
           },
           tooltip: {
               enabled: true,
           },
           legend: {
               show: false,
           },
           grid: {
               show: false,
           }
          };
          var chart2 = new ApexCharts(document.querySelector(`#${ChartID}`), optionss);
          chart2.render();
          }
          const stepSize = 5; // Increase or decrease as needed
          const categories = Array.from({ length: (300 - 10) / stepSize + 1 }, (_, index) => 10 + index * stepSize);
          if (filterData==="days"){
           console.log("generationHoursList", generationHoursList);
           console.log("consumptionHoursList", consumptionHoursList);
           var optionss = {
              series: [
                  {
                      name: 'Production',
                      data: generationHoursList
                  },
                  {
                      name: 'Consumption',
                      data: consumptionHoursList
                  }
              ],
              chart: {
                  type: 'area',
                  height: 370,
                  tools: {
                      zoom: false,
                      zoomin: false,
                      zoomout: false,
                      download: false,
                  },
                  events: {
                      selection: function (chartContext, { xaxis, yaxis }) {
                          console.log(xaxis.min);
                      },
                  },
              },
              plotOptions: {
                  bar: {
                      horizontal: false,
                      columnWidth: '17',
                      borderRadius: 0,
                  },
              },
              dataLabels: {
                  enabled: false,
              },
              stroke: {
                  show: true,
                  width: 2,
                  colors: ['transparent'],
              },
              xaxis: {
                  type: 'datetime',
                  labels: {
                      rotate: -45,
                      formatter: function (val) {
                          const timeZone = 'Pacific/Port_Moresby';
                          const options = {
                              
                              hour: 'numeric',
                              minute: 'numeric',
                              hour12: true,
                              timeZone: timeZone,
                          };
                          return new Intl.DateTimeFormat('en-US', options).format(new Date(val));
                      },
                  },
                  axisBorder: {
                      show: true,
                      color: '#E5E4E4',
                  },
                  min: new Date(minimum_date_day).setHours(0, 0, 0, 0),
                  max: new Date(maximum_date_day).setHours(23, 59, 59, 999),
                  tickAmount: 24,
              },
              yaxis: {
                  min: 0,
                  max: 20,
                  stepSize: 5,
                  title: {
                      text: '',
                  },
                  labels: {
                      align: 'right',
                      offsetX: -10,
                      formatter: function (val) {
                          return val.toFixed(1) + ' kWh';
                      },
                  },
                  axisBorder: {
                      show: true,
                      color: '#E5E4E4',
                  },
              },
              fill: {
                  opacity: 1,
                  colors: ['#71D875', '#E06965'],
              },
              tooltip: {
                  enabled: true,
                  x: {
                      formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                          const timeZone = 'Pacific/Port_Moresby';
                          const options = {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                              hour12: true,
                              timeZone: timeZone,
                          };
                          return new Intl.DateTimeFormat('en-US', options).format(new Date(value));
                      },
                  },
                  // You can customize the tooltip for each series here
                  // Refer to the ApexCharts documentation for more customization options
                  shared: true,
                  custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                      const value = w.globals.series[seriesIndex][dataPointIndex];
                      const seriesName = w.config.series[seriesIndex].name;
          
                      return `<span style="color: ${w.config.series[seriesIndex].color}">${seriesName}:</span> ${value} kWh`;
                  },
              },
              legend: {
                  show: false,
              },
              grid: {
                  show: false,
              },
          
          };
          var chart3 = new ApexCharts(document.querySelector(`#${ChartID}`), optionss);
          chart3.render();
           }
          }
  })
}
// ----------------------- SITE MONITORING END HERE ------------------------------  

// ------------ USER ACTIVITY TRACKING ---------------

// --- Module Onclick -----
$("#tab-1").on('click', function(){
  if(Client_Id){
    moduleName = "Service and Support"
    UserActivityTracking()
  }else{
    window.location.replace("client-partner-login.html");
  }
}) 
$("#tab-2").on('click', function(){
  if(Client_Id){
    moduleName = "Service Call History"
    UserActivityTracking()
  }else{
    window.location.replace("client-partner-login.html");
  }
}) 
$("#tab-3").on('click', function(){
  if(Client_Id){
    moduleName = "Financial ROI"
    UserActivityTracking()
  }else{
    window.location.replace("client-partner-login.html");
  }
}) 
$("#tab-4").on('click', function(){
  if(Client_Id){
    moduleName = "Environmental Saving"
    UserActivityTracking()
  }else{
    window.location.replace("client-partner-login.html");
  }
}) 
$("#tab-5").on('click', function(){
  if(Client_Id){
    moduleName = "Accounts and Statement"
    UserActivityTracking()
  }else{
    window.location.replace("client-partner-login.html");
  }
}) 
$("#tab-6").on('click', function(){
  if(Client_Id){
    moduleName = "Site Monitoring"
    UserActivityTracking()
  }else{
    window.location.replace("client-partner-login.html");
  }
}) 
$("#tab-7").on('click', function(){
  if(Client_Id){
    moduleName = "Project Monitoring"
    UserActivityTracking()
  }else{
    window.location.replace("client-partner-login.html");
  }
}) 

function UserActivityTracking(){
    var storedUserActivityId = localStorage.getItem('UserActivityId');
    UserActivityId = JSON.parse(storedUserActivityId)
    chatCurrentDateTime()
    user_viewed_time = customer_chat_date.split(' GMT')[0]
    user_activities.push({"Module": moduleName,"Viewed Time": user_viewed_time});
    var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
    if(moduleName == "UserLogOut"){
      $.ajax({
        url: 'https://gprogress.green.com.pg/client_partner_user_activity/',
        type: 'post',
        data: {
          'client_id': Client_Id,
          'solar_project_id': globalProjectId,
          'user_activity': JSON.stringify(user_activities),
          'logged_out_time': user_viewed_time,
          'logged_in_status': false,
          'user_activity_id': UserActivityId,
          'user_log_date': user_viewed_time,
          csrfmiddlewaretoken: csrf_data
        },
      })
      user_activities = []
    }else{
    $.ajax({
      url: 'https://gprogress.green.com.pg/client_partner_user_activity/',
      type: 'post',
      data: {
        'client_id': Client_Id,
        'solar_project_id': globalProjectId,
        'user_activity': JSON.stringify(user_activities),
        'user_activity_id': UserActivityId,
        'user_log_date': user_viewed_time,
        csrfmiddlewaretoken: csrf_data
      },
    })
    user_activities = []
  }
}

// ------------------------ PROJECT MONITORING AND CONTROL START'S HERE  -----------------------

function project_monitoring() {
  $.ajax({
    url: "https://gprogress.green.com.pg/client_partner_project_monitoring/",
    method: "GET",
  })
  .done(function (json_data) {
    var data = JSON.parse(json_data);
  //  console.log("--- project_monitoring --- ", data);
    var totalProjectDays = data.project_monitoring_data[0].total_days_of_project;
    var elpased_days = data.project_monitoring_data[0].elapsed_days;
    var remaining_days = data.project_monitoring_data[0].remaining_days;
    var total_delay_days = data.project_monitoring_data[0].delay_days;
    var engineering_phase1_completion_percent = data.project_monitoring_data[0].engineering_phase1_completion_percent;
    var procurement_phase2_completion_percent = data.project_monitoring_data[0].procurement_phase2_completion_percent;
    var construction_phase3_completion_percent = data.project_monitoring_data[0].construction_phase3_completion_percent;
    var overall_progress =  data.project_monitoring_data[0].overall_progress;
    var start_date = data.project_monitoring_data[0].start_date;
    var end_date  = data.project_monitoring_data[0].end_date;
    var planned_man_power = data.project_monitoring_data[0].planned_man_power;
    var actual_man_power = data.project_monitoring_data[0].actual_man_power;
    var parsed_end_date =  data.project_monitoring_data[0].parsed_date_only;
    var completionListphase1=data.project_monitoring_data[0].phase1_completion_list;
    var completionListphase2=data.project_monitoring_data[0].phase2_completion_list;
    var completionListphase3=data.project_monitoring_data[0].phase3_completion_list;
    var overall_pending  = 100 -overall_progress
    var phase1_actual_completed_task= data.project_monitoring_data[0].phase1_actual_completed_task;
    var phase2_actual_completed_task = data.project_monitoring_data[0].phase2_actual_completed_task;
    var phase3_actual_completed_task =data.project_monitoring_data[0].phase3_actual_completed_task;
    var engineering_phase1_total_task_count = data.project_monitoring_data[0].engineering_phase1_total_task_count;
    var procurement_phase2_total_task_count= data.project_monitoring_data[0].procurement_phase2_total_task_count;
    var construction_phase3_total_task_count= data.project_monitoring_data[0].construction_phase3_total_task_count;
    var phase1_complete_percent = parseFloat(((phase1_actual_completed_task / engineering_phase1_total_task_count) * 100).toFixed(3));
    var phase2_complete_percent = parseFloat(((phase2_actual_completed_task / procurement_phase2_total_task_count) * 100).toFixed(3));
    var phase3_complete_percent = parseFloat(((phase3_actual_completed_task / construction_phase3_total_task_count) * 100).toFixed(3));
    var phase1_remaining_percent = parseFloat((100 - phase1_complete_percent).toFixed(3));
    var phase2_remaining_percent = parseFloat((100 - phase2_complete_percent).toFixed(3));
    var phase3_remaining_percent = parseFloat((100 - phase3_complete_percent).toFixed(3));


    $(".progress-chart-wrap span ").text(overall_progress+" %")
    $(".p_total h3").text(totalProjectDays);
    $(".e_total h3").text(elpased_days);
    $(".r_total h3").text(remaining_days);
    $(".d_totalal h3").text(total_delay_days);
    $(".e_panel h4").text("Engineering - "+ engineering_phase1_completion_percent +" % completed");
    $(".p_panel h4").text("Procurement - "+procurement_phase2_completion_percent+" % completed");
    $(".c_panel h4").text("Construction - "+construction_phase3_completion_percent+" % completed");
    $(".p_counts h6").text("Planned")
    $(".p_counts h3").text(planned_man_power.toLocaleString())
    $(".a_counts h6").text("Actual")
    $(".a_counts h3").text(actual_man_power.toLocaleString())
    $(".pmc1 ul li:nth-child(1)").html("Actual Start Date &nbsp;&nbsp: " + start_date);
    $(".pmc1 ul li:nth-child(2)").html("Baseline End Date : " + end_date);
    $(".pmc1 ul li:nth-child(3)").html("Comissioned Date : " + parsed_end_date );
    $(".completed1 h4").text(phase1_actual_completed_task)
    $(".completed2 h4").text(phase2_actual_completed_task)
    $(".completed3 h4").text(phase3_actual_completed_task)
    $(".remaining1 h4").text(0)
    $(".remaining2 h4").text(0)
    $(".remaining3 h4").text(0)

    // overall scale
    var optionspr = {
      series: [overall_progress, overall_pending],
      chart: {
      type: 'donut',
      height: 280,
      },
      plotOptions: {
      pie: {
      startAngle: -90,
      endAngle: 90,
      offsetY: 10,
      donut: {
              labels: {
                  show: false,
              },
              markers: {
                  hover: {
                  filter: null // Disable hover filter effect
                  }
              }
          }
      }
      },
      dataLabels: {
      enabled: false
      },
      tooltip: {
      enabled: false,
      enabledOnSeries: [1]
      },
      stroke: {
      width: 0,
      },
      colors:['#31DD03', '#C1F5B3'],
      grid: {
      show: false,
      padding: {
      bottom: -80
      }
      },
      legend: {
      show: false,
      },
      responsive: [{
      breakpoint: 1600,
      options: {
          chart: {
              width: 200,
              height: 200,
          },
      }
      },
      {
      breakpoint: 1023,
      options: {
          chart: {
              width: 150,
              height:180,
          },
      }
      }]
 };
 
 var chart4 = new ApexCharts(document.querySelector(".progress-chart"), optionspr);
 chart4.render();
 
 
 
//  engineering chart

const phase1plannedCompletionList = completionListphase1.map(item => item.phase1_planned_completion_percent);
   
const phase1actualCompletionList = completionListphase1.map(item => item.phase1_actual_completion_percent);
const phase1monthYearList = completionListphase1.map(item => {
  const monthName = new Date(2000, item.month - 1).toLocaleString('en-us', { month: 'short' });
  const shortYear = item.year.slice(-2);
  return `${monthName} '${shortYear}`;

});

var currentIndex = 0;
var chart5;
function renderChart() {
    var slicedPlanned = phase1plannedCompletionList.slice(currentIndex, currentIndex + 4);
    var slicedActual = phase1actualCompletionList.slice(currentIndex, currentIndex + 4);
    var slicedMonths = phase1monthYearList.slice(currentIndex, currentIndex + 4);

    if (chart5) {
      chart5.destroy(); // Destroy existing chart instance
  }

    var optioneng = {
        series: [{
            name: 'Planned Status',
            data: slicedPlanned
        }, {
            name: 'Actual Status',
            data: slicedActual
        }],
        chart: {
            type: 'bar',
            height: 320,
            stacked: false,
            stackType: 'normal',
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        colors: ['#31DD03', '#FF9E44'],
        stroke: {
            show: true,
            colors: 'transparent',
            width: 2,
            dashArray: 0,
        },
        responsive: [{
           /* breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 5
                }
            }*/
        }],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            type: 'month',
            tickPlacement: 'between',
            categories: slicedMonths,
            axisBorder: {
                show: true,
                color: '#E5E4E4',
            },
            axisTicks: {
                show: false,
            }
        },
        yaxis: {
            axisBorder: {
                show: true,
                color: '#E5E4E4',
            },
            tickAmount: 5,
            labels: {
                formatter: function (y) {
                    return y + '% ';
                },
                style: {
                    colors: '#333333',
                }
            },
            min: 0,
            max: 100,
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'left',
            fontSize: '13px',
            fontFamily: 'Raleway',
            offsetY: 0,
            offsetX: -15
        },
        fill: {
            opacity: 1
        },
        grid: {
            show: false,
            borderColor: '#979797',
            strokeDashArray: 5,
        }
    };

    chart5 = new ApexCharts(document.querySelector("#engineeringChart"), optioneng);
    chart5.render();
}

function goToNext() {
  currentIndex += 4;
  if (currentIndex >= phase1plannedCompletionList.length) {
      currentIndex = 0;
  }
  renderChart();
}

function goToPrevious() {
  currentIndex -= 4;
  if (currentIndex < 0) {
      currentIndex = phase1plannedCompletionList.length - 4;
  }
  renderChart();
}

// Ensure DOM content is loaded before attaching event listeners
// Ensure DOM content is loaded before attaching event listeners
document.querySelector('#nextB').addEventListener('click', function () {
goToNext();
});

document.querySelector('#prevB').addEventListener('click', function () {

goToPrevious();
});


renderChart();



//  procurement_chart

const phase2plannedCompletionList = completionListphase2.map(item => item.phase2_planned_completion_percent);
const phase2actualCompletionList = completionListphase2.map(item => item.phase2_actual_completion_percent);
const phase2monthYearList = completionListphase2.map(item => {
  const monthName = new Date(2000, item.month - 1).toLocaleString('en-us', { month: 'short' });
  const shortYear = item.year.slice(-2);
  return `${monthName} '${shortYear}`;
});

var currentIndex2 = 0;
var chart6;
function renderChart2() {
    var slicedPlanned2 = phase2plannedCompletionList.slice(currentIndex2, currentIndex2 + 4);
    var slicedActual2 = phase2actualCompletionList.slice(currentIndex2, currentIndex2 + 4);
    var slicedMonths2 = phase2monthYearList.slice(currentIndex2, currentIndex2 + 4);

    if (chart6) {
      chart6.destroy(); // Destroy existing chart instance
  }

    var optioneng2 = {
        series: [{
            name: 'Planned Status',
            data: slicedPlanned2
        }, {
            name: 'Actual Status',
            data: slicedActual2
        }],
        chart: {
            type: 'bar',
            height: 320,
            stacked: false,
            stackType: 'normal',
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        colors: ['#31DD03', '#FF9E44'],
        stroke: {
            show: true,
            colors: 'transparent',
            width: 2,
            dashArray: 0,
        },
        responsive: [{
           /* breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 5
                }
            }*/
        }],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            type: 'month',
            tickPlacement: 'between',
            categories: slicedMonths2,
            axisBorder: {
                show: true,
                color: '#E5E4E4',
            },
            axisTicks: {
                show: false,
            }
        },
        yaxis: {
            axisBorder: {
                show: true,
                color: '#E5E4E4',
            },
            tickAmount: 5,
            labels: {
                formatter: function (y) {
                    return y + '% ';
                },
                style: {
                    colors: '#333333',
                }
            },
            min: 0,
            max: 100,
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'left',
            fontSize: '13px',
            fontFamily: 'Raleway',
            offsetY: 0,
            offsetX: -15
        },
        fill: {
            opacity: 1
        },
        grid: {
            show: false,
            borderColor: '#979797',
            strokeDashArray: 5,
        }
    };

    chart6 = new ApexCharts(document.querySelector("#procurmentChart"), optioneng2);
    chart6.render();
}

function goToNext2() {
    currentIndex2 += 4;
    if (currentIndex2 >= phase2plannedCompletionList.length) {
        currentIndex2 = 0;
    }
    renderChart2();
}

function goToPrevious2() {
    currentIndex2 -= 4;
    if (currentIndex2 < 0) {
        currentInde2 = phase2plannedCompletionList.length - 4;
    }
    renderChart2();
}

document.querySelector('.n1').addEventListener('click', function () {
    goToNext2();
});

document.querySelector('.p1').addEventListener('click', function () {
    goToPrevious2();
});

renderChart2();


 
 
// construction chart

const phase3plannedCompletionList = completionListphase3.map(item => item.phase3_planned_completion_percent);
const phase3actualCompletionList = completionListphase3.map(item => item.phase3_actual_completion_percent);
const phase3monthYearList = completionListphase3.map(item => {
  const monthName = new Date(2000, item.month - 1).toLocaleString('en-us', { month: 'short' });
  const shortYear = item.year.slice(-2);
  return `${monthName} '${shortYear}`;
});

var currentIndex3 = 0;
var chart7;
function renderChart3() {
    var slicedPlanned3 = phase3plannedCompletionList.slice(currentIndex3, currentIndex3 + 4);
    var slicedActual3 = phase3actualCompletionList.slice(currentIndex3, currentIndex3 + 4);
    var slicedMonths3 = phase3monthYearList.slice(currentIndex3, currentIndex3 + 4);

    if (chart7) {
      chart7.destroy(); // Destroy existing chart instance
  }

    var optioneng3 = {
        series: [{
            name: 'Planned Status',
            data: slicedPlanned3
        }, {
            name: 'Actual Status',
            data: slicedActual3
        }],
        chart: {
            type: 'bar',
            height: 320,
            stacked: false,
            stackType: 'normal',
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        colors: ['#31DD03', '#FF9E44'],
        stroke: {
            show: true,
            colors: 'transparent',
            width: 2,
            dashArray: 0,
        },
        responsive: [{
            /*breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 5
                }
            }*/
        }],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            type: 'month',
            tickPlacement: 'between',
            categories: slicedMonths3,
            axisBorder: {
                show: true,
                color: '#E5E4E4',
            },
            axisTicks: {
                show: false,
            }
        },
        yaxis: {
            axisBorder: {
                show: true,
                color: '#E5E4E4',
            },
            tickAmount: 5,
            labels: {
                formatter: function (y) {
                    return y + '% ';
                },
                style: {
                    colors: '#333333',
                }
            },
            min: 0,
            max: 100,
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'left',
            fontSize: '13px',
            fontFamily: 'Raleway',
            offsetY: 0,
            offsetX: -15
        },
        fill: {
            opacity: 1
        },
        grid: {
            show: false,
            borderColor: '#979797',
            strokeDashArray: 5,
        }
    };

    chart7 = new ApexCharts(document.querySelector("#constructionChart"), optioneng3);
    chart7.render();
}

function goToNext3() {
    currentIndex3 += 4;
    if (currentIndex3 >= phase3plannedCompletionList.length) {
        currentIndex3 = 0;
    }
    renderChart3();
}

function goToPrevious3() {
    currentIndex3 -= 4;
    if (currentIndex3 < 0) {
        currentInde3 = phase3plannedCompletionList.length - 4;
    }
    renderChart3();
}

document.querySelector('.n2').addEventListener('click', function () {
    goToNext3();
});

document.querySelector('.p2').addEventListener('click', function () {
    goToPrevious3();
});

renderChart3();



// Pie chart for engineering

var optionsv1 = {
    series: [phase1_remaining_percent, phase1_complete_percent],
    chart: {
    width: 240,
    type: 'pie',
  },
  labels: ['Remaining Task', 'Completed Task'],
  colors: ['#FF9E44', '#31DD03'],
  plotOptions: {
    pie: {
       dataLabels: {
          offset: -25,
       },
    },
  },
  legend: {
    show: false,
   },
   responsive: [{
    breakpoint: 1800,
    options: {
      chart: {
        width: 180
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };

  var chartv1 = new ApexCharts(document.querySelector("#engineeringDays"), optionsv1);
  chartv1.render();

  // Pie chart for procurement

  var optionsv2 = {
    series: [phase2_remaining_percent , phase2_complete_percent],
    chart: {
    width: 240,
    type: 'pie',
  },
  labels: ['Remaining Task', 'Completed Task'],
  colors: ['#FF9E44', '#31DD03'],
  plotOptions: {
    pie: {
       dataLabels: {
          offset: -25,
       },
    },
  },
  legend: {
    show: false,
   },
   responsive: [{
    breakpoint: 1800,
    options: {
      chart: {
        width: 180
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };

  var chartv2 = new ApexCharts(document.querySelector("#procurmentDays"), optionsv2);
  chartv2.render();

  // Pie chart for construction

  var optionsv3 = {
    series: [phase3_remaining_percent, phase3_complete_percent],
    chart: {
    width: 240,
    type: 'pie',
  },
  labels: ['Remaining Task', 'Completed Task'],
  colors: ['#FF9E44', '#31DD03'],
  plotOptions: {
    pie: {
       dataLabels: {
          offset: -15,
       },
    },
  },
  legend: {
    show: false,
   },
   responsive: [{
    breakpoint: 1800,
    options: {
      chart: {
        width: 180
      },
      plotOptions: {
       pie: {
          dataLabels: {
             offset: -10,
          },
       },
     },
    }
  },
  {
    breakpoint: 1280,
    options: {
      chart: {
        width: 180
      },
      plotOptions: {
       pie: {
          dataLabels: {
             offset: -10,
          },
       },
     },
    }
  }]
  };

  var chartv3 = new ApexCharts(document.querySelector("#constructionDays"), optionsv3);
  chartv3.render();


  })

}
        

function ClientPartnerRegistration(){
    firstname = $('#firstname').val();
    lastname = $('#lastname').val();
    gender = $('#gender').find(":selected").val();
    organization_email = $('#organization_email').val();
    mobile_number = $('#mobileno').val();
    organization = $('#organization').val();
    project = $('#project').val();
    project_capacity = $('#project_capacity').val();
    var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
    $('#client_partner_registration').prop('disabled', true);
    $('#client_partner_registration').css('cursor', 'not-allowed');
    $.ajax({
      url: 'https://gprogress.green.com.pg/client_partner_registration/',
      type: 'post',
      data: {
        'firstname': firstname,
        'lastname': lastname,
        'gender': gender,
        'organization_email': organization_email,
        'mobile_number': mobile_number,
        'organization': organization,
        'project': project,
        'project_capacity': project_capacity,
        csrfmiddlewaretoken: csrf_data
      }
      }).done(function(json_data) {
        data = JSON.parse(json_data)
        if(data.Code === "001") {
            $('.registration-popup').fadeOut();
            Registration_Clear()
            Lobibox.notify('success', {
                position: 'top right',
                msg: 'Thank you for Registration.'
              });
        }else{
            Lobibox.notify('warning', {
                position: 'top right',
                msg: 'Login Faild'
              });
            $('#client_partner_registration').prop('disabled', false);
            $('#client_partner_registration').css('cursor', 'pointer');
        }
    });
}

$(document).on('click', '.close-icon', function() {
    Registration_Clear()
  })

function Registration_Clear(){
    firstname = $('#firstname').val('');
    lastname = $('#lastname').val('');
    gender = $('#gender').find(":selected").val('');
    organization_email = $('#organization_email').val('');
    mobile_number = $('#mobileno').val('');
    organization = $('#organization').val('');
    project = $('#project').val('');
    project_capacity = $('#project_capacity').val('');
}
