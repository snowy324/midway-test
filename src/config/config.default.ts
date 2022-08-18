import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';
import { User } from '../entity/user';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1660811716890_7714',
    egg: {
      port: 7001,
      globalPrefix: 'api',
    },
    sequelize: {
      dataSource: {
        default: {
          database: 'miracle',
          username: 'root',
          password: 'myRoot',
          host: '127.0.0.1',
          port: 3306,
          encrypt: false,
          dialect: 'mysql',
          define: { charset: 'utf8' },
          timezone: '+08:00',
          entities: [User],
        },
      },
      sync: false, // 本地的时候，可以通过sync: true直接createTable
    },
    // security: {
    //   csrf: false,
    // },
  } as MidwayConfig;
};
