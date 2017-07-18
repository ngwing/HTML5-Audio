function initPlayer(playerControl) {
    var music = playerControl.find('#music')[0]; // id for audio element
    music.load()
    var duration; // Duration of audio clip
    var pButton = $(playerControl).find('#pButton')[0]; // play button
    var playhead = $(playerControl).find('#playhead')[0]; // playhead
    var progress = $(playerControl).find('#progress')[0]; // playhead
    var timeline = $(playerControl).find('#timeline')[0]; // timeline
    var timeLabel = $(playerControl).find('#time')[0]; // timeline
    var durationLabel = $(playerControl).find('#duration')[0]; // timeline


// timeline width adjusted for playhead
    var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
    var thumbWidth = Math.round(screen.width * 0.04)
    var thumbHeight = Math.round(screen.width * 0.06)
    playhead.style.width = thumbWidth + "px"
    playhead.style.height = thumbHeight + "px"

// play button event listenter
    pButton.addEventListener("click", play);

// timeupdate event listener
    music.addEventListener("timeupdate", timeUpdate, false);

// makes timeline clickable
    timeline.addEventListener("click", function (event) {
        moveplayhead(event);
        music.currentTime = duration * clickPercent(event);
    }, false);

// makes playhead draggable
    playhead.addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);

// returns click as decimal (.77) of the total timelineWidth
    function clickPercent(event) {
        return (event.clientX - getPosition(timeline)) / timelineWidth;

    }


// Boolean value so that audio position is updated only when the playhead is released
    var onplayhead = false;

// mouseDown EventListener
    function mouseDown() {
        onplayhead = true;
        window.addEventListener('mousemove', moveplayhead, true);
        music.removeEventListener('timeupdate', timeUpdate, false);
    }

// mouseUp EventListener
// getting input from all mouse clicks
    function mouseUp(event) {
        if (onplayhead == true) {
            moveplayhead(event);
            window.removeEventListener('mousemove', moveplayhead, true);
            // change current time
            music.currentTime = duration * clickPercent(event);
            music.addEventListener('timeupdate', timeUpdate, false);
        }
        onplayhead = false;
    }

// mousemove EventListener
// Moves playhead as user drags
    function moveplayhead(event) {
        var newMargLeft = event.clientX - getPosition(timeline);

        if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
            playhead.style.marginLeft = newMargLeft + "vw";
            progress.style.width = newMargLeft + "px";
        }
        if (newMargLeft < 0) {
            playhead.style.marginLeft = "0px";
            progress.style.width = "0px";
        }
        if (newMargLeft > timelineWidth) {
            playhead.style.marginLeft = timelineWidth + "vw";
            progress.style.width = timelineWidth + "px";
        }
    }

// timeUpdate
// Synchronizes playhead position with current point in audio

    // var shouldUpdate = 0

    function timeUpdate() {
        // if (shouldUpdate++ != 0) {
        //     if (shouldUpdate == 3)
        //         shouldUpdate = 0
        //     return
        // }
        var ratio = music.currentTime / duration;
        var playedWidth = timelineWidth * ratio;

        timeLabel.textContent = formatSeconds(music.currentTime);

        playhead.style.marginLeft = playedWidth + "px";

        progress.style.width = playedWidth + "px";
        if (music.currentTime == duration) {
            pButton.className = "";
            pButton.className = "play";
        }
    }

    Number.prototype.formatTime = function () {
        // 计算
        var h = 0, i = 0, s = parseInt(this);
        if (s > 60) {
            i = parseInt(s / 60);
            s = parseInt(s % 60);
            if (i > 60) {
                h = parseInt(i / 60);
                i = parseInt(i % 60);
            }
        }
        // 补零
        var zero = function (v) {
            return (v >> 0) < 10 ? "0" + v : v;
        };
        if (h == 0)
            return [zero(i), zero(s)].join(":");
        return [zero(h), zero(i), zero(s)].join(":");
    };

    function formatSeconds(value) {
//        var theTime = parseInt(value);// 秒
//        var theTime1 = 0;// 分
//        var theTime2 = 0;// 小时
//        if(theTime > 60) {
//            theTime1 = parseInt(theTime/60);
//            theTime = parseInt(theTime%60);
//                if(theTime1 > 60) {
//                theTime2 = parseInt(theTime1/60);
//                theTime1 = parseInt(theTime1%60);
//                }
//        }
//            var result = ""+parseInt(theTime)+"";
//            if(theTime1 > 0) {
//            result = ""+parseInt(theTime1)+"分"+result;
//            }
//            if(theTime2 > 0) {
//            result = ""+parseInt(theTime2)+"小时"+result;
//            }
//        return result;
        return Number(value).formatTime()
    }

//Play and Pause
    function play() {
        // start music
        if (music.paused) {
            music.play();
            // remove play, add pause
            pButton.className = "";
            pButton.className = "pause";
        } else { // pause music
            music.pause();
            // remove pause, add play
            pButton.className = "";
            pButton.className = "play";
        }
    }

// Gets audio file duration
    music.addEventListener("canplaythrough", function () {
        duration = music.duration;
        durationLabel.textContent = formatSeconds(duration);
    }, false);

// getPosition
// Returns elements left position relative to top-left of viewport
    function getPosition(el) {
        return el.getBoundingClientRect().left;
    }
}


/* DOMContentLoaded*/

