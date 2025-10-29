 $(function() {
     const uid = prefix => prefix + Math.random().toString(36).slice(2, 9);

     // ==============================
     // Search for video or image
     // ==============================

     $('#search').on('input', function() {
         const q = $(this).val().toLowerCase().trim();
         let visible = 0;

         $('.media-item').each(function() {
             const name = $(this).data('title').toLowerCase();
             if (name.includes(q)) {
                 $(this).show();
                 visible++;
             } else {
                 $(this).hide();
             }
         });

         if (visible === 0) {
             $('#noResults').show();
         } else {
             $('#noResults').hide();
         }
     });


     // ==============================
     // Display image in popup
     // ==============================

     // When you click on the small image
     $('.img-item').on('click', function(e) {
         let imgSrc = $(this).closest('.media-box').find('.img-item').attr('src');
         $('#imgPopupImg').attr('src', imgSrc);
         $('#imgPopup').fadeIn(150).css('display', 'flex');
     });

     // When you click on the close sign
     $('.close-popup').on('click', function() {
         $('#imgPopup').fadeOut(150);
     });

     // When you click on the pop-up background
     $('#imgPopup').on('click', function(e) {
         // Make sure that the pressure is not on the image itself.
         if (!$(e.target).is('#imgPopupImg')) {
             $(this).fadeOut(150);
         }
     });


     // ==============================
     // Autoplay visible videos
     // ==============================
     $(document).ready(function() {
         const videos = document.querySelectorAll('.media-box video');

         // Make sure all videos are muted for autoplay to work
         videos.forEach(v => {
             v.muted = true;
             v.playsInline = true;
             v.preload = "metadata";
         });

         // Monitor videos as they enter or exit the screen.
         const observer = new IntersectionObserver(entries => {
             entries.forEach(entry => {
                 const video = entry.target;
                 const btn = $(video).closest('.media-item').find('.playbtn');

                 if (entry.isIntersecting) {
                     // Stop any other video
                     $('video').each(function() {
                         if (this !== video) {
                             this.pause();
                             const otherBtn = $(this).closest('.media-item').find('.playbtn');
                             otherBtn.html(`
                                    <svg   viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"></path>
                                    </svg>
                                `).removeClass('active');
                         }
                     });

                     // Play the current video
                     video.play().catch(() => {});
                     btn.html(`
                            <svg   viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z"></path>
                            </svg>
                        `).addClass('active');
                 } else {
                     video.pause();
                     btn.html(`
                                <svg   viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"></path>
                                </svg>
                            `).removeClass('active');
                 }
             });
         }, {
             threshold: 0.6 // 60% must be visible
         });

         videos.forEach(v => observer.observe(v));

         // Manual on/off button
         $(document).on('click', '.playbtn', function() {
             const parent = $(this).closest('.media-item');
             const v = parent.find('video').get(0);

             if (!v) return;

             if (v.paused) {
                 // Stop the rest
                 $('video').each(function() {
                     this.pause();
                     const otherBtn = $(this).closest('.media-item').find('.playbtn');
                     otherBtn.html(`
                            <svg   viewBox="0 0 24 24"   xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"></path>
                            </svg>
                        `).removeClass('active');
                 });
                 v.play();
                 $(this).html(`
                            <svg   viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z"  ></path>
                            </svg>
                        `).addClass('active');
             } else {
                 v.pause();
                 $(this).html(`
                        <svg  viewBox="0 0 24 24"   xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"></path>
                        </svg>
                    `).removeClass('active');
             }
         });

         // The first video plays automatically when the page opens.
         const firstVideo = videos[0];
         if (firstVideo) {
             firstVideo.play().catch(() => {});
             const firstBtn = $(firstVideo).closest('.media-item').find('.playbtn');
             firstBtn.html(`
                    <svg   viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" ></path>
                    </svg>
                `).addClass('active');
         }
     });


     // ==============================
     // Mute
     // ==============================
     $(document).on('click', '.soundbtn', function() {
         const v = $(this).closest('.media-item').find('video').get(0);
         if (!v) return;

         v.muted = !v.muted;

         // SVGs
         const muteIcon = `
                    <svg class="iconmuted" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <g data-name="mute">
                        <path d="m35.394 10.29-18.6822 11.71h-10.7118a3.0033 3.0033 0 0 0 -3 3v14a3.0033 3.0033 0 0 0 3 3h10.7181l18.6989 11.4883a2.9876 2.9876 0 0 0 4.5708-2.5557v-38.1a3.0171 3.0171 0 0 0 -4.5938-2.5426zm-30.394 28.71v-14a1.0009 1.0009 0 0 1 1-1h10v16h-10a1.0009 1.0009 0 0 1 -1-1zm32.9878 11.9326a.9909.9909 0 0 1 -1.5239.8526l-18.4639-11.3452v-16.8863l18.4561-11.5683a.9862.9862 0 0 1 1.5317.8476z"></path>
                        <path d="m60.4836 39.0721-7.0708-7.0708 7.0726-7.0726c.9309-.9034-.51-2.3453-1.4141-1.4141l-7.0726 7.0726-7.0717-7.0717c-.9034-.9309-2.3453.51-1.4141 1.4141l7.0718 7.0717-7.07 7.07a1 1 0 0 0 1.4141 1.4141l7.07-7.07 7.0712 7.0708a1 1 0 0 0 1.4136-1.4141z"></path>
                    </g>
                    </svg>
                `;

         const unmuteIcon = `
                    <svg class="iconunmuted" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <g data-name="unmute">
                        <path d="m35.394 10.29-18.6822 11.71h-10.7118a3.0033 3.0033 0 0 0 -3 3v14a3.0033 3.0033 0 0 0 3 3h10.7181l18.6989 11.4883a2.9876 2.9876 0 0 0 4.5708-2.5557v-38.1a3.0171 3.0171 0 0 0 -4.5938-2.5426zm-30.394 28.71v-14a1.0009 1.0009 0 0 1 1-1h10v16h-10a1.0009 1.0009 0 0 1 -1-1zm32.9878 11.9326a.9909.9909 0 0 1 -1.5239.8526l-18.4639-11.3452v-16.8863l18.4561-11.5683a.9862.9862 0 0 1 1.5317.8476z"></path>
                        <path d="M47 24a1 1 0 0 1 .707.293l12 12a1 1 0 1 1-1.414 1.414L46.293 25.707A1 1 0 0 1 47 24zM47 40a1 1 0 0 1 .707.293l12 12a1 1 0 1 1-1.414 1.414L46.293 41.707A1 1 0 0 1 47 40z"></path>
                    </g>
                    </svg>
                `;

         // تبديل الأيقونة
         $(this).html(v.muted ? muteIcon : unmuteIcon)
             .toggleClass('active', !v.muted);
     });

     // ==============================
     // Arrows to navigate between videos
     // ==============================
     $('.nav-down').on('click', function() {
         const items = $('.media-item:visible').toArray();
         const current = items.findIndex(el => el.getBoundingClientRect().top >= 20);
         const next = items[current + 1] || items[current];
         if (next) $('html,body').animate({
             scrollTop: $(next).offset().top - 40
         }, 420);
     });
     $('.nav-up').on('click', function() {
         const items = $('.media-item:visible').toArray();
         const current = items.findIndex(el => el.getBoundingClientRect().top >= 20);

         if (current <= 0) {
             // 
             $('html,body').animate({
                 scrollTop: 0
             }, 420);
         } else {
             const prev = items[current - 1];
             if (prev) {
                 $('html,body').animate({
                     scrollTop: $(prev).offset().top - 40
                 }, 420);
             }
         }
     });

     // ==============================
     // Comments + Replies + Likes
     // ==============================
     const $comments = $('#commentsContainer');
     const NO_MSG = $('#noCommentsMsg');
     const getStateKey = (type, id) => `like_state_${type}_${id}`;

     function updateNoComments() {
         $comments.find('.comment').length === 0 ? NO_MSG.show() : NO_MSG.hide();
     }
     updateNoComments();

     // Like/Dislike the comment
     $(document).on('click', '.comment .actionsitems > .c-actions .like, .comment .actionsitems > .c-actions .dislike', function() {
         const $btn = $(this);
         const isLike = $btn.hasClass('like');
         const $comment = $btn.closest('.comment');
         const cid = $comment.data('cid');
         const key = getStateKey('comment', cid);
         let state = JSON.parse(localStorage.getItem(key) || '{"liked":false,"disliked":false}');
         const $other = isLike ? $btn.siblings('.dislike') : $btn.siblings('.like');
         const $count = $btn.find('.count');
         let count = parseInt($count.text());
         if (isLike) {
             if (state.liked) {
                 state.liked = false;
                 count--;
                 $btn.removeClass('active');
             } else {
                 state.liked = true;
                 count++;
                 $btn.addClass('active');
                 if (state.disliked) {
                     state.disliked = false;
                     const oc = $other.find('.count');
                     oc.text(Math.max(0, oc.text() - 1));
                     $other.removeClass('active');
                 }
             }
         } else {
             if (state.disliked) {
                 state.disliked = false;
                 count--;
                 $btn.removeClass('active');
             } else {
                 state.disliked = true;
                 count++;
                 $btn.addClass('active');
                 if (state.liked) {
                     state.liked = false;
                     const oc = $other.find('.count');
                     oc.text(Math.max(0, oc.text() - 1));
                     $other.removeClass('active');
                 }
             }
         }
         $count.text(count);
         localStorage.setItem(key, JSON.stringify(state));
     });

     // Like/Dislike to reply
     $(document).on('click', '.reply-item .reply-actions .like, .reply-item .reply-actions .dislike', function() {
         const $btn = $(this);
         const isLike = $btn.hasClass('like');
         const $reply = $btn.closest('.reply-item');
         const rid = $reply.data('rid');
         const key = getStateKey('reply', rid);
         let state = JSON.parse(localStorage.getItem(key) || '{"liked":false,"disliked":false}');
         const $other = isLike ? $btn.siblings('.dislike') : $btn.siblings('.like');
         const $count = $btn.find('.count');
         let count = parseInt($count.text());
         if (isLike) {
             if (state.liked) {
                 state.liked = false;
                 count--;
                 $btn.removeClass('active');
             } else {
                 state.liked = true;
                 count++;
                 $btn.addClass('active');
                 if (state.disliked) {
                     state.disliked = false;
                     const oc = $other.find('.count');
                     oc.text(Math.max(0, oc.text() - 1));
                     $other.removeClass('active');
                 }
             }
         } else {
             if (state.disliked) {
                 state.disliked = false;
                 count--;
                 $btn.removeClass('active');
             } else {
                 state.disliked = true;
                 count++;
                 $btn.addClass('active');
                 if (state.liked) {
                     state.liked = false;
                     const oc = $other.find('.count');
                     oc.text(Math.max(0, oc.text() - 1));
                     $other.removeClass('active');
                 }
             }
         }
         $count.text(count);
         localStorage.setItem(key, JSON.stringify(state));
     });

     // Delete a comment or reply
     $(document).on('click', '.delete', function() {
         const $r = $(this).closest('.reply-item');
         if ($r.length) {
             const $p = $r.closest('.comment');
             $r.remove();
             $p.find('.reply-count').text($p.find('.reply-item').length);
             updateNoComments();
         } else {
             $(this).closest('.comment').remove();
             updateNoComments();
         }
     });

     // Open/close reply box
     $(document).on('click', '.reply', function() {
         const $i = $(this).closest('.comment').find('.reply-input');
         $('.reply-input').not($i).slideUp(100);
         $i.slideToggle(160);
     });

     // Close the reply input when clicking outside the comment (if empty)
     $(document).on("click", function(e) {
         if (!$(e.target).closest(".reply, .reply-input, .send-reply").length) {
             $(".reply-input").each(function() {
                 const $input = $(this).find("input");
                 if ($input.val().trim() === "") {
                     $(this).slideUp(150);
                 }
             });
         }
     });

     // Submit a new reply
     $(document).on('click', '.send-reply', function() {
         const $comment = $(this).closest('.comment');
         const $input = $comment.find('.reply-input input');
         const txt = $input.val().trim();
         if (!txt) return;
         const rid = uid('r');
         const cid = uid('c');
         const replyHtml = `
                <div class="reply-item" data-rid="${rid}">
                  <div class="c-top">
                      <img class="c-avatar" src="https://i.pravatar.cc/44?u=${cid}" alt="">
                    <div>   
                    <div class="c-meta">
                       <div class="c-name"> you</div>
                      <span class="c-date">Now</span>
                    </div>
                    <p> ${txt}</p>
                    <div class="reply-actions ">
                        <div class="action like">
                            <svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.017 31.992c-9.088 0-9.158-0.377-10.284-1.224-0.597-0.449-1.723-0.76-5.838-1.028-0.298-0.020-0.583-0.134-0.773-0.365-0.087-0.107-2.143-3.105-2.143-7.907 0-4.732 1.472-6.89 1.534-6.99 0.182-0.293 0.503-0.47 0.847-0.47 3.378 0 8.062-4.313 11.21-11.841 0.544-1.302 0.657-2.159 2.657-2.159 1.137 0 2.413 0.815 3.042 1.86 1.291 2.135 0.636 6.721 0.029 9.171 2.063-0.017 5.796-0.045 7.572-0.045 2.471 0 4.107 1.473 4.156 3.627 0.017 0.711-0.077 1.619-0.282 2.089 0.544 0.543 1.245 1.36 1.276 2.414 0.038 1.36-0.852 2.395-1.421 2.989 0.131 0.395 0.391 0.92 0.366 1.547-0.063 1.542-1.253 2.535-1.994 3.054 0.061 0.422 0.11 1.218-0.026 1.834-0.535 2.457-4.137 3.443-9.928 3.443zM3.426 27.712c3.584 0.297 5.5 0.698 6.51 1.459 0.782 0.589 0.662 0.822 9.081 0.822 2.568 0 7.59-0.107 7.976-1.87 0.153-0.705-0.59-1.398-0.593-1.403-0.203-0.501 0.023-1.089 0.518-1.305 0.008-0.004 2.005-0.719 2.050-1.835 0.030-0.713-0.46-1.142-0.471-1.16-0.291-0.452-0.185-1.072 0.257-1.38 0.005-0.004 1.299-0.788 1.267-1.857-0.024-0.849-1.143-1.447-1.177-1.466-0.25-0.143-0.432-0.39-0.489-0.674-0.056-0.282 0.007-0.579 0.183-0.808 0 0 0.509-0.808 0.49-1.566-0.037-1.623-1.782-1.674-2.156-1.674-2.523 0-9.001 0.025-9.001 0.025-0.349 0.002-0.652-0.164-0.84-0.443s-0.201-0.627-0.092-0.944c0.977-2.813 1.523-7.228 0.616-8.736-0.267-0.445-0.328-0.889-1.328-0.889-0.139 0-0.468 0.11-0.812 0.929-3.341 7.995-8.332 12.62-12.421 13.037-0.353 0.804-1.016 2.47-1.016 5.493 0 3.085 0.977 5.473 1.447 6.245z"></path>
                            </svg>
                            <span class="count">0</span>
                        </div>
                        <div class="action dislike">
                            <svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.982 0.007c9.088 0 9.159 0.377 10.284 1.225 0.597 0.449 1.723 0.76 5.838 1.028 0.299 0.019 0.583 0.134 0.773 0.365 0.087 0.107 2.143 3.105 2.143 7.907 0 4.732-1.471 6.89-1.534 6.991-0.183 0.292-0.503 0.469-0.848 0.469-3.378 0-8.062 4.313-11.211 11.841-0.544 1.302-0.657 2.158-2.657 2.158-1.137 0-2.412-0.814-3.043-1.86-1.291-2.135-0.636-6.721-0.028-9.171-2.063 0.017-5.796 0.045-7.572 0.045-2.471 0-4.106-1.474-4.157-3.628-0.016-0.711 0.077-1.62 0.283-2.088-0.543-0.543-1.245-1.361-1.276-2.415-0.038-1.36 0.852-2.395 1.42-2.989-0.13-0.396-0.391-0.92-0.366-1.547 0.063-1.542 1.253-2.536 1.995-3.054-0.061-0.42-0.109-1.217 0.026-1.832 0.535-2.457 4.138-3.445 9.928-3.445zM28.575 4.289c-3.584-0.296-5.5-0.698-6.51-1.459-0.782-0.588-0.661-0.822-9.082-0.822-2.568 0-7.59 0.107-7.976 1.869-0.154 0.705 0.59 1.398 0.593 1.403 0.203 0.502-0.024 1.089-0.518 1.305-0.008 0.004-2.004 0.72-2.050 1.836-0.030 0.713 0.46 1.142 0.471 1.159 0.291 0.452 0.184 1.072-0.257 1.38-0.005 0.004-1.299 0.788-1.267 1.857 0.025 0.848 1.143 1.447 1.177 1.466 0.25 0.143 0.432 0.39 0.489 0.674 0.057 0.282-0.007 0.579-0.182 0.807 0 0-0.509 0.808-0.49 1.566 0.037 1.623 1.782 1.674 2.156 1.674 2.522 0 9.001-0.026 9.001-0.026 0.35-0.001 0.652 0.164 0.839 0.444s0.202 0.627 0.091 0.945c-0.976 2.814-1.522 7.227-0.616 8.735 0.267 0.445 0.328 0.889 1.328 0.889 0.139 0 0.468-0.11 0.812-0.93 3.343-7.994 8.334-12.619 12.423-13.036 0.352-0.804 1.015-2.47 1.015-5.493-0.001-3.085-0.979-5.472-1.449-6.245z"></path>
                            </svg>
                            <span class="count">0</span>
                        </div>
                        <div class="action delete">
                            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg> remove
                        </div>
                    </div>
                   </div>
                  </div>
                </div>`;
         $comment.find('.replies').append(replyHtml);
         const count = $comment.find('.reply-item').length;
         $comment.find('.reply-count').text(count);
         $input.val('');
         $comment.find('.reply-input').slideUp(150);
     });

     // Add a new comment
     $('#addCommentBtn').on('click', function() {
         const txt = $('#newCommentInput').val().trim();
         if (!txt) return;
         const cid = uid('c');
         const html = `
                    <div class="comment" data-cid="${cid}">
                        <div class="c-top">
                        <img class="c-avatar" src="https://i.pravatar.cc/44?u=${cid}" alt="">
                         <div class="actionsitems">
                          <div class="c-meta">
                            <div class="c-name"> you</div>
                            <span class="c-date">Now</span>
                         </div>
                         <p class="c-text">${txt}</p>
                         <div class="c-actions">
                                    <div class="action like">
                                        <svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.017 31.992c-9.088 0-9.158-0.377-10.284-1.224-0.597-0.449-1.723-0.76-5.838-1.028-0.298-0.020-0.583-0.134-0.773-0.365-0.087-0.107-2.143-3.105-2.143-7.907 0-4.732 1.472-6.89 1.534-6.99 0.182-0.293 0.503-0.47 0.847-0.47 3.378 0 8.062-4.313 11.21-11.841 0.544-1.302 0.657-2.159 2.657-2.159 1.137 0 2.413 0.815 3.042 1.86 1.291 2.135 0.636 6.721 0.029 9.171 2.063-0.017 5.796-0.045 7.572-0.045 2.471 0 4.107 1.473 4.156 3.627 0.017 0.711-0.077 1.619-0.282 2.089 0.544 0.543 1.245 1.36 1.276 2.414 0.038 1.36-0.852 2.395-1.421 2.989 0.131 0.395 0.391 0.92 0.366 1.547-0.063 1.542-1.253 2.535-1.994 3.054 0.061 0.422 0.11 1.218-0.026 1.834-0.535 2.457-4.137 3.443-9.928 3.443zM3.426 27.712c3.584 0.297 5.5 0.698 6.51 1.459 0.782 0.589 0.662 0.822 9.081 0.822 2.568 0 7.59-0.107 7.976-1.87 0.153-0.705-0.59-1.398-0.593-1.403-0.203-0.501 0.023-1.089 0.518-1.305 0.008-0.004 2.005-0.719 2.050-1.835 0.030-0.713-0.46-1.142-0.471-1.16-0.291-0.452-0.185-1.072 0.257-1.38 0.005-0.004 1.299-0.788 1.267-1.857-0.024-0.849-1.143-1.447-1.177-1.466-0.25-0.143-0.432-0.39-0.489-0.674-0.056-0.282 0.007-0.579 0.183-0.808 0 0 0.509-0.808 0.49-1.566-0.037-1.623-1.782-1.674-2.156-1.674-2.523 0-9.001 0.025-9.001 0.025-0.349 0.002-0.652-0.164-0.84-0.443s-0.201-0.627-0.092-0.944c0.977-2.813 1.523-7.228 0.616-8.736-0.267-0.445-0.328-0.889-1.328-0.889-0.139 0-0.468 0.11-0.812 0.929-3.341 7.995-8.332 12.62-12.421 13.037-0.353 0.804-1.016 2.47-1.016 5.493 0 3.085 0.977 5.473 1.447 6.245z"></path>
                                        </svg>
                                        <span class="count">1</span>
                                    </div>
                                    <div class="action dislike">
                                        <svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.982 0.007c9.088 0 9.159 0.377 10.284 1.225 0.597 0.449 1.723 0.76 5.838 1.028 0.299 0.019 0.583 0.134 0.773 0.365 0.087 0.107 2.143 3.105 2.143 7.907 0 4.732-1.471 6.89-1.534 6.991-0.183 0.292-0.503 0.469-0.848 0.469-3.378 0-8.062 4.313-11.211 11.841-0.544 1.302-0.657 2.158-2.657 2.158-1.137 0-2.412-0.814-3.043-1.86-1.291-2.135-0.636-6.721-0.028-9.171-2.063 0.017-5.796 0.045-7.572 0.045-2.471 0-4.106-1.474-4.157-3.628-0.016-0.711 0.077-1.62 0.283-2.088-0.543-0.543-1.245-1.361-1.276-2.415-0.038-1.36 0.852-2.395 1.42-2.989-0.13-0.396-0.391-0.92-0.366-1.547 0.063-1.542 1.253-2.536 1.995-3.054-0.061-0.42-0.109-1.217 0.026-1.832 0.535-2.457 4.138-3.445 9.928-3.445zM28.575 4.289c-3.584-0.296-5.5-0.698-6.51-1.459-0.782-0.588-0.661-0.822-9.082-0.822-2.568 0-7.59 0.107-7.976 1.869-0.154 0.705 0.59 1.398 0.593 1.403 0.203 0.502-0.024 1.089-0.518 1.305-0.008 0.004-2.004 0.72-2.050 1.836-0.030 0.713 0.46 1.142 0.471 1.159 0.291 0.452 0.184 1.072-0.257 1.38-0.005 0.004-1.299 0.788-1.267 1.857 0.025 0.848 1.143 1.447 1.177 1.466 0.25 0.143 0.432 0.39 0.489 0.674 0.057 0.282-0.007 0.579-0.182 0.807 0 0-0.509 0.808-0.49 1.566 0.037 1.623 1.782 1.674 2.156 1.674 2.522 0 9.001-0.026 9.001-0.026 0.35-0.001 0.652 0.164 0.839 0.444s0.202 0.627 0.091 0.945c-0.976 2.814-1.522 7.227-0.616 8.735 0.267 0.445 0.328 0.889 1.328 0.889 0.139 0 0.468-0.11 0.812-0.93 3.343-7.994 8.334-12.619 12.423-13.036 0.352-0.804 1.015-2.47 1.015-5.493-0.001-3.085-0.979-5.472-1.449-6.245z"></path>
                                        </svg>
                                        <span class="count">0</span>
                                    </div>
                                    <div class="action reply">
                                        <svg fill="#000000" width="800px" height="800px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M835.942 632.563H244.966l478.08-478.08-90.496-90.496L-.026 696.563 632.55 1329.14l90.496-90.496-478.08-478.08h590.976c504.448 0 914.816 410.368 914.816 914.816v109.184h128V1675.38c0-574.976-467.84-1042.816-1042.816-1042.816" fill-rule="evenodd"/>
                                        </svg> Reply
                                        <small class="reply-count">1</small>
                                    </div>
                                    <div class="action delete">
                                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg> remove
                                    </div>
                                </div>
                         <div class="reply-input" style="display:none">
                         <input class="form-control"  placeholder="Write your response..." />
                         <button class="bottom send-reply">
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.56 122.88"><title>sent</title><path d="M112.27,10.31l-99,38.07,30,14.37L89.21,33.18,60.44,80.53l14,29.06,37.81-99.28ZM2.42,44.49,117.16.37a3.73,3.73,0,0,1,3-.12,3.78,3.78,0,0,1,2.19,4.87L78.4,120.45a3.78,3.78,0,0,1-6.92.3l-22.67-47L2.14,51.39a3.76,3.76,0,0,1,.28-6.9Z"></path></svg>
                         </button>
                           </div>
                            <div class="replies"></div>
                        </div>
                       
                    </div>`;
         $comments.prepend(html);
         $('#newCommentInput').val('');
         updateNoComments();
     });

     $('#copy').click(() => {
         const $inp = $('#link');
         $inp.select();
         navigator.clipboard.writeText($inp.val());
     });

     $('.clickchat, .x-icon').click(function() {
         $('.hidecomant').fadeToggle();
     });

 });