$(document).ready(function () {
    main.run();
});

//create namespace
var main = {
    demoDragDrop: function () {
        $("#draggable").draggable();
        $("#droppable").droppable({
            drop: function (event, ui) {
                $(this)
                    .addClass("ui-state-highlight")
                    .find("p")
                    .html("Dropped!");
                var musicStart = $("#music-start")[0];
                musicStart.play();
            }
        });
    },
    handleMusicDemo: function(){
        
        $("#handle-music").on('click', function(e){
            e.preventDefault();
            var musicStart = $("#music-start")[0];
            musicStart.pause();
            musicStart.currentTime = 0;
        });
    },
    setup: function () {
        this.demoDragDrop();
        this.handleMusicDemo();
    },
    run: function () {
        this.setup();
    }
};