var supplierBrousherUpload = [];
var businessAnnualReportFileUpload = [];
var cancellationFileUpload = [];
var productselectedCheckboxIds = [];
var additionselectCheckboxIds = [];
var environment_statement_file_upload=[];
var human_trafficking_certificate_upload=[];
var currency_country_code = null;
var supplier_law_country_code = null;
var company_country_code = null;
var bank_account_currency_code = null;
// var other_payment_currency_code = null;
var bank_info_country_code = null;
var business_country_code = null;
var intermediary_country_code = null;
var environment_statement_check_val=''
var human_trafficking_check_val=''

$(document).ready(function () {
    OrganizationList();
    ProductGetList();
    WizardFormEvent();
    DataValues();
    loadDraft();
    CountrySelect();
    CurrencySelector();
    $("#envstatementfilediv").hide();
    $("#humantraffickingdiv").hide();
});

// --- Wizard Form Event Start Here --- 
function WizardFormEvent(){
    $("#onGotoStakeholdersDetails").click(function(){
    $(".iti__flag-container").css({
      'margin-top': '-6px'
    });
    company_details_form_valid = $('#append_supplier_company_details').valid();
    if (company_details_form_valid){
      if (productselectedCheckboxIds.length === 0 && additionselectCheckboxIds.length === 0) {
        $('html, body').animate({
          scrollTop: $('.supplier-mobView').offset().top - 120
        });
        $('.supplier-mobView .headingOneView ').addClass('show');
        $('.supplier-mobView .header-accordion ').addClass('active');
        
          Lobibox.notify('warning', {
            position: 'top right',
            msg: 'Please Select Product'
          });
      }else{
        $("#tab-2").removeClass("disable");
        $("#tab-2").addClass("enable");
        $(".partner-form-tab li, .partner-form-tab-detail").removeClass("active");
        $("#tab-2, .tab-2-view").addClass("active");  
        $(".tab-2-view").show();
        $(".tab-3-view").hide();}
        $('html, body').animate({
          scrollTop: 0
        }, 0);
    }
    });
    $("#onGotoBusinessDetails").click(function(){
    $(".iti__flag-container").css({
      'margin-top': '-6px'
    });
    stakeholder_form_valid = $('#append_stakeholder_details').valid();
    if (stakeholder_form_valid){
        $("#tab-3").removeClass("disable");
        $("#tab-3").addClass("enable");
        $(".partner-form-tab li, .partner-form-tab-detail").removeClass("active");
        $("#tab-3, .tab-3-view").addClass("active");
        $(".tab-3-view").show();
        $(".tab-4-view").hide();
        $('html, body').animate({
          scrollTop: 0
        }, 0);
    }});
    $("#onGotoBankingDetails").click(function(){
      $(".iti__flag-container").css({
        'margin-top': '-6px'
    });
    business_form_valid = $('#append_supplier_business_details').valid();
    if (business_form_valid){
      $("#tab-4").removeClass("disable");
      $("#tab-4").addClass("enable");
      $(".partner-form-tab li, .partner-form-tab-detail").removeClass("active");
      $("#tab-4, .tab-4-view").addClass("active");
      $(".tab-4-view").show();
      $(".tab-5-view").hide();
      $('html, body').animate({
        scrollTop: 0
      }, 0);
    }});
    $("#onGotoOtherInformation").click(function(){
      $(".iti__flag-container").css({
        'margin-top': '-6px'
      });
      banking_deatails = $('#append_bank_information_details').valid();
      if (banking_deatails){
      $("#tab-5").removeClass("disable");
      $("#tab-5").addClass("enable");
      $(".partner-form-tab li, .partner-form-tab-detail").removeClass("active");
      $("#tab-5, .tab-5-view").addClass("active");
      $(".tab-5-view").show();
      $('html, body').animate({
        scrollTop: 0
      }, 0);
      }
    });

    $("#onBacktoCompanyDetails").click(function(){
      $(".partner-form-tab li, .partner-form-tab-detail").removeClass("active");
      $("#tab-1, .tab-1-view").addClass("active");
      $('html, body').animate({
        scrollTop: 0
      }, 0);
    });

    $("#onBacktoStakeholdersDetails").click(function(){
      $(".partner-form-tab li, .partner-form-tab-detail").removeClass("active");
      $("#tab-2, .tab-2-view").addClass("active");
      $('html, body').animate({
        scrollTop: 0
      }, 0);
    });

    $("#onBacktoBusinessDetails").click(function(){
      $(".partner-form-tab li, .partner-form-tab-detail").removeClass("active");
      $("#tab-3, .tab-3-view").addClass("active");
      $('html, body').animate({
        scrollTop: 0
      }, 0);
    });

    $("#onBacktoBankingDetails").click(function(){
      $(".partner-form-tab li, .partner-form-tab-detail").removeClass("active");
      $("#tab-4, .tab-4-view").addClass("active");
      $('html, body').animate({
        scrollTop: 0
      }, 0);
    });
};

// ---- Supplier Company Name Append ----
$('#supplier_company_name').on('change', function(e) {
  $('#supplier_company_name_append').empty();
  $('#supplier_company_name_append_2').empty();
  supplier_company_name = $("#supplier_company_name").val().trim();
  companyHTML = `<h3 class="title">Welcome ${supplier_company_name}</h3>`
  $('#supplier_company_name_append').append(companyHTML)
  $('#supplier_company_name_append_2').append(companyHTML)
})

// ------ Brousher File Upload -------
$('#myFile').on('change', function (e) {
  var files = e.target.files;
  for (var i = 0; i < files.length; i++) {
    var reader = new FileReader();
    reader.readAsDataURL(files[i]);
    (function (currentReader, currentFile) {
      currentReader.onload = function () {
        var inputData = currentReader.result;
        var replaceValue = inputData.split(',')[0];
        var fileData = inputData.replace(replaceValue, "");
        supplierBrousherUpload.push(fileData);
        if (supplierBrousherUpload.length === files.length) {
          console.log(supplierBrousherUpload);
        }
      };
    })(reader, files[i]);
  }
});

// ---- Supplier Annual Report File Upload -----
$('#attach_annual_reports').on('change', function (e) {
  var files = e.target.files;
  for (var i = 0; i < files.length; i++) {
      var reader = new FileReader();
      reader.readAsDataURL(files[i]);
      (function (currentReader) {
          currentReader.onload = function () {
              var inputData = currentReader.result;
              var replaceValue = (inputData.split(',')[0]);
              var fileData = inputData.replace(replaceValue, "");
              businessAnnualReportFileUpload.push(fileData);
              if (businessAnnualReportFileUpload.length === files.length) {
                  console.log(businessAnnualReportFileUpload);
              }
          };
      })(reader);
  }
});

$('#cancellation_cheque').on('change', function (e) {
  var files = e.target.files;
  for (var i = 0; i < files.length; i++) {
      var reader = new FileReader();
      reader.readAsDataURL(files[i]);
      (function (currentReader) {
          currentReader.onload = function () {
              var inputData = currentReader.result;
              var replaceValue = (inputData.split(',')[0]);
              var fileData = inputData.replace(replaceValue, "");
              cancellationFileUpload.push(fileData);
              if (cancellationFileUpload.length === files.length) {
                  console.log(cancellationFileUpload);
              }
          };
      })(reader);
  }
});

$('#env_statement_file_upload').on('change', function (e) {
  var files = e.target.files;
  for (var i = 0; i < files.length; i++) {
      var reader = new FileReader();
      reader.readAsDataURL(files[i]);
      (function (currentReader, currentFile) {
       currentReader.onload = function () {
          var inputData = currentReader.result;
          var replaceValue = inputData.split(',')[0];
          var fileData = inputData.replace(replaceValue, "");
          environment_statement_file_upload.push(fileData);
          if (environment_statement_file_upload.length === files.length) {
           console.log(environment_statement_file_upload);
          }
       };
      })(reader, files[i]);
  }
});
  
$('#human_trafficking_certificate').on('change', function (e) {
  var files = e.target.files;
  for (var i = 0; i < files.length; i++) {
      var reader = new FileReader();
      reader.readAsDataURL(files[i]);
      (function (currentReader, currentFile) {
       currentReader.onload = function () {
          var inputData = currentReader.result;
          var replaceValue = inputData.split(',')[0];
          var fileData = inputData.replace(replaceValue, "");
          human_trafficking_certificate_upload.push(fileData);
          if (human_trafficking_certificate_upload.length === files.length) {
           console.log(human_trafficking_certificate_upload);
          }
       };
      })(reader, files[i]);
  }
});

// ---- Data Detail ----
var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
];

function DataValues() {
    $("#business_zip_code,#business_city,#business_state_province,#supplier_company_name, #supplier_registerd_address, #zip_code_or_postal_code, #supplier_factory_address, #supplier_year_established, #supplier_law, #supplier_date, #supplier_place, #supplier_organization, #supplier_company_email, #supplier_website_link, #supplier_telephone_no, #supplier_mobile_no,#stakeholder_partner_name, #stakeholder_chief_executive_name, #stakeholder_chief_executive_email, #stakeholder_chief_executive_phone, #stakeholder_manager_name, #stakeholder_manager_email, #stakeholder_manager_phone, #stakeholder_contact_person_name, #stakeholder_contact_person_email, #stakeholder_contact_person_phone,#name_of_the_bank, #bank_info_bank_address, #bank_info_postal_code, #bank_acc_holder_name, #company_registration_no, #tax_id,#factory_locations, #production_capacity, #bank_info_postal_code, #no_of_plants, #no_of_warehouses").on("input", function () {
        var supplierCompanyName = $("#supplier_company_name").val();
        var supplierRegisteredAddress = $("#supplier_registerd_address").val();
        var supplierCorrespondenceAddress = $("#zip_code_or_postal_code").val();
        var supplierFactoryAddress = $("#supplier_factory_address").val();
        var supplierYearEstablished = $("#supplier_year_established").val();
        var supplierLaw = $("#supplier_law").val();
        var supplierDate = $("#supplier_date").val();
        var parsedDate = new Date(supplierDate);
        var formattedDate = parsedDate.getDate() + "-" + monthNames[parsedDate.getMonth()] + "-" + parsedDate.getFullYear();
        // var supplierPlace = $("#supplier_place").val();
        var supplierOrganization = $("select#supplier_organization").val();
        var supplierCompanyEmail = $("#supplier_company_email").val();
        var supplierWebsiteLink = $("#supplier_website_link").val();
        var supplierTelephoneNo = $("#supplier_telephone_no").val();
        var supplierMobileNo = $("#supplier_mobile_no").val();

        $("#company_name_value").text(supplierCompanyName);
        $("#registerd_address_value").text(supplierRegisteredAddress);
        $("#correspondence_address_value").text(supplierCorrespondenceAddress);
        $("#factory_address_value").text(supplierFactoryAddress);
        $("#date_place_incorporation_value").text(formattedDate);
        $("#year_established_value").text(supplierYearEstablished);
        $("#under_laws_value").text(supplierLaw);
        $("#type_organization_value").text(supplierOrganization);
        $("#company_email_value").text(supplierCompanyEmail);
        $("#company_website_value").text(supplierWebsiteLink);
        $("#office_telephone_no_value").text(supplierTelephoneNo);
        $("#office_mobile_no_value").text(supplierMobileNo);

        var stakeholderPartnerName = $("#stakeholder_partner_name").val();
        var stakeholderChiefExecutiveName = $("#stakeholder_chief_executive_name").val();
        var stakeholderChiefExecutiveEmail = $("#stakeholder_chief_executive_email").val();
        var stakeholderChiefExecutivePhone = $("#stakeholder_chief_executive_phone").val();
        var stakeholderManagerName = $("#stakeholder_manager_name").val();
        var stakeholderManagerEmail = $("#stakeholder_manager_email").val();
        var stakeholderManagerPhone = $("#stakeholder_manager_phone").val();
        var stakeholderContactPersonName = $("#stakeholder_contact_person_name").val();
        var stakeholderContactPersonEmail = $("#stakeholder_contact_person_email").val();
        var stakeholderContactPersonPhone = $("#stakeholder_contact_person_phone").val();
        var stakeholderContactPhoto = $("#stakeholder_contact_photo").val()
        
        $("#owner_name_value").text(stakeholderPartnerName);
        $("#officer_name_value").text(stakeholderChiefExecutiveName);
        $("#officer_email_value").text(stakeholderChiefExecutiveEmail);
        $("#officer_phone_value").text(stakeholderChiefExecutivePhone);
        $("#gm_name_value").text(stakeholderManagerName);
        $("#gm_email_value").text(stakeholderManagerEmail);
        $("#gm_phone_value").text(stakeholderManagerPhone);
        $("#contact_name_value").text(stakeholderContactPersonName);
        $("#contact_email_value").text(stakeholderContactPersonEmail);
        $("#contact_phone_value").text(stakeholderContactPersonPhone);
        
        var name_of_the_bank = $("#name_of_the_bank").val();
        var bank_info_bank_address = $("#bank_info_bank_address").val();
        var bank_info_postal_code = $("#bank_info_postal_code").val();
        // var bank_acc_number = $("#bank_acc_number").val();
        var bank_acc_holder_name = $("#bank_acc_holder_name").val();
        var company_registration_no = $("#company_registration_no").val();
        var tax_id = $("#tax_id").val();

        $("#name_of_the_bank_value").text(name_of_the_bank);
        $("#bank_address_value").text(bank_info_bank_address);
        $("#postal_code_value").text(bank_info_postal_code);
        // $("#vendors_account_number_value").text(bank_acc_number);
        $("#account_holders_name_value").text(bank_acc_holder_name);
        $("#company_reg_number_value").text(company_registration_no);
        $("#tax_id_value").text(tax_id);

        var business_zip_code = $("#business_zip_code").val();
        var business_city = $("#business_city").val();
        var business_state_province = $("#business_state_province").val();
        var production_capacity = $("#production_capacity").val();
        var no_of_plants = $("#no_of_plants").val();
        var no_of_warehouses = $("#no_of_warehouses").val();

        $("#business_factory_address_value").text(supplierFactoryAddress);
        $("#business_city_value").text(business_city);
        $("#business_state_province_value").text(business_state_province);
        $("#business_zipcode_value").text(business_zip_code);
        $("#production_capacity_value").text(production_capacity);
        $("#no_of_plants_value").text(no_of_plants);
        $("#no_of_warehouses_value").text(no_of_warehouses);
    });
};


// ----- Product Get List ----
function ProductGetList() {
  $.ajax({
      url: 'https://app-gsolve.green.com.pg/product_dropdown_list/',
      contentType: 'application/json',
      dataType: 'json',
      success: function (result) {
          var productHTML = '';
          result.forEach(function (values) {
              var product_id = values.product_list_id;
              var product_name = values.product_name;
              productHTML += `
                  <div class="product-details-checkbox row">
                      <div class="col">
                          <label for="${product_id}" class="pt-2" style="font-size: 86%">${product_name}</label>
                      </div>
                      <div class="col-auto" id="checkboxContainer">
                          <input type="checkbox" id="${product_id}" name="product_checkbox">
                      </div>
                  </div>`;
          });
          $('#product_group_list').append(productHTML);
          $('#mobile_product_group_list').append(productHTML);
          $('#product_group_list, #mobile_product_group_list').on('change', 'input[name="product_checkbox"]', function () {
              var checkboxId = $(this).attr('id');
              if ($(this).prop('checked')) {
                  productselectedCheckboxIds.push(checkboxId);
              } else {
                  productselectedCheckboxIds = productselectedCheckboxIds.filter(id => id !== checkboxId);
              }
          });
          // Search Option 
          $("#product_add_list, #mobile_product_add_list").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $(".product-details-checkbox").each(function () {
                var label = $(this).find('label').text().toLowerCase();
                var shouldShow = label.indexOf(value) > -1;
                $(this).toggle(shouldShow);
            });
        });
      }
  });
}

// ----- Organization List -----
function OrganizationList(){
  $.ajax({
      url: 'https://app-gsolve.green.com.pg/organsation_dropdown_list/',
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
          var organizationHTML = '<option value="">Choose Type</option>';
          result.forEach(function (values){
              var organization_id = values.organisation_list_id;
              var organization_name = values.organisation_name;
              organizationHTML += '<option value="' + organization_id + '">' + organization_name + '</option>';
          });
          $('#supplier_organization').append(organizationHTML);
      }
  });
};

// ---- Country Select ---- 
function CountrySelect() {
  var $countrySelector = $('#supplier_law');
  $countrySelector.countrySelect();
  var selectedCountry = $countrySelector.countrySelect("getSelectedCountryData");
  supplier_law_country_code = selectedCountry.iso2;
  supplier_law_country_name = selectedCountry.name;

  $countrySelector.on('change', function() {
    var selectedCountry = $countrySelector.countrySelect("getSelectedCountryData");
    supplier_law_country_code = selectedCountry.iso2;
    supplier_law_country_name = selectedCountry.name;
  });

  var $CompanycountrySelector = $('#company_country_select');
  $CompanycountrySelector.countrySelect();
  var CompanyselectedCountry = $CompanycountrySelector.countrySelect("getSelectedCountryData");
  company_country_code = CompanyselectedCountry.iso2;
  company_country_name = CompanyselectedCountry.name;

  $CompanycountrySelector.on('change', function() {
    var CompanyselectedCountry = $CompanycountrySelector.countrySelect("getSelectedCountryData");
    company_country_code = CompanyselectedCountry.iso2;
    company_country_name = CompanyselectedCountry.name;
  });

  var $BankcountrySelector = $('#bank_info_country');
  $BankcountrySelector.countrySelect();
  var BankselectedCountry = $BankcountrySelector.countrySelect("getSelectedCountryData");
  bank_info_country_code = BankselectedCountry.iso2;
  bank_info_country_name = BankselectedCountry.name;

  $BankcountrySelector.on('change', function() {
    var BankselectedCountry = $BankcountrySelector.countrySelect("getSelectedCountryData");
    bank_info_country_code = BankselectedCountry.iso2;
    bank_info_country_name = BankselectedCountry.name;
  });

  var $BusinessCountrySelector = $('#business_country');
  $BusinessCountrySelector.countrySelect();
  var BusinessselectedCountry = $BusinessCountrySelector.countrySelect("getSelectedCountryData");
  business_country_code = BusinessselectedCountry.iso2;

  $BusinessCountrySelector.on('change', function() {
    var BusinessselectedCountry = $BusinessCountrySelector.countrySelect("getSelectedCountryData");
    business_country_code = BusinessselectedCountry.iso2;
  });

  var $IntermediarycountrySelector = $('#intermediary_bank_country');
  $IntermediarycountrySelector.countrySelect();
  var intermediaryselectedCountry = $IntermediarycountrySelector.countrySelect("getSelectedCountryData");
  intermediary_country_code = intermediaryselectedCountry.iso2;
  intermediary_country_name = intermediaryselectedCountry.name;

  $IntermediarycountrySelector.on('change', function() {
    var intermediaryselectedCountry = $IntermediarycountrySelector.countrySelect("getSelectedCountryData");
    intermediary_country_code = intermediaryselectedCountry.iso2;
    intermediary_country_name = intermediaryselectedCountry.name;
  });
};

// ---- Currency Select ---- 
function CurrencySelector(){
  var $countrySelector = $('#currency_selector');
  $countrySelector.currencyCountrySelect();
  var selectedCountry = $countrySelector.currencyCountrySelect("getSelectedCountryData");
  currency_country_code = selectedCountry.iso2;
  currency_country_name = selectedCountry.name;
  $countrySelector.on('change', function() {
    var selectedCountry = $countrySelector.currencyCountrySelect("getSelectedCountryData");
    currency_country_code = selectedCountry.iso2;
    currency_country_name = selectedCountry.name;
  });

  var $BankAcccountrySelector = $('#bank_account_currency_selector');
  $BankAcccountrySelector.currencyCountrySelect();
  var BankAccselectedCountry = $BankAcccountrySelector.currencyCountrySelect("getSelectedCountryData");
  bank_account_currency_code = BankAccselectedCountry.iso2;
  bank_account_currency_country_name = BankAccselectedCountry.name;
  $BankAcccountrySelector.on('change', function() {
    var selectedCountry = $BankAcccountrySelector.currencyCountrySelect("getSelectedCountryData");
    bank_account_currency_code = selectedCountry.iso2;
    bank_account_currency_country_name = selectedCountry.name;
  });
}

// ---- Web Add Product ----
function ProductAddList(){
  var product_add_list = $("#product_add_list").val();
  var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
  if (product_add_list === "") {
      Lobibox.notify('warning', {
          position: 'top right',
          msg: 'Please Enter the Product.'
      });
  } else {
      $('#productAppend').prop('disabled', true);
      $('#productAppend').css('cursor', 'not-allowed');
      $.ajax({
          url: 'https://app-gsolve.green.com.pg/add/product_list/',
          type: 'post',
          data: {
              'product_name': product_add_list,
              csrfmiddlewaretoken: csrf_data
          },
      }).done(function (json_data) {
          data = JSON.parse(json_data);
          product_data = data.product_list;
          var productHTML = '';
          product_data.forEach(function (values) {
              var product_id = values.ID;
              var product_name = values.NAME;
              var labelId = 'label_' + product_id;
              var checkboxId = product_id;
              productHTML += `
                  <div class="product-details-checkbox row">
                      <div class="col">
                          <label for="${labelId}" class="pt-2" style="font-size: 86%">${product_name}</label>
                      </div>
                      <div class="col-auto">
                          <input type="checkbox" id="${checkboxId}" name="additional_product_checkbox" checked>
                      </div>
                  </div>`;
              additionselectCheckboxIds.push(checkboxId);
          });
          var existingHTML = $('#product_group_list').html();
          var productConHTML = existingHTML + productHTML;
          $('#product_group_list').html(productConHTML);
          if (data.Code === "001") {
              Lobibox.notify('success', {
                  position: 'top right',
                  msg: 'Product Added.'
              });
              $('#productAppend').prop('disabled', false);
              $('#productAppend').css('cursor', 'pointer');
              $('#product_add_list').val('');
              $('#product_add_list').trigger('keyup');
          } else if (data.Code === "002") {
              Lobibox.notify('warning', {
                  position: 'top right',
                  msg: 'Failed to Add Product.'
              });
              $('#product_add_list').val('');
          }
      });
  }
}

// ---- Mobile Product Add ----
function MobileProductAddList(){
  var product_add_list = $("#mobile_product_add_list").val();
  var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
  if (product_add_list === "") {
      Lobibox.notify('warning', {
          position: 'top right',
          msg: 'Please Enter the Product.'
      });
  } else {
      $('#mobileproductAppend').prop('disabled', true);
      $('#mobileproductAppend').css('cursor', 'not-allowed');
      $.ajax({
          url: 'https://app-gsolve.green.com.pg/add/product_list/',
          type: 'post',
          data: {
              'product_name': product_add_list,
              csrfmiddlewaretoken: csrf_data
          },
      }).done(function (json_data) {
          data = JSON.parse(json_data);
          product_data = data.product_list;
          var productHTML = '';
          product_data.forEach(function (values) {
              var product_id = values.ID;
              var product_name = values.NAME;
              var labelId = 'label_' + product_id;
              var checkboxId = product_id;
              productHTML += `
                  <div class="product-details-checkbox row">
                      <div class="col">
                          <label for="${labelId}" class="pt-2" style="font-size: 86%">${product_name}</label>
                      </div>
                      <div class="col-auto">
                          <input type="checkbox" id="${checkboxId}" name="additional_product_checkbox" checked>
                      </div>
                  </div>`;
              additionselectCheckboxIds.push(checkboxId);
          });
          var existingHTML = $('#mobile_product_group_list').html();
          var productConHTML = existingHTML + productHTML;
          $('#mobile_product_group_list').html(productConHTML);
          if (data.Code === "001") {
              Lobibox.notify('success', {
                  position: 'top right',
                  msg: 'Product Added.'
              });
              $('#mobileproductAppend').prop('disabled', false);
              $('#mobileproductAppend').css('cursor', 'pointer');
              $('#mobile_product_add_list').val('');
              $('#mobile_product_add_list').trigger('keyup');
          } else if (data.Code === "002") {
              Lobibox.notify('warning', {
                  position: 'top right',
                  msg: 'Failed to Add Product.'
              });
              $('#mobile_product_add_list').val('');
          }
      });
  }
}

// --- Supplier Partner Submit Form ---
function SupplierPartnerSubmitBtn(){
    other_information = $('#append_other_information_details').valid()
    if(other_information){
      if (productselectedCheckboxIds.length === 0 && additionselectCheckboxIds.length === 0) {
        $('html, body').animate({
          scrollTop: $('.supplier-mobView').offset().top - 120
        });
        $('.supplier-mobView .headingOneView ').addClass('show');
        $('.supplier-mobView .header-accordion ').addClass('active');
        
          Lobibox.notify('warning', {
            position: 'top right',
            msg: 'Please Select Product'
          });
      }else{
    // Company Details
    var supplier_company_name = $("#supplier_company_name").val();
    var supplier_registerd_address = $("#supplier_registerd_address").val();
    var supplier_factory_address = $("#supplier_factory_address").val();
    var supplier_year_established = $("#supplier_year_established").val();
    var supplier_date = $("#supplier_date").val();
    var supplier_place = $("#supplier_place").val();
    // var supplier_organization = form.find("select#supplier_organization").val();
    var supplier_organization = $('#supplier_organization').val();
    var supplier_company_email = $("#supplier_company_email").val();
    var supplier_website_link = $("#supplier_website_link").val();
    var supplier_telephone_no = $("#supplier_telephone_no").val();
    var supplier_mobile_no = $("#supplier_mobile_no").val();
    var zip_postalcode = $("#zip_code_or_postal_code").val();
    var company_city = $("#company_city").val();
    var state_and_province = $("#state_and_province").val();
    var linkedin_page_link = $("#linkedin_page_link").val();
    var isWhatsAppNumber = "N";
    var broucher_warranty_details = "N";
    var already_supplied_meterial_in_png = "N";
    if ($("#whatsapp_checkbox").prop("checked")) {
      isWhatsAppNumber = "Y";
    }
    if ($("#broucher_warranty_details").prop("checked")) {
      broucher_warranty_details = "Y";
    }
    if ($("#already_supplied_meterial_in_png").prop("checked")) {
      already_supplied_meterial_in_png = "Y";
    }
    var supplied_equipment_yes = $("#supplied_equipment_yes").val();
    var supplied_equipment_no = $("#supplied_equipment_no").val();
    var environmental_statement_yes = $("#environmental_statement_yes").val();
    var environmental_statement_no = $("#environmental_statement_no").val();
    var human_trafficking_yes = $("#human_trafficking_yes").val();
    var human_trafficking_no = $("#human_trafficking_no").val();

    // StateHolder Details
    var stakeholder_partner_name = $("#stakeholder_partner_name").val();
    var stakeholder_chief_executive_name = $("#stakeholder_chief_executive_name").val();
    var stakeholder_chief_executive_email = $("#stakeholder_chief_executive_email").val();
    var stakeholder_chief_executive_phone = $("#stakeholder_chief_executive_phone").val();
    var stakeholder_manager_name = $("#stakeholder_manager_name").val();
    var stakeholder_manager_email = $("#stakeholder_manager_email").val();
    var stakeholder_manager_phone = $("#stakeholder_manager_phone").val();
    var stakeholder_contact_person_name = $("#stakeholder_contact_person_name").val();
    var stakeholder_contact_person_email = $("#stakeholder_contact_person_email").val();
    var stakeholder_contact_person_phone = $("#stakeholder_contact_person_phone").val();
    var financial_manager_name =  $("#financial_manager_name").val();
    var financial_manager_email = $("#financial_manager_email").val();
    var financial_manager_phone = $("#financial_manager_phone").val();
    var stakeholder_contact_photo = $("#stakeholder_contact_photo").val()

    // Business Details
    var annual_sales = $("#annual_sales").val();
    var factory_size = $("#factory_size").val();
    var no_of_employee = $("#no_of_employee").val();
    var no_of_offices = $("#no_of_offices").val();
    var factory_locations = $("#factory_locations").val();
    var no_of_plants = $("#no_of_plants").val();
    var business_type = $('#business_type').find(":selected").val();
    var no_of_warehouses = $("#no_of_warehouses").val();
    var warehouse_location = $("#warehouse_location").val() || [];
    var production_capacity = $("#production_capacity").val();
    var export_countries = $("select#export_country_list").val() || [];
    var international_shipping_terms = $("#international_shipping_terms").val();
    var production_capacity_basis = $('#production_capacity_basis').find(":selected").val();
    var business_zip_code = $("#business_zip_code").val();
    var business_city = $("#business_city").val();
    var business_state_province = $("#business_state_province").val();

    // Other Information
    var ungm_no = $("#ungm_no").val();
    var known_about = $("#known_about").find(":selected").val();
    var comments = $("#comments").val();
    
    // ---- Banking Details ----
    var name_of_the_bank = $("#name_of_the_bank").val();
    var branch_code_or_routing_no = $("#branch_code_or_routing_no").val();
    var bank_info_swift_code = $("#bank_info_swift_code").val();
    var bank_info_bank_address = $("#bank_info_bank_address").val();
    var bank_info_postal_code = $("#bank_info_postal_code").val();

    var bank_account_type = $("#bank_account_type").find(":selected").val();
    // var bank_acc_swift_code = $("#bank_acc_swift_code").val();
    var iban_number = $("#iban_number").val();
    var intermediary_routing_code = $("#intermediary_routing_code").val();
    var intermediary_swift_code = $("#intermediary_swift_code").val();
    var any_other_details = $("#any_other_details").val();
    var company_registration_no = $("#company_registration_no").val();
    var tax_id = $("#tax_id").val();
    // var bank_acc_number = $("#bank_acc_number").val();
    var bank_acc_holder_name = $("#bank_acc_holder_name").val();
    var supplied_agencies = $("#supplied_agencies").val();

    $('#SupplierPartnerSubmit').prop('disabled', true);
    $('#SupplierPartnerSubmit').css("cursor", "progress");

    var csrf_data = $("input[name=csrfmiddlewaretoken]").val();

    $.ajax({
        url: 'https://app-gsolve.green.com.pg/submit/supplier_partner/',
        type: 'post',
        data: {
          'supplier_company_name': supplier_company_name,
          'supplier_registerd_address': supplier_registerd_address,
          'zip_postalcode': zip_postalcode,
          'company_city': company_city,
          'state_and_province': state_and_province,
          'linkedin_page_link': linkedin_page_link,
          'supplier_factory_address': supplier_factory_address,
          'supplier_year_established': supplier_year_established,
          "supplier_law_country": supplier_law_country_code,
          "company_country_code": company_country_code,
          "supplier_date": supplier_date,
          "supplier_place": supplier_place,
          "supplier_organization": supplier_organization,
          "supplier_company_email": supplier_company_email,
          "supplier_website_link": supplier_website_link,
          "supplier_telephone_no": supplier_telephone_no,
          'production_capacity_basis': production_capacity_basis,
          "supplier_mobile_no": supplier_mobile_no,
          "whatsapp_checkbox": isWhatsAppNumber,
          "broucher_warranty_details": broucher_warranty_details,
          "already_supplied_meterial_in_png": already_supplied_meterial_in_png,
          "brousher_file_upload": supplierBrousherUpload,           
          "product_selected": productselectedCheckboxIds,
          "partner_name": stakeholder_partner_name,
          "chief_executive_name": stakeholder_chief_executive_name,
          "chief_executive_email": stakeholder_chief_executive_email,
          "chief_executive_phone": stakeholder_chief_executive_phone,
          "manager_name": stakeholder_manager_name,
          "manager_email": stakeholder_manager_email,
          "manager_phone": stakeholder_manager_phone,
          "financial_manager_name": financial_manager_name,
          "financial_manager_email": financial_manager_email,
          "financial_manager_phone": financial_manager_phone,
          "contact_person_name": stakeholder_contact_person_name,
          "contact_photo":stakeholder_contact_photo,
          "contact_person_email": stakeholder_contact_person_email,
          "contact_person_phone": stakeholder_contact_person_phone,
          "annual_sales": annual_sales,
          "currency_selector": currency_country_name,
          "factory_size": factory_size,
          "no_of_employee": no_of_employee,
          "no_of_offices": no_of_offices,
          "factory_locations": factory_locations,
          "no_of_plants": no_of_plants,
          "business_type": business_type,
          "no_of_warehouses": no_of_warehouses,
          "warehouse_location": warehouse_location,
          "production_capacity": production_capacity,
          "export_countries": export_countries,
          "international_shipping_terms": international_shipping_terms,
          "annual_report_upload": businessAnnualReportFileUpload,
          "additional_product_select": additionselectCheckboxIds,
          // "supplied_equipment_checkbox": supplied_equipment_checkbox,
          "ungm_no": ungm_no,
          "known_about": known_about,
          "comments": comments,
          "bank_info_country_code": bank_info_country_code,
          "bank_account_currency_code": bank_account_currency_country_name,
          "intermediary_country_code": intermediary_country_code,
          // "other_payment_currency_code": other_payment_currency_code,
          "name_of_the_bank": name_of_the_bank,
          "branch_code_or_routing_no": branch_code_or_routing_no,
          "bank_info_swift_code": bank_info_swift_code,
          "bank_info_bank_address": bank_info_bank_address,
          "bank_info_postal_code": bank_info_postal_code,
          "bank_account_type": bank_account_type,
          // "bank_acc_swift_code": bank_acc_swift_code,
          "iban_number": iban_number,
          "intermediary_routing_code": intermediary_routing_code,
          "intermediary_swift_code": intermediary_swift_code,
          "any_other_details": any_other_details,
          "company_registration_no": company_registration_no,
          "cancellationFileUpload": cancellationFileUpload,
          // "bank_acc_number": bank_acc_number,
          "tax_id": tax_id,
          "bank_acc_holder_name": bank_acc_holder_name,
          "business_country_code": business_country_code,
          "business_zip_code": business_zip_code,
          "business_city": business_city,
          "business_state_province": business_state_province,
          "supplied_agencies": supplied_agencies,
          'supplied_equipment_no': supplied_equipment_no,
          'supplied_equipment_yes': supplied_equipment_yes,
          'environment_statement_check_val':environment_statement_check_val,
          'human_trafficking_check_val':human_trafficking_check_val,
          'environment_statement_file_upload':environment_statement_file_upload,
          'human_trafficking_certificate_upload':human_trafficking_certificate_upload,


          csrfmiddlewaretoken: csrf_data
        }
      }).done(function(json_data) {
      data = JSON.parse(json_data);
      if (data.Code === "001") {
        Lobibox.notify('success', {
          position: 'top right',
          msg: 'Company details registered. Acknowledgment sent to company email'
        });
        ProductGetList();
        clearFormFields();
      }else if (data.Code === "002") {
        Lobibox.notify('warning', {
          position: 'top right',
          msg: 'Failed to Sent'
        });
      }else{
        Lobibox.notify('warning', {
          position: 'top right',
          msg: 'Error'
        });
      }
   });
  }
  }
}

$.validator.addMethod("containsCom", function (value, element) {
  return /\.com/.test(value);
}, "Enter a valid website link (example.com)");

// // --- Company Details --- 
$('#append_supplier_company_details').validate({
    rules:{
        supplier_company_name:{required:true},
        supplier_registerd_address:{required:true},
        supplier_law:{required:true},
        supplier_company_email:{required:true},
        supplier_website_link: {
            required: true,
            containsCom: true
        },
        zip_code_or_postal_code:{required:true},
        company_city:{required:true},
        state_and_province:{required:true},
        company_country_select:{required:true},
        supplier_year_established:{required:true},
        // myFile:{required:true},
        supplier_telephone_no: {
          maxlength: 15,
          minlength: 7
        },
        supplier_mobile_no: {
          maxlength: 15,
          minlength: 7
        },
    },
    messages:{
        supplier_company_name:{required:"Enter Company Name"},
        supplier_registerd_address:{required:"Enter Registered Address"},
        supplier_law:{required:"Select Country law"},
        supplier_company_email:{required:"Enter Company Email"},
        supplier_website_link: {
          required: "Enter Website Link",
          pattern: "Enter a valid website link (example.com)",
        },
        zip_code_or_postal_code:{required:"Enter Postal or Zip Code"},
        company_city:{required:"Enter Company City"},
        state_and_province:{required:"Enter State or Province"},
        company_country_select:{required:"Select Country"},
        supplier_year_established:{required:"Year Established"},
        supplier_telephone_no: {
          maxlength: "Enter Valid Mobile Number",
          minlength: "Enter Valid Mobile Number"
      },
        supplier_mobile_no: {
          maxlength: "Enter Valid Mobile Number",
          minlength: "Enter Valid Mobile Number"
      },
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

// $('.tagify__tag-text').on('keyup', function () {
//   alert()
//   $('#stakeholder_partner_name-error').remove();
// });

// --- State Holder Details ---
$('#append_stakeholder_details').validate({
  rules:{
    stakeholder_partner_name:{required:true},
    stakeholder_manager_name:{required:true},
    stakeholder_manager_email:{required:true},
    stakeholder_contact_person_name:{required:true},
    stakeholder_contact_photo:{required:true},
    stakeholder_contact_person_email:{required:true},
    stakeholder_manager_phone:{required:true,
        maxlength: 15,
        minlength: 7},
    stakeholder_contact_person_phone:{required:true,
        maxlength: 15,
        minlength: 7},
  },
  messages:{
    stakeholder_partner_name:{required:"Enter Partner Name"},
    stakeholder_manager_name:{required:"Enter Manager Name"},
    stakeholder_manager_email:{required:"Enter Manager Email"},
    stakeholder_contact_person_name:{required:"Enter Contact Person Name"},
    stakeholder_contact_photo:{required:"Personal Photo Required"},
    stakeholder_contact_person_email:{required:"Enter Contact Person Email"},
    stakeholder_manager_phone:{required: "Enter Manager Phone",
        maxlength: "Enter Valid Mobile Number",
        minlength: "Enter Valid Mobile Number",},
    stakeholder_contact_person_phone:{required: "Enter Contact Person Phone",
        maxlength: "Enter Valid Mobile Number",
        minlength: "Enter Valid Mobile Number",},
  },
  errorElement: 'div',
   errorPlacement: function(error, element) {
      
       console.log(error)
       var placement = $(element).data('error');
       if (placement) {
           $(placement).append(error)
       } else {
           error.insertAfter(element);
       }
   },
});

//  --- Business Details ---- 
$('#append_supplier_business_details').validate({
  rules:{
    // supplier_factory_address:{required:true},
    // business_zip_code:{required:true},
    // business_city:{required:true},
    // business_state_province:{required:true},
    // business_country:{required:true},
    no_of_offices:{required:true},
    factory_locations:{required:true},
    export_country_list:{required:true},
  },
  messages:{
    // supplier_factory_address:{required:"Enter the Factory Address"},
    // business_zip_code:{required:"Enter the Zip or Postal Code"},
    // business_city:{required:"Enter the City"},
    // business_state_province:{required: "Enter State or Province"},
    // business_country:{required:"Select Country"},
    no_of_offices:{required:"No. of International Offices"},
    factory_locations:{required:"Enter Location of Factories"},
    export_country_list:{required:"Select Countries to Which you Export"},
  },
  errorElement: 'div',
   errorPlacement: function(error, element) {
       console.log(error)
       var placement = $(element).data('error');
       if (placement) {
           $(placement).append(error)
       } else {
           error.insertAfter(element);
       }
   },
});


$('#append_bank_information_details').validate({
  rules:{
    name_of_the_bank:{required:true},
    branch_code_or_routing_no:{required:true},
    bank_info_swift_code:{required:true},
    bank_info_bank_address:{required:true},
    bank_info_postal_code:{required:true},
    bank_info_country:{required:true},
    bank_account_type:{required:true},
    // bank_acc_number:{required:true},
    bank_acc_holder_name:{required:true},
    iban_number:{required:true},
    bank_account_currency_selector:{required:true},
  },
  messages:{
    name_of_the_bank:{required:"Enter Bank Name"},
    branch_code_or_routing_no:{required:"Enter Branch Code"},
    bank_info_swift_code:{required:"Enter Swift Code"},
    bank_info_bank_address:{required:"Enter Bank Address"},
    bank_info_postal_code:{required:"Enter Postal Code"},
    bank_info_country:{required:"Select Country"},
    bank_account_type:{required:"Select Account Type"},
    // bank_acc_number:{required:"Enter Account Number"},
    bank_acc_holder_name:{required:"Enter Account Holder Name"},
    iban_number:{required:"Enter IBAN Number" },
    bank_account_currency_selector:{required:"Select Currency"},
  },
  errorElement: 'div',
   errorPlacement: function(error, element) {
       console.log(error)
       var placement = $(element).data('error');
       if (placement) {
           $(placement).append(error)
       } else {
           error.insertAfter(element);
       }
   },
});

$('#append_other_information_details').validate({
  rules:{
    env_statement_file_upload:{required:true},
    human_trafficking_certificate:{required:true},
  },
  messages:{
    env_statement_file_upload:{required:"Add Attachment"},
    human_trafficking_certificate:{required:"Add Attachment"},
  },
  errorElement: 'div',
   errorPlacement: function(error, element) {
       console.log(error)
       var placement = $(element).data('error');
       if (placement) {
           $(placement).append(error)
       } else {
           error.insertAfter(element);
       }
   },
});

// ---- Clear Form ---- 
function clearFormFields() {
    localStorage.clear();
    $("#tab-1, .tab-1-view").addClass("active");
    $("#tab-2, .tab-2-view").removeClass("disable");
    $("#tab-3, .tab-3-view").removeClass("disable");
    $("#tab-4, .tab-4-view").removeClass("disable");
    $("#tab-5, .tab-5-view").removeClass("disable");
    $("#tab-2").removeClass("enable");
    $("#tab-3").removeClass("enable");
    $("#tab-4").removeClass("enable");
    $("#tab-5").removeClass("enable");
    $("#tab-2").addClass("disable");
    $("#tab-3").addClass("disable");
    $("#tab-4").addClass("disable");
    $("#tab-5").addClass("disable");
    $(".tab-2-view").hide();
    $(".tab-3-view").hide();
    $(".tab-4-view").hide();
    $(".tab-5-view").hide();
    $(".drop-zone__thumb").remove();
    // $('#product_group_list').empty();
    // $('#mobile_product_group_list').empty();
    // Company 
    $('#append_supplier_company_details')[0].reset();
    $('#append_stakeholder_details')[0].reset();
    $('#append_supplier_business_details')[0].reset();
    $('#append_bank_information_details')[0].reset();
    $('#append_other_information_details')[0].reset();

    $("#supplier_company_name").val('');
    $("#supplier_registerd_address").val('');
    $("#zip_code_or_postal_code").val('');
    $("#supplier_factory_address").val('');
    $("#supplier_year_established").val('');
    // $("#supplier_law").val('');
    $("#supplier_date").val('');
    $("#supplier_place").val('');
    $("#supplier_organization").val('');
    $("#supplier_company_email").val('');
    $("#supplier_website_link").val('');
    $("#supplier_telephonezone__input_no").val("+675 ");
    $("#supplier_mobile_no").val("+675 ");
    $("#financial_manager_name").val('');
    $("#financial_manager_email").val('');
    $("#financial_manager_phone").val("+675 ");
    $("#zip_code_or_postal_code").val('');
    $("#company_city").val('');
    $("#state_and_province").val('');
    $("#linkedin_page_link").val('');
    // StateHolder Details
    $("#stakeholder_partner_name").val('');
    $("#stakeholder_chief_executive_name").val('');
    $("#stakeholder_chief_executive_email").val('');
    $("#stakeholder_chief_executive_phone").val("+675 ");
    $("#stakeholder_manager_name").val('');
    $("#stakeholder_manager_email").val('');
    $("#stakeholder_manager_phone").val("+675 ");
    $("#stakeholder_contact_person_name").val('');
    $('#stakeholder_contact_photo').val('')
    $("#stakeholder_contact_person_email").val('');
    $("#stakeholder_contact_person_phone").val("+675 ");
    // Business Details
    $("#annual_sales").val('');
    $("#factory_size").val('');
    $("#no_of_employee").val('');
    $("#no_of_offices").val('');
    $("#factory_locations").val('');
    $("#no_of_plants").val('');
    $("#business_type").val('');
    $("#production_capacity_basis").val('');
    $("#no_of_warehouses").val('');
    $("#warehouse_location").val('');
    $("#production_capacity").val('');
    $("#export_countries").val('');
    $("#international_shipping_terms").val('');
    $("#whatsapp_checkbox").prop("checked", false);
    $("#broucher_warranty_details").prop("checked", false);
    $('input[name="product_checkbox"]').prop('checked', false);
    $('input[name="additional_product_checkbox"]').prop('checked', false);
    $('#supplied_equipment_checkbox').prop('checked', false);
    $('#SupplierPartnerSubmit').prop('disabled', false);
    $('#SupplierPartnerSubmit').css("cursor", "default");
    // Details
    $("#company_name_value").text('');
    $("#registerd_address_value").text('');
    $("#correspondence_address_value").text('');
    $("#factory_address_value").text('');
    $("#year_established_value").text('');
    $("#under_laws_value").text('');
    $("#date_place_incorporation_value").text('');
    $("#type_organization_value").text('');
    $("#company_email_value").text('');
    $("#company_website_value").text('');
    $("#office_telephone_no_value").text('');
    $("#office_mobile_no_value").text('');
    $("#owner_name_value").text('');
    $("#officer_name_value").text('');
    $("#officer_email_value").text('');
    $("#officer_phone_value").text('');
    $("#gm_name_value").text('');
    $("#gm_email_value").text('');
    $("#gm_phone_value").text('');
    $("#contact_name_value").text('');
    $("#contact_email_value").text('');
    $("#contact_phone_value").text('');
    $("#myFile").text('');
    $("#attach_annual_reports").val('');
    $("select#export_country_list").val('');
    $("#ungm_no").val('');
    $("select#known_about").val('');
    $("#comments").val('');
    $("#name_of_the_bank").val('');
    $("#branch_code_or_routing_no").val('');
    $("#bank_info_swift_code").val('');
    $("#bank_info_bank_address").val('');
    $("#bank_info_postal_code").val('');
    $("select#bank_account_type").val('');
    $("#iban_number").val('');
    $("#intermediary_routing_code").val('');
    $("#intermediary_swift_code").val('');
    $("#any_other_details").val('');
    $("#company_registration_no").val('');
    $("#tax_id").val('');
    // $("#bank_acc_number").val('');
    $("#bank_acc_holder_name").val('');
    $("#business_zip_code").val('');
    $("#business_city").val('');
    $("#business_state_province").val('');
    $("input[name='environment_radio']").prop("checked", false);
    $("input[name='human_trafficking_radio']").prop("checked", false);
    $("input[name='already_supplied_meterial_in_png']").prop("checked", false);

    $("#currency_selector").val('');
    $("#supplier_telephone_no").val('+675 ');
    productselectedCheckboxIds = [];
    supplierBrousherUpload = [];
    businessAnnualReportFileUpload = [];
    var company_details = $('#append_supplier_company_details').validate();
    var stakeholder_details = $('#append_stakeholder_details').validate();
    company_details.resetForm();
    stakeholder_details.resetForm();
    FileUploadHtml = `
    <span class="drop-zone__prompt">
    <img src="dist/images/upload-file.png" />
    <span class="content">Select a file or drag and drop here<span>JPG, PNG,PDF or TXT format  ( file size no more than 10 MB )</span></span>
    <span class="file">Select File</span>
    </span>
    <input type="file" id="myFile" name="myFile" class="drop-zone__input" multiple>`
    $("#fileUploadAppend").html(FileUploadHtml)
    CancelFileHtml = `
    <span class="drop-zone__prompt">
    <img src="dist/images/upload-file.png" />
    <span class="content">Select a file or drag and drop here<span>JPG, PNG,PDF or TXT format  ( file size no more than 10 MB )</span></span>
    <span class="file">Select File</span>
    </span>
    <input type="file" id="cancellation_cheque" name="cancellation_cheque" class="drop-zone__input" multiple>`
    $("#CancellationChequeAppend").html(CancelFileHtml)
    AnnualReportHtml = `
    <span class="drop-zone__prompt">
    <img src="dist/images/upload-file.png" />
    <span class="content">Select a file or drag and drop here<span>JPG, PNG,PDF or TXT format ( file size no more than 10 MB )</span></span>
    <span class="file">Select File</span>
    </span>
    <input type="file" id="attach_annual_reports" name="attach_annual_reports" class="drop-zone__input" multiple>`
    $("#annualReportFileUpload").html(AnnualReportHtml)
    EvironmentalHtml = `
    <span class="drop-zone__prompt">
    <img src="dist/images/upload-file.png" />
    <span class="file">Select File</span>
    </span>
    <input type="file" id="env_statement_file_upload" name="env_statement_file_upload" class="drop-zone__input" multiple>`
    $("#envFileAppend").html(EvironmentalHtml)
    TraficFileHtml = `
    <span class="drop-zone__prompt">
    <img src="dist/images/upload-file.png" />
    <span class="file">Select File</span>
    </span>
    <input type="file" id="human_trafficking_certificate" name="human_trafficking_certificate" class="drop-zone__input" multiple>`
    $("#traffickingFileAppend").html(TraficFileHtml)
    $("#envstatementfilediv").hide();
    $("#humantraffickingdiv").hide();
}

// --- TelePhone Flag ---- 
var input = document.querySelector('#supplier_telephone_no');
intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function (success, failure) {
    $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
      var countryCode = (resp && resp.country) ? resp.country : "us";
      success(countryCode);
    });
  },
})

var input = document.querySelector('#supplier_mobile_no');
intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function (success, failure) {
    $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
      var countryCode = (resp && resp.country) ? resp.country : "us";
      success(countryCode);
    });
  },
})

var input = document.querySelector('#stakeholder_chief_executive_phone');
intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function (success, failure) {
    $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
      var countryCode = (resp && resp.country) ? resp.country : "us";
      success(countryCode);
    });
  },
})

var input = document.querySelector('#stakeholder_manager_phone');
intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function (success, failure) {
    $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
      var countryCode = (resp && resp.country) ? resp.country : "us";
      success(countryCode);
    });
  },
})

var input = document.querySelector('#stakeholder_contact_person_phone');
intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function (success, failure) {
    $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
      var countryCode = (resp && resp.country) ? resp.country : "us";
      success(countryCode);
    });
  },
})

var input = document.querySelector('#financial_manager_phone');
intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function (success, failure) {
    $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
      var countryCode = (resp && resp.country) ? resp.country : "us";
      success(countryCode);
    });
  },
})

function saveDraft(){
  var supplier_company_name = $("#supplier_company_name").val();
  var supplier_registerd_address = $("#supplier_registerd_address").val();
  var zip_code_or_postal_code = $("#zip_code_or_postal_code").val();
  var company_city = $("#company_city").val();
  var state_and_province = $("#state_and_province").val();
  var company_country_select = $("#company_country_select").val();
  var supplier_year_established = $("#supplier_year_established").val();
  var supplier_date = $("#supplier_date").val();
  var supplier_place = $("#supplier_place").val();
  var supplier_law = $("#supplier_law").val();
  var supplier_organization = $("#supplier_organization").find(":selected").val();
  var supplier_company_email = $("#supplier_company_email").val();
  var supplier_website_link = $("#supplier_website_link").val();
  var linkedin_page_link = $("#linkedin_page_link").val();
  var supplier_telephone_no = $("#supplier_telephone_no").val();
  var supplier_mobile_no = $("#supplier_mobile_no").val();
  var whatsapp_checkbox = $("#whatsapp_checkbox").prop('checked');
  var base64Files = supplierBrousherUpload.map(function (fileData) {
    return btoa(fileData);
  });
  var broucher_warranty_details = $("#broucher_warranty_details").prop('checked');

  var stakeholder_partner_name = $("#stakeholder_partner_name").val();
  var stakeholder_chief_executive_name = $("#stakeholder_chief_executive_name").val();
  var stakeholder_chief_executive_email = $("#stakeholder_chief_executive_email").val();
  var stakeholder_chief_executive_phone = $("#stakeholder_chief_executive_phone").val();

  var stakeholder_manager_name = $("#stakeholder_manager_name").val();
  var stakeholder_manager_email = $("#stakeholder_manager_email").val();
  var stakeholder_manager_phone = $("#stakeholder_manager_phone").val();

  var stakeholder_contact_person_name = $("#stakeholder_contact_person_name").val();
  var stakeholder_contact_photo = $("#stakeholder_contact_photo").val();
  var stakeholder_contact_person_email = $("#stakeholder_contact_person_email").val();
  var stakeholder_contact_person_phone = $("#stakeholder_contact_person_phone").val();

  var financial_manager_name =  $("#financial_manager_name").val();
  var financial_manager_email = $("#financial_manager_email").val();
  var financial_manager_phone = $("#financial_manager_phone").val();

  var annual_sales = $("#annual_sales").val();
  var supplier_factory_address = $("#supplier_factory_address").val();
  var business_zip_code = $("#business_zip_code").val();
  var business_city = $("#business_city").val();
  var business_state_province = $("#business_state_province").val();
  var currency_selector = $("#currency_selector").val();
  var factory_size = $("#factory_size").val();
  var no_of_employee = $("#no_of_employee").val();
  var no_of_offices = $("#no_of_offices").val();
  var factory_locations = $("#factory_locations").val();
  var business_country = $("#business_country").val();
  var no_of_plants = $("#no_of_plants").val();
  var attach_annual_reports = $("#attach_annual_reports").val();
  var business_type = $('#business_type').find(":selected").val();
  var export_country_list = $("select#export_country_list").val() || [];  
  var international_shipping_terms = $("#international_shipping_terms").val();
  var production_capacity = $("#production_capacity").val();
  var production_capacity_basis = $('#production_capacity_basis').find(":selected").val();
  var no_of_warehouses = $("#no_of_warehouses").val();
  var warehouse_location = $("#warehouse_location").val() || [];
  var already_supplied_meterial_in_png = $("#already_supplied_meterial_in_png").prop('checked');

  var name_of_the_bank = $("#name_of_the_bank").val();
  var branch_code_or_routing_no = $("#branch_code_or_routing_no").val();
  var bank_info_swift_code = $("#bank_info_swift_code").val();
  var bank_info_bank_address = $("#bank_info_bank_address").val();
  var bank_info_postal_code = $("#bank_info_postal_code").val();
  var bank_info_country = $("#bank_info_country").val();
  var bank_account_type = $("#bank_account_type").find(":selected").val();
  // var bank_acc_number = $("#bank_acc_number").val();
  var bank_acc_holder_name = $("#bank_acc_holder_name").val();
  var iban_number = $("#iban_number").val();
  var bank_account_currency_selector = $("#bank_account_currency_selector").val();
  var intermediary_bank_country = $("#intermediary_bank_country").val();

  var $IntermediarycountrySelector = $('#intermediary_bank_country');
  $IntermediarycountrySelector.countrySelect();
  var intermediaryselectedCountry = $IntermediarycountrySelector.countrySelect("getSelectedCountryData");
  intermediary_country_code = intermediaryselectedCountry.iso2;
  intermediary_country_name = intermediaryselectedCountry.name;

  $IntermediarycountrySelector.on('change', function() {
    var intermediaryselectedCountry = $IntermediarycountrySelector.countrySelect("getSelectedCountryData");
    intermediary_country_code = intermediaryselectedCountry.iso2;
    intermediary_country_name = intermediaryselectedCountry.name;
  });

  var intermediary_routing_code = $("#intermediary_routing_code").val();
  var intermediary_swift_code = $("#intermediary_swift_code").val();
  var any_other_details = $("#any_other_details").val();
  var company_registration_no = $("#company_registration_no").val();
  var tax_id = $("#tax_id").val();

  var supplied_equipment_yes = $("#supplied_equipment_yes").is(":checked");
  var supplied_equipment_no = $("#supplied_equipment_no").is(":checked");
  var environmental_statement_yes = $("#environmental_statement_yes").is(":checked");
  var environmental_statement_no = $("#environmental_statement_no").is(":checked");
  var human_trafficking_yes = $("#human_trafficking_yes").is(":checked");
  var human_trafficking_no = $("#human_trafficking_no").is(":checked");

  var supplied_agencies = $("#supplied_agencies").val();
  var ungm_no = $("#ungm_no").val();
  var known_about = $("#known_about").find(":selected").val();
  var comments = $("#comments").val(); 

  var draftData = {
      "supplier_company_name":supplier_company_name,
      "supplier_registerd_address":supplier_registerd_address,
      "zip_code_or_postal_code":zip_code_or_postal_code,
      "company_city":company_city,
      "state_and_province":state_and_province,
      "company_country_select":company_country_select,
      "supplier_year_established":supplier_year_established,
      "supplier_date":supplier_date,
      "supplier_place":supplier_place,
      "supplier_law":supplier_law,
      "supplier_organization":supplier_organization,
      "supplier_company_email":supplier_company_email,
      "supplier_website_link":supplier_website_link,
      "linkedin_page_link":linkedin_page_link,
      "supplier_telephone_no":supplier_telephone_no,
      "supplier_mobile_no": supplier_mobile_no,
      "whatsapp_checkbox":whatsapp_checkbox,
      "myFile": base64Files,
      "broucher_warranty_details":broucher_warranty_details,
      "productselectedCheckboxIds": productselectedCheckboxIds,
      "stakeholder_partner_name": stakeholder_partner_name,
      "stakeholder_chief_executive_name": stakeholder_chief_executive_name,
      "stakeholder_chief_executive_email": stakeholder_chief_executive_email,
      "stakeholder_chief_executive_phone": stakeholder_chief_executive_phone,
      "stakeholder_manager_name": stakeholder_manager_name,
      "stakeholder_manager_email": stakeholder_manager_email,
      "stakeholder_manager_phone": stakeholder_manager_phone,
      "financial_manager_name": financial_manager_name,
      "financial_manager_email": financial_manager_email,
      "financial_manager_phone": financial_manager_phone,
      "stakeholder_contact_person_name": stakeholder_contact_person_name,
      "stakeholder_contact_photo" : stakeholder_contact_photo,
      "stakeholder_contact_person_email": stakeholder_contact_person_email,
      "stakeholder_contact_person_phone": stakeholder_contact_person_phone,

      "annual_sales": annual_sales,
      "currency_selector": currency_selector,
      "supplier_factory_address": supplier_factory_address,
      "business_zip_code":business_zip_code,
      "business_city":business_city,
      "business_state_province":business_state_province,
      "factory_size":factory_size,
      "no_of_employee":no_of_employee,
      "no_of_offices":no_of_offices,
      "factory_locations":factory_locations,
      "no_of_plants":no_of_plants,
      "attach_annual_reports":attach_annual_reports,
      'business_type':business_type,
      "export_country_list":export_country_list,
      "international_shipping_terms":international_shipping_terms,
      "production_capacity":production_capacity,
      'production_capacity_basis':production_capacity_basis,
      "no_of_warehouses":no_of_warehouses,
      "warehouse_location":warehouse_location,
      "already_supplied_meterial_in_png":already_supplied_meterial_in_png,    
      "business_country": business_country,  

      "name_of_the_bank":name_of_the_bank,
      "branch_code_or_routing_no":branch_code_or_routing_no,
      "bank_info_swift_code":bank_info_swift_code,
      "bank_info_bank_address":bank_info_bank_address,
      "bank_info_postal_code":bank_info_postal_code,
      "bank_info_country":bank_info_country,
      "bank_account_type":bank_account_type,
      // "bank_acc_number":bank_acc_number,
      "bank_acc_holder_name":bank_acc_holder_name,
      "iban_number":iban_number,
      "bank_account_currency_selector":bank_account_currency_selector,
      "intermediary_bank_country":intermediary_bank_country,
      "intermediary_routing_code":intermediary_routing_code,
      "intermediary_swift_code":intermediary_swift_code,
      "any_other_details":any_other_details,
      "company_registration_no":company_registration_no,
      "tax_id":tax_id,
      
      "supplied_equipment_yes": supplied_equipment_yes,
      "supplied_equipment_no": supplied_equipment_no,
      "supplied_agencies": supplied_agencies,
      "ungm_no": ungm_no,
      "known_about": known_about,
      "comments": comments,
      "environmental_statement_yes":environmental_statement_yes,
      "environmental_statement_no":environmental_statement_no,
      "human_trafficking_yes":human_trafficking_yes,
      "human_trafficking_no":human_trafficking_no

  };

  console.log(" --- Draft Data --- ", draftData)

  var draftDataString = JSON.stringify(draftData);
  localStorage.setItem('draftData', draftDataString);
  Lobibox.notify('success', {
    position: 'top right',
    msg: 'Draft Saved'
  });
}

function loadDraft() {
  var draftDataString = localStorage.getItem('draftData');
  if (draftDataString) {
      var draftData = JSON.parse(draftDataString);
      console.log("draftData",draftData)
      $("#supplier_company_name").val(draftData.supplier_company_name);
      $("#supplier_registerd_address").val(draftData.supplier_registerd_address);
      $("#zip_code_or_postal_code").val(draftData.zip_code_or_postal_code);
      $("#company_city").val(draftData.company_city);
      $("#state_and_province").val(draftData.state_and_province);
      $("#company_country_select").val(draftData.company_country_select);

      var $CompanycountrySelector = $('#company_country_select');
      $CompanycountrySelector.countrySelect();
      var CompanyselectedCountry = $CompanycountrySelector.countrySelect("getSelectedCountryData");
      company_country_code = CompanyselectedCountry.iso2;
      company_country_name = CompanyselectedCountry.name;
    
      $CompanycountrySelector.on('change', function() {
        var CompanyselectedCountry = $CompanycountrySelector.countrySelect("getSelectedCountryData");
        company_country_code = CompanyselectedCountry.iso2;
        company_country_name = CompanyselectedCountry.name;
      });

      $("#supplier_year_established").val(draftData.supplier_year_established);
      $("#supplier_date").val(draftData.supplier_date);
      $("#supplier_place").val(draftData.supplier_place);
      $("#supplier_law").val(draftData.supplier_law);

      var $countrySelector = $('#supplier_law');
      $countrySelector.countrySelect();
      var selectedCountry = $countrySelector.countrySelect("getSelectedCountryData");
      supplier_law_country_code = selectedCountry.iso2;
      supplier_law_country_name = selectedCountry.name;
      $countrySelector.on('change', function() {
        var selectedCountry = $countrySelector.countrySelect("getSelectedCountryData");
        supplier_law_country_code = selectedCountry.iso2;
        supplier_law_country_name = selectedCountry.name;
      });
    
      // $("select#supplier_organization").val(draftData.supplier_organization);
      var selectedOrganization = draftData.supplier_organization;
      if ($('#supplier_organization option[value="' + selectedOrganization + '"]').length > 0) {
        $("select#supplier_organization").val(selectedOrganization);
      } else {
      
      }
      $("#supplier_company_email").val(draftData.supplier_company_email);
      $("#supplier_website_link").val(draftData.supplier_website_link);
      $("#linkedin_page_link").val(draftData.linkedin_page_link);
      $("#supplier_telephone_no").val(draftData.supplier_telephone_no);

      var input = document.querySelector('#supplier_telephone_no');
      intlTelInput(input, {
        initialCountry: "auto",
        geoIpLookup: function (success, failure) {
          $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
            var countryCode = (resp && resp.country) ? resp.country : "us";
            success(countryCode);
          });
        },
      })

      $("#supplier_mobile_no").val(draftData.supplier_mobile_no);

      var input = document.querySelector('#supplier_mobile_no');
      intlTelInput(input, {
        initialCountry: "auto",
        geoIpLookup: function (success, failure) {
          $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
            var countryCode = (resp && resp.country) ? resp.country : "us";
            success(countryCode);
          });
        },
      })

      $("#whatsapp_checkbox").prop('checked', draftData.whatsapp_checkbox);
      var base64Files = draftData.myFile;
      supplierBrousherUpload = base64Files.map(function (base64File) {
        return atob(base64File);
      });
      
      $("#broucher_warranty_details").prop('checked', draftData.broucher_warranty_details);
      // var uniqueCheckboxIds = [...new Set(draftData.productselectedCheckboxIds)];
      var uniqueCheckboxIds = draftData.productselectedCheckboxIds;
      uniqueCheckboxIds.forEach(function (checkboxId) {
          console.log('Unique Checkbox ID:', checkboxId);
          var checkbox = $('<input type="checkbox" id="' + checkboxId + '">');
          $('#checkboxContainer').html(checkbox);
      });      

      $("#company_name_value").text(draftData.supplier_company_name);
      $("#registerd_address_value").text(draftData.supplier_registerd_address);
      $("#company_email_value").text(draftData.supplier_company_email);
      $("#office_telephone_no_value").text(draftData.supplier_telephone_no);
      $("#office_mobile_no_value").text(draftData.supplier_mobile_no);
      if(draftData.stakeholder_contact_person_name||draftData.stakeholder_partner_name||draftData.stakeholder_chief_executive_name||draftData.stakeholder_chief_executive_email||
        draftData.stakeholder_chief_executive_phone||draftData.stakeholder_manager_name||draftData.stakeholder_manager_email||draftData.stakeholder_manager_phone||
        draftData.financial_manager_name||draftData.financial_manager_email||draftData.financial_manager_phone||draftData.stakeholder_contact_person_name||draftData.stakeholder_contact_person_email||draftData.stakeholder_contact_photo||
        draftData.stakeholder_contact_person_phone){
      $("#tab-2").removeClass("disable");
      $("#tab-2").addClass("enable");
      $(".partner-form-tab li, .partner-form-tab-detail").removeClass("active");
      $("#tab-2").addClass("active");  
      $("#tab-1, .tab-1-view").addClass("active");  
      $("#stakeholder_partner_name").val(draftData.stakeholder_partner_name)
      $("#stakeholder_chief_executive_name").val(draftData.stakeholder_chief_executive_name)
      $("#stakeholder_chief_executive_email").val(draftData.stakeholder_chief_executive_email)
      $("#stakeholder_chief_executive_phone").val(draftData.stakeholder_chief_executive_phone)
      var input = document.querySelector('#stakeholder_chief_executive_phone');
      intlTelInput(input, {
        initialCountry: "auto",
        geoIpLookup: function (success, failure) {
          $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
            var countryCode = (resp && resp.country) ? resp.country : "us";
            success(countryCode);
          });
        },
      })
      $("#stakeholder_manager_name").val(draftData.stakeholder_manager_name)
      $("#stakeholder_manager_email").val(draftData.stakeholder_manager_email)
      $("#stakeholder_manager_phone").val(draftData.stakeholder_manager_phone)

      var input = document.querySelector('#stakeholder_manager_phone');
      intlTelInput(input, {
        initialCountry: "auto",
        geoIpLookup: function (success, failure) {
          $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
            var countryCode = (resp && resp.country) ? resp.country : "us";
            success(countryCode);
          });
        },
      })

      $("#financial_manager_name").val(draftData.financial_manager_name)
      $("#financial_manager_email").val(draftData.financial_manager_email)
      $("#financial_manager_phone").val(draftData.financial_manager_phone)
      var input = document.querySelector('#financial_manager_phone');
      intlTelInput(input, {
        initialCountry: "auto",
        geoIpLookup: function (success, failure) {
          $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
            var countryCode = (resp && resp.country) ? resp.country : "us";
            success(countryCode);
          });
        },
      })
      $("#stakeholder_contact_person_name").val(draftData.stakeholder_contact_person_name)
      $("#stakeholder_contact_photo").val(draftData.stakeholder_contact_photo)
      $("#stakeholder_contact_person_email").val(draftData.stakeholder_contact_person_email)
      $("#stakeholder_contact_person_phone").val(draftData.stakeholder_contact_person_phone)
      var input = document.querySelector('#stakeholder_contact_person_phone');
      intlTelInput(input, {
        initialCountry: "auto",
        geoIpLookup: function (success, failure) {
          $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
            var countryCode = (resp && resp.country) ? resp.country : "us";
            success(countryCode);
          });
        },
      })
      $("#contact_name_value").text(draftData.stakeholder_contact_person_name);
      $("#contact_photo_value").text(draftData.stakeholder_contact_photo);
      $("#contact_email_value").text(draftData.stakeholder_contact_person_email);
      $("#contact_phone_value").text(draftData.stakeholder_contact_person_phone);
      }
      if(draftData.annual_sales||draftData.supplier_factory_address||draftData.business_zip_code||draftData.business_city||
        draftData.business_state_province||draftData.factory_size||draftData.no_of_employee||draftData.no_of_offices||draftData.factory_locations||
        draftData.no_of_plants||draftData.attach_annual_reports||draftData.export_country_list||draftData.international_shipping_terms||
        draftData.production_capacity||draftData.no_of_warehouses||draftData.warehouse_location||draftData.already_supplied_meterial_in_png){
      $("#tab-3").removeClass("disable");
      $("#tab-3").addClass("enable");
      $(".partner-form-tab li, .partner-form-tab-detail").removeClass("active");
      $("#tab-3").addClass("active");
      $("#tab-1, .tab-1-view").addClass("active");  
      $("#annual_sales").val(draftData.annual_sales);
      $("#currency_selector").val(draftData.currency_selector);
      var $countrySelector = $('#currency_selector');
      $countrySelector.currencyCountrySelect();
      var selectedCountry = $countrySelector.currencyCountrySelect("getSelectedCountryData");
      currency_country_code = selectedCountry.iso2;
      currency_country_name = selectedCountry.name;

      $countrySelector.on('change', function() {
        var selectedCountry = $countrySelector.currencyCountrySelect("getSelectedCountryData");
        currency_country_code = selectedCountry.iso2;
        currency_country_name = selectedCountry.name;
      });

      $("#supplier_factory_address").val(draftData.supplier_factory_address);
      $("#business_zip_code").val(draftData.business_zip_code);
      $("#business_city").val(draftData.business_city);
      $("#business_country").val(draftData.business_country);
      var $BusinessCountrySelector = $('#business_country');
      $BusinessCountrySelector.countrySelect();
      var BusinessselectedCountry = $BusinessCountrySelector.countrySelect("getSelectedCountryData");
      business_country_code = BusinessselectedCountry.iso2;
    
      $BusinessCountrySelector.on('change', function() {
        var BusinessselectedCountry = $BusinessCountrySelector.countrySelect("getSelectedCountryData");
        business_country_code = BusinessselectedCountry.iso2;
      });

      $("#business_state_province").val(draftData.business_state_province);
      $("#factory_size").val(draftData.factory_size);
      $("#no_of_employee").val(draftData.no_of_employee);
      $("#no_of_offices").val(draftData.no_of_offices);
      $("#factory_locations").val(draftData.factory_locations);
      $("#no_of_plants").val(draftData.no_of_plants);
      $("#attach_annual_reports").val(draftData.attach_annual_reports);
      $('#business_type').val(draftData.business_type);
      $("#export_country_list").val(draftData.export_country_list);
      $("#international_shipping_terms").val(draftData.international_shipping_terms); 
      $("#production_capacity").val(draftData.production_capacity);
      $('#production_capacity_basis').val(draftData.production_capacity_basis);
      $("#no_of_warehouses").val(draftData.no_of_warehouses);
      $("#warehouse_location").val(draftData.warehouse_location);
      $("#already_supplied_meterial_in_png").prop('checked', draftData.already_supplied_meterial_in_png);  
      $("#business_factory_address_value").text(draftData.supplier_factory_address);
      $("#business_city_value").text(draftData.business_city);
      $("#business_state_province_value").text(draftData.business_state_province);
      $("#business_zipcode_value").text(draftData.business_zip_code);
      $("#production_capacity_value").text(draftData.production_capacity);
      $("#no_of_plants_value").text(draftData.no_of_plants);
      $("#no_of_warehouses_value").text(draftData.no_of_warehouses);
      }
      if(draftData.name_of_the_bank||draftData.branch_code_or_routing_no||draftData.bank_info_swift_code||draftData.bank_info_bank_address||draftData.bank_info_postal_code||
        draftData.bank_acc_holder_name||draftData.iban_number||draftData.intermediary_routing_code||draftData.intermediary_swift_code||
        draftData.any_other_details||draftData.company_registration_no||draftData.tax_id||draftData.business_zip_code||draftData.business_city||draftData.business_state_province){      
      $("#tab-4").removeClass("disable");
      $("#tab-4").addClass("enable");
      $(".partner-form-tab li, .partner-form-tab-detail").removeClass("active");
      $("#tab-4").addClass("active");
      $("#tab-1, .tab-1-view").addClass("active");  
      $("#name_of_the_bank").val(draftData.name_of_the_bank);
      $("#branch_code_or_routing_no").val(draftData.branch_code_or_routing_no);
      $("#bank_info_swift_code").val(draftData.bank_info_swift_code);
      $("#bank_info_bank_address").val(draftData.bank_info_bank_address);
      $("#bank_info_postal_code").val(draftData.bank_info_postal_code);
      $("#bank_info_country").val(draftData.bank_info_country);

      var $BankcountrySelector = $('#bank_info_country');
      $BankcountrySelector.countrySelect();
      var BankselectedCountry = $BankcountrySelector.countrySelect("getSelectedCountryData");
      bank_info_country_code = BankselectedCountry.iso2;
      bank_info_country_name = BankselectedCountry.name;
          
      $BankcountrySelector.on('change', function() {
        var BankselectedCountry = $BankcountrySelector.countrySelect("getSelectedCountryData");
        bank_info_country_code = BankselectedCountry.iso2;
        bank_info_country_name = BankselectedCountry.name;
      });

      $("#bank_account_type").val(draftData.bank_account_type);
      // $("#bank_acc_number").val(draftData.bank_acc_number);
      $("#bank_acc_holder_name").val(draftData.bank_acc_holder_name);
      $("#iban_number").val(draftData.iban_number);
      $("#bank_account_currency_selector").val(draftData.bank_account_currency_selector);

      var $BankAcccountrySelector = $('#bank_account_currency_selector');
      $BankAcccountrySelector.currencyCountrySelect();
      var BankAccselectedCountry = $BankAcccountrySelector.currencyCountrySelect("getSelectedCountryData");
      bank_account_currency_code = BankAccselectedCountry.iso2;
      bank_account_currency_country_name = BankAccselectedCountry.name;

      $BankAcccountrySelector.on('change', function() {
        var selectedCountry = $BankAcccountrySelector.currencyCountrySelect("getSelectedCountryData");
        bank_account_currency_code = selectedCountry.iso2;
        bank_account_currency_country_name = selectedCountry.name;
      });

      $("#intermediary_bank_country").val(draftData.intermediary_bank_country);

      var $IntermediarycountrySelector = $('#intermediary_bank_country');
      $IntermediarycountrySelector.countrySelect();
      var intermediaryselectedCountry = $IntermediarycountrySelector.countrySelect("getSelectedCountryData");
      intermediary_country_code = intermediaryselectedCountry.iso2;
      intermediary_country_name = intermediaryselectedCountry.name;

      $IntermediarycountrySelector.on('change', function() {
        var intermediaryselectedCountry = $IntermediarycountrySelector.countrySelect("getSelectedCountryData");
        intermediary_country_code = intermediaryselectedCountry.iso2;
        intermediary_country_name = intermediaryselectedCountry.name;
      });

      $("#intermediary_routing_code").val(draftData.intermediary_routing_code);
      $("#intermediary_swift_code").val(draftData.intermediary_swift_code);
      $("#any_other_details").val(draftData.any_other_details);
      $("#company_registration_no").val(draftData.company_registration_no);
      $("#tax_id").val(draftData.tax_id);
      // $("#supplier_factory_address").val(draftData.supplier_factory_address);
      // $("#business_zip_code").val(draftData.business_zip_code);
      // $("#business_city").val(draftData.business_city);
      $("#business_state_province").val(draftData.business_state_province);
      $("#name_of_the_bank_value").text(draftData.name_of_the_bank);
      $("#bank_address_value").text(draftData.bank_info_bank_address);
      $("#postal_code_value").text(draftData.bank_info_postal_code);
      // $("#vendors_account_number_value").text(draftData.bank_acc_number);
      $("#account_holders_name_value").text(draftData.bank_acc_holder_name);
      $("#company_reg_number_value").text(draftData.company_registration_no);
      $("#tax_id_value").text(draftData.tax_id);
      }
      if(draftData.supplied_equipment_yes||draftData.supplied_equipment_no||draftData.ungm_no||draftData.comments||draftData.environmental_statement_yes||
        draftData.environmental_statement_no||draftData.human_trafficking_yes||draftData.human_trafficking_no||draftData.supplied_agencies){
      $("#tab-5").removeClass("disable");
      $("#tab-5").addClass("enable");
      $(".partner-form-tab li, .partner-form-tab-detail").removeClass("active");
      $("#tab-5").addClass("active");
      $("#tab-1, .tab-1-view").addClass("active");  
      $("#supplied_equipment_yes").prop('checked', draftData.supplied_equipment_yes);
      $("#supplied_equipment_no").prop('checked', draftData.supplied_equipment_no);
      $("#ungm_no").val(draftData.ungm_no);
      $("#known_about").val(draftData.known_about);
      $("#comments").val(draftData.comments);
      $("#environmental_statement_yes").prop('checked', draftData.environmental_statement_yes);
      $("#environmental_statement_no").prop('checked', draftData.environmental_statement_no); 
      if(draftData.environmental_statement_yes == true){
        $("#envstatementfilediv").show(100);
      }else{
        $("#envstatementfilediv").hide();
      }
      $("#human_trafficking_yes").prop('checked', draftData.human_trafficking_yes);
      $("#human_trafficking_no").prop('checked', draftData.human_trafficking_no);
      if(draftData.environmental_statement_yes == true){
        $("#humantraffickingdiv").show(100);
      }else{
        $("#humantraffickingdiv").hide();
      }
      if (draftData.supplied_agencies) {
        var InputHtml = `
          <input type="text" id="supplied_agencies" name="supplied_agencies" value="${draftData.supplied_agencies}" class="floating-input" aria-required="true">
          <span class="highlight"></span>
          <label>Which AID Agency have you supplied equipment for?</label>
        `;
        $("#suppliedEquipmentAgencies").html(InputHtml);
      } else {
        $("#suppliedEquipmentAgencies").empty();
      }
      }   
  }
}

$("#supplied_equipment_yes").on("click", function () {
 
  InputHtml = `
  <input type="text" id="supplied_agencies" name="supplied_agencies" class="floating-input" name="" aria-required="true"><span class="highlight"></span>
  <label>Which AID Agency have you supplied equipment for?</label>
  `
  $("#suppliedEquipmentAgencies").html(InputHtml);
});

$("#supplied_equipment_no").on("click", function () {

  $("#suppliedEquipmentAgencies").empty();
});


$("#environmental_statement_yes").on("click", function () {
  environment_statement_check_val='Y';
  $("#envstatementfilediv").show(100);

});

$("#environmental_statement_no").on("click", function () {
  environment_statement_check_val='N';
  $("#envstatementfilediv").hide();
  EvironmentalHtml = `
  <span class="drop-zone__prompt">
  <img src="dist/images/upload-file.png" />
  <span class="file">Select File</span>
  </span>
  <input type="file" id="env_statement_file_upload" name="env_statement_file_upload" class="drop-zone__input" multiple>`
  $("#envFileAppend").html(EvironmentalHtml)
});


$("#human_trafficking_no").on("click", function () {
  human_trafficking_check_val='N'
  $("#humantraffickingdiv").show();
});

$("#human_trafficking_yes").on("click", function () {
  human_trafficking_check_val='Y'
  $("#humantraffickingdiv").hide();
  TraficFileHtml = `
  <span class="drop-zone__prompt">
  <img src="dist/images/upload-file.png" />
  <span class="file">Select File</span>
  </span>
  <input type="file" id="human_trafficking_certificate" name="human_trafficking_certificate" class="drop-zone__input" multiple>`
  $("#traffickingFileAppend").html(TraficFileHtml)
  
  });

setTimeout(function() {
    loadDraft();
}, 3000);

function clearDraft(){
  clearFormFields();
  localStorage.clear();
}