#!/bin/sh
hexo g
rsync -rvz -e 'ssh -p 22' --progress -a ./public wangdabao@47.94.153.153:/www/hexo2
