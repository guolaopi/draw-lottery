const path = require("path");

export default {
    // 打包后的根路径 ./当前网站路径， /服务器根路径
    base: "./",
    // 输出的静态资源的文件夹名称
    assetsDir: "assets",
    // 是否开启ssr服务断渲染
    ssr: false,
    // 重命名路径  path.resolve(__dirname, './src')
    alias: {
        "/@/": path.resolve(__dirname, "./src"),
    },
    // 端口
    port: 8080,
    // 是否自动开启浏览器
    open: true,
    // 开启控制台输出日志
    silent: true,
};
