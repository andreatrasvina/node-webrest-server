import { Router } from "express";
import { TodoRoutes } from "./todos/routes";

//En esta clase solo van las rutas que se definen globalmente
//habra un archivo de rutas para cada responsabilidad

export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        router.use('/api/todos', TodoRoutes.routes);

        return router;
    }
}
