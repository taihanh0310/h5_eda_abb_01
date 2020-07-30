$(document).ready(function () {
    main.run();
});

//create namespace
var dragElement, dragClone;
var flag_1 = 0, flag_2 = 0;
var main = {
    
    demoDragDrop: function () {
        $(".drag_icon").draggable({
            revert: "invalid" ,
            cursor: "move",
            start : function() {
                // console.log($(this).position())
                dragClone = $(this).clone();
                dragElement = $(this);
            },
            drag: function(){
                // console.log($(this).position())
            },
            stop: function(){
    
            }
        });
        $(".drop_zone_1").droppable({
            accept:'.drag_icon_1',
            drop: function (event, ui) {                
                // remove arrow
                $('.arrow_1').fadeOut(300);
                flag_1 =1;
                main.changeBg(); // hanh added

                // play music 
                main.handleMusicPlay("#music-right-swipe", 0);
                main.handleMusicPlay("#music-left-swipe", 1);
                //append drag icon to drop area n make it active
                $(this)
                    .append(dragClone)
                    .droppable( "option", "disabled", true )
                    .css('z-index', 1)
                dragElement.remove();
                dragClone.addClass('active');
            }
        });
        $(".drop_zone_2").droppable({
            accept:'.drag_icon_2',
            drop: function (event, ui) {
                // remove arrow
                $('.arrow_2').fadeOut(300);
                $('.line_bg').addClass('line_2');
                flag_2 = 1;
                main.changeBg(); // hanh added
                // play music 
                main.handleMusicPlay("#music-left-swipe", 0);
                main.handleMusicPlay("#music-right-swipe", 1);
                //append drag icon to drop area n make it active
                $(this)
                    .append(dragClone)
                    .droppable( "option", "disabled", true )
                    .css('z-index', 1)
                dragElement.remove();
                dragClone.addClass('active');
            }
        })
    },
    changeBg: function(){
        console.log("flag_2", flag_2);
        console.log("flag_1", flag_1);
        if(flag_2 == 1 && flag_1 ==1 ){
            $('.line_bg').addClass('line_3');
            return;
        }
        if(flag_2 == 1 && flag_1 !=1 ){
            $('.line_bg').addClass('line_2');
            return;
        }
        
    },
    /**
     * 
     * @param {*} element 
     * @param {*} flag = 1: play : 0: pause
     */
    handleMusicPlay: function(element, flag){
        var music = $(element)[0];
        if(flag == 1){
            music.play();
            music.currentTime = 0;
        }
        else{
            music.pause();
            music.currentTime = 0;
        }
    },
    setup: function () {
        this.demoDragDrop();
        this.changeBg();
    },
    run: function () {
        this.setup();
    }
};