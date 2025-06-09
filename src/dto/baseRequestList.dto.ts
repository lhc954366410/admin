import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class BaseRequestListDto {
    @IsNumber({}, { message: "页码必须是数字" })
    @IsNotEmpty({message:"页码是必须"})
    page!: number;

    @IsNumber({}, { message: "每页条数必须是数字" })
    @IsNotEmpty({message:"每页条数是必须"})
    pageSize!: number;

    orderBy: string='id desc';

    searchText!: string;

}
