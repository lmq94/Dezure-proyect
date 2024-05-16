
import router from './routes/index';
import { setupSwagger } from './swagger'
import {body} from "express-validator";


 let express = require('express');
const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

app.use('/api', router);

app.use((err: any, req: any, res: {
    status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; };
}, next: () => void) => {
    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).json({ error: 'JSON mal formado' });
    }
    next();
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});