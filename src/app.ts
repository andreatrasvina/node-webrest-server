import { envs } from './config/envs';
import { Server } from './presentation/server';

//punto de entrada
(async()=> {
    main();
})();

//se manda a llamar el servidor
function main(){

    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
    });

    server.start();
}