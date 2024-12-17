import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CardPersist {
  @IsString()
  @IsNotEmpty({ message: 'O campo Card não pode ser vazio!' })
  card: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo Título não pode ser vazio!' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo Subtítulo não pode ser vazio!' })
  subtitle: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo Afirmação não pode ser vazio!' })
  affirmation: string;

  @IsUrl()
  @IsNotEmpty({ message: 'O campo Música Sugerida não pode ser vazio!' })
  suggestedMusic: string;

  @IsUrl()
  @IsNotEmpty({ message: 'O campo Imagem não pode ser vazio!' })
  img: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo Mistura não pode ser vazio!' })
  blend: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo Poder não pode ser vazio!' })
  power: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo Incenso não pode ser vazio!' })
  incense: string;
}