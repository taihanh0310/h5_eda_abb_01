$(document).ready(function () {
    main.run();
});

//create namespace
var dragElement, dragClone;
var flag_1 = 0, flag_2 = 0;
var main = {

    demoDragDrop: function () {
        $(".drag_icon_1").draggable({
            revert: "invalid",
            cursor: "move",
            start: function () {
                console.log($(this).position())
                dragClone = $(this).clone();
                dragElement = $(this);
            },
            drag: function () {
                console.log($(this).position())
            },
            stop: function () {
                console.log("stop drag");
            }
        });

        $(".drag_icon_2").draggable({
            revert: "invalid",
            cursor: "move",
            start: function () {
                console.log($(this).position())
                dragClone = $(this).clone();
                dragElement = $(this);
            },
            drag: function () {
                console.log($(this).position())
            },
            stop: function () {
                console.log("stop drag");
            }
        });

        $(".drop_zone_1").droppable({
            accept: '.drag_icon_1',
            drop: function (event, ui) {
                // remove arrow
                $('.arrow_1').fadeOut(300);
                flag_2 = 1;
                main.changeBg(); // hanh added

                // play music 
                main.handleMusicPlay(flag_1, flag_2);
                //append drag icon to drop area n make it active
                $(this)
                    .append(dragClone)
                    .droppable("option", "disabled", true)
                    .css('z-index', 1)
                dragElement.remove();
                dragClone.addClass('active');
            }
        });
        $(".drop_zone_2").droppable({
            accept: '.drag_icon_2',
            drop: function (event, ui) {
                // remove arrow
                $('.arrow_2').fadeOut(300);
                $('.line_bg').addClass('line_2');
                flag_1 = 1;
                main.changeBg(); // hanh added
                // play music 
                main.handleMusicPlay(flag_1, flag_2);
                //append drag icon to drop area n make it active
                $(this)
                    .append(dragClone)
                    .droppable("option", "disabled", true)
                    .css('z-index', 1)
                dragElement.remove();
                dragClone.addClass('active');
            }
        })
    },
    changeBg: function () {
        if (flag_2 == 1 && flag_1 == 1) {
            $('.line_bg').addClass('line_3');
            return;
        }
        if (flag_2 == 1 && flag_1 != 1) {
            $('.line_bg').addClass('line_2');
            return;
        }
    },
    changeFinalBackground: function () {
        $("#next-slide").on('click', function () {
            $('.line_bg').addClass('final_screen');

            main.stopMusicPlaying("#music-right-swipe");
            main.stopMusicPlaying("#music-left-swipe");
            $(".curve_bg").remove();
            $("#play-music").remove();
            $(this).hide();
            return;
        });
    },
    /**
     * 
     * @param {*} element 
     * @param {*} flag = 1: play : 0: pause
     */
    handleMusicPlay: function (flag1, flag2) {
        var music_swipe = $("#music-right-swipe")[0];
        var music_both_swipe = $("#music-left-swipe")[0];

        music_swipe.pause();
        music_swipe.currentTime = 0;
        music_both_swipe.pause();
        music_both_swipe.currentTime = 0;

        main.stopMusicPlaying("#music-start"); // stop music begin play

        if (flag1 == 1 && flag2 == 1) {
            music_both_swipe.play();
            music_both_swipe.currentTime = 0;
            $("#next-slide").show();
        }
        else {
            music_swipe.play();
            music_swipe.currentTime = 0;
            $("#next-slide").hide();
        }
    },
    handleButtonPressPlay: function () {
        $("#play-music").on('click', function () {
            var music = $("#music-start")[0];
            music.play();
            music.currentTime = 0;
        });

    },
    stopMusicPlaying: function (element) {
        var music = $(element)[0];
        music.pause();
        music.currentTime = 0;
    },
    setup: function () {
        this.demoDragDrop();
        this.changeBg();
        this.changeFinalBackground();
        this.handleButtonPressPlay();
    },
    run: function () {
        this.setup();
    }
};