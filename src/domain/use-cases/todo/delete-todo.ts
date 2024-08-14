
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface deleteTodoUseCase {

    execute(id: number): Promise<TodoEntity>;
}

export class DeleteTodo implements deleteTodoUseCase{
    
    constructor(
        private readonly repositoy: TodoRepository
    ) {}
    
    execute(id: number): Promise<TodoEntity> {
        return this.repositoy.deleteById(id);
    }

}