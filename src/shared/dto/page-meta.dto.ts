import { ApiProperty } from '@nestjs/swagger';

export default class PageMetaDto {
  @ApiProperty()
  readonly page!: number;

  @ApiProperty()
  readonly take!: number;

  @ApiProperty()
  readonly totalCount!: number;
}
