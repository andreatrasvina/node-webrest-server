import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface CreateTodoUseCases {

    execute(dto: CreateTodoDto): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCases{
    
    constructor(
        private readonly repositoy: TodoRepository
    ) {}
    
    execute(dto: CreateTodoDto): Promise<TodoEntity> {
        return this.repositoy.create(dto);
    }

}