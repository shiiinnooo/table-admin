#!/usr/bin/env sh

# 檢查有沒有 dist 資料夾，如果有的話，就移除
DIR="./dist"
if [ -d "$DIR" ]; then
    yes | rm -r ./dist
fi

# 當發生錯誤時終止腳本運行
set -e
# 建立輸出檔案
npm run build

# 移動至到打包後的 dist 目錄 
cd dist

# 因為 dist 資料夾預設是被 ignore 的，因此在進入 dist 資料夾後初始化 git
git init 
git add -A
git commit -m 'deploy'
git push -f https://github.com/shiiinnooo/table-admin.git master:gh-pages
cd -

# 執行指令，在終端機輸入 sh deploy.sh