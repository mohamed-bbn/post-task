$(document).ready(function() {

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1) {
            $('.header').addClass("sticky");
        } else {
            if ($(this).scrollTop() < 1) {
                $('.header').removeClass("sticky");
            }
        }
    });

    // End Scroll Header

    $('.jobs-slider').slick({
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });


    $.fn.select2.defaults.set("theme", "bootstrap");
    $(".select2-single, .select2-multiple").select2({
        width: null,
    });
    var placeholder = "";
    $(".select2-multiple").select2({
        placeholder: placeholder,
    });

    $(".select2-single ").on("select2:open", function() {
        if ($(this).parents("[class*='has-']").length) {
            var classNames = $(this).parents("[class*='has-']")[0].className.split(/\s+/);
        }
    });

    /////////////////////////////// END Select 2



    const navbarMenu = document.getElementById("navbar");
    const burgerMenu = document.getElementById("burger");
    const overlayMenu = document.querySelector(".overlay");

    // Show and Hide Navbar Function
    const toggleMenu = () => {
        navbarMenu.classList.toggle("active");
        overlayMenu.classList.toggle("active");
    };

    // Collapsible Mobile Submenu Function
    const collapseSubMenu = () => {
        navbarMenu
            .querySelector(".menu-dropdown.active .submenu")
            .removeAttribute("style");
        navbarMenu.querySelector(".menu-dropdown.active").classList.remove("active");
    };

    // Toggle Mobile Submenu Function
    const toggleSubMenu = (e) => {
        if (e.target.hasAttribute("data-toggle") && window.innerWidth <= 1120) {
            e.preventDefault();
            const menuDropdown = e.target.parentElement;

            // If Dropdown is Expanded, then Collapse It
            if (menuDropdown.classList.contains("active")) {
                collapseSubMenu();
            } else {
                // Collapse Existing Expanded Dropdown
                if (navbarMenu.querySelector(".menu-dropdown.active")) {
                    collapseSubMenu();
                }

                // Expanded the New Dropdown
                menuDropdown.classList.add("active");
                const subMenu = menuDropdown.querySelector(".submenu");
                subMenu.style.maxHeight = subMenu.scrollHeight + "px";
            }
        }
    };

    // Fixed Resize Window Function
    const resizeWindow = () => {
        if (window.innerWidth > 1120) {
            if (navbarMenu.classList.contains("active")) {
                toggleMenu();
            }
            if (navbarMenu.querySelector(".menu-dropdown.active")) {
                collapseSubMenu();
            }
        }
    };

    // Initialize Event Listeners
    burgerMenu.addEventListener("click", toggleMenu);
    overlayMenu.addEventListener("click", toggleMenu);
    navbarMenu.addEventListener("click", toggleSubMenu);
    window.addEventListener("resize", resizeWindow);



    $('.cancel').click(function() {
        $('.navbar').removeClass("active");
        $('.overlay').removeClass("active");
    });

    $('.menu-item').click(function() {
        $('.menu-item ').removeClass("activelink");
        $(this).addClass("activelink");
    });






    $('.brandlogos').slick({
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.discoverteam').slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ]
    });

    $('.usersprofiles').slick({
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.sliderblogs').slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },

            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });


    $(window).scroll(function() {
        if ($(this).scrollTop() > 500) {
            $('.scrollToTop').fadeIn();
            $('.scrollToTop').addClass("btntop");
        } else {
            $('.scrollToTop').fadeOut();
            $('.scrollToTop').removeClass("btntop");
        }
    });
    //Click event to scroll to top
    $('.scrollToTop').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 300);
        return false;
    });

    // End Scroll Top

    $('.pagination li a').click(function() {
        $('.pagination li a').removeClass("active");
        $(this).addClass("active");
    });

    $('.listmenu a').click(function() {
        $('.listmenu a').removeClass("active");
        $(this).addClass("active");
    });




    $(function() {

        // We can attach the `fileselect` event to all file inputs on the page
        $(document).on('change', ':file', function() {
            var input = $(this),
                numFiles = input.get(0).files ? input.get(0).files.length : 1,
                label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
            input.trigger('fileselect', [numFiles, label]);
        });

        // We can watch for our custom `fileselect` event like this
        $(document).ready(function() {
            $(':file').on('fileselect', function(event, numFiles, label) {

                var input = $(this).parents('.input-group').find(':text'),
                    log = numFiles > 1 ? numFiles + ' files selected' : label;

                if (input.length) {
                    input.val(log);
                } else {
                    if (log) alert(log);
                }

            });
        });

    });








});

$(document).ready(function() {

    $(".eye.icon-pass").click(function() {
        $("input.pass").attr("type", "text");
        $(this).hide();
        $(".eye-slash.icon-pass").show();
    });

    $(".eye-slash.icon-pass").click(function() {
        $("input.pass").attr("type", "password");
        $(this).hide();
        $(".eye.icon-pass ").show();
    });


    $('.itemmenu').click(function() {
        $('.item.hideitem').addClass("active");
        $('.overlaybox').addClass("active");
    });
    $('.cancel').click(function() {
        $('.item.hideitem').removeClass("active");
        $('.overlaybox').removeClass("active");
    });

    $('.page-content .header .burger').click(function() {
        $(".page-content,.sidebar,.overlayinner").toggleClass("active");
    });


    $('.sidebar .cancel').click(function() {
        $(".page-content,.sidebar,.overlayinner").removeClass("active");
    });

    $('.sidebar .listmenu a').click(function() {
        $('.sidebar .listmenu a').removeClass("activelink");
        $(this).addClass("activelink");
    });

});


// End 


//var blank="http://upload.wikimedia.org/wikipedia/commons/c/c0/Blank.gif";
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('.img_prev')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        var img = input.value;
        $('.img_prev').attr('src', img);
    }
}

// End loop of file input elementsResponse