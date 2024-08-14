import { Request, Response } from "express"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";

// DI
export class TodosController {

    constructor(
        private readonly todoRepository: TodoRepository,
    ) {}


    //SE IMPLEMENTAN LOS CASOS DE USO

    //METODO READ 
    public getTodos = (req: Request, res: Response) => {

        new GetTodos(this.todoRepository)
        .execute()
        .then(todos => res.json(todos) )
        .catch(error => res.status(400).json({error}));
    }

    //METODO READ 
    public getTodoById = async (req: Request, res: Response) => {

        const id = +req.params.id;

        new GetTodo(this.todoRepository)
        .execute(id)
        .then(todo => res.json(todo) )
        .catch(error => res.status(400).json({error}));
        
    }

    //METODO CREATE
    public createTodos = (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if(error) return res.status(400).json({error});
        
        new CreateTodo(this.todoRepository)
        .execute(createTodoDto!)
        .then(todo => res.json(todo) )
        .catch(error => res.status(400).json({error}));

    }


    //METODO ACTUALIZAR
    public updateTodo = (req: Request, res: Response) => {
        
        const id = +req.params.id;
        
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if(error) return res.status(400).json({error});
        
        new UpdateTodo(this.todoRepository)
        .execute(updateTodoDto!)
        .then(todo => res.json(todo) )
        .catch(error => res.status(400).json({error}));
    }

    //METODO DELETE
    public deleteTodo = (req:Request, res: Response) => {

        const id = +req.params.id;
        
        new DeleteTodo(this.todoRepository)
        .execute(id)
        .then(todo => res.json(todo) )
        .catch(error => res.status(400).json({error}));

    }


}