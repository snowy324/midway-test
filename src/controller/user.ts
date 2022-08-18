import {
  Inject,
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Del,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import {
  IGetUserResponse,
  ICreateUserOptions,
  ResponseCode,
} from '../interface';
import { UserService } from '../service/user';

@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/:id')
  async getUser(@Param('id') id: number): Promise<IGetUserResponse> {
    const user = await this.userService.getUser({ id });
    if (user) {
      return { code: ResponseCode.SUCCESS, message: 'OK', data: user };
    } else {
      return { code: ResponseCode.ERROR, message: 'Error', data: null };
    }
  }

  @Post('/')
  async createUser(
    @Body() user: ICreateUserOptions
  ): Promise<IGetUserResponse> {
    const new_user = await this.userService.createUser(user);
    if (new_user) {
      return { code: ResponseCode.SUCCESS, message: 'OK', data: new_user };
    } else {
      return { code: ResponseCode.ERROR, message: 'Error', data: null };
    }
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() user: ICreateUserOptions
  ): Promise<IGetUserResponse> {
    const _ = await this.userService.updateUser({
      id,
      ...user,
    });
    if (_[0]) {
      return { code: ResponseCode.SUCCESS, message: 'OK', data: null };
    } else {
      return { code: ResponseCode.ERROR, message: 'Error', data: null };
    }
  }

  @Del('/:id')
  async deleteUser(@Param('id') id: number): Promise<IGetUserResponse> {
    const _ = await this.userService.deleteUser({ id });
    console.log(_);
    if (_) {
      return { code: ResponseCode.SUCCESS, message: 'OK', data: null };
    } else {
      return { code: ResponseCode.ERROR, message: 'Error', data: null };
    }
  }
}
