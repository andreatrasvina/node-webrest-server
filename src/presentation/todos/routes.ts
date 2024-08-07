import { Router } from "express";
import { TodosController } from "./controller";

//En esta clase solo van las rutas del TODO
//Responde con el metodo get del controlador 

export class TodoRoutes {

    static get routes(): Router {
        const router = Router();
        const todoController = new TodosController();

        //GET - READ
        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoById);

        //POST - CREATE
        router.post('/', todoController.createTodos);

        //PUT - UPDATE
        router.put('/:id', todoController.updateTodo);

        //DELETE 
        router.delete('/:id', todoController.deleteTodo);

        return router;
    }
}
