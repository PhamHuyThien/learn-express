$(document).ready(loadSongs);

function loadSongs() {
	$.get({
		url: "/api/v1/song/",
		headers: {
			authorization: "Bearer " + localStorage.getItem("token")
		},
		dataType: "json"
	}).then(function (data) {
		$("#playlist").empty();
		let songs = data.data.map(function (s, i) {
			addToPlayList(s, i);
			return {
				name: s.name,
				artist: s.singer,
				album: "PhamHuyThien",
				url: s.path,
				cover_art_url: s.image
			};
		});
		amplitudeInit(songs);
	}).catch(function (err) {
		console.log(err);
	});
}

function amplitudeInit(songs) {
	Amplitude.init({
		"songs": songs
	});
}

function addToPlayList(s, index) {
	let name = s.name.length > 22 ? s.name.substr(0, 22) + "..." : s.name;
	let song = `<div class="white-player-playlist-song">
		<img src="${s.image}" />
		<div class="row">
			<div class="col playlist-song-meta amplitude-song-container amplitude-play-pause" data-amplitude-song-index="${index}">
				<span class="playlist-song-name">${name}</span>
				<span class="playlist-artist-album">${s.singer}</span>
			</div>
		<div class="col text-right">
		<button type="submit" class="btn btn-primary btn-sm mt-2" onclick="removeSongFavorite('${s._id}')">❌</button>
		</div>
		</div>
		</div>`;
	$("#playlist").append(song);
}

function removeSongFavorite(_id) {
	swConfirm({
		title: "Xóa khỏi danh sách yêu thích",
		text: "Bạn muốn xóa khỏi danh sách yêu thích chứ?",
		icon: "question"
	}, function () {
		$.ajax({
			url: "/api/v1/song/" + _id,
			method: "delete",
			headers: {
				authorization: "Bearer " + localStorage.token
			},
			dataType: "json"
		}).done(function () {
			loadSongs();
			Toast.fire({
				icon: 'success',
				title: "Xóa khỏi playlist thành công."
			});
		}).fail(function () {
			Toast.fire({
				icon: 'error',
				title: "Có lỗi xảy ra, hãy thử lại."
			});
		});
	});
}
/*
  Shows the playlist
*/
document.getElementsByClassName('show-playlist')[0].addEventListener('click', function () {
	document.getElementById('white-player-playlist-container').classList.remove('slide-out-top');
	document.getElementById('white-player-playlist-container').classList.add('slide-in-top');
	document.getElementById('white-player-playlist-container').style.display = "block";
});

/*
  Hides the playlist
*/
document.getElementsByClassName('close-playlist')[0].addEventListener('click', function () {
	document.getElementById('white-player-playlist-container').classList.remove('slide-in-top');
	document.getElementById('white-player-playlist-container').classList.add('slide-out-top');
	document.getElementById('white-player-playlist-container').style.display = "none";
});

/*
  Gets all of the add to playlist buttons so we can
  add some event listeners to actually add to playlist.
*/
var addToPlaylistButtons = document.getElementsByClassName('add-to-playlist-button');

for (var i = 0; i < addToPlaylistButtons.length; i++) {
	/*
	  Add an event listener to the add to playlist button.
	*/
	addToPlaylistButtons[i].addEventListener('click', function () {
		var songToAddIndex = this.getAttribute('song-to-add');

		/*
		  Adds the song to Amplitude, appends the song to the display,
		  then rebinds all of the AmplitudeJS elements.
		*/
		var newIndex = Amplitude.addSong(songsToAdd[songToAddIndex]);
		appendToSongDisplay(songsToAdd[songToAddIndex], newIndex);
		Amplitude.bindNewElements();

		/*
		  Removes the container that contained the add to playlist button.
		*/
		var songToAddRemove = document.querySelector('.song-to-add[song-to-add="' + songToAddIndex + '"]');
		songToAddRemove.parentNode.removeChild(songToAddRemove);
	});
}

/*
  Appends the song to the display.
*/
function appendToSongDisplay(song, index) {
	/*
	  Grabs the playlist element we will be appending to.
	*/
	var playlistElement = document.querySelector('.white-player-playlist');

	/*
	  Creates the playlist song element
	*/
	var playlistSong = document.createElement('div');
	playlistSong.setAttribute('class', 'white-player-playlist-song amplitude-song-container amplitude-play-pause');
	playlistSong.setAttribute('data-amplitude-song-index', index);

	/*
	  Creates the playlist song image element
	*/
	var playlistSongImg = document.createElement('img');
	playlistSongImg.setAttribute('src', song.cover_art_url);

	/*
	  Creates the playlist song meta element
	*/
	var playlistSongMeta = document.createElement('div');
	playlistSongMeta.setAttribute('class', 'playlist-song-meta');

	/*
	  Creates the playlist song name element
	*/
	var playlistSongName = document.createElement('span');
	playlistSongName.setAttribute('class', 'playlist-song-name');
	playlistSongName.innerHTML = song.name;

	/*
	  Creates the playlist song artist album element
	*/
	var playlistSongArtistAlbum = document.createElement('span');
	playlistSongArtistAlbum.setAttribute('class', 'playlist-song-artist');
	playlistSongArtistAlbum.innerHTML = song.artist + ' &bull; ' + song.album;

	/*
	  Appends the name and artist album to the playlist song meta.
	*/
	playlistSongMeta.appendChild(playlistSongName);
	playlistSongMeta.appendChild(playlistSongArtistAlbum);

	/*
	  Appends the song image and meta to the song element
	*/
	playlistSong.appendChild(playlistSongImg);
	playlistSong.appendChild(playlistSongMeta);

	/*
	  Appends the song element to the playlist
	*/
	playlistElement.appendChild(playlistSong);
}
