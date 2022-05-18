var Base64 = (function () {
    var ALPHA = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
    var Base64 = function () {};
    var _encode = function (value) {
        if (typeof(value) !== 'number') {
            throw 'Value is not number!';
        }
        var result = '', mod;
        do {
            mod = value % 64;
            result = ALPHA.charAt(mod) + result;
            value = Math.floor(value / 64);
        } while(value > 0);
        if (result.length == 1) {
        	result = "0" + result;
        }
        return result;
    };
    var _decode = function (value) {
        var result = 0;
        for (var i = 0, len = value.length; i < len; i++) {
            result *= 64;
            result += ALPHA.indexOf(value[i]);
        }
        return result;
    };
    Base64.prototype = {
        constructor: Base64,
        encode: _encode,
        decode: _decode
    };
    return Base64;
})();
var base64 = new Base64();
const wcobase64 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
var wcoi = 0;
var wcostr = "";
var wcostep = 0;
var wcocommands = []
var wcohighlight = -1;
var wcoh = -1
function wcogenerate(cvs, str, ret = false, high) {
	ctx = cvs.getContext('2d');
	wcostr = str;
	wcostep = 0;
	wcocommands = []
	wcoh = (high ? wcohighlight : -1)
	for (wcoi = 0; wcoi < wcostr.length; wcoi ++) {
		switch (wcostr[wcoi]) {
			case "c":
				wcocommand = ["Set Canvas Size", []]
				cvs.width = wcoir(0);
				cvs.height = wcoir(0);
				break;
			case "0":
				wcocommand = ["Draw Cube", []]
				var top_color = wcoir(1);
				var front_color = wcoir(1);
				var side_color = wcoir(1);
				var xpos = wcoir(0);
				var ypos = wcoir(0);
				var width = wcoir(0);
				var depth = width / 1.41421356237
				ctx.fillStyle = top_color;
				ctx.fillRect(xpos, ypos, width, width);
				for (var i = 0; i < depth; i ++) {
					ctx.fillStyle = side_color;
					ctx.fillRect(xpos + width + i, ypos + i + 1, 1, width);
					ctx.fillStyle = front_color;
					ctx.fillRect(xpos + i, ypos + width + i, width + 1, 1);
				}
				break;
			case "1":
				wcocommand = ["Draw Cuboid", []]
				var top_color = wcoir(1);
				var front_color = wcoir(1);
				var side_color = wcoir(1);
				var xpos = wcoir(0);
				var ypos = wcoir(0);
				var width = wcoir(0);
				var height = wcoir(0);
				var depth = wcoir(0) / 1.41421356237;
				ctx.fillStyle = top_color;
				ctx.fillRect(xpos, ypos, width, height);
				for (var i = 0; i < depth; i ++) {
					ctx.fillStyle = side_color;
					ctx.fillRect(xpos + width + i, ypos + i + 1, 1, height);
					ctx.fillStyle = front_color;
					ctx.fillRect(xpos + i, ypos + height + i, width + 1, 1);
				}
				break;
			case "2":
				wcocommand = ["Draw Top Square", []]
				var color = wcoir(1);
				var xpos = wcoir(0);
				var ypos = wcoir(0);
				var width = wcoir(0);
				ctx.fillStyle = color;
				ctx.fillRect(xpos, ypos, width, width);
				break;
			case "3":
				wcocommand = ["Draw Top Rectangle", []]
				var color = wcoir(1);
				var xpos = wcoir(0);
				var ypos = wcoir(0);
				var width = wcoir(0);
				var height = wcoir(0);
				ctx.fillStyle = color;
				ctx.fillRect(xpos, ypos, width, height);
				break;
			case "4":
				wcocommand = ["Draw Front Square", []]
				var color = wcoir(1);
				var xpos = wcoir(0);
				var ypos = wcoir(0);
				var width = wcoir(0);
				var depth = width / 1.41421356237;
				ctx.fillStyle = color;
				for (var i = 0; i < depth; i ++) {
					ctx.fillRect(xpos + i, ypos + i, width + 1, 1);
				}
				break;
			case "5":
				wcocommand = ["Draw Front Rectangle", []]
				var color = wcoir(1);
				var xpos = wcoir(0);
				var ypos = wcoir(0);
				var width = wcoir(0);
				var depth = wcoir(0) / 1.41421356237;
				ctx.fillStyle = color;
				for (var i = 0; i < depth; i ++) {
					ctx.fillRect(xpos + i, ypos + i, width + 1, 1);
				}
				break;
			case "6":
				wcocommand = ["Draw Side Square", []]
				var color = wcoir(1);
				var xpos = wcoir(0);
				var ypos = wcoir(0);
				var height = wcoir(0);
				var depth = height / 1.41421356237;
				ctx.fillStyle = color;
				for (var i = 0; i < depth; i ++) {
					ctx.fillRect(xpos + i, ypos + i + 1, 1, height);
				}
				break;
			case "7":
				wcocommand = ["Draw Side Rectangle", []]
				var color = wcoir(1);
				var xpos = wcoir(0);
				var ypos = wcoir(0);
				var height = wcoir(0);
				var depth = wcoir(0) / 1.41421356237;
				ctx.fillStyle = color;
				for (var i = 0; i < depth; i ++) {
					ctx.fillRect(xpos + i, ypos + i + 1, 1, height);
				}
				break;
			case "8":
				wcocommand = ["Draw Front Gradient", []]
				var color = wcoir(1);
				var fadecolor = wcoir(1);
				var xpos = wcoir(0);
				var ypos = wcoir(0);
				var width = wcoir(0);
				var depth = wcoir(0) / 1.41421356237;
				for (var i = 0; i < depth; i ++) {
					ctx.fillStyle = color;
					ctx.globalAlpha = 1;;
					ctx.fillRect(xpos + i, ypos + i, width + 1, 1);
					ctx.fillStyle = fadecolor;
					ctx.globalAlpha = i / depth;
					ctx.fillRect(xpos + i, ypos + i, width + 1, 1);
				}
				break;
			case "9":
				wcocommand = ["Draw Side Gradient", []]
				var color = wcoir(1);
				var fadecolor = wcoir(1);
				var xpos = wcoir(0);
				var ypos = wcoir(0);
				var height = wcoir(0);
				var depth = wcoir(0) / 1.41421356237;
				for (var i = 0; i < depth; i ++) {
					ctx.fillStyle = color;
					ctx.globalAlpha = 1;;
					ctx.fillRect(xpos + i, ypos + i + 1, 1, height);
					ctx.fillStyle = fadecolor;
					ctx.globalAlpha = i / depth;
					ctx.fillRect(xpos + i, ypos + i + 1, 1, height);
				}
				break;
			case "a":
				wcocommand = ["Draw Front Repeat", []]
				var color = wcoir(1);
				var xpos = wcoir(0);
				var ypos = wcoir(0);
				var width = wcoir(0);
				var depth = wcoir(0) / 1.41421356237;
				var repeatcount = wcoir(0);
				var repeatrange = wcoir(0);
				ctx.fillStyle = color;
				for (var r = 0; r < repeatcount; r ++) {
					for (var i = 0; i < depth; i ++) {
						ctx.fillRect(xpos + i + repeatrange * r, ypos + i + repeatrange * r, width + 1, 1);
					}
				}
				break;
			case "b":
				wcocommand = ["Draw Side Repeat", []]
				var color = wcoir(1);
				var xpos = wcoir(0);
				var ypos = wcoir(0);
				var height = wcoir(0);
				var depth = wcoir(0) / 1.41421356237;
				var repeatcount = wcoir(0);
				var repeatrange = wcoir(0);
				ctx.fillStyle = color;
				for (var r = 0; r < repeatcount; r ++) {
					for (var i = 0; i < depth; i ++) {
						ctx.fillRect(xpos + i + repeatrange * r, ypos + i + 1 + repeatrange * r, 1, height);
					}
				}
				break;
		}
		wcostep ++;
		wcocommands.push(wcocommand)
	}
	if (ret) {
		if (ret === "commands") {
			return wcocommands
		} else if (ret === "data") {
			return cvs.toDataURL()
		}
	}
}
function wcoir(type) {
	switch (type) {
		case 0:
			var wcoresult = base64.decode(wcostr[wcoi + 1] + wcostr[wcoi + 2])
			wcoi += 2;
			wcocommand[1].push(wcoresult)
			return wcoresult;
		case 1:
			if (wcoh == wcostep) {
				ctx.globalAlpha = 0.5
			} else {
				ctx.globalAlpha = 1
			}
			var wcoresult = "#" + wcostr[wcoi + 1] + wcostr[wcoi + 2] + wcostr[wcoi + 3] + wcostr[wcoi + 4] + wcostr[wcoi + 5] + wcostr[wcoi + 6];
			wcoi += 6;
			wcocommand[1].push(wcoresult)
			return wcoresult;
	}
}
function wcoextract(code) {
	wcocvs = document.createElement('canvas')
	return wcogenerate(wcocvs, code, "data", false)
}