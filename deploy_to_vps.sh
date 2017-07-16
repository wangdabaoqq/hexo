#!/bin/sh
rsync -rvz -e 'ssh -p 22' --progress -a ./public root@47.94.153.153:/www/hexo/hexo/
