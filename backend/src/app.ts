
import router from './routes/index';


 let express = require('express');
const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});