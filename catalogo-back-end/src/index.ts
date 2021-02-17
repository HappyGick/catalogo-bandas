import express from 'express';
import bodyParser from 'body-parser';
import catalogRoutes from './routes/catalog';
import { InitializeDatabases } from './modules/database/database';
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    // tslint:disable-next-line: max-line-length
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, X-CSRF-TOKEN');
    res.header('Access-Control-Expose-Headers', 'Authorization, X-CSRF-TOKEN');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Allow', 'GET, POST');
    next();
});

app.use('/catalog', catalogRoutes);

InitializeDatabases().then(() => app.listen(port, async () => { 
    console.log(`Running on port ${port}`);
}));
