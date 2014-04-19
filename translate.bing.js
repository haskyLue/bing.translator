var bt = require('./translate.js').init({
	client_id: '6b3a845a-56be-4a3a-ab0e-e46674d150ab',
	client_secret: 'ldb19920204ldb19920204'
});
var arg = process.argv;
var from = 'en';
var to = 'zh-CHS';

console.log('>>>>>>>>>>>>>>>>>>>>完整的句子请加上引号>>>>>>>>>>>>>>>>>>>>');
if (arg.length < 3) {
	return;
}

bt.translate(arg.slice(2).join(',').trim(), from, to, function(err, res) {
	console.log("\n翻译原文：" + res.original_text);
	console.log("\n翻译结果：" + res.translated_text);
	console.log("\n<<<<<<<<<<<<<<<<<<<<<<<<<<完整的句子请加上引号<<<<<<<<<<<<<<<<<<<<<<<<<<'");
});