const jsdom = require("jsdom").JSDOM;
const fs = require("fs");
const axios = require("axios");
const md5 = require("md5");

const TAINHAC123_HOME = "https://tainhac123.com";

async function search(text) {
    text = text == undefined || text == "" ? "" : "/tim-kiem/" + encodeURIComponent(text);
    try {
        const { document } = await (await jsdom.fromURL(TAINHAC123_HOME + text)).window;
        let songs = document.getElementsByClassName("menu");
        let data = [...songs].map(function (song) {
            let nodeNameSong = song.getElementsByTagName("a")[1];
            let nodeSingle = song.querySelector("b[class='single']");
            let nodeImageSong = song.querySelector("img");
            return {
                name: nodeNameSong?.innerHTML,
                detail: nodeNameSong?.getAttribute("href").replaceAll(TAINHAC123_HOME, ""),
                singer: nodeSingle?.innerHTML,
                image: nodeImageSong?.getAttribute("src")
            };
        });
        return data;
    } catch (e) {
        throw e;
    }
}

async function detail(path) {
    try {
        const { document } = await (await jsdom.fromURL(TAINHAC123_HOME + path)).window;
        let nodeImage = document.getElementById("disco").querySelector("img");
        let nodeName = document.getElementsByClassName("bh-info")[0].querySelector("h2");
        let nodeAudio = document.getElementById("audio-player-container");
        let nodeLyrics = document.getElementById("lyric");
        return {
            name: nodeName?.innerHTML,
            image: nodeImage?.getAttribute("src"),
            download: nodeAudio?.getAttribute("data-src").replaceAll(TAINHAC123_HOME, ""),
            lyric: nodeLyrics.getAttribute("data-lyric")
        };
    } catch (e) {
        throw e;
    }
}

async function download(path) {
    try {
        const dl = await axios({
            url: TAINHAC123_HOME + path,
            method: "GET",
            responseType: "stream"
        });
        let currentTime = new Date().getTime();
        let name = path + "BOTHIENDEPTRAI";
        let filename = md5(currentTime + name) + ".mp3";
        await dl.data.pipe(fs.createWriteStream(process.env.UPLOAD_DIR + "\\" + filename));
        return {
            path: "/api/v1/file/" + filename
        };
    } catch (e) {
        throw e;
    }
}

module.exports.search = search;
module.exports.detail = detail;
module.exports.download = download;
