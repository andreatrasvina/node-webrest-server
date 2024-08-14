import { create } from "domain";

//Inicializa una nueva instancia de TodoEntity.
export class TodoEntity {
    constructor (
        public id: number,
        public text: string,
        public createdAt?: Date|null
    ) {}

    //Verifica si la tarea está completada.
    get isCompleted() {
        return !!this.createdAt;
    }

    //Crea una instancia de TodoEntity a partir de un objeto.
    public static fromObject (object: {[key: string]: any} ) {
        const {id, text, createdAt} = object;

        if(!id) throw 'Id is required'; // Verifica la existencia de 'id'
        if(!text) throw 'Text is required'; // Verifica la existencia de 'text'

        let newCreatedAt;

        if(createdAt) {
            newCreatedAt = new Date(createdAt);
            if(isNaN(newCreatedAt.getTime())) {
                throw 'Completed is not a valid date';
            }
        }

        // Retorna la nueva instancia
        return new TodoEntity(id, text, createdAt);
    }
}