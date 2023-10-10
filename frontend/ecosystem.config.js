module.exports = {
  apps: [
    {
      name: "nextjs-app",
      script: "./node_modules/next/dist/bin/next",
      args: "start",
      exec_mode: "cluster",
      instances: "max", // 配置多个的时候会启动多个实例
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
