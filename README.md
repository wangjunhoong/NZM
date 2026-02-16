# 逆战：未来数据统计

本项目是一个基于 Cloudflare Workers 构建的轻量级无服务器 Web 应用，用于查看逆战：未来的游戏统计数据

## 功能特性

- **多平台登录**：支持 QQ 和微信扫码登录
- **详细数据**：查看近100场详细的比赛记录、胜率和表现数据，并分类统计
- **图鉴浏览**：浏览武器、插件和陷阱图鉴。
- **隐私专注**：服务器不存储用户 Cookie 或敏感数据。所有数据处理均在客户端完成或仅通过代理转发
- **数据来源**：所有数据来源于逆战官方数据接口
- **本地部署**：Release中的压缩包与仓库版本不同，详情请见Release

## 部署说明

### 前置要求

- 已安装 Node.js 环境

### 部署步骤

1.  **安装依赖**
    ```bash
    npm install
    ```

2.  **本地开发**
    ```bash
    npx wrangler dev
    ```

## 项目结构

- `src/`: 后端逻辑 (Cloudflare Worker)
    - `index.js`: 入口文件及路由处理
    - `auth.js`: 鉴权逻辑 (二维码生成、轮询、Token 交换)
    - `stats.js`: 游戏数据获取
    - `utils.js`: 通用工具函数
- `public/`: 前端静态资源 (HTML, CSS, JS)

## 免责声明

本项目仅供学习和个人使用。本项目调用的接口数据均来自官方，但本项目本身并非官方产品，亦不由游戏开发商运营或背书

## 开源协议与致谢

本项目采用 MIT 协议开源

**关于镜像站和二次开发的特别说明：**
虽然您可以根据 MIT 协议自由修改和分发本项目的代码，但我也希望您在源码以及部署后的应用界面中**保留我的赞赏/捐赠信息**。本项目完全由个人利用业余时间维护，还望理解

### MIT License

Copyright (c) 2026 HaMan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 支持作者

如果这个工具对您有帮助，可以在条件允许的情况下请作者喝杯咖啡

![微信赞赏](public/images/donate-wechat.png)
