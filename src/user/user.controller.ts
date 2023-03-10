import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  UseGuards,
  Param,
  HttpStatus,
  Req,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginResponse, ValidateVerificationCodeResponse } from './types';
import { ResendVerificationCodeDto } from './dto/resend-verification-code.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './schemas/user.schema';
import { AdminAuthGuard } from '../auth/admin.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { SuccessResponseDto } from 'src/common/dtos';
import { VerifyResponseDto } from './dto/response';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ActiveUserAuthGuard } from 'src/auth/active-user.guard';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { FilterUsersResponseDto } from './dto/response/filter-users.response.dto';
import { FilterUserBodyDto } from './dto/filter-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user.' })
  @ApiResponse({ status: HttpStatus.OK, type: SuccessResponseDto })
  login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
    return this.userService.login(loginUserDto);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Validate verification code.' })
  @ApiResponse({ status: HttpStatus.OK, type: VerifyResponseDto })
  validateVerificationCode(
    @Body() verifyOtpDto: VerifyOtpDto
  ): Promise<ValidateVerificationCodeResponse> {
    return this.userService.validateVerificationCode(verifyOtpDto);
  }

  @Post('verification/resend')
  @ApiOperation({ summary: 'Resend verification code.' })
  @ApiResponse({ status: HttpStatus.OK, type: SuccessResponseDto })
  resendVerificationCode(
    @Body() resendVerificationCodeDto: ResendVerificationCodeDto
  ): Promise<LoginResponse> {
    return this.userService.resendVerificationCode(resendVerificationCodeDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminAuthGuard, ActiveUserAuthGuard)
  @ApiOperation({ summary: 'List users' })
  list() {
    return this.userService.getAll();
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user.' })
  @UseGuards(JwtAuthGuard, AdminAuthGuard, ActiveUserAuthGuard)
  getUser(@Param('userId') userId: string): Promise<UserDocument> {
    return this.userService.getUserById(userId);
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Update user.' })
  @UseGuards(JwtAuthGuard, AdminAuthGuard, ActiveUserAuthGuard)
  updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserDocument> {
    return this.userService.update(userId, updateUserDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create user.' })
  createUser(@Body() updateUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userService.create(updateUserDto);
  }

  @UseGuards(JwtAuthGuard, ActiveUserAuthGuard)
  @Post('filter')
  @ApiOperation({ summary: 'Filter users.' })
  @ApiOkResponse({
    description: 'Filtered users',
    type: FilterUsersResponseDto,
  })
  async filterUsers(
    @Req() req,
    @Body() filterTripDto: FilterUserBodyDto,
    @Query() { limit, skip }: PaginationDto
  ) {
    const { organizationId } = req.user;
    return this.userService.filterUsers({
      ...filterTripDto,
      organizationId,
      limit,
      skip,
    });
  }
}
