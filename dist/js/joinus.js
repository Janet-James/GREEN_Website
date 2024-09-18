var globalResponseData=null,educationalCertificationBase64="",employementCertificationBase64="",flag_country_code=null,flag_country_name=null;function addStyleClass(){var e=document.querySelector(".show-label");e.querySelector("#qmobile_number-error")&&e.classList.add("dynamic-label")}function removeStyleClass(){var e=document.querySelector(".dynamic-label");e&&e.classList.remove("dynamic-label")}$(document).ready(function(){LatestJobOpening(),JobCategoeryList(),JobApplyForm(),JobQueryRaiseForm(),CaptchaValidation()});const headers_content={"Content-Type":"application/json"};var cat_id=0,hca_data={},country_code="IN";let mobile_val={US:/^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/,UK:/^(07[\d]{8,12}|447[\d]{7,11})$/,AU:/^(?:\+?61|0)4(?:[01]\d{3}|(?:2[1-9]|3[0-57-9]|4[7-9]|5[0-15-9]|6[679]|7[3-8]|8[1478]|9[07-9])\d{2}|(?:20[2-9]|444|52[0-6]|68[3-9]|70[0-7]|79[01]|820|890|91[0-4])\d|(?:200[0-3]|201[01]|8984))\d{4}$/,SD:/^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/,SI:/^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/,BE:/^((\+|00)32\s?|0)(\d\s?\d{3}|\d{2}\s?\d{2})(\s?\d{2}){2}$/,IN:/^(\+91-|\+91|0)?\d{10}$/},mobile_code={US:"1",AU:"43",SD:"+94",SI:"+94",BE:"32",PG:"675",IN:"+91"},zip_val={US:/^\d{5}([\-]?\d{4})?$/,UK:/^(GIR|[A-Z]\d[A-Z\d]??|[A-Z]{2}\d[A-Z\d]??)[ ]??(\d[A-Z]{2})$/,AU:/^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2})$/,BE:/^[1-9]{1}[0-9]{3}$/,SD:/^\d{4}$/,IN:/^\d{6}$/,PG:/^\d{3}$/,SI:/^\d{4}$/};function getMobileCode(){return mobile_code.country_code}function LatestJobOpening(){var e=[];$.ajax({url:"https://app-gsolve.green.com.pg/get/jobcategory_list/",contentType:"application/json",dataType:"json",success:function(a){var t="",i="",s=0;Object.keys(a).forEach(function(t){a[t].openings.forEach(function(a){e.push(a);var t=++s-1,o=a.position,l=a.experience,n=a.location,r=a.job_type,d=a.posted_date,c=`job-detail-${o}`;i+=`
                  <div class="carousel-item ${0===t?"active":""}">
                  <div class="carousel-caption d-md-block jobapply_button" data-bs-toggle="modal" data-bs-target="#${c=c.replace(/[.&]+$/,"").replace(/[^a-zA-Z0-9]/g,"")}">
                  <div class="row text-start"  >
                  <div class="col-md-3">
                    <h5>${o}</h5>
                    <p>${r}</p>
                  </div>
                  <div class="col-md-2">
                    <p class="small">Experience</p>
                    <h6>${l}</h6>
                  </div>
                  <div class="col-md-1">
                    <p class="small">Salary</p>
                    <h6>---</h6>
                  </div>
                  <div class="col-md-3 text-md-end">
                    <h5><img src="dist/images/location.png" /> ${n}</h5>
                    <p>Posted ${d} Day ago</p>
                  </div>
                  <div class="col-md-3 text-md-end">
                    <button class="btn btn-grn-bor jobapply_button"> <span class="jobApplyText">Apply</span></button>
                    </div>
                  </div>
                  </div>
                  </div>`})});for(var o=0;o<s;o++)t+=`<button type="button" data-bs-target="#jobdetails" data-bs-slide-to="${o}" ${0===o?'class="active"':""}></button>`;var l=`
          <h3 class="fw-bold mb-4">Latest Job Opening <small></small></h3>
          <div class="job-details">
          <div id="jobdetails" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">${t}</div>
            <div class="carousel-inner">${i}</div>
          </div>
          </div>
          </div>`;$(".latest_job_opening").append(l);var n=new bootstrap.Carousel(document.getElementById("jobdetails"),{interval:2200,wrap:!0});$(".carousel-indicators button").on("click",function(){var e=$(this).data("bs-slide-to");n.to(e)}),n.cycle()}})}function JobCategoeryList(){$.ajax({url:"https://app-gsolve.green.com.pg/get/jobcategory_list/",contentType:"application/json",dataType:"json",success:function(e){var a="";a+=`
              <h3 class="fw-bold mb-4 mt-5">Job Category <small></small></h3>
              <ul class="nav nav-tabs" id="jobTab" role="tablist">`,Object.keys(e).forEach(function(t,i){a+=`
                  <li class="nav-item" role="presentation">
                      <button class="nav-link ${0===i?"active":""}" id="tab-${i}" data-category="${i}" data-bs-toggle="tab" data-bs-target="#tab-pane-${i}" type="button" role="tab" aria-controls="one-tab-${i}" aria-selected="true">
                          <img src="dist/images/joinus/job-cat-1.png">
                          <h3>${t}</h3>
                          <h5>${e[t].openings.length} openings</h5>
                      </button>
                  </li>`}),a+="</ul>",a+='<div class="tab-content" id="jobTabContent">',Object.keys(e).forEach(function(t,i){var s=e[t].openings;a+=`
                  <div class="tab-pane fade${0===i?" show active":""}" id="tab-pane-${i}" role="tabpanel" aria-labelledby="one-tab${i}">`,s.forEach(function(e,t){var i=e.position,s=e.experience,o=e.location,l=e.job_type,n=e.posted_date,r=`job-detail-${i}`;a+=`
                      <div class="row single-job-details text-start jobapply_button"  data-bs-toggle="modal" data-bs-target="#${r=r.replace(/[.&]+$/,"").replace(/[^a-zA-Z0-9]/g,"")}">
                          <div class="col-md-3">
                              <h5>${i}</h5>
                              <p>${l}</p>
                          </div>
                          <div class="col-md-2">
                              <p class="small">Experience</p>
                              <h6>${s}</h6>
                          </div>
                          <div class="col-md-1">
                              <p class="small">Salary</p>
                              <h6></h6>
                          </div>
                          <div class="col-md-3 text-end">
                              <h5><img src="dist/images/location.png"/>${o}</h5>
                              <p>Posted ${n} Day ago</p>
                          </div>
                          <div class="col-md-3 text-end">
                              <button class="btn-grn-bor jobapply_button"><span class="jobApplyText">Apply</span></button>
                          </div>
                      </div>`}),a+="</div>"}),a+="</div>",$(".api_container").append(a)},error:function(e){console.error("Error fetching job categories:",e)}})}function JobApplyForm(){$.ajax({url:"https://app-gsolve.green.com.pg/get/jobcategory_list/",contentType:"application/json",dataType:"json",success:function(e){$.ajax({url:"https://app-gsolve.green.com.pg/get/country_dropdown_list/",contentType:"application/json",dataType:"json",success:function(e){var a='<select  onfocus="this.size=6;" onblur="this.size=0;" onchange="this.size=1; this.blur()"  id="country_dropdown" name="country_dropdown" class="input-dsn">';a+='<option value="" selected="" disabled="">--Select Country--</option>',e.forEach(function(e){var t;a+=`<option value="${e.country_id}">${e.country_name}</option>`}),a+="</select>"}}),Object.keys(e).forEach(function(a,t){e[a].openings.forEach(function(e,a){var t=e.position,i=e.experience,s=e.location,o=e.job_description,l=e.required_skills,n=e.job_type,r=e.posted_date,d=e.deal_id,c=e.resume_folder_id,p=e.job_position_id,u=e.job_position_number;e.job_position_created_date;var m=`job-detail-${t}`;m=m.replace(/[.&]+$/,"").replace(/[^a-zA-Z0-9]/g,"");var b="",b=`
                  <div class="modal fade joinus-benefit-details " id="${m}" data-bs-backdrop="static"
                  data-bs-keyboard="false" tabindex="-1" aria-labelledby="jobdetailsLabel" aria-hidden="true">
                  <div class="modal-dialog  modal-dialog-centered modal-lg">
                  <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="btn-close jobapply-btn-close-${m}" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body ">
                  <div class="singlejobdetailsdata">
                  <div class="row mb-4">
                  <div class="col">
                    <h4 class="mb-2">${t}</h4>
                    <p class="small">${n}</p>
                  </div>
                  <div class="col-auto">
                    <p class="small">Posted ${r} day ago</p>
                  </div>
                  </div>
                  <div class="row mb-2">
                  <div class="col-auto">
                    <p class="small">Experience</p>
                    <p>${i}</p>
                  </div>
                  <div class="col-auto">
                    <p class="small">Salary</p>
                    <p></p>
                  </div>
                  <div class="col-auto">
                    <p class="small">Closing date</p>
                    <p>--------</p>
                  </div>
                  <div class="col-auto">
                    <p class="small"></p>
                    <p>${s}</p>
                  </div>
                  </div>
                  <h5><u>Job Description</u></h5>
                  <p>
                      ${o}
                  </p>
                  <h5><u>Skill</u></h5>
                  <p>${l}</p>    
                  <button class="btn-grn-bor onapply${m} onapply_button_click">Apply</button>
                  </div>
                  <form id="${m}-jobapply_form" class="applyform${m} form-align"> 
                  <div class="row">
                  <div class="col-md-7">
                    <h2 class="mb-1 vertical-align-dashboard">JOB APPLICATION</h2>
                    <h4 class="mb-5">Apply For ${t} [${u}]</h4>
                  </div>
                  </div>
                  <div class="row g-3 align-items-center mb-3">                      
                  <div class="col-md-6">
                      <input type="text" placeholder="FirstName *" class="input-dsn w-100" id="firstname" name="firstname"/>
                  </div>
                  <div class="col-md-6">
                      <input type="text" placeholder="LastName *" class="input-dsn w-100" id="lastname" name="lastname"/>
                  </div>
                  </div>
                  <div class="row g-3 align-items-center mb-3">                      
                    <div class="col-md-12">
                      <input type="email" placeholder="Email *" class="input-dsn w-100" id="email" name="email"/>
                    </div>
                  </div>
                  <div class="row g-3 align-items-center mb-3">                      
                  <div class="col-md-6">
                     <label for="apply_mobile">Mobile Number*</label>
                     <input type="text" value="+675 " placeholder="Mobile *" class="input-dsn w-100" id="${m}-apply_mobile" name="apply_mobile" class="input-dsn" maxlength=25 data-error=".errorTxt17" required/>
                     <span class="errorTxt17 errormessage"></span>
                  </div>
                  <div class="col-md-6">
                     <label for="alternative_mobile">Alternate Mobile Number*</label>
                     <input type="text" value="+675 " placeholder="Alternate Mobile No*" class="input-dsn w-100" id="${m}-alternative_mobile" name="alternative_mobile" class="input-dsn" maxlength=25 data-error=".errorTxt16" required/>
                     <span class="errorTxt16 errormessage"></span>
                  </div>
                  </div>
                  <div class="row g-3 align-items-center mb-3">                      
                  <div class="col-md-6">
                  <label>Gender<span class="asterisk">*</span></label>
                  <select  onfocus="this.size=3;" onblur="this.size=0;" onchange="this.size=1; this.blur()"   id="gender" class="form-control select2 input-dsn w-100" name="gender">
                    <option value="">--- Choose ---</option>
                    <option value="8488">Male</option>
                    <option value="8486">Female</option>
                    <option value="8490">Other</option>
                  </select>
                  </div>
                  <div class="col-md-6">
                    <label for="${m}-date_of_birth">Date of Birth</label>
                    <input type="date" id="${m}-date_of_birth" name="date_of_birth" class="input-dsn w-100">
                    <span id="ageMessage" class="errorTxt14 errormessage"></span>
                  </div>
                  </div>
                  <div class="row g-3 align-items-center mb-3 country_align_sec">                      
                  <div class="col-md-6 country_position">
                  <label>Select Country<span class="asterisk">*</span></label>
                  <input id="${m}-country_selector" name="flag_country_select" class="input-dsn w-100" type="text">
				          <label for="${m}-country_selector" style="display:none;">Select Country</label>
                  </div>
                  </div>
                  <!-- <div class="row g-3 align-items-center mb-3"> -->     
                  <!-- <div class="col-md-12 country-dropdown">      -->  
                  <!-- </div>                                        -->      
                  <!-- </div>                                        -->  
                  <div class="row g-3 align-items-center mb-3">          
                  <div class="col-md-6">
                    <input type="text" placeholder="Region *" class="input-dsn w-100" id="region" name="region"/>
                  </div>
                  <div class="col-md-6">
                    <input type="text" placeholder="City *" class="input-dsn w-100" id="city" name="city"/>
                  </div>
                  </div>
                  <div class="row g-3 align-items-center mb-3">                      
                  <div class="col-md-12 select-experience">
                  <label>Experience<span class="asterisk">*</span></label>
                    <select  onfocus="this.size=6;" onblur="this.size=0;" onchange="this.size=1; this.blur()"   id="experience" class="form-control select2 input-dsn w-100" name="experience">
                     <option value="">--- Choose Experience Years ---</option>
                     <option value="1820">0 - 1</option>
                     <option value="1822">1 - 3</option>
                     <option value="1824">3 - 5</option>
                     <option value="1826">5 - 7</option>
                     <option value="1828">7 - 10</option>
                     <option value="1830">10 - 12</option>
                     <option value="1832">12 - 15</option>
                     <option value="1834">15 - 20</option>
                     <option value="1834">Above 20</option>
                     </select>
                  </div>
                  </div>
                  <div class="row g-3 align-items-center mb-3">                      
                  <div class="col-md-12">
                    <textarea type="text" placeholder="Message/Queries*" class="input-dsn w-100 in-textarea" id="message" name="message"></textarea>
                  </div>
                  </div>
                  <div class="row g-3 align-items-center mb-3">                      
                  <div class="col-md-12">
                        <label class="attach-emp" for="${m}-resume">Upload CV*</label>
                        <input type="file" accept=".pdf" class="input-dsn w-100" id="${m}-resume" name="resume" placeholder="resume">
                  </div>                     
                  <div class="col-md-6">
                        <label class="attach-emp" for="${m}-educational_certification">Educational Certification</label>
                        <input type="file" class="input-dsn w-100" id="${m}-educational_certification" name="educational_certification">
                  </div>
                  <div class="col-md-6">
                  <label class="attach-emp" for="${m}_employement_certification">Employement Certification</label>
                  <input type="file" class="input-dsn w-100" id="${m}_employement_certification" name="employement_certification">
                  </div>
                  <div class="col-md-12 submit-btn">
                  <button type="submit" id="${m}jobPositionSubmitBtn" class="btn-send w-100 m-0">Submit</button>
                  <p id="${m}RequestMessage">We are processing your request please wait.</p>
                  </div>
                  </div>
                  </form>
                  </div>
                  </div>
                  </div>
                  </div>`;$(".job_description").append(b),$(`#${m}RequestMessage`).hide(100),$(document).ready(function(){var e=$(`#${m}-country_selector`);e.countrySelect();var a=e.countrySelect("getSelectedCountryData");flag_country_code=a.iso2,flag_country_name=a.name,e.on("change",function(){var a=e.countrySelect("getSelectedCountryData");flag_country_code=a.iso2,flag_country_name=a.name})}),$(document).on("click",".jobapply_button",function(){$(".singlejobdetailsdata").show(100),$(`.applyform${m}`).hide(100)}),$(document).on("click",".onapply_button_click",function(){$(".singlejobdetailsdata").hide(100),$(`.applyform${m}`).show(100),$(`#${m}-jobapply_form`).validate().resetForm()}),$.validator.addMethod("mobile_no",function(e,a){return this.optional(a)||mobile_val[country_code].test(e)},"Please enter a valid phone number"),$.validator.addMethod("zip_code",function(e,a){return this.optional(a)||zip_val[country_code].test(e)},"Please enter a valid phone number"),$(document).ready(function(){$(`#${m}-jobapply_form`).validate({rules:{firstname:{required:!0},lastname:{required:!0},email:{required:!0},apply_mobile:{required:!0,maxlength:15,minlength:7},alternative_mobile:{required:!0,maxlength:15,minlength:7},gender:{required:!0},date_of_birth:{required:!0},region:{required:!0},city:{required:!0},experience:{required:!0},resume:{required:!0},country:{required:!0}},messages:{firstname:{required:"Enter Name"},lastname:{required:"Enter Lastname"},email:{required:"Enter Email"},apply_mobile:{required:"Enter a Valid Mobile Number",maxlength:"Enter Valid Mobile Number",minlength:"Enter Valid Mobile Number"},alternative_mobile:{required:"Enter a Valid Mobile Number",maxlength:"Enter Valid Mobile Number",minlength:"Enter Valid Mobile Number"},gender:{required:"Select Gender"},date_of_birth:{required:"Select Date of Birth"},region:{required:"Enter Region"},city:{required:"Enter City"},experience:{required:"Enter Experience"},resume:{required:"Upload Resume"},country:{required:"Select Country"}},errorElement:"div",errorPlacement:function(e,a){console.log(e);var t=$(a).data("error");t?$(t).append(e):e.insertAfter(a)}})});var v=document.querySelector(`#${m}-apply_mobile`);intlTelInput(v,{initialCountry:"auto",geoIpLookup:function(e,a){$.get("https://ipinfo.io",function(){},"jsonp").always(function(a){e(a&&a.country?a.country:"us")})}});var v=document.querySelector(`#${m}-alternative_mobile`);function g(){$(`#${m}-jobapply_form`).validate().resetForm(),$("input[name='firstname']").val(""),$("input[name='lastname']").val(""),$("input[name='date_of_birth']").val(""),$("input[name='region']").val(""),$("input[name='city']").val(""),$("textarea[name='message']").val(""),$("input[name='email']").val(""),$("input[name='apply_mobile']").val(""),$("input[name='alternative_mobile']").val(""),$("input[name='apply_mobile']").val("+675 "),$("input[name='alternative_mobile']").val("+675 "),$("select#gender").val(""),$("input[name='resume']").val(""),$("input[name='educational_certification']").val(""),$("input[name='employement_certification']").val(""),$("select#country_dropdown").val(""),$("select#experience").val(""),$(`#${m}jobPositionSubmitBtn`).prop("disabled",!1),$(`#${m}jobPositionSubmitBtn`).css("cursor","pointer"),$(`#${m}RequestMessage`).hide(100),educationalCertificationBase64="",employementCertificationBase64=""}intlTelInput(v,{initialCountry:"auto",geoIpLookup:function(e,a){$.get("https://ipinfo.io",function(){},"jsonp").always(function(a){e(a&&a.country?a.country:"us")})}}),$(`#${m}-resume`).on("change",function(e){var a=e.target.files[0],t=new FileReader;t.readAsDataURL(a),t.onload=function(){var e=t.result,a=e.split(",")[0]+",";resumeBase64=e.replace(a,"")}}),$(`#${m}-educational_certification`).on("change",function(e){var a=e.target.files[0],t=new FileReader;t.readAsDataURL(a),t.onload=function(){var e=t.result,a=e.split(",")[0];educationalCertificationBase64=e.replace(a,"")}}),$(`#${m}_employement_certification`).on("change",function(e){var a=e.target.files[0],t=new FileReader;t.readAsDataURL(a),t.onload=function(){var e=t.result,a=e.split(",")[0]+",";employementCertificationBase64=e.replace(a,"")}}),$(`#${m}-date_of_birth`).change(function(){var e,a,t,i,s;18>(a=new Date($(this).val()),t=new Date,i=t.getFullYear()-a.getFullYear(),s=t.getMonth()-a.getMonth(),(s<0||0===s&&t.getDate()<a.getDate())&&i--,i)?($("#ageMessage").text("You must be at least 18 years old."),$(this).val("")):$("#ageMessage").text("")}),$(document).on("click",`.jobapply-btn-close-${m}`,function(){g()}),$(document).on("submit",`.applyform${m}`,function(e){if(e.preventDefault(),job_apply_form_valid=$(`#${m}-jobapply_form`).valid()){$(`#${m}RequestMessage`).show(100);var a=$(this),t=a.find("#firstname").val().trim(),i=a.find("#lastname").val().trim(),s=a.find("#email").val().trim(),o=a.find('input[name="apply_mobile"]').val(),l=a.find("select#gender").val(),r=a.find('input[name="date_of_birth"]').val().trim(),u=a.find("#city").val().trim(),b=a.find("#region").val().trim(),v=a.find("select#experience").val(),f=a.find("#message").val().trim(),h=a.find('input[name="alternative_mobile"]').val(),y=a.find("select#country_dropdown").val(),_=a.find("input[name=csrfmiddlewaretoken]").val();$(`#${m}jobPositionSubmitBtn`).prop("disabled",!0),$(`#${m}jobPositionSubmitBtn`).css("cursor","not-allowed"),$.ajax({url:"https://app-gsolve.green.com.pg/submit/jobapplication/",type:"post",data:{firstname:t,lastname:i,email:s,mobile:o,gender:l,date_of_birth:r,city:u,region:b,experience:v,message:f,resume:resumeBase64,educational_certification:educationalCertificationBase64,employement_certification:employementCertificationBase64,source:"1762",deal_id:d,resume_folder_id:c,job_type:n,salutation_Mr:"8616",salutation_Ms:"8618",job_position_id:p,resume_extension:"1062",login_from:"1784",alternative_mobile:h,country:y,flag_country_name:flag_country_name,flag_country_code:flag_country_code,send_notification_to_candidate:"752",csrfmiddlewaretoken:_}}).done(function(e){"001"===(data=JSON.parse(e)).Code?(Lobibox.notify("success",{position:"top right",msg:"Job Request is Applied. Please Check Your Mail"}),g(),setTimeout(function(){$(".modal").modal("hide")},1e3)):Lobibox.notify("warning",{position:"top right",msg:"Failed to Apply"})})}})})})}})}function JobQueryRaiseForm(){$.ajax({url:"https://app-gsolve.green.com.pg/get/jobquery_dropdown_list/",contentType:"application/json",dataType:"json",success:function(e){var a="";a+=`<div class="row">
            <div class="col-md-8">
            <div class="joinus-title"><h3 class="fw-bold">Future Envisioned Energy Disruptors, Engaging with Difference  </h3>
            <p>Are you the one?<span class="cl-alert">(ST1)</span></p></div>
            </div>
            <div class="col-md-4">
            <button class="btn-grn-bor-2" data-bs-toggle="modal" data-bs-target="#trackcandidature">Track Your
            Candidature</button>
            <button class="btn-grn-bor-2" data-bs-toggle="modal" data-bs-target="#jobquery">Job Query</button>`;var t='<select  onfocus="this.size=4;" onblur="this.size=0;" onchange="this.size=1; this.blur()"   id="feed_role" name="feed_role" class="input-dsn">';t+='<option value="" selected="" disabled="">--Select the Role--</option>',Object.keys(e).forEach(function(a,i,s){var i=e[a].job_category_id;t+=`<option value="${i}">${a}</option>`}),t+="</select>",a+=`
            <div class="modal fade joinus-benefit-details " id="trackcandidature" data-bs-backdrop="static"
            data-bs-keyboard="false" tabindex="-1" aria-labelledby="trackcandidatureLabel" aria-hidden="true">
            <div class="modal-dialog  modal-dialog-centered modal-lg">
            <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="btn-close login-close-btn" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body ">
            <form class="login-module" id="login_form_validation">
            <div class="row">
            <div class="col-md-12">
            <h4 class="mb-4 text-center">Track Your Candidature</h4>
            </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
              <label for="" class="col-form-label">User Name</label>
            </div>
            <div class="col-md-7">
              <input type="text" id="login_username" name="login_username" placeholder="Enter User Email" class="input-dsn" />
            </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
              <label for="" class="col-form-label">Password </label>
            </div>
            <div class="col-md-7">
              <input type="password" id="login_password" name="login_password" placeholder="Enter Phone Number" class="input-dsn" />
            </div>
            </div>
            <!-- <div class="row g-3 align-items-center">
            <div class="col-md-7 offset-md-5 text-end">
              <p class="form-link fgt-pass" id="forgot_btn"><u>Forgot Password</u></p>
            </div>
            </div> -->
            <div class="row g-3 align-items-start mb-3">
            <div class="col-md-7 offset-md-5 login-button-track">
              <button type="reset" class="btn-reset login-rest-btn">Reset</button> 
              <button onclick="LoginUser()" type="button" class="btn-send">Login</button>
            </div>
            </div>
            </form>
            <form class="reg-module" style="display:None;">
            <div class="row">
              <div class="col-md-12">
                <h4 class="mb-4 text-center">Track Your Candidature</h4>
              </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
              <label for="" class="col-form-label">Email *</label>
            </div>
            <div class="col-md-7">
              <input type="text" placeholder="Enter Email" class="input-dsn" />
              <input type="submit" value="Send" class="btn-green small">
            </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
                <label for="" class="col-form-label">One Time Password * <small> ( Note : Enter the OTP Sent to
                    Your Registered Email )</small></label>
            </div>
            <div class="col-md-7">
                <input type="text" placeholder="Enter the One Time Password Mailed" class="input-dsn" />
            </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
                <label for="" class="col-form-label">New Password *</label>
            </div>
            <div class="col-md-7">
                <input type="password" placeholder="Enter new Password" class="input-dsn" />
            </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
                <label for="" class="col-form-label">Re-Enter New Password *</label>
            </div>
            <div class="col-md-7">
                <input type="password" placeholder="Re-Enter New Password" class="input-dsn" />
            </div>
            </div>          
            <div class="row g-3 align-items-start mb-3">
            <div class="col-md-7 offset-md-5">
              <button type="reset" class="btn-reset">Reset</button> <button type="submit"
                class="btn-send">Save</button>
            </div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-md-7 offset-md-5 text-end">
                <p class="form-link fgt-log" id="login_btn"><u>Login</u></p>
              </div>
            </div>
            </form>
            </div>   
            </div>
            </div>
            </div>  
            <div class="modal fade joinus-benefit-details " id="jobquery" data-bs-backdrop="static"
              data-bs-keyboard="false" tabindex="-1" aria-labelledby="jobqueryLabel" aria-hidden="true">
            <div class="modal-dialog  modal-dialog-centered modal-lg">
            <div class="modal-content JOB-QUERY_modal">
            <div class="modal-header">
            <button type="button" class="btn-close Jobquery-btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body ">
            <form id="JobQuery_Validation">
            <div class="row job-query-page-row">
            <div class="col-md-7 offset-md-5">
            <h4 class="mb-4 job-query-text vertical-align-jobquery">JOB QUERY</h4>
            </div>       
            </div>
            <div class="job-query-modal-content">          
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
              <label for="" class="col-form-label">First Name *</label>
            </div>
            <div class="col-md-7">
              <input id="qfirstname" name="qfirstname" type="text" placeholder="Enter Your First Name" class="input-dsn" />
            </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
              <label for="" class="col-form-label">Last Name *</label>
            </div>
            <div class="col-md-7">
              <input id="qlastname" name="qlastname" type="text" placeholder="Enter Your Last Name" class="input-dsn" />
            </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
              <label for="" class="col-form-label">Email ID *</label>
            </div>
            <div class="col-md-7">
              <input id="qemail" name="qemail" type="email" placeholder="Enter Your Email ID" class="input-dsn" />
            </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
              <label for="" class="col-form-label">Mobile Number *</label>
            </div>
            <div class="col-md-7  md-group show-label">
              <input type="text" placeholder="e.g. +1 702 123 4567" id="qmobile_number" name="qmobile_number" class="input-dsn mobile-input" maxlength=25 data-error=".errorTxt16" required value="+675 "/>
              <span class="errorTxt16 errormessage"></span>
            </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
              <label for="" class="col-form-label">Type of Feedback *</label>
            </div>
            <div class="col-md-7">
            <div class="feedback_select_dom">
                <select  onfocus="this.size=5;" onblur="this.size=0;" onchange="this.size=1; this.blur()"   id="feed_type" name="feed_type" class="input-dsn">
                <option value="" selected="" disabled="">--Select the Feedback Type--</option>
                <option value="1772">General Feedback</option>
                <option value="1774">Company Feedback</option>
                <option value="1776">Job Feedback</option>
                <option value="1778">Other Feedback</option>
                </select>
            </div> 
            </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
              <label for="" class="col-form-label">Role *</label>
            </div>
            <div class="col-md-7">
              <div class="select_role_dom">
                  ${t}
              </div>
            </div>
            </div>
            <div class="row g-3 align-items-start mb-3">
            <div class="col-md-5 text-md-end">
              <label for="" class="col-form-label">Queries *</label>
            </div>
            <div class="col-md-7">
              <textarea id="qqueries" name="qqueries" placeholder="Enter Your Queries" class="input-dsn in-textarea"></textarea>
            </div>
            </div>           
            <div class="row g-3 align-items-start mb-3">
            <div class="col-md-7 offset-md-5 job-query-button-track">
              <button type="reset" class="btn-reset job-query-btn-reset">Reset</button> 
              <button id="querysubmit" onclick="Sent_Query()" type="button" class="btn-send enquiry-button">Send Enquiry</button>
              <p id="JobQueryRequestMsg">We are processing your request please wait.</p>
            </div>
            </div>
            </div>
            </form>
            </div>   
            </div>
            </div>
            </div>`,a+="</div>",a+="</div>",$(".track_candidate").append(a),$("#JobQueryRequestMsg").hide(),$(document).on("click",".login-close-btn",function(){$("#login_form_validation").validate().resetForm(),$("#login_username").val(""),$("#login_password").val("")}),intlTelInput(document.querySelector("#qmobile_number"),{initialCountry:"auto",geoIpLookup:function(e,a){$.get("https://ipinfo.io",function(){},"jsonp").always(function(a){e(a&&a.country?a.country:"us")})}}),$(document).on("click","#forgot_btn",function(){$(".login-module").hide(100),$(".reg-module").show(100)}),$(document).on("click","#login_btn",function(){$(".login-module").show(100),$(".reg-module").hide(100)}),$.validator.addMethod("mobile_no",function(e,a){return this.optional(a)||mobile_val[country_code].test(e)},"Please enter a valid phone number"),$.validator.addMethod("zip_code",function(e,a){return this.optional(a)||zip_val[country_code].test(e)},"Please enter a valid phone number"),$("#JobQuery_Validation").validate({rules:{qfirstname:{required:!0},qlastname:{required:!0},qemail:{required:!0},qmobile_number:{required:!0,maxlength:15,minlength:7},feed_type:{required:!0},feed_role:{required:!0}},messages:{qfirstname:{required:"Enter First Name"},qlastname:{required:"Enter Last Name"},qemail:{required:"Enter Email"},qmobile_number:{required:"Enter a Valid Mobile Number",maxlength:"Enter Valid Mobile Number",minlength:"Enter Valid Mobile Number"},feed_type:{required:"Select Feedback"},feed_role:{required:"Select Role"}},errorElement:"div",errorPlacement:function(e,a){console.log(e);var t=$(a).data("error");t?$(t).append(e):e.insertAfter(a)}}),$("#login_form_validation").validate({rules:{login_username:{required:!0},login_password:{required:!0}},messages:{login_username:{required:"Enter Email"},login_password:{required:"Enter Mobile Number"}},errorElement:"div",errorPlacement:function(e,a){console.log(e);var t=$(a).data("error");t?$(t).append(e):e.insertAfter(a)}}),$(document).on("click",".job-query-btn-reset",function(){$("#JobQuery_Validation").validate().resetForm()}),$(document).on("click",".login-rest-btn",function(){$("#login_form_validation").validate().resetForm()})}})}function JobQuery_Clear(){$("#JobQuery_Validation").validate().resetForm(),$("#qfirstname").val(""),$("#qlastname").val(""),$("#qemail").val(""),$("#qmobile_number").val(""),$("#qmobile_number").val("+675 "),$("select#feed_type").val(""),$("select#feed_role").val(""),$("#qqueries").val(""),$("#querysubmit").prop("disabled",!1),$("#querysubmit").css("cursor","pointer"),$("#JobQueryRequestMsg").hide()}function Sent_Query(){if(form_valid=$("#JobQuery_Validation").valid()){$("#JobQueryRequestMsg").show();var e=$("#qfirstname").val().trim(),a=$("#qlastname").val().trim(),t=$("#qemail").val().trim(),i=$("#qmobile_number").val().trim(),s=$("select#feed_type").val(),o=$("select#feed_role").val(),l=$("#qqueries").val().trim(),n=$("input[name=csrfmiddlewaretoken]").val();$("#querysubmit").prop("disabled",!0),$("#querysubmit").css("cursor","not-allowed"),$.ajax({url:"https://app-gsolve.green.com.pg/submit/jobquery/",type:"post",data:{firstname:e,lastname:a,email:t,phone:i,feedback:s,roleselect:o,query:l,job_query_source:"1782",login_from:"1786",csrfmiddlewaretoken:n}}).done(function(e){"001"===(data=JSON.parse(e)).Code?(Lobibox.notify("success",{position:"top right",msg:"Query Sent"}),JobQuery_Clear(),setTimeout(function(){$(".modal").modal("hide")},2e3)):"002"===data.Code&&(Lobibox.notify("warning",{position:"top right",msg:"Failed"}),$("#JobQueryRequestMsg").hide())})}}function ReachUs_Form_Submition(){if(reachus_apply_status=$("#reachus_form_validation").valid()){$("#ReachusRequestMsg").show();var e=$("#rfirstname").val().trim(),a=$("#rlastname").val().trim(),t=$("#rphone_number").val().trim(),i=$("#remail_address").val().trim(),s=$("#rrequirement_message").val().trim(),o=!1;$("#whatsapp_checkbox").prop("checked")&&(o=!0);var l=$("input[name=csrfmiddlewaretoken]").val();$("#btnGetCaptcha").prop("disabled",!0),$("#btnGetCaptcha").css("cursor","not-allowed"),$.ajax({url:"https://app-gsolve.green.com.pg/submit/reach_us/",type:"post",data:{firstname:e,lastname:a,email:i,phone:t,message:s,lead_type:"1790",login_from:"1788",is_whatsapp_number:o,csrfmiddlewaretoken:l}}).done(function(e){"001"===(data=JSON.parse(e)).Code?(Lobibox.notify("success",{position:"top right",msg:"Your Query is Raised and Team will contact you soon"}),ReachusOnClose()):"002"===data.Code&&(Lobibox.notify("warning",{position:"top right",msg:"Failed"}),$("#ReachusRequestMsg").hide())})}}function LoginUser(){if(login_form_valid=$("#login_form_validation").valid()){var e=$("#login_username").val().trim(),a=$("#login_password").val().trim(),t=$("input[name=csrfmiddlewaretoken]").val();$.ajax({url:"https://app-gsolve.green.com.pg/login/user/",type:"post",data:{username:e,password:a,csrfmiddlewaretoken:t}}).done(function(e){var a=JSON.parse(e);"001"===a.Code?(Lobibox.notify("success",{position:"top right",msg:"Login Successful. You can view your Candidature Status"}),$("#login_username").val(""),$("#login_password").val(""),setTimeout(function(){globalResponseData=a,localStorage.setItem("globalResponseData",JSON.stringify(globalResponseData)),window.location.href="dashboard.html"},1e3)):"002"===a.Code&&(Lobibox.notify("warning",{position:"top right",msg:"Login Authentication Failed"}),$("#login_password").val(""))}).fail(function(){Lobibox.notify("error",{position:"top right",msg:"Login Authentication Failed"}),setTimeout(function(){window.location.href="joinus.html"},2e3)})}}function handleCodeResponse(e){var a=e.UserDetails,t=e.firstname,i=e.lastname,s=e.user_email,o=e.deal_id,l="";l+=`
      <div class="row">
      <div class="col">
        <h4 class="title">${t} ${i}</h4>
      <p class="mb-0"></p>
      </div>
      <div class="col-auto">
      <p><a href="#" id="logout">Log out</a></p>
      </div>
      </div>
      <div class="row">
      <div class="col-md-12">
      <label>Job Applied List<span class="asterisk"></span></label>`;var n='<select  onfocus="this.size=6;" onblur="this.size=0;" onchange="this.size=1; this.blur()"   id="DashboardPositionDropdown" class="form-control select2" name="DashboardPositionDropdown">';a.forEach((e,a)=>{n+=`<option value="${e.position_id}" ${0===a?"selected":""}>${e.position_name}</option>`}),n+="</select>",l+=`${n}
      </div>
      </div>
      `,$("#employee_details_header").append(l),$(document).ready(function(){$.ajax({url:"https://app-gsolve.green.com.pg/dashboard/user/get_details/",method:"post",data:{position_id:a[0].position_id,email_id:s,deal_id:o},success:function(e){DashboardDataResponse(JSON.parse(e))},error:function(e){console.error("Error sending data to backend:",e)}})}),$("#DashboardPositionDropdown").on("change",function(){var e=$(this).val();$(document).ready(function(){$.ajax({url:"https://app-gsolve.green.com.pg/dashboard/user/get_details/",method:"post",data:{position_id:e,email_id:s,deal_id:o},success:function(e){DashboardDataResponse(JSON.parse(e))},error:function(e){console.error("Error sending data to backend:",e)}})})}),$("#logout").on("click",function(){Lobibox.notify("success",{position:"top right",msg:"Thanks for Visiting"}),setTimeout(function(){localStorage.clear(),window.location.replace("joinus.html")},1e3)})}$(document).on("click",".Jobquery-btn-close",function(){JobQuery_Clear()}),$(document).ready(function(){var e=JSON.parse(localStorage.getItem("globalResponseData"));e&&$.ajax({url:"https://app-gsolve.green.com.pg/login/user/get_details/",type:"post",data:{deal_id:e.UserDetails.deal_id,position_id:e.UserDetails.position_id,user_email_id:e.UserDetails.user_email_id,deal_id:e.UserDetails.deal_id},success:function(e){handleCodeResponse(JSON.parse(e))},error:function(){Lobibox.notify("error",{position:"top right",msg:"Unable to retrieve details"})}})}),$.validator.addMethod("mobile_no",function(e,a){return this.optional(a)||mobile_val[country_code].test(e)},"Please enter a valid phone number"),$.validator.addMethod("zip_code",function(e,a){return this.optional(a)||zip_val[country_code].test(e)},"Please enter a valid phone number"),$("#reachus_form_validation").validate({rules:{rfirstname:{required:!0},rlastname:{required:!0},remail_address:{required:!0},rphone_number:{required:!0,maxlength:15,minlength:7},rrequirement_message:{required:!0},textInput:{required:!0}},messages:{rfirstname:{required:"Enter First Name"},rlastname:{required:"Enter Last Name"},remail_address:{required:"Enter Email"},rphone_number:{required:"Enter a Valid Mobile Number",maxlength:"Enter Valid Mobile Number",minlength:"Enter Valid Mobile Number"},rrequirement_message:{required:"Enter Message"},textInput:{required:"Please Enter Captcha"}},errorElement:"div",errorPlacement:function(e,a){console.log(e);var t=$(a).data("error");t?$(t).append(e):e.insertAfter(a)}});var input=document.querySelector("#rphone_number");function ReachusOnClose(){$("#reachus_form_validation").validate().resetForm(),$("#rfirstname").val(""),$("#rlastname").val(""),$("#remail_address").val(""),$("#rphone_number").val(""),$("#rphone_number").val("+675 "),$("#whatsapp_checkbox").prop("checked",!1),$("#rrequirement_message").val(""),$("#textInput").val(""),$("#ReachusRequestMsg").hide(),$("#btnGetCaptcha").prop("disabled",!1),$("#btnGetCaptcha").css("cursor","pointer")}function DashboardDataResponse(e){$("#employee_details_header").show(),$("#jobDiscription").empty(),$("#employee_screening").empty();var a="",t="",i=e.UserDetails;function s(e){$(".tab_content").hide(),$("#"+e+"_view").show()}t+=`
      <ul type="none" class="cl_tab_nav dashboard_design">
      <li class="cl_tab_li enable" id="tab_1">
      <p>
      <span>
      <i class="fa fa-check" aria-hidden="true"></i>
      </span>
      <span class="number">1</span>
        <b>Step 1</b> - Screening
      </p>
      </li>
      <li class="cl_tab_li enable" id="tab_2">
      <p>
      <span>
      <i class="fa fa-check" aria-hidden="true"></i>
      </span>
      <span class="number">2</span>
        <b>Step 2</b> - Interview
      </p>
      </li>
      <li class="cl_tab_li enable active" id="tab_3">
      <p>
      <span>
        <i class="fa fa-check" aria-hidden="true"></i>
      </span>
      <span class="number">3</span>
      <b>Step 3</b> - Offer
      </p>
      </li>
      <li class="cl_tab_li" id="tab_4">
      <p>
      <span>
        <i class="fa fa-check" aria-hidden="true"></i>
      </span>
      <span class="number">4</span>
         <b>Step 4</b> - Hired
      </p>
      </li>
      </ul>
      <div class="cl_tab mt-3">
      <div class="cl_tab_detial" id="tab_1_view">
      <p class="col-md-12">${i.description}</p>
      <!-- <div class="text-center mt-100px">
         <button type="reset" class="btn btn-light-green me-3">Back</button>
         <button class="btn-gra-green mt-2 d-inline-block" id="accept_offer"><span>Revoke Application</span></button> 
      </div>          -->
      </div>
      <div class="cl_tab_detial" id="tab_2_view">
      <p class="col-md-12">${i.description}</p>
      <!--<div class="text-center mt-100px">
           <button type="reset" class="btn btn-light-green me-3">Back</button>
           <button class="btn-gra-green mt-2 d-inline-block" id="accept_offer"><span>Revoke Application</span></button> 
      </div>-->
      </div>
      <div class="cl_tab_detial active" id="tab_3_view">
      <p class="col-md-12">${i.description}</p>
      <!-- <div class="text-center mt-100px">
          <button type="reset" class="btn btn-light-green me-3">Reject</button> 
          <button class="btn-gra-green mt-2 d-inline-block" id="accept_offer"><span>Accept Offer</span></button>
      </div> -->
      </div>
      <div class="cl_tab_detial" id="tab_4_view">
      <p class="col-md-12">${i.description}</p>
       <!--<div class="text-center mt-100px">
        <button class="btn-gra-green mt-2 d-inline-block" id="accept_offer"><span>Download Offer Confirmation & Communication Letter </span> <img src="dist/images/cloud-download.png"></button> 
      </div>-->
      </div>
      </div>
      </div>`,$("#employee_screening").append(t),a+=`
      <div class="box-shadow p-4 h-80vh user-details overflow-auto">
      <div class="p-3 dashboard_side">
      <div class="mb-2">
        <label class="form-label">First Name <span class="mark">*</span></label>
        <input type="text" class="form-control" value="${i.firstname}" disabled="">
      </div>
      <div class="mb-2">
         <label class="form-label">Last Name <span class="mark">*</span></label>
         <input type="text" class="form-control" value="${i.lastname}" disabled="">
      </div>
      <div class="mb-2">
         <label class="form-label">Gender <span class="mark">*</span></label>
         <input type="text" class="form-control" value="${i.gender}" disabled="">
      </div>
      <div class="mb-2">
         <label class="form-label">Mobile Number <span class="mark">*</span></label>
         <input type="text" class="form-control" value="${i.phone}" disabled="">
      </div>
      <div class="mb-2">
          <label class="form-label">Email ID <span class="mark">*</span></label>
          <input type="email" class="form-control" value="${i.email}" disabled="">
      </div>
      <div class="mb-2">
          <label class="form-label">Country <span class="mark">*</span></label>
          <input type="text" class="form-control" value="${i.location}" disabled="">
      </div>
      </div>
      </div>`,$("#jobDiscription").append(a),$(document).ready(function(){var e;let a=`${i.stageId}`;e=a,"DT172_176:NEW"===e||"DT172_176:UC_VQKR8B"===e||"DT172_176:UC_R42PLX"===e||"DT172_176:PREPARATION"===e?(s("tab_1"),$(".cl_tab_li").removeClass("enable active"),$("#tab_1").addClass("enable active"),$("#tab_2_view, #tab_3_view, #tab_4_view").hide()):"DT172_176:UC_W4BUHV"===e||"DT172_176:UC_6R4493"===e||"DT172_176:UC_VW252I"===e||"DT172_176:UC_PLHG7M"===e||"DT172_176:UC_U0KDG6"===e||"DT172_176:UC_23HCJT"===e||"DT172_176:UC_EF7KM3"===e||"DT172_176:UC_F7QP1O"===e||"DT172_176:UC_IGGLX8"===e?(s("tab_2"),$(".cl_tab_li").removeClass("enable active"),$("#tab_1,#tab_2").addClass("enable active"),$("#tab_1_view, #tab_3_view, #tab_4_view").hide()):"DT172_176:UC_WLHO36"===e||"DT172_176:UC_872VPE"===e||"DT172_176:UC_I5SX7D"===e||"DT172_176:UC_T30Q6V"===e||"DT172_176:UC_CJM0PC"===e||"DT172_176:UC_V5K99R"===e||"DT172_176:UC_SGSBLW"===e||"DT172_176:UC_ZC1Y3G"===e||"DT172_176:UC_0EPLGE"===e||"DT172_176:UC_47NFAY"===e||"DT172_176:UC_ZYKODY"===e||"DT172_176:UC_EA1MCB"===e?(s("tab_3"),$(".cl_tab_li").removeClass("enable active"),$("#tab_1,#tab_2,#tab_3").addClass("enable active"),$("#tab_1_view, #tab_2_view, #tab_4_view").hide()):"DT172_176:UC_YXYADF"===e&&(s("tab_4"),$(".cl_tab_li").removeClass("enable active"),$("#tab_1,#tab_2,#tab_3,#tab_4").addClass("enable active"),$("#tab_1_view, #tab_2_view, #tab_3_view").hide())})}function CaptchaValidation(){$("#btnGetCaptcha").prop("disabled",!1),$("#divGenerateRandomValues").css({"background-image":"url(../img/captcha.png)",width:"100px",height:"50px"}),$("#divGenerateRandomValues").html("<input id='txtNewInput'></input>"),$("#txtNewInput").css({width:"100px",border:"none",color:"black"}),$("#txtNewInput").val(Math.floor(1e4*Math.random())),$("#txtNewInput").prop("disabled",!0)}intlTelInput(input,{initialCountry:"auto",geoIpLookup:function(e,a){$.get("https://ipinfo.io",function(){},"jsonp").always(function(a){e(a&&a.country?a.country:"us")})}}),$(document).on("click",".onContactForm",function(){CaptchaValidation()}),$(document).ready(function(){$("#ReachusRequestMsg").hide(),CaptchaValidation(),$("#btnGetCaptcha").click(function(){var e=parseInt($("#txtNewInput").val());$("#textInput").val()!=e?(reachus_apply_status=$("#reachus_form_validation").valid())&&Lobibox.notify("warning",{position:"top right",msg:"Please Enter the Correct Captcha"}):ReachUs_Form_Submition()})});