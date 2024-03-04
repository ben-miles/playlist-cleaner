let channelName = prompt('Enter the name of a YouTube Channel to remove their videos from this Playlist.');

// Accepts a string representing the name of a YouTube Channel
let removeVideosFromChannel = async (channelName) => {
	// Find all of the videos by the YouTube Channel in the Watch Later playlist
	let videos_shown = document.querySelectorAll('div#contents.ytd-playlist-video-list-renderer > ytd-playlist-video-renderer');
	// let matching_videos = Array.from(videos_shown).filter(video => video.querySelector('.ytd-channel-name > a').innerText === channelName);
	// If no videos are found, return
	if (videos_shown.length === 0) {
		alert(`No videos by ${channelName} were found in the Watch Later playlist.`);
		return;
	}
	console.log(`${videos_shown.length} videos loaded -- Scanning for videos by ${channelName}...`);
	// Iterate over each video
	let i = 0;
	for (video of videos_shown) {
		// Check if the video belongs to the specified channel
		if (video.querySelector('.ytd-channel-name > a').innerText === channelName) {
			i++;
			let videoTitle = video.querySelector('a#video-title').innerText;
			console.info(`${channelName} - #${i} - ${videoTitle}`);
			// Click the corresponding Remove button
			const actionMenuButton = video.querySelector('.dropdown-trigger #button');
			actionMenuButton.click();
			// Wait for one second before continuing
			await new Promise(resolve => setTimeout(resolve, 1000));
			const removeButton = document.querySelectorAll('ytd-menu-service-item-renderer.ytd-menu-popup-renderer');
			removeButton[2].click();
			console.info(`Removed.`)
			// Wait for one second before continuing
			await new Promise(resolve => setTimeout(resolve, 1000));
		}
	}
	alert(`${i} videos by ${channelName} were removed from the Watch Later playlist.`);
};
removeVideosFromChannel(channelName);

// Scroll to the bottom of the page
// function scrollToBottom() {
// 	window.scrollTo(0, document.body.scrollHeight);
// }
