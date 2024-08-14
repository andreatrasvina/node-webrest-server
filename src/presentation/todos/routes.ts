import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImpl } from "../../infraestructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infraestructure/datasource/repositories/todo.repository.impl";

//En esta clase solo van las rutas del TODO
//Responde con el metodo get del controlador 

export class TodoRoutes {

    static get routes(): Router {

        const router = Router();

        const datasource = new TodoDatasourceImpl();
        const todoRepository = new TodoRepositoryImpl(datasource);

        const todoController = new TodosController(todoRepository);

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
