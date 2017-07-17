# 伪百度云借口文档

## 文件相关
### 1.文件hash检测
|路径|方法|
|:--:|:--:|
|/file/check|POST|
请求参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|hash|String|待检测文件hash值|
响应参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|data|String或null|文件存在返回文件id，否则返回null|
### 2.文件上传
|路径|方法|
|:--:|:--:|
|/file/upload|POST|
请求参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|userId|String|上传用户id|
|dirId|String|文件上传至文件夹id|
|name|String|文件名|
|hash|String|文件hash|
|data|String|文件数据|
响应参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|data|String|文件上传成功后的id|
### 3.文件修改
|路径|方法|
|:--:|:--:|
|/file/update|PUT|
请求参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|userId|String|用户id|
|fileId|String|文件id|
|name|String|更新文件名|
响应参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|data|String|文件id|
### 4.文件删除
|路径|方法|
|:--:|:--:|
|/file/delete|DELETE|
请求参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|userId|String|用户id|
|fileId|String|文件id|
响应参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|data|Number|0表示操作失败，1表示操作成功|
### 5.文件移动
|路径|方法|
|:--:|:--:|
|/file/move|PUT|
请求参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|userId|String|用户id|
|fileId|String|文件id|
|dirId|String|移动至文件夹id|
响应参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|data|String|0表示操作失败，1表示操作成功|
### 6.文件快速上传
|路径|方法|
|:--:|:--:|
|/file/new|POST|
请求参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|userId|String|用户id|
|fileId|String|真实文件id|
|dirId|String|文件夹id|
|name|String|文件名
响应参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|data|Boolean|0表示操作失败，1表示操作成功|
### 7.文件下载
|路径|方法|
|:--:|:--:|
|/file/download|GET|
请求参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|userId|String|用户id|
|fileId|String|文件id|


## 文件夹相关
### 1.创建文件夹
|路径|方法|
|:--:|:--:|
|/folder/create|POST|
请求参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|userId|String|用户id|
|dirId|String|父文件夹id|
|name|String|文件夹名称|
响应参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|data|String|新建成功返回dirId|
### 2.修改文件夹
|路径|方法|
|:--:|:--:|
|/folder/update|PUT|
请求参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|userId|String|用户id|
|dirId|String|文件夹id|
|name|String|修改文件夹名|
响应参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|data|Number|0表示操作失败，1表示操作成功|
### 3.移动文件夹
|路径|方法|
|:--:|:--:|
|/folder/move|PUT|
请求参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|userId|String|用户id|
|parentId|String|父文件夹id|
|dirId|String|文件夹id|
响应参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|data|Number|0表示操作失败，1表示操作成功|
### 4.删除文件夹
|路径|方法|
|:--:|:--:|
|/folder/delete|DELETE|
请求参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|userId|String|用户id|
|dirId|String|文件夹id|
|type|Number|0表示内部文件删除，1表示内部文件抛出，默认0|
响应参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|data|Number|0表示操作失败，1表示操作成功|
### 5.文件夹列表
|路径|方法|
|:--:|:--:|
|/folder/list|GET|
请求参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|userId|String|用户id|
|dirId|String|文件夹id|
响应参数列表：
|参数名|类型|描述|
|:--:|:--:|:--:|
|files|Array|无|
|dirs|Array|无|