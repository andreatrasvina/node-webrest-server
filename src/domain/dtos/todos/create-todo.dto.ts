

export class CreateTodoDto {

    //es private porque solo se puede llamar dentro de un metodo statico dentro de la misma clase
    private constructor(
        public readonly text: string,
    ){}


    static create( props: {[key: string]: any} ): [string?, CreateTodoDto?] {

        const {text} = props;

        if(!text) return ['Text property is required', undefined];

        return [undefined, new CreateTodoDto(text)];
    }
}