# Summary
This project is base on midwayjs, typescript, eggjs, mysql, sequelize.
# Setup
## Init project
```
npm install
```
## Init database
```sql
CREATE TABLE `user` (
  `id` bigint(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'User Id',
  `name` varchar(255) DEFAULT NULL COMMENT 'User name',
  `address` varchar(255) DEFAULT NULL COMMENT 'User address',
  `description` varchar(255) DEFAULT NULL COMMENT 'User description',
  `created_at` timestamp(6) NULL DEFAULT NULL COMMENT 'Time of created',
  `updated_at` timestamp(6) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6) COMMENT 'Time of updated',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
## Run project
```
npm run dev
```
# API
## Create user
+ Method: ```Post```
+ Route: ```/api/user```
+ Body: ```{ name?: string, description?: string, address?: string }```
## Get user
+ Method: ```Get```
+ Route: ```/api/user/:id```
## Update user
+ Method: ```Put```
+ Route: ```/api/user/:id```
+ Body: ```{ name?: string, description?: string, address?: string }```
## Delete user
+ Method: ```Delete```
+ Route: ```/api/user/:id```
## General response
### Success
```
{
  code: 200,
  message: "Ok",
  data: xxx
}
```
### Failed
```
{
  code: 500,
  message: "Error",
  data: null
}
```
# Test
```
npm run test
```
The coverage of unit test is 100% as below.
![Coverage]("assets/coverage.png")