$(".vpop").on('click', function(e) {
    e.preventDefault();
    $("#video-popup-overlay").show();

    var srchref = '',
        autoplay = '',
        id = $(this).data('id');
    if ($(this).data('type') == 'vimeo') var srchref = "//player.vimeo.com/video/";
    else if ($(this).data('type') == 'youtube') var srchref = "https://www.youtube.com/embed/RkMgSEXjH90?si=Y0x87_G26CN3pFld/";
                                                 

    if ($(this).data('autoplay') == true) autoplay = '?autoplay=1';

    $("#video-popup-iframe").attr('src', srchref + id + autoplay);

    $("#video-popup-iframe").on('load', function() {
        $("#video-popup-container").show();
    });
});

$("#video-popup-close ").on('click', function(e) {
    $("#video-popup-overlay").hide();
    $("#video-popup-iframe").attr('src', '');
});


$('.vpop').click(function() {
    $('body').addClass("active");

});
$('#video-popup-close').click(function() {
    $('body').removeClass("active");
});