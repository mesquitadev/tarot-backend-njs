import { IsNotEmpty, IsString, IsInt } from "class-validator";

export class MissionPersist {
  @IsInt()
  @IsNotEmpty({ message: 'O campo Dia não pode ser vazio!' })
  day: number;

  @IsString()
  @IsNotEmpty({ message: 'O campo Título não pode ser vazio!' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo Tarefa não pode ser vazio!' })
  task: string;
}