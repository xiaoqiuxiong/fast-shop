const qiniu = require("qiniu");
//需要填写你的 Access Key 和 Secret Key
const ACCESS_KEY = 'bZ4B2miQ367b-6HUfYntJAQC7DLeb2HJmispyDjg';
const SECRET_KEY = '2vLegt8TgR4kzBIAJr6HIhYC-X-vxF6FOPvjaHup';
qiniu.conf.ACCESS_KEY = ACCESS_KEY;
qiniu.conf.SECRET_KEY = SECRET_KEY;
var mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);

module.exports = (bucket) => {
    //构建上传策略函数
    function uptoken(bucket) {
        var putPolicy = new qiniu.rs.PutPolicy({
            scope: bucket,
            returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":"$(fsize)","bucket":"$(bucket)","name":"$(x:name)","imageWidth":"$(imageInfo.width)","imageHeight":"$(imageInfo.height)"}'
        });
        return putPolicy.uploadToken(mac);
    }
    //生成上传 Token
    token = uptoken(bucket);
    return token;
}