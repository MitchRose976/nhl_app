import express, {Application, Request, Response} from 'express';

const server: Application = express();
const port: number = 7000;

server.get('/', (req: Request, res: Response) => {
    res.send('Hello World')
});

server.listen(port, () => {
    console.log(`Connected successfully on: http://localhost:${port}`)
});