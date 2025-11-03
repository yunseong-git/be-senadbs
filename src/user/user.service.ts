import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) { }

  async create(dto: CreateUserDto) {
    const user = await this.userModel.create(dto);
    return user
  }

  async findById(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userModel.findOne({ testId: dto.testId });
    return user;
  }

  /**RT 해싱 및 DB 저장 */
  async HashingAndStoreRefreshToken(userId: Types.ObjectId, refreshToken: string) {
    const saltRounds = this.configService.getOrThrow<number>('BCRYPT_SALT_ROUNDS');
    const hashedRefreshToken = await bcrypt.hash(refreshToken, saltRounds);

    //문서반환이 아닌 상태리포트만 필요하기에, findByIdAndUpdate보다 효율적(i/o 1단계 감소)
    await this.userModel.updateOne(
      { _id: userId },
      { $set: { current_hashed_refresh_token: hashedRefreshToken } },
    );
  }
}
