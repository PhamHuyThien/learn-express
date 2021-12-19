
const jsdom = require("jsdom").JSDOM;
const fs = require("fs");
const axios = require("axios");
const md5 = require("md5");

const TRANGTAINHAC_HOME = "https://trangtainhac.mobi";

async function search(text) {
    text = text == undefined || text == "" ? "" : "/nhac-hay/tim-kiem/bai-hat.html?q=" + encodeURIComponent(text);
    try {
        const { document } = await (await jsdom.fromURL(TRANGTAINHAC_HOME + text)).window;
        let songs = document.getElementsByClassName("i");
        let data = [...songs].map(function (song) {
            let nodeNameSong, nodeSingle;
            if (text == "") {
                nodeNameSong = song.querySelector("a");
                nodeSingle = song.querySelector("font[color='#707070']");
            } else {
                nodeNameSong = song.querySelector("a");
                nodeSingle = song.querySelector("p");
            }
            return {
                name: nodeNameSong?.innerHTML,
                detail: TRANGTAINHAC_HOME + nodeNameSong?.getAttribute("href"),
                singer: nodeSingle?.innerHTML.replaceAll("Thể hiện: ", ""),
                image: "https://cdn-img.thethao247.vn/upload/kienlv/2020/09/11/tuyen-thu-dt-viet-nam-cong-khai-ban-gai-xinh-nhu-mong1599795990.png"
            };
        });
        return data;
    } catch (e) {
        throw e;
    }
}

async function detail(path) {
    try {
        const { document } = await (await jsdom.fromURL(path)).window;
        let nodeName = document.getElementsByTagName("h1")[0];
        let nodeAudio = document.getElementsByTagName("source")[0];
        let nodeLyrics = document.querySelector("p[class='lr']");
        return {
            name: nodeName?.innerHTML
                .replaceAll("Tải bài Hát", "")
                .replaceAll(" MP3", ""),
            image: "https://cdn-img.thethao247.vn/upload/kienlv/2020/09/11/tuyen-thu-dt-viet-nam-cong-khai-ban-gai-xinh-nhu-mong1599795990.png",
            download: nodeAudio?.getAttribute("src"),
            lyric: nodeLyrics.outerHTML
                .replaceAll("<br>", "")
                .replaceAll("</p>", "")
                .replaceAll("  ", " ")
                .replaceAll('<p class="lr">', "")
        };
    } catch (e) {
        throw e;
    }
}

async function download(path) {
    try {
        const dl = await axios({
            url: path,
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