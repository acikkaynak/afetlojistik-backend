import {
  Controller,
  Post,
  Body,
  UseGuards,
  Headers,
  Get,
  Param,
} from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from '../user/guards/user.guard';
import { TokenHeader } from '../common/headers/token.header';
import { User } from '../user/decorators/user.decorator';
import { UserDocument } from '../user/schemas/user.schema';
import { TripDocument } from './schemas/trip.schema';
import { FilterTripDto } from './dto/filter-trip.dto';

@ApiTags('Trip')
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiOperation({ summary: 'Create trip.' })
  @UseGuards(UserAuthGuard)
  create(
    @Headers() tokenHeader: TokenHeader,
    @User() user: UserDocument,
    @Body() createTripDto: CreateTripDto
  ): Promise<TripDocument> {
    const { _id: userId, organizationId } = user;
    return this.tripService.create(createTripDto, userId, organizationId);
  }

  @Get('/number/:tripNumber')
  @ApiOperation({ summary: 'Get trip by trip number.' })
  @UseGuards(UserAuthGuard)
  getTripByNumber(
    @Headers() tokenHeader: TokenHeader,
    @User() user: UserDocument,
    @Param('tripNumber') tripNumber: string
  ): Promise<TripDocument> {
    const { organizationId } = user;
    return this.tripService.getTripByNumber(tripNumber, organizationId);
  }

  @Get(':tripId')
  @ApiOperation({ summary: 'Get trip by trip id.' })
  @UseGuards(UserAuthGuard)
  getTripById(
    @Headers() tokenHeader: TokenHeader,
    @User() user: UserDocument,
    @Param('tripId') tripId: string
  ): Promise<TripDocument> {
    const { organizationId } = user;
    return this.tripService.getTripById(tripId, organizationId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all trips.' })
  @UseGuards(UserAuthGuard)
  getAllTrips(
    @Headers() tokenHeader: TokenHeader,
    @User() user: UserDocument
  ): Promise<TripDocument[]> {
    const { organizationId } = user;
    return this.tripService.getAllTrips(organizationId);
  }

  @Post('filter')
  @ApiOperation({ summary: 'Filter trips.' })
  @UseGuards(UserAuthGuard)
  filterTrips(
    @Headers() tokenHeader: TokenHeader,
    @User() user: UserDocument,
    @Body() filterTripDto: FilterTripDto
  ): Promise<TripDocument[]> {
    const { organizationId } = user;
    return this.tripService.filterTrips(filterTripDto, organizationId);
  }
}
