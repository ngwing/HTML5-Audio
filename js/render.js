function getPlayerHtml(url) {
    var playerContrlHtml = "\n" +
        "<div class = \"audio_control\">\n" +
        "    <!--HTML5 audio-->\n" +
        "    <audio id=\"music\" preload=\"true\">\n" +
        "        <source id=\"music_source\" src=\"" + url + "\"/>\n" +
        "    </audio>\n" +
        "\n" +
        "    <div id=\"wrapper\">\n" +
        "        <!--Audio Player Interface-->\n" +
        "        <div id=\"audioplayer\">\n" +
        "            <button id=\"pButton\" class=\"play\"></button>\n" +
        "            <div id=\"timeline\">\n" +
        "                <div id=\"progress_bg\"></div>\n" +
        "                <div id=\"progress\"></div>\n" +
        "                <label id=\"time\">0:00</label>\n" +
        "                <label id=\"duration\">0:00</label>\n" +
        "            </div>\n" +
        "\n" +
        "            <div id=\"thumb_line\">\n" +
        "                <div id=\"playhead\" class=\"thumb\"></div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "</div>"

    return playerContrlHtml
}

$.when($.ready).then(function () {
    $("div.audio").each(function (index) {
        var url = $(this).children("audio.data").prop("src");

        var indexOfSplit = url.indexOf('[')
        url = url.substring(0, indexOfSplit)
        $(this).append(getPlayerHtml(url))
        var audio_control = $(this).children("div.audio_control");
        initPlayer(audio_control)
    });
});