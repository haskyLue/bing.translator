## 说明

修改 [bing-translator](https://www.npmjs.org/package/bing-translate) 自用，及时更新并存储token，优先读取本地token

`vim ~/.bashrc`--->`alias translate="cat << EOF | xargs -0 -I {} sudo node /usr/local/lib/bing.translator/translate.bing.js {}"`

`translate`--->原文+EOF--->enter!

> 貌似还是慢==
