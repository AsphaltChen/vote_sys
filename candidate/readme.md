## 说明

- 用于候选人业务的持久化服务

- 后台服务，内部调用

## 数据表结构

- 候选人信息表

  - 表名：candidate
  - 字段

  | 序号 | 字段      | 数据类型     | 约束条件 | 说明         |
  | ---- | --------- | ------------ | -------- | ------------ |
  | 1    | id        | integer      | 自增主键 | 候选人 ID    |
  | 2    | name      | varchar(128) | 非空     | 姓名         |
  | 3    | gender    | byte         | 非空     | 性别         |
  | 4    | resume    | varchar(512) | 非空     | 简介         |
  | 5    | votes     | integer      | 默认 0   | 得票数       |
  | 6    | avatar    | varchar(256) |          | 头像         |
  | 7    | rank      | integer      |          | 得票排名     |
  | 8    | createdAt | time         | 非空     | 信息建立时间 |
  | 9    | updatedAt | time         |          | 信息更新时间 |

- 选民信息表

  - 表名：voter
  - 字段

  | 序号 | 字段      | 数据类型     | 约束条件         | 说明                              |
  | ---- | --------- | ------------ | ---------------- | --------------------------------- |
  | 1    | id        | integer      | 自增主键         | 选民 ID                           |
  | 2    | mail      | varchar(128) | 非空             | 邮箱                              |
  | 3    | password  | varchar(128) | 非空             | 密码                              |
  | 4    | salt      | integer      | 非空             | 密码保护随机数                    |
  | 5    | state     | byte         | 非空,默认 0 有效 | 选民状态，0：有效，其他：失效原因 |
  | 6    | createdAt | time         | 非空             | 信息建立时间                      |
  | 7    | updatedAt | time         |                  | 信息更新时间                      |

## 接口

1. 增加候选人

### api

    /candidate

### method

    POST

### 请求

| 名称   | 类型   | 是否必须 | 描述     |
| ------ | ------ | -------- | -------- |
| name   | string | 是       | 姓名     |
| gender | tring  | 是       | 性别     |
| resume | string | 是       | 简历     |
| avatar | string | 否       | 头像链接 |

### 响应

| 名称    | 类型    | 描述                      |
| ------- | ------- | ------------------------- |
| reesult | integer | 结果，0：成功，其他：失败 |
| id      | integer | 候选人 id,失败时无        |

### 错误码

| http 状态码(Status Code) | 错误码(Error Code) | 错误信息(Error Message) | 描述(Description) |
| ------------------------ | ------------------ | ----------------------- | ----------------- |


2. 删除候选人

### api

    /candidate

### method

    DELETE

### 请求

| 名称 | 类型    | 是否必须 | 描述      |
| ---- | ------- | -------- | --------- |
| id   | integer | 是       | 候选人 id |

### 响应

| 名称    | 类型    | 描述                      |
| ------- | ------- | ------------------------- |
| reesult | integer | 结果，0：成功，其他：失败 |

### 错误码

| http 状态码(Status Code) | 错误码(Error Code) | 错误信息(Error Message) | 描述(Description) |
| ------------------------ | ------------------ | ----------------------- | ----------------- |


3. 修改候选人信息

### api

    /candidate

### method

    UPDATE

### 请求

| 名称   | 类型    | 是否必须 | 描述      |
| ------ | ------- | -------- | --------- |
| id     | integer | 是       | 候选人 id |
| name   | string  | 否       | 姓名      |
| gender | tring   | 否       | 性别      |
| resume | string  | 否       | 简历      |
| avatar | string  | 否       | 头像链接  |

### 响应

| 名称    | 类型    | 描述                      |
| ------- | ------- | ------------------------- |
| reesult | integer | 结果，0：成功，其他：失败 |

### 错误码

| http 状态码(Status Code) | 错误码(Error Code) | 错误信息(Error Message) | 描述(Description) |
| ------------------------ | ------------------ | ----------------------- | ----------------- |


4. 查找候选人

### api

    /candidate

### method

    GET

### 请求

| 名称 | 类型    | 是否必须 | 描述      |
| ---- | ------- | -------- | --------- |
| id   | integer | 是       | 候选人 id |

### 响应

| 名称   | 类型    | 描述      |
| ------ | ------- | --------- |
| id     | integer | 候选人 id |
| name   | string  | 姓名      |
| gender | tring   | 性别      |
| resume | string  | 简历      |
| avatar | string  | 头像链接  |

### 错误码

| http 状态码(Status Code) | 错误码(Error Code) | 错误信息(Error Message) | 描述(Description) |
| ------------------------ | ------------------ | ----------------------- | ----------------- |


5. 获取全部候选人

### api

    /candidate/all

### method

    GET

### 请求

| 名称  | 类型    | 是否必须 | 描述               |
| ----- | ------- | -------- | ------------------ |
| page  | integer | 是       | 页码（不分页：-1） |
| count | integer | 是       | 页面数量           |

### 响应

| 名称       | 类型             | 描述       |
| ---------- | ---------------- | ---------- |
| candidates | array<candidate> | 候选人列表 |

candidate 对象:

| 名称   | 类型    | 描述      |
| ------ | ------- | --------- |
| id     | integer | 候选人 id |
| name   | string  | 姓名      |
| gender | tring   | 性别      |
| resume | string  | 简历      |
| avatar | string  | 头像链接  |  |

### 错误码

| http 状态码(Status Code) | 错误码(Error Code) | 错误信息(Error Message) | 描述(Description) |
| ------------------------ | ------------------ | ----------------------- | ----------------- |


6. 选民注册

### api

    /voter

### method

    POST

### 请求

| 名称     | 类型   | 是否必须 | 描述 |
| -------- | ------ | -------- | ---- |
| mail     | string | 是       | 邮箱 |
| password | string | 是       | 密码 |

### 响应

| 名称    | 类型    | 描述                      |
| ------- | ------- | ------------------------- |
| reesult | integer | 结果，0：成功，其他：失败 |
| id      | integer | 选民 id,失败时无          |

### 错误码

| http 状态码(Status Code) | 错误码(Error Code) | 错误信息(Error Message) | 描述(Description) |
| ------------------------ | ------------------ | ----------------------- | ----------------- |


7. 选民修改密码

### api

    /voter

### method

    UPDATE

### 请求

| 名称     | 类型   | 是否必须 | 描述    |
| -------- | ------ | -------- | ------- |
| id       | string | 是       | 选民 id |
| password | string | 是       | 新密码  |

### 响应

| 名称    | 类型    | 描述                      |
| ------- | ------- | ------------------------- |
| reesult | integer | 结果，0：成功，其他：失败 |

### 错误码

| http 状态码(Status Code) | 错误码(Error Code) | 错误信息(Error Message) | 描述(Description) |
| ------------------------ | ------------------ | ----------------------- | ----------------- |


8. 选民密码校验

### api

    /voter

### method

    POST

### 请求

| 名称     | 类型   | 是否必须 | 描述    |
| -------- | ------ | -------- | ------- |
| id       | string | 是       | 选民 id |
| password | string | 是       | 密码    |

### 响应

| 名称    | 类型    | 描述                      |
| ------- | ------- | ------------------------- |
| reesult | integer | 结果，0：成功，其他：失败 |

### 错误码

| http 状态码(Status Code) | 错误码(Error Code) | 错误信息(Error Message) | 描述(Description) |
| ------------------------ | ------------------ | ----------------------- | ----------------- |


9. 选民状态修改

### api

    /voter

### method

    UPDATE

### 请求

| 名称  | 类型   | 是否必须 | 描述                              |
| ----- | ------ | -------- | --------------------------------- |
| id    | string | 是       | 选民 id                           |
| state | int    | 是       | 选民状态，0：有效，其他：失效原因 |

### 响应

| 名称    | 类型    | 描述                      |
| ------- | ------- | ------------------------- |
| reesult | integer | 结果，0：成功，其他：失败 |

10. 获取全部选民

### api

    /voter/all

### method

    GET

### 请求

| 名称  | 类型    | 是否必须 | 描述               |
| ----- | ------- | -------- | ------------------ |
| page  | integer | 是       | 页码（不分页：-1） |
| count | integer | 是       | 页面数量           |

### 响应

| 名称       | 类型         | 描述     |
| ---------- | ------------ | -------- |
| candidates | array<voter> | 选民列表 |

voter 对象:

| 名称  | 类型    | 描述    |
| ----- | ------- | ------- |
| id    | integer | 选民 id |
| mail  | string  | 邮箱    |
| state | tring   | 状态    |

### 错误码

| http 状态码(Status Code) | 错误码(Error Code) | 错误信息(Error Message) | 描述(Description) |
| ------------------------ | ------------------ | ----------------------- | ----------------- |

