import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { CityResponseDto } from './common/city.response.dto';

export class GetCityByIdResponseDto {
  @ApiProperty({ type: CityResponseDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  data: CityResponseDto[];
}
