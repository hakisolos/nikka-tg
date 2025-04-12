/** @format */

const ytSearch = require('yt-search');
const axios = require('axios');
const { command, getJson } = require('../lib/plugins');

command(
	{
		pattern: 'tiktok',
		desc: 'TikTok video downloader',
		type: 'downloader',
	},
	async (message, match) => {
		if (!match) return await message.send('Please provide a TikTok URL.');

		const tiktokRegex =
			/^(https?:\/\/)?(www\.)?(tiktok\.com\/|vm\.tiktok\.com\/).+/;
		if (!tiktokRegex.test(match.trim()))
			return await message.send('Invalid TikTok URL provided.');

		try {
			const apiUrl = `https://nikka-api.vercel.app/dl/tiktok?apiKey=nikka&url=${encodeURIComponent(
				match.trim()
			)}`;
			const response = await axios.get(apiUrl);

			if (!response.data || !response.data.data)
				throw new Error('Failed to fetch video data.');

			const videoUrl = response.data.data;

			await message.sendVideo(videoUrl);
		} catch (error) {
			await message.send('❌ Failed to download video.');
		}
	}
);

command(
	{
		pattern: 'play',
		desc: 'play something',
		type: 'downloader',
	},
	async (message, match) => {
		try {
			let query = match;
			if (!query) return message.send('query needed');
			const apiUrl = `https://nikka-api.vercel.app/dl/ytdl?q=${query}`;
			const response = await axios.get(apiUrl);
			const res = response.data;
			const aud = res.data;
			await message.sendAudio(aud);
		} catch (e) {
			message.send(e);
		}
	}
);
