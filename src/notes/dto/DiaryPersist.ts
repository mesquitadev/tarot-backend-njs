import { IsNotEmpty } from 'class-validator';

export class DiaryPersist {
  @IsNotEmpty({ message: 'O Título não pode ser vazio!' })
  title: string;
  @IsNotEmpty({ message: 'O Conteúdo não pode ser vazio!' })
  content: string;
  @IsNotEmpty({message: 'A categoria é obrigatória!'})
  category: string;
  userId: number;
}
