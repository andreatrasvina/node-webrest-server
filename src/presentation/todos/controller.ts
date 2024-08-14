import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { error } from "console";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

// const todos = [
//     {id: 1, text: 'Buy milk', createdAt: new Date()},
//     {id: 2, text: 'Buy yeyo', createdAt: null },
//     {id: 3, text: 'Buy yeyo', createdAt: new Date()},
// ];

export class TodosController {

    constructor() {}

    //METODO READ 
    public getTodos = async (req: Request, res: Response) => {

        const todos = await prisma.todo.findMany();
        return res.json(todos);
    }

    //METODO READ 
    public getTodoById = async (req: Request, res: Response) => {

        const id = +req.params.id; //obtiene id

        //validacion si el id no es un numero
        if( isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'})

        const todo = await prisma.todo.findFirst({
            where: {id}
        });
        
        (todo) //if todo
            ? res.json(todo) //si existe
            : res.status(404).json({error: `TODO with id: ${id} not found`}) //si no existe
    }

    //METODO CREATE
    public createTodos = async (req: Request, res: Response) => {

        // const {text} = req.body;
        // if( !text) return res.status(400).json({error: 'Text property is required'}); // validacion
        
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if(error) return res.status(400).json({error});
        
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        res.json(todo);
        
    }


    //METODO ACTUALIZAR
    public updateTodo = async (req: Request, res: Response) => {
        
        const id = +req.params.id;
        
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if(error) return res.status(400).json({error});
        
        const todo = await prisma.todo.findFirst({
            where: {id}
        });

        if( !todo) return res.status(404).json({error: `TODO with id: ${id} not found`} );

        const updatedTodo = await prisma.todo.update({
            where: {id},
            data: updateTodoDto!.values
        });

        res.json(updatedTodo);
    }

    //METODO DELETE
    public deleteTodo = async (req:Request, res: Response) => {

        const id = +req.params.id;
        if( isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});//validacion si el id no es un numero

        const todo = await prisma.todo.findFirst({
            where: {id}
        });

        if( !todo) return res.status(404).json({error: `TODO with id: ${id} not found`} );

        const deleted = await prisma.todo.delete({
            where: {id}
        });

        (deleted)
        ? res.json(deleted)
        : res.status(400).json({error: `Todo with id ${id} not found`});

        

    }


}