// Show status in DOM
let playlistCleaner = document.createElement('div');
playlistCleaner.setAttribute('id', 'playlist-cleaner');
playlistCleaner.style.backgroundColor = 'rgba(255,255,255,0.1)';
playlistCleaner.style.borderRadius = '25px';
playlistCleaner.style.color = 'white';
playlistCleaner.style.fontFamily = '"Roboto", "Arial", sans-serif';
playlistCleaner.style.fontSize = '14px';
playlistCleaner.style.fontWeight = 500;
playlistCleaner.style.lineHeight = '20px';
playlistCleaner.style.padding = '15px';
playlistCleaner.style.marginTop = '15px';
playlistCleaner.style.display = 'flex';
playlistCleaner.style.flexDirection = 'column';
playlistCleaner.style.gap = '10px';

let title = document.createElement('h2');
title.setAttribute('id', 'title');
playlistCleaner.append(title);
title.textContent = 'YouTube Playlist Cleaner';
title.style.fontSize = '18px';
title.style.fontWeight = 700;
title.style.textAlign = 'center';

let search = document.createElement('div');
search.setAttribute('id', 'search');
playlistCleaner.append(search);
search.style.textAlign = 'center';

let input = document.createElement('input');
input.setAttribute('id', 'input');
search.append(input);
input.placeholder='Enter Channel Name';

let button = document.createElement('button');
button.setAttribute('id', 'button');
search.append(button);
button.textContent = 'Find & Remove';

let stats = document.createElement('div');
stats.setAttribute('id', 'stats');
playlistCleaner.append(stats);
stats.style.display = 'flex';
stats.style.justifyContent = 'space-around';

let loaded = document.createElement('span');
loaded.setAttribute('id', 'loaded');
stats.append(loaded);

let matches = document.createElement('span');
matches.setAttribute('id', 'matches');
stats.append(matches);

let removed = document.createElement('span');
removed.setAttribute('id', 'removed');
stats.append(removed);

let progressBar = document.createElement('div');
progressBar.setAttribute('id', 'progress-bar');
playlistCleaner.append(progressBar);
progressBar.style.height = '4px';
progressBar.style.backgroundColor = 'rgba(255,255,255,0.1)';

let progress = document.createElement('div');
progress.setAttribute('id', 'progress');
progressBar.append(progress);
progress.style.height = '100%';
progress.style.width = 0;
progress.style.backgroundColor = 'rgba(255,255,255,1)';
progress.style.transition = 'width 0.25s linear';

let videoList = document.createElement('ul');
videoList.setAttribute('id', 'video-list');
playlistCleaner.append(videoList);

let entryPoint = document.getElementsByClassName('metadata-wrapper')[0];
entryPoint.append(playlistCleaner);

let channelName = '';

// On key down, if enter key is pressed, click the button
input.onkeydown = function(e){
	if (e.key === 'Enter') {
		button.click();
	}
}

// On button click, invoke the removeVideosFromChannel function
button.onclick = function(){
	channelName = input.value;
	if (channelName === '') {
		alert('Please enter the name of a YouTube Channel to remove their videos from this Playlist.');
		return;
	}
	removeVideosFromChannel(channelName);
}

// Accepts a string representing the name of a YouTube Channel
let removeVideosFromChannel = async (channelName) => {
	// Find all of the videos by the YouTube Channel in the Watch Later playlist
	let allVideos = document.querySelectorAll('div#contents.ytd-playlist-video-list-renderer > ytd-playlist-video-renderer');
	// Update the status in the DOM
	loaded.innerHTML = `Loaded: ${allVideos.length}`;
	// Find only the videos that match the user input
	let matchingVideos = Array.from(allVideos).filter(video => video.querySelector('.ytd-channel-name > a').innerText === channelName);
	// Update the status in the DOM
	matches.innerHTML = `Matches: ${matchingVideos.length}`;
	// If no matching videos are found, return
	if (matchingVideos.length === 0) {
		alert(`No videos by ${channelName} were found in the Watch Later playlist.`);
		return;
	}
	let removedCount = 0;
	removed.innerHTML = 'Removed: 0';
	videoList.innerHTML = '';
	// Iterate over each video
	for (video of matchingVideos) {
		// Scroll the video into view
		video.scrollIntoView({behavior: 'instant', block: 'center', inline: 'center'});
		// Add the current video to the list
		let videoTitle = video.querySelector('a#video-title').innerText;
		let listItem = document.createElement('li');
		listItem.textContent = videoTitle;
		videoList.append(listItem);
		// Click the Action Menu button
		const actionMenuButton = video.querySelector('.dropdown-trigger #button');
		actionMenuButton.click();
		// Wait for one second
		await new Promise(resolve => setTimeout(resolve, 500));
		// Click the Remove button
		const removeButton = document.querySelectorAll('ytd-menu-service-item-renderer.ytd-menu-popup-renderer');
		removeButton[2].click();
		// Update the count of removed videos
		removedCount++;
		removed.innerHTML = `Removed: ${removedCount}`;
		// Update the progress bar
		progress.style.width = `${(removedCount / matchingVideos.length) * 100}%`;
		// Wait for one second
		await new Promise(resolve => setTimeout(resolve, 1000));
	}
	alert(`${removedCount} videos by ${channelName} were removed from the Watch Later playlist.`);
};