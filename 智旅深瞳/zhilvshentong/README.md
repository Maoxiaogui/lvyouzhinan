# 智旅深瞳 - 智能旅游助手

智旅深瞳是一款基于人工智能的智能旅游助手，致力于为用户提供个性化的旅游体验。通过智能行程规划、实时信息聚合、文化体验推荐和碳足迹计算等功能，帮助用户探索更多精彩，旅行更加便捷、环保、安全。

## 功能特点

- **智能行程规划**：基于用户偏好智能生成最优行程方案，充分考虑时间、距离、兴趣等因素。
- **实时信息聚合**：提供景点实时天气、人流、交通等信息，帮助用户做出明智决策。
- **文化体验推荐**：推荐当地特色文化体验，深入了解目的地的历史和风土人情。
- **碳足迹计算**：计算行程碳足迹，提供环保建议，助力可持续旅游。

## 技术栈

- React 18
- TypeScript
- Ant Design
- React Router
- Vite

## 环境要求

- Node.js 16.0 或更高版本
- npm 7.0 或更高版本

## 安装和运行

### 1. 安装 Node.js

项目需要 Node.js 16.0 或更高版本。如果您还没有安装 Node.js，请从官方网站下载并安装：

- **Windows**: 访问 [Node.js 官网](https://nodejs.org/zh-cn/) 下载 Windows 安装包并运行
- **macOS**: 使用 Homebrew 安装 `brew install node` 或从官网下载安装包
- **Linux**: 使用包管理器安装，如 Ubuntu 上的 `sudo apt install nodejs npm`

安装完成后，打开终端验证安装：

```bash
node --version
npm --version
```

### 2. 安装项目依赖

在项目根目录下运行：

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

### 4. 构建生产版本

```bash
npm run build
```

### 5. 预览生产构建

```bash
npm run preview
```

## 常见问题和解决方案

### Q: 为什么直接在浏览器中打开 index.html 会出现 MIME 类型错误？

A: 这是因为项目使用了 Vite 构建工具，TypeScript 文件（如 `.tsx`）需要经过编译和处理才能在浏览器中运行。您不能直接在浏览器中打开 index.html 文件，必须通过 Vite 开发服务器（`npm run dev`）或生产构建（`npm run build` 后部署到服务器）来访问。

### Q: 安装依赖时遇到权限问题怎么办？

A: 在 Linux/macOS 上，您可以尝试使用 `sudo npm install`；在 Windows 上，建议以管理员身份运行命令提示符或 PowerShell。

### Q: 启动开发服务器时端口被占用怎么办？

A: 您可以在 `vite.config.ts` 文件中修改 `server.port` 配置项，或在启动时指定端口：`npm run dev -- --port 3001`

## 项目结构

```
zhilvshentong/
├── public/                 # 静态资源
├── src/
│   ├── components/         # 通用组件
│   │   ├── HeaderBar.tsx   # 导航栏组件
│   │   ├── HeroSection.tsx # 首页横幅组件
│   │   └── FeatureCards.tsx # 功能卡片组件
│   ├── pages/              # 页面组件
│   │   ├── TripPlanningPage.tsx    # 行程规划页面
│   │   ├── RealTimeInfoPage.tsx    # 实时信息页面
│   │   └── CulturalExperiencePage.tsx # 文化体验页面
│   ├── services/           # 服务层
│   │   ├── mockDataService.ts       # 模拟数据服务
│   │   ├── tripPlanningService.ts   # 行程规划服务
│   │   ├── realTimeInfoService.ts   # 实时信息服务
│   │   ├── culturalExperienceService.ts # 文化体验服务
│   │   └── carbonFootprintService.ts # 碳足迹计算服务
│   ├── App.tsx             # 根组件
│   ├── main.tsx            # 应用入口
│   ├── App.css             # 应用样式
│   └── index.css           # 全局样式
├── index.html              # HTML模板
├── package.json            # 项目依赖和脚本
├── tsconfig.json           # TypeScript配置
├── vite.config.ts          # Vite配置
└── README.md               # 项目说明
```

## 开发指南

### 添加新页面

1. 在 `src/pages/` 目录下创建新的页面组件
2. 在 `src/App.tsx` 中添加路由配置
3. 在 `src/components/HeaderBar.tsx` 中添加导航菜单项

### 添加新服务

1. 在 `src/services/` 目录下创建新的服务文件
2. 在需要使用服务的组件中导入并使用

### 添加新组件

1. 在 `src/components/` 目录下创建新的组件文件
2. 如果需要样式，创建对应的 `.module.css` 文件
3. 在需要的页面中导入并使用组件

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证。详情请参阅 [LICENSE](LICENSE) 文件。

## 联系我们

- 邮箱：support@zhilvshentong.com
- 电话：400-888-8888

---

© 2024 智旅深瞳. 保留所有权利。