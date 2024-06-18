const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { ClientCredentialsAuthProvider } = require('@twurple/auth');
const { ApiClient } = require('@twurple/api');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clientId = process.env.TWITCH_CLIENT_ID;
const clientSecret = process.env.TWITCH_CLIENT_SECRET;

const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({ authProvider });

let players = [];

wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
        const data = JSON.parse(message);
        if (data.type === 'join') {
            const user = await apiClient.users.getUserByName(data.username);
            if (user) {
                players.push({
                    id: user.id,
                    name: user.displayName,
                    weapon: data.weapon
                });
                broadcastPlayers();
            }
        }
    });
});

function broadcastPlayers() {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'players', players }));
        }
    });
}

function determineWinner() {
    if (players.length === 0) return;
    const winner = players[Math.floor(Math.random() * players.length)];
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'winner', winner }));
        }
    });
}

setInterval(determineWinner, 60000); // Determine winner every 60 seconds

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
