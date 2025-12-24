#!/bin/bash

# Cloudscape 文档网站部署脚本

echo "🚀 开始部署 Cloudscape 文档网站到 Cloudflare Pages..."

# 1. 构建项目
echo "📦 构建项目..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ 构建失败"
  exit 1
fi

echo "✅ 构建成功"

# 2. 压缩 dist 目录
echo "📦 压缩构建产物..."
cd dist && tar -czf ../dist.tar.gz * && cd ..

echo "✅ 压缩完成"

# 3. 部署说明
echo ""
echo "📝 部署说明："
echo "1. 访问 Cloudflare Dashboard: https://dash.cloudflare.com"
echo "2. 进入 Pages 页面"
echo "3. 点击 'Create a project'"
echo "4. 选择 'Upload assets'"
echo "5. 上传 dist.tar.gz 文件"
echo "6. 项目名称: cloudscape-docs"
echo "7. 完成部署"
echo ""
echo "或者使用 Wrangler CLI（需要登录）："
echo "npx wrangler pages deploy dist --project-name=cloudscape-docs"
echo ""
echo "✅ 准备完成！构建产物位于: dist/"
