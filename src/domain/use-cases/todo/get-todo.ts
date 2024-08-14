
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetTodoUseCases {

    execute(id: number): Promise<TodoEntity>;
}

export class GetTodo implements GetTodoUseCases{
    
    constructor(
        private readonly repositoy: TodoRepository
    ) {}
    
    execute(id: number): Promise<TodoEntity> {
        return this.repositoy.findById(id);
    }

}