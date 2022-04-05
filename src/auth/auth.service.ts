import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/repositories/users/entities/user.entity';
import { UserRepositoryService } from 'src/repositories/users/user-repository.service';
import { LoginDto } from './dto/request/login.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/request/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private checkPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  public async signup(body: CreateUserDto): Promise<any> {
    const { username, email } = body;

    // check if the username exists in the db
    const usernameInDb = await this.userRepositoryService.getByUsername(
      username,
    );

    // check if the username exists in the db
    const emailInDb = await this.userRepositoryService.getByEmail(email);

    if (usernameInDb || emailInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return await this.userRepositoryService.createUser(body);
  }

  public async login(body: LoginDto): Promise<any> {
    const { email, password } = body;
    const user: User = await this.userRepositoryService.getByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    if (!(await this.checkPassword(password, user.password))) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // generate and sign token
    const token = this._createToken({
      email: user.email,
      id: user.id,
      username: user.username,
    });

    return { user, token };
  }

  public async validateUser(payload): Promise<any> {
    const user = await this.userRepositoryService.getByEmail(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken(email): any {
    const accessToken = this.jwtService.sign(email);

    return {
      expiresIn: this.configService.get('jwt.expiresIn'),
      accessToken,
    };
  }
}
