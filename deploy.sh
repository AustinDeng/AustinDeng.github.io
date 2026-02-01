#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
# set -e

# source ~/.nvm/nvm.sh

nvm use 22

# 生成静态文件
pnpm run docs:build

# 进入生成的文件夹
cd src/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:AustinDeng/AustinDeng.github.io.git master:gh-pages
