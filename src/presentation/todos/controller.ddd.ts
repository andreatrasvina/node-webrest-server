import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { error } from "console";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

// const todos = [
//     {id: 1, text: 'Buy milk', createdAt: new Date()},
//     {id: 2, text: 'Buy yeyo', createdAt: null },
//     {id: 3, text: 'Buy yeyo', createdAt: new Date()},
// ];

// DI
export class TodosController {

    constructor(
        private readonly todoRepository: TodoRepository,
    ) {}

    //METODO READ 
    public getTodos = async (req: Request, res: Response) => {

        const todos = await this.todoRepository.getAll();
        return res.json(todos);
    }

    //METODO READ 
    public getTodoById = async (req: Request, res: Response) => {

        const id = +req.params.id;

        try {
            const todo = await this.todoRepository.findById(id);
            res.json(todo);
        } catch (error) {
            res.status(400).json({error});
        }
    }

    //METODO CREATE
    public createTodos = async (req: Request, res: Response) => {

        // const {text} = req.body;
        // if( !text) return res.status(400).json({error: 'Text property is required'}); // validacion
        
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if(error) return res.status(400).json({error});
        
        const todo = await this.todoRepository.create(createTodoDto!);
        res.json(todo);

    }


    //METODO ACTUALIZAR
    public updateTodo = async (req: Request, res: Response) => {
        
        const id = +req.params.id;
        
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if(error) return res.status(400).json({error});
        
        const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);

        return res.json(updatedTodo);
    }

    //METODO DELETE
    public deleteTodo = async (req:Request, res: Response) => {

        const id = +req.params.id;
        
        const deletedTodo = await this.todoRepository.deleteById(id);
        res.json(deletedTodo);

    }


}