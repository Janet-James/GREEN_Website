$(document).ready(function(){
    DailyEventLoad();
})

function DailyEventLoad(){
    $.ajax({
        url: 'https://gprogress.green.com.pg/cms/event_generator/',
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            console.log(result)
            var mediaUrl = result.media_url;
            if(mediaUrl){
            var mediaEventHTML = `<div id="onloadPopup"><div class="modal-body" ><img src="${mediaUrl}" class="w-100" ></div></div>`;
            $('#cms_media_append').html(mediaEventHTML);
            }
        }
    })
}