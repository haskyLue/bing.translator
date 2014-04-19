## 说明

修改 [bing-translator](https://www.npmjs.org/package/bing-translate) 自用，及时更新并存储token，优先读取本地token

http请求加了本地goagent代理，这样快多了;https以后再处理啦

> `vim ~/.bashrc`--->`alias translate="cat << EOF | xargs -0 -I {} sudo node /usr/local/lib/bing.translator/translate.bing.js {}"`
> 
> `translate`--->原文+EOF--->enter!

