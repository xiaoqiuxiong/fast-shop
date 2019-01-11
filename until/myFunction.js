// 定义ejs的方法
var fun = {};
/*
 * 字符串截取
 * @str    截取字符串
 * @start  开始截取位置
 * @end    结束截取位置
 */
fun.substring = function(str, start, end){
    if(end){
        return str.substring(start, end);
    }else{
        return str.substring(start);
    }
},
 /*
 * 时间格式化
 * @time   需要转换的时间
 */
fun.timeformat = function(time){
    return new Date(time).toLocaleDateString().replace(/\//g, "-") + " " + new Date(time).toTimeString().substr(0, 8)
}

module.exports = fun;