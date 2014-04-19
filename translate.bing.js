var bt = require('./translate.js').init({
    client_id: '6b3a845a-56be-4a3a-ab0e-e46674d150ab',
    client_secret: 'ldb19920204ldb19920204'
});
var arg = process.argv;
// console.log(arg);
var contents = arg[2];
if (arg.length > 3) {
    console.log('参数过多！');
    return;
}
bt.translate(contents, 'en', 'zh-CHS', function(err, res) {
    console.log("\n翻译结果：	" + res.translated_text);
});