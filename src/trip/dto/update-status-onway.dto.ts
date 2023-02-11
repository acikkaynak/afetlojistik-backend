import {
  IsArray,
  IsDateString,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { NestedObjectValidator } from 'src/common/decorators/nested-object-validator.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class VehiclePlateDto {
  @ApiProperty({
    type: String,
    description: 'Plate number of the truck',
    example: '34ABC123',
  })
  @IsNotEmpty()
  @IsString()
  truck: string;

  @ApiProperty({
    type: [String],
    description: "Plate number of the truck's trailer",
    example: '34ABC124',
  })
  @IsNotEmpty()
  @IsString()
  trailer: string;
}

export class VehicleDto {
  @ApiProperty({
    type: VehiclePlateDto,
    description: 'Plate information of the vehicle',
  })
  @IsDefined()
  @IsNotEmptyObject()
  @NestedObjectValidator(VehiclePlateDto)
  plate: VehiclePlateDto;

  @ApiProperty({
    type: String,
    description: 'Driver phone number of the vehicle',
    example: '5320000000',
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('TR')
  phone: string;

  @ApiProperty({
    description: 'Driver name of the vehicle',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class LocationBaseDto {
  @ApiProperty({
    type: String,
    description: 'CityId of the location',
    example: '5e43fc64ad9beb36cdeb4f8b',
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  cityId: string;

  @ApiProperty({
    type: String,
    description: 'DistrictId of the location',
    example: '5e43fc64ad9beb36cdeb4f8b',
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  districtId: string;
}

export class FromLocationDto extends LocationBaseDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Address of the location',
    example: 'Atatürk Mahallesi, 123 Sokak, No: 1',
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  address?: string;
}

export class ToLocationDto extends LocationBaseDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Address of the location',
    example: 'Atatürk Mahallesi, 123 Sokak, No: 1',
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  address?: string;
}

export class ProductDto {
  @ApiProperty({
    description: 'Category id',
    example: '5e43fc64ad9beb36cdeb4f8b',
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  categoryId: string;

  @ApiProperty({
    type: Number,
    description: 'Product count',
    example: '5',
  })
  @IsDefined()
  @IsNumber()
  @Min(0)
  count: number;
}
export class UpdateStatusOnwayDto {
  @ApiProperty({
    type: VehicleDto,
    description: 'Vehicle of the trip',
    example: {
      plate: {
        truck: '34ABC123',
        trailer: '34ABC124',
      },
      phone: '5320000000',
      name: 'John Doe',
    },
  })
  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested({ message: 'Invalid Vehicle' })
  @Type(() => VehicleDto)
  vehicle: VehicleDto;

  @ApiProperty({
    type: FromLocationDto,
    description: 'From location of the trip',
    example: {
      cityId: '5e43fc64ad9beb36cdeb4f8b',
      districtId: '5e43fc64ad9beb36cdeb4f8b',
      address: 'Atatürk Mahallesi, 123 Sokak, No: 1',
    },
  })
  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested({ message: 'Invalid from Location' })
  @Type(() => FromLocationDto)
  fromLocation: FromLocationDto;

  @ApiProperty({
    type: ToLocationDto,
    description: 'To location of the trip',
    example: {
      cityId: '5e43fc64ad9beb36cdeb4f8b',
      districtId: '5e43fc64ad9beb36cdeb4f8b',
      address: 'Atatürk Mahallesi, 123 Sokak, No: 1',
    },
  })
  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested({ message: 'Invalid to Location' })
  @Type(() => ToLocationDto)
  toLocation: ToLocationDto;

  @ApiProperty({
    type: String,
    default: new Date().toISOString(),
    description: 'Depart time of the vehicle',
    example: '2023-02-10T12:00:00.000Z',
  })
  @IsNotEmpty()
  @IsDateString()
  departTime: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Attached note for this trip',
    example: 'Please contact with ... person on arrival',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    type: [ProductDto],
    description: 'Products of the trip',
    example: [
      {
        categoryId: '5e43fc64ad9beb36cdeb4f8b',
        count: 5,
      },
    ],
  })
  @IsDefined()
  @IsArray()
  @NestedObjectValidator(ProductDto, { each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}