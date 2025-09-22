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


    $(function() {
        const navbarMenu = $("#navbar");
        const overlayMenu = $(".overlay");

        $("#burger, .overlay").click(function() {
            navbarMenu.toggleClass("active");
            overlayMenu.toggleClass("active");
        });

        navbarMenu.on("click", "[data-toggle]", function(e) {
            if (window.innerWidth <= 999) {
                e.preventDefault();
                const $menuDropdown = $(this).parent();

                if ($menuDropdown.hasClass("active")) {
                    $menuDropdown.removeClass("active").find(".submenu").removeAttr("style");
                } else {
                    $(".menu-dropdown.active .submenu").removeAttr("style");
                    $(".menu-dropdown.active").removeClass("active");

                    $menuDropdown.addClass("active");
                    $menuDropdown.find(".submenu").css("max-height", $menuDropdown.find(".submenu")[0].scrollHeight + "px");
                }
            }
        });

        $(window).on("resize", function() {
            if (window.innerWidth > 999) {
                navbarMenu.removeClass("active");
                $(".menu-dropdown.active").removeClass("active").find(".submenu").removeAttr("style");
            }
        });
    });



    $('.cancel').click(function() {
        $('.navbar').removeClass("active");
        $('.overlay').removeClass("active");
    });

    $('.menu-item').click(function() {
        $('.menu-item ').removeClass("activelink");
        $(this).addClass("activelink");
    });


    ///////////////////// start text slider

    $(function() {
        let $t = $("#typing"),
            txt = $t.data("text"),
            i = 0,
            typingSpeed = 120,
            deletingSpeed = 80,
            pauseTime = 1000;

        function type() {
            if (i < txt.length) {
                $t.text(txt.slice(0, ++i));
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(deleteText, pauseTime);
            }
        }

        function deleteText() {
            if (i > 0) {
                $t.text(txt.slice(0, --i));
                setTimeout(deleteText, deletingSpeed);
            } else {
                setTimeout(type, typingSpeed);
            }
        }

        type();
    });

    ///////////////////// End text slider


    $('.number').each(function() {
        let $this = $(this),
            target = +$this.attr('data-target'),
            suffix = $this.data('suffix') || "",
            count = 0,
            speed = target / 200;

        let updateCount = setInterval(() => {
            count += speed;
            if (count >= target) {
                count = target;
                clearInterval(updateCount);
            }
            let formatted = Math.floor(count).toLocaleString();
            $this.text(formatted + suffix);
        }, 20);
    });


    ///////////////////// End text number



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

    $(".icon-pass").click(function() {
        let $wrapper = $(this).closest(".field");
        let $input = $wrapper.find("input.pass");

        if ($(this).hasClass("eye")) {
            $input.attr("type", "text");
            $(this).hide();
            $wrapper.find(".eye-slash").show();
        } else {
            $input.attr("type", "password");
            $(this).hide();
            $wrapper.find(".eye").show();
        }
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

    function filterItems(buttonClass, filterClass) {
        $(buttonClass).click(function() {
            var value = $(this).data('filter');

            $(buttonClass).removeClass('active');
            $(this).addClass('active');

            if (value === "all") {
                $(filterClass).stop(true, true).fadeIn(300);
            } else {
                $(filterClass).stop(true, true).fadeOut(300).filter('.' + value).fadeIn(300);
            }
        });
        const urlParams = new URLSearchParams(window.location.search);
        const initialFilter = urlParams.get('filter');
        if (initialFilter) {
            const targetBtn = $(`${buttonClass}[data-filter="${initialFilter}"]`);
            if (targetBtn.length) {
                targetBtn.click();
            }
        } else {
            $(`${buttonClass}[data-filter="all"]`).click();
        }
    }
    filterItems(".filter-but", ".filter");

});




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