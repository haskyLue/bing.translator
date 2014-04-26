//language code:en,zh-CHS
var bt = require('./translate.js').init({
	client_id: '6b3a845a-56be-4a3a-ab0e-e46674d150ab',
	client_secret: 'ldb19920204ldb19920204'
});
var arg = process.argv;
var from = '';
var to = arg[2] * 1 == 0 ? "zh-CHS" : "en";
console.log('---\n' +
			'---\t翻译内容加上引号,xargs未加-0选项\n' +
			'---\t1代表翻译成英文;0代表翻译成中文\n' +
			'---\texample : bing {enter} 0 {enter} "nice to meet you too" {enter} EOF\n' +
			'---');
//console.error(arg);
if (arg.length < 4) {
	console.error('输入非法');
	return;
}

bt.translate(arg.slice(3).join(',').trim(), from, to, function(err, res) {
	console.log("\n翻译原文：" + res.original_text);
	console.log("\n翻译结果：" + res.translated_text);
});
