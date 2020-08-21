//拼接当前日期事件字符串
function getCurrTime() {
    var currDate = new Date();
    var year = currDate.getFullYear();
    var month = currDate.getMonth() + 1;
    var date = currDate.getDate();
    var minute = currDate.getMinutes();
    var hour = currDate.getHours();
    var second = currDate.getSeconds();

    month = (month >= 1 && month <= 9) ? "0" + month : month;
    date = (date >= 1 && date <= 9) ? "0" + date : date;
    minute = (minute >= 1 && minute <= 9) ? "0" + minute : minute;
    hour = (hour >= 1 && hour <= 9) ? "0" + hour : hour;
    second = (second >= 0 && second <= 9) ? "0" + second : second;

    var current = year + month + date + '_' + hour + minute + second;
    return current;
}

function readFile(e) {
    if (window.FileReader) {
        let file = e.target.files[0];
        this.fileName = file.name.split(".")[0];
        let reader = new FileReader();
        reader.onload = function(evt) {
            return evt.target.result;
        }
        reader.readAsText(file);
    } else {
        alert('error');
    }
}

//xml转json对象，X2JS为外部js中的成熟方法
function xml2Json(xmlContent) {
    var x2js = new X2JS();
    return x2js.xml_str2json(xmlContent);
}

//判断是否Array
function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}

//将事件类型、方面名的code转text组合
//此方法属于优化不成熟的产物，想实现部分功能从model.js中分离，未能完成，仅仅是将少量方法独立到common
function getLabel(className, methodName) {
    var classArr = classmethod.filter(p => {
        return p.code == className;
    });

    if (classArr.length == 0) {
        return className + '-' + methodName;
    } else {
        var methodArr = classArr[0].children.filter(p => {
            return p.code == methodName;
        });
        if (methodArr.length == 0) {
            return classArr[0].text + '-' + methodName;
        } else {
            return classArr[0].text + '-' + methodArr[0].text;
        }
    }
}

//截取事件目标三大块数值
//160_UI_ImageColor_#objTestImage#obj#par00FF00#par#dotw0.8#1#1#0#dotw
function getTargetDatas(source, key) {
    var pos1 = source.indexOf(key);
    var pos2 = source.indexOf(key, pos1 + key.length);
    if (pos1 != -1) {
        return source.substring(pos1 + key.length, pos2);
    } else {
        return 'unfind';
    }

}

//如果参数为对象，则转为Array
function forceArr(node) {
    if (!isArray(node) && node != undefined) {
        //单个节点xml解析json后非对象数组
        var temp = [];
        temp.push(node);
        node = temp;
    }
    return node;
}

/* -----------------------------加密解密------------------------------------ Start */

// AES加密
function encryptAES (data, keys="dxhy2020", ivs="dxhy!@#") { // 加密
    console.log('加密',keys,ivs)
    const key = CryptoJS.enc.Utf8.parse(keys)
    const iv = CryptoJS.enc.Utf8.parse(ivs)

    const encrypted = CryptoJS.AES.encrypt(data, key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })
    return encrypted.toString()
}
// AES解密
function decryptAES (data, keys="dxhy2020", ivs="dxhy!@#") { // 解密
    console.log('解密',keys,ivs)
    const key = CryptoJS.enc.Utf8.parse(keys)
    const iv = CryptoJS.enc.Utf8.parse(ivs)
    const decrypted = CryptoJS.AES.decrypt(data.toString(), key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })
    return decrypted.toString(CryptoJS.enc.Utf8)
    // return decrypted
}
/* -----------------------------加密解密------------------------------------ End */


// 编码
function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

// 解码
function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}
