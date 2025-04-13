/** @format */

const { command } = require('../lib');
const crypto = require('crypto');
const admins = ['H4KI_XER'];
const fetch = require('node-fetch'); // Make sure you have node-fetch installed!
const apikey1 = 'ptla_Y3sUTC6fXmYGeQb5lpCETTJfum4tvUECffVFqDqBOvv';
const domain1 = 'https://yazxvvip.panelispriv.biz.id';
const capikey1 = 'ptlc_AOjmGMYkJ7ocjacCZPhP3aUETSQ9lY6diYz6GBVYh77';
const nestid1 = 5;
const egg1 = 15;
const loc1 = 1;
command(
	{
		pattern: 'listserver', // Add your desired pattern here
		desc: 'Lists all servers from the Pterodactyl panel',
		type: 'panel', // Example type
	},
	async (message, match) => {
		let allServers = [];
		let page = 1;
		let totalPages = 1;

		if (!admins.includes(message.userName)) {
			return message.send('no permission');
		}
		try {
			// Loop through all pages
			do {
				const response = await fetch(
					`https://yazxvvip.panelispriv.biz.id/api/application/servers?page=${page}`,
					{
						method: 'GET',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + apikey1,
						},
					}
				);

				const res = await response.json();

				if (!res.data) break;

				allServers.push(...res.data);
				totalPages = res.meta?.pagination?.total_pages || 1;
				page++;
			} while (page <= totalPages);

			if (allServers.length === 0) return message.reply('No Bot Servers Found');

			let messageText = '\n*#- List of Pterodactyl Panel Servers*\n';

			for (const server of allServers) {
				const s = server.attributes;

				const f3 = await fetch(
					`${domain1}/api/client/servers/${s.uuid.split('-')[0]}/resources`,
					{
						method: 'GET',
						headers: {
							Accept: 'application/json',
							Authorization: 'Bearer ' + capikey1,
						},
					}
				);

				const data = await f3.json();

				const ram = s.limits.memory
					? `${(s.limits.memory / 1024).toFixed(1)} GB`
					: 'Unlimited';
				const cpu = s.limits.cpu ? `${s.limits.cpu}%` : 'Unlimited';
				const disk = s.limits.disk
					? `${(s.limits.disk / 1024).toFixed(1)} GB`
					: 'Unlimited';

				messageText += `\n*ID:* ${s.id}\n*Name:* ${
					s.name
				}\n*RAM:* ${ram}\n*CPU:* ${cpu}\n*Disk:* ${disk}\n*Created:* ${
					s.created_at.split('T')[0]
				}\n`;
			}

			await message.send(messageText);
			console.log(messageText);
		} catch (e) {
			console.log(e);
			await message.reply('An error occurred while fetching server data.');
		}
	}
);

command(
	{
		pattern: 'createserver',
		desc: 'Create a new hosting panel server',
		type: 'panel',
	},
	async (message, match) => {
		if (!admins.includes(message.userName)) {
			return message.send('no permission');
		}
		if (!match.includes(','))
			return message.send('Example:\n?createserver 1gb, username, email');

		const [planRaw, usernameRaw, emailRaw] = match
			.split(',')
			.map(v => v.trim().toLowerCase());
		const command = planRaw;
		const username = usernameRaw;
		const email = emailRaw;

		if (!command || !username || !email)
			return message.send(
				'Incomplete data.\nUse format: ?createserver 1gb, username, email'
			);

		const name = username + ' Server';
		const password = username + crypto.randomBytes(2).toString('hex');

		let ram, disknya, cpu;
		switch (command) {
			case '1gb':
				ram = '1000';
				disknya = '1000';
				cpu = '40';
				break;
			case '2gb':
				ram = '2000';
				disknya = '1000';
				cpu = '60';
				break;
			case '3gb':
				ram = '3000';
				disknya = '2000';
				cpu = '80';
				break;
			case '4gb':
				ram = '4000';
				disknya = '2000';
				cpu = '100';
				break;
			case '5gb':
				ram = '5000';
				disknya = '3000';
				cpu = '120';
				break;
			case '6gb':
				ram = '6000';
				disknya = '3000';
				cpu = '140';
				break;
			case '7gb':
				ram = '7000';
				disknya = '4000';
				cpu = '160';
				break;
			case '8gb':
				ram = '8000';
				disknya = '4000';
				cpu = '180';
				break;
			case '9gb':
				ram = '9000';
				disknya = '5000';
				cpu = '200';
				break;
			case '10gb':
				ram = '10000';
				disknya = '5000';
				cpu = '220';
				break;
			case 'unlimited':
			case 'unli':
				ram = '0';
				disknya = '0';
				cpu = '0';
				break;
			default:
				return message.send(
					'Invalid plan. Use between 1gb to 10gb or unlimited'
				);
		}

		const createUser = await fetch(domain1 + '/api/application/users', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + apikey1,
			},
			body: JSON.stringify({
				email: email,
				username: username,
				first_name: name,
				last_name: 'Server',
				language: 'en',
				password: password.toString(),
			}),
		});

		const data = await createUser.json();
		if (data.errors)
			return message.send(JSON.stringify(data.errors[0], null, 2));
		const user = data.attributes;
		const usr_id = user.id;
		const desc = toString(Date.now());

		const eggData = await (
			await fetch(domain1 + `/api/application/nests/${nestid1}/eggs/${egg1}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + apikey1,
				},
			})
		).json();

		const startup_cmd = eggData.attributes.startup;

		const createServer = await fetch(domain1 + '/api/application/servers', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + apikey1,
			},
			body: JSON.stringify({
				name,
				description: desc,
				user: usr_id,
				egg: parseInt(egg1),
				docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
				startup: startup_cmd,
				environment: {
					INST: 'npm',
					USER_UPLOAD: '0',
					AUTO_UPDATE: '0',
					CMD_RUN: 'npm start',
				},
				limits: {
					memory: ram,
					swap: 0,
					disk: disknya,
					io: 500,
					cpu: cpu,
				},
				feature_limits: {
					databases: 5,
					backups: 5,
					allocations: 5,
				},
				deploy: {
					locations: [parseInt(loc1)],
					dedicated_ip: false,
					port_range: [],
				},
			}),
		});

		const result = await createServer.json();
		if (result.errors)
			return message.send(JSON.stringify(result.errors[0], null, 2));
		const server = result.attributes;

		const info = `*NIKKA CPANEL DETAILS 📦*

*📡 Server Id:* ${server.id}
*👤 Username:* ${user.username}
*🔐 Password:* ${password}
•📡 Domain: ${domain1}
*🌐  Server Details*
• Ram: ${ram === '0' ? 'Unlimited' : ram / 1000 + 'GB'}
• Disk: ${disknya === '0' ? 'Unlimited' : disknya / 1000 + 'GB'}
• CPU: ${cpu === '0' ? 'Unlimited' : cpu + '%'}



POWERED BY NIKKA TECH
`;

		await message.send(info);
	}
);

command(
	{
		pattern: 'delpanel',
		desc: 'Delete Server',
		type: 'panel',
	},
	async (message, match) => {
		if (!admins.includes(message.userName)) {
			return message.send('no permission');
		}
		if (message.userName !== 'H4KI_XER') {
			return await message.reply('fuck off, You are not my owner.');
		}

		if (!match)
			return message.reply(
				'❌ Please provide a server ID. Usage: ?delpanel <serverId>'
			);

		let serverId = match;

		try {
			// Delete the server
			let deleteServer = await fetch(
				`${domain1}/api/application/servers/${serverId}`,
				{
					method: 'DELETE',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: `Bearer ${apikey1}`,
					},
				}
			);

			if (!deleteServer.ok) return message.reply('❌ Failed to delete server!');

			message.reply(
				`*SERVER SUCCESSFULLY DELETED* ✅\n\n🖥 *Server ID:* ${serverId}`
			);
		} catch (error) {
			console.error(error);
			message.reply('⚠️ An error occurred while deleting the server.');
		}
	}
);
