# build 说明

1. 安装 pnpm
2. 在项目根目录运行 pnpm i
3. 运行 pnpm build，注意，如果你需要指定静态资源的根目录，请修改 package.json 的 homepage 属性，比如可以修改为 `./` `https://username.github.io/projectname/` 等
4. 得到的 build 目录即可部署到你的服务器上