
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetTodosUseCases {

    execute(): Promise<TodoEntity[]>;
}

export class GetTodos implements GetTodosUseCases{
    
    constructor(
        private readonly repositoy: TodoRepository
    ) {}
    
    execute(): Promise<TodoEntity[]> {
        return this.repositoy.getAll();
    }

}