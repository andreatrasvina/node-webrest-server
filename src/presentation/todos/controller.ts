import { Request, Response } from "express"

const todos = [
    {id: 1, text: 'Buy milk', createdAt: new Date()},
    {id: 2, text: 'Buy yeyo', createdAt: null },
    {id: 3, text: 'Buy yeyo', createdAt: new Date()},
];

export class TodosController {

    constructor() {}

    //METODO READ 
    public getTodos = (req: Request, res: Response) => {

        return res.json(todos);
    }

    //METODO READ 
    public getTodoById = (req: Request, res: Response) => {

        const id = +req.params.id; //obtiene id

        //validacion si el id no es un numero
        if( isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'})

        const todo = todos.find(todo => todo.id === id);
        
        (todo) //if todo
            ? res.json(todo) //si existe
            : res.status(404).json({error: `TODO with id: ${id} not found`}) //si no existe
    }

    //METODO CREATE
    public createTodos = (req: Request, res: Response) => {

        const {text} = req.body;
        if( !text) return res.status(400).json({error: 'Text property is required'}); // validacion
        
        const newTodo = {
            id:todos.length+1,
            text: text,
            createdAt: null
        }

        todos.push(newTodo);

        res.json(newTodo);
    }


    //METODO ACTUALIZAR
    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if( isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});//validacion si el id no es un numero

        const todo = todos.find(todo => todo.id === id);
        if( !todo) return res.status(404).json({error: `TODO with id: ${id} not found`} );

        const {text, createdAt} = req.body;

        //!!!! CUIDADO HACER UPDATE POR REFERENCIA !!!!
        todo.text = text || todo.text;
        (createdAt === 'null')
            ? todo.createdAt = null
            : todo.createdAt = new Date(createdAt || todo.createdAt);

        res.json(todo);
    }

    //METODO DELETE
    public deleteTodo = (req:Request, res: Response) => {

        const id = +req.params.id;
        if( isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});//validacion si el id no es un numero

        const todo = todos.find(todo => todo.id === id);
        if( !todo) return res.status(404).json({error: `TODO with id: ${id} not found`} );

        todos.splice(todos.indexOf(todo), 1);
        res.json(todo);
        

    }


}