import { IsNotEmpty } from 'class-validator';

export class CapturePurchasePersist {
  @IsNotEmpty({ message: 'O campo data não pode ser vazio!' })
  data: object;
}
