import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    routes: Router; //Para importar las rutas
    public_path?: string;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router; //Para importar las rutas

    constructor(options: Options) {
        const {port, routes, public_path = 'public'} = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes; //Para importar las rutas
    }

    async start() {
  
        //Middlewares
        this.app.use(express.json()); //serializa y convierte el archivo a json raw
        this.app.use(express.urlencoded({extended: true}) ); //permite x-www-form-urlencoded

        //Public Folder
        this.app.use(express.static(this.publicPath));

        //Definir routes
        this.app.use(this.routes);


        // //evita los errores del enrutamiento en SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join( __dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        });
    
        //escucha el puerto en donde se ejecuta
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${ 3000 }`);
        });
    }
}