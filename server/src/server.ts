import express, {Application, Request, Response} from 'express';
import { appendFile } from 'fs';
import routes from './routes/routes';
// import formatYearMonthDay from '../utils/formatYearMonthDay.ts';

const server: Application = express();
const port: number = 7000;

// middleware
server.use((req: Request, res: Response, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
server.use('/api/nhl-app', routes);


server.listen(port, () => {
    console.log(`Connected successfully on: http://localhost:${port}`)
});