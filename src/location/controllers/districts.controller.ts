import {
  Controller,
  Get,
  HttpStatus,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformResponseInterceptor } from 'src/common/interceptors';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  GetAllDistrictsResponseDto,
  GetDistrictByIdResponseDto,
} from '../dto/response';
import { District } from '../schemas/district.schema';
import { DistrictService } from '../services/district.service';

@ApiTags('District')
@UseInterceptors(TransformResponseInterceptor)
@Controller('location/districts')
@UseGuards(JwtAuthGuard)
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get()
  @ApiOperation({ summary: 'Get all districts.' })
  @ApiResponse({ status: HttpStatus.OK, type: GetAllDistrictsResponseDto })
  getAllDiscritcts(): Promise<District[]> {
    return this.districtService.getAllDistricts();
  }

  @Get(':districtId')
  @ApiOperation({ summary: 'Get district by id.' })
  @ApiResponse({ status: HttpStatus.OK, type: GetDistrictByIdResponseDto })
  getDistrictById(@Param('districtId') districtId: string): Promise<District> {
    return this.districtService.getDistrictbyId(districtId);
  }
}
