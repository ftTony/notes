#! /bin/bash
SITE_PATH =''

cd $SITE_PATH
git reset --hard origin/master
git clean -f
git pull

npm install