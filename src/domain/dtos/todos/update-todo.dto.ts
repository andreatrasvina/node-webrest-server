

export class UpdateTodoDto {

    //es private porque solo se puede llamar dentro de un metodo statico dentro de la misma clase
    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly createdAt?: string,
    ){}

    get values() {
        const returnObj: {[key: string]: any} = {};

        if(this.text) returnObj.text = this.text;
        if(this.createdAt) returnObj.createdAt = this.createdAt;

        return returnObj;
    }


    static create( props: {[key: string]: any} ): [string?, UpdateTodoDto?] {

        const {id, text, createdAt} = props;
        let newCreatedAt = createdAt;

        if(!id || isNaN(Number(id))) {
            return ['id must be a valid number'];
        }

        if(createdAt) {
            newCreatedAt = new Date(createdAt)
            if(newCreatedAt.toString() === 'invalid date') {
                return ['CreatedAt must be a valid date']
            }
        } 

        return [undefined, new UpdateTodoDto(id, text, newCreatedAt)];
    }
}