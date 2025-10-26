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
            txt = $t.data("text") || "", // ✅ حماية إذا الـ data-text مش موجودة
            i = 0,
            typingSpeed = 120,
            deletingSpeed = 80,
            pauseTime = 1000;

        if (!txt.length) return; // ✅ إيقاف السكربت لو مفيش نص

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


    $(function() {

        $(".box-header").on("click", function() {
            $(this).siblings(".box-content").slideToggle();
            $(this).toggleClass("active");
            $(this).find(".arrow").toggleClass("rotate");
        });

        function initPopup(btnClass, popupId) {
            $("." + btnClass).on("click", function(e) {
                e.stopPropagation();
                $("#" + popupId).fadeIn(function() {
                    $("body").addClass("no-scroll");

                    var $sel = $(this).find(".select2-multiple");
                    if ($sel.hasClass("select2-hidden-accessible")) {
                        $sel.select2("destroy");
                    }
                    $sel.select2({
                        dropdownParent: $("#" + popupId + " .popup"),
                        width: "100%"
                    });
                });
            });

            $("#" + popupId + " .closePopup, #" + popupId).on("click", function(e) {
                if ($(e.target).closest(".closePopup").length > 0 || e.target.id === popupId) {
                    $("#" + popupId).fadeOut(function() {
                        $("body").removeClass("no-scroll");
                    });
                }
            });
        }
        initPopup("header-btn", "popup-backdrop");
        initPopup("header-btn2", "popup-backdrop2");
        initPopup("header-btn3", "popup-backdrop3");
    });



    $(".boxproject-header").on("click", function() {
        $(this).siblings(".boxproject-content").slideToggle();
        $(this).toggleClass("active");
        $(this).find(".arrow").toggleClass("rotate");
    });


    $(function() {
        $(".gallery .itemimg").on("click", function() {
            $(this).toggleClass("selected");
            $("#count").text($(".gallery .itemimg.selected").length);
        });

        $("#addImages").on("click", function() {
            $("#selectedImages").empty();

            $(".gallery .itemimg.selected").each(function() {
                const imgSrc = $(this).find("img").attr("src");
                const title = $(this).find(".title").text();

                const item = $(`
                <div class="selected-item" data-src="${imgSrc}">
                    <div class="photo">
                        <div class="overlayimg">
                            <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7218 0.437216C12.0984 0.588644 9.54735 1.4233 7.31302 2.86125C6.38109 3.46104 5.77765 3.9469 4.91654 4.79078C4.05602 5.63412 3.56112 6.22436 2.94735 7.13933C0.821863 10.308 0.0111594 14.1291 0.667019 17.8877C1.08806 20.3005 2.14972 22.6332 3.70448 24.5617C6.01564 27.4284 9.27814 29.3591 12.9241 30.0174C15.1626 30.4217 17.6987 30.303 19.8497 29.6931C22.3132 28.9948 24.4659 27.7714 26.2846 26.0364C28.2207 24.1893 29.5994 21.9351 30.3312 19.42C31.0251 17.0347 31.0891 14.336 30.5088 11.9239C29.7843 8.91232 28.1258 6.19944 25.7541 4.14627C22.7115 1.51204 18.8122 0.201134 14.7218 0.437216ZM14.835 2.43326C11.3401 2.64629 8.02796 4.24972 5.73595 6.83812C3.24528 9.65088 2.12448 13.2649 2.59137 16.9781C2.83084 18.8829 3.56752 20.8335 4.65319 22.4374C6.49469 25.1581 9.26733 27.0876 12.4654 27.8739C14.5474 28.3857 16.8051 28.3857 18.8871 27.8739C21.5123 27.2284 23.8615 25.8097 25.6559 23.7861C28.3062 20.7971 29.4028 16.7314 28.615 12.8147C28.2365 10.9336 27.4256 9.14669 26.2555 7.61491C23.5622 4.08938 19.3108 2.16043 14.835 2.43326ZM23.0921 7.95448C22.8974 7.98277 22.727 8.06121 22.5779 8.19117C22.5214 8.24045 20.2455 11.0487 17.5204 14.4317C14.7954 17.8147 12.5295 20.6147 12.4854 20.654C12.3925 20.7363 12.2297 20.7481 12.1297 20.6795C12.093 20.6542 11.3436 19.632 10.4645 18.408C8.78527 16.07 8.7173 15.9867 8.41911 15.8995C7.91695 15.7528 7.38941 15.9827 7.17216 16.4429C7.05365 16.6939 7.05288 17.0341 7.17032 17.2557C7.21594 17.3416 7.96519 18.4037 8.83533 19.6156C10.5269 21.9717 10.6913 22.1735 11.1144 22.4145C11.2301 22.4802 11.4412 22.5725 11.5836 22.6194C11.8158 22.696 11.8891 22.7048 12.2953 22.7046C12.7059 22.7043 12.7725 22.6962 13.0071 22.6166C13.3448 22.5021 13.6599 22.3174 13.8985 22.0941C14.1641 21.8455 24.0657 9.56153 24.1766 9.34308C24.25 9.19878 24.2649 9.12802 24.2639 8.9309C24.2608 8.30481 23.7293 7.8619 23.0921 7.95448Z" fill="white"/>
                            </svg>
                        </div>
                        <img src="${imgSrc}">
                        <button type="button" class="remove-btn">×</button>
                    </div>
                    <h6 class="title">${title}</h6>
                </div>
            `);

                $("#selectedImages").append(item);
            });

            $(".popup-backdrop").fadeOut();
            $("body").removeClass("no-scroll");
        });

        $(document).on("click", ".remove-btn", function() {
            const parent = $(this).closest(".selected-item");
            const imgSrc = parent.data("src");

            parent.remove();

            $(`.gallery .itemimg img[src="${imgSrc}"]`).closest(".itemimg").removeClass("selected");

            if ($("#selectedImages .selected-item").length === 0) {
                $(".gallery .itemimg").removeClass("selected");
            }

            $("#count").text($(".gallery .itemimg.selected").length);
        });
    });

    $(function() {
        $(".subfilter").each(function() {
            const $sub = $(this);
            const $min = $sub.find(".min");
            const $max = $sub.find(".max");
            const $range = $sub.find(".slider-range");
            const $minVal = $sub.find(".min-value");
            const $maxVal = $sub.find(".max-value");
            const sliderMax = 100;
            const minGap = 1;

            function updateSlider() {
                let minVal = parseInt($min.val());
                let maxVal = parseInt($max.val());

                if (maxVal - minVal <= minGap) {
                    if (this.classList.contains("min")) $min.val(maxVal - minGap);
                    else $max.val(minVal + minGap);
                    minVal = parseInt($min.val());
                    maxVal = parseInt($max.val());
                }

                const left = (minVal / sliderMax) * 100;
                const width = ((maxVal - minVal) / sliderMax) * 100;

                $range.css({
                    left: left + "%",
                    width: width + "%"
                });
                $minVal.text(minVal);
                $maxVal.text(maxVal);
            }

            $sub.find("input[type=range]").on("input", updateSlider);
            updateSlider();
        });
    });


    $(".about-candidate .action a.like").click(function() {
        $(".message").hide();
        $(".success").fadeIn(300).delay(5000).fadeOut(500);
    });

    $(".about-candidate .action a.dislike").click(function() {
        $(".message").hide();
        $(".error").fadeIn(300).delay(5000).fadeOut(500);
    });


    $(".closing").click(function() {
        $(".mes-about").remove();
    });



    function makeTimer() {
        $(".counter").each(function() {
            let endTime = $(this).data("end");
            if (!endTime) return;

            let end = Date.parse(endTime) / 1000;
            let now = Date.parse(new Date()) / 1000;
            let timeLeft = end - now;

            if (timeLeft < 0) timeLeft = 0;

            let days = Math.floor(timeLeft / 86400);
            let hours = Math.floor((timeLeft % 86400) / 3600);
            let minutes = Math.floor((timeLeft % 3600) / 60);
            let seconds = Math.floor(timeLeft % 60);

            if (hours < 10) hours = "0" + hours;
            if (minutes < 10) minutes = "0" + minutes;
            if (seconds < 10) seconds = "0" + seconds;

            $(this).find(".days").text(days);
            $(this).find(".hours").text(hours);
            $(this).find(".minutes").text(minutes);
            $(this).find(".seconds").text(seconds);
        });
    }

    setInterval(makeTimer, 1000);


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