import { Provide, Inject } from '@midwayjs/decorator';
import { User } from '../entity/user';
import {
  IGetUserOptions,
  ICreateUserOptions,
  IUpdateUserOptions,
} from '../interface';
import { Context } from '@midwayjs/web';

@Provide()
export class UserService {
  @Inject()
  ctx: Context;

  async getUser(options: IGetUserOptions): Promise<User> {
    const { id } = options;
    try {
      const user = await User.findOne({
        where: {
          id,
        },
      });
      if (user) {
        this.ctx.logger.info(`success to get a user. id: ${id}`);
        return user;
      } else {
        throw new Error(`User ${id} not found`);
      }
    } catch (err) {
      this.ctx.logger.error(`failed to get a user. id: ${id}, error: ${err}`);
      return null;
    }
  }

  async createUser(option: ICreateUserOptions): Promise<User> {
    try {
      const new_user = await User.create({
        ...option,
      });
      this.ctx.logger.info(
        `success to create a user. date: ${JSON.stringify(option)}`
      );
      return new_user;
    } catch (err) {
      this.ctx.logger.error(
        `failed to create a user. date: ${JSON.stringify(
          option
        )}, error: ${err}`
      );
      return null;
    }
  }

  async updateUser(
    option: IUpdateUserOptions
  ): Promise<[affectedCount: number]> {
    try {
      const { id, ...new_user_date } = option;
      const new_user = await User.update(
        {
          ...new_user_date,
        },
        {
          where: {
            id,
          },
        }
      );
      this.ctx.logger.info(
        `success to update a user. date: ${JSON.stringify(option)}`
      );
      return new_user;
    } catch (err) {
      this.ctx.logger.error(
        `failed to update a user. date: ${JSON.stringify(
          option
        )}, error: ${err}`
      );
      return null;
    }
  }

  async deleteUser(option: IGetUserOptions): Promise<number> {
    const { id } = option;
    try {
      const delete_user = await User.destroy({
        where: {
          id,
        },
      });
      if (delete_user) {
        this.ctx.logger.info(`success to delete a user. id: ${id}`);
        return delete_user;
      } else {
        throw new Error(`User ${id} not found`);
      }
    } catch (err) {
      this.ctx.logger.error(
        `failed to delete a user. id: ${id}, error: ${err}`
      );
      return null;
    }
  }
}
