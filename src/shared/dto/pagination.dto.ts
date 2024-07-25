import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

import PageMetaDto from '@/shared/dto/page-meta.dto';

export default class PaginationDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
