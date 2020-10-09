import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'
import { PageableRequestDto } from '@/shared/dtos/pageable.dto'

@Injectable()
export class PageablePipe implements PipeTransform {
  transform(value: PageableRequestDto, metadata: ArgumentMetadata) {
    value.limit = Number(value.limit)
    value.offset = Number(value.offset)
    
    return value
  }
}
