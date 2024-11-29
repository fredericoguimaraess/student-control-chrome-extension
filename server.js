import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { promises as fs } from 'fs';
import path, { dirname } from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type']
    },
    maxHttpBufferSize: 1e8
});

app.use(cors());

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (msg) => {
        io.emit('message', msg);
    });

    socket.on('upload', async (file, callback) => {
        try {
            const filePath = path.join(__dirname, 'uploads', 'upload.png');
            await fs.mkdir(dirname(filePath), { recursive: true });
            await fs.writeFile(filePath, file);

            callback({ message: 'success' });

            const data = await fs.readFile(filePath);
            io.emit('upload', data);
        } catch (err) {
            console.error('Error handling file:', err);
            callback({ message: 'failure' });
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
