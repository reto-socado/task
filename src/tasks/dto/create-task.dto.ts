import { IsString } from "class-validator";

export class CreateTaskDto {

    @IsString()
    public name: string;
    
    @IsString()
    public estado: string;

}
