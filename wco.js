var wcostr, wcoi;
const wcobase64 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
class Wco {
	constructor(code) {
		this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		wcostr = code.replaceAll(" ","");
		for (wcoi = 0; wcoi < wcostr.length; wcoi ++) {
			switch (wcostr[wcoi]) {
				case "_": //set canvas size
					var width = wcoir(0);
					var height = wcoir(0);
					this.svg.setAttribute('width', width);
					this.svg.setAttribute('height', height);
					this.svg.innerHTML = "";
					break;
				case "0": //cube
					var topfill = wcoir(1);
					var frontfill = wcoir(1);
					var sidefill = wcoir(1);
					var xpos = wcoir(0);
					var ypos = wcoir(0);
					var width = wcoir(0);
					var height = width;
					var depth = width / 1.41421356237;
					this.svg.innerHTML += `
					<rect x="${xpos}" y="${ypos}" width="${width}" height="${width}" fill="${topfill}"/>
					<polygon points="${xpos + width},${ypos} ${xpos + width + depth},${ypos + depth} ${xpos + width + depth},${ypos + height + depth + 1} ${xpos + width},${ypos + height + 1}" fill="${sidefill}"/>
					<polygon points="${xpos},${ypos + height} ${xpos + depth},${ypos + height + depth} ${xpos + width + depth},${ypos + height + depth} ${xpos + width},${ypos + height}" fill="${frontfill}"/>
					`
					break;
				case "1": //cuboid
					var topfill = wcoir(1);
					var frontfill = wcoir(1);
					var sidefill = wcoir(1);
					var xpos = wcoir(0);
					var ypos = wcoir(0);
					var width = wcoir(0);
					var height = wcoir(0);
					var depth = wcoir(0);
					this.svg.innerHTML += `
					<rect x="${xpos}" y="${ypos}" width="${width}" height="${height}" fill="${topfill}"/>
					<polygon points="${xpos + width},${ypos} ${xpos + width + depth},${ypos + depth} ${xpos + width + depth},${ypos + height + depth + 1} ${xpos + width},${ypos + height + 1}" fill="${sidefill}"/>
					<polygon points="${xpos},${ypos + height} ${xpos + depth},${ypos + height + depth} ${xpos + width + depth},${ypos + height + depth} ${xpos + width},${ypos + height}" fill="${frontfill}"/>
					`
					break;
				case "2": //square
					var xpos = wcoir(0);
					var ypos = wcoir(0);
					var width = wcoir(0);
					var fill = wcoir(1);
					this.svg.innerHTML += `<rect x="${xpos}" y="${ypos}" width="${width}" height="${width}" fill="${fill}"/>`;
					break;
				case "3": //rect
					var xpos = wcoir(0);
					var ypos = wcoir(0);
					var width = wcoir(0);
					var height = wcoir(0);
					var fill = wcoir(1);
					this.svg.innerHTML += `<rect x="${xpos}" y="${ypos}" width="${width}" height="${height}" fill="${fill}"/>`;
					break;
				case "C": //circle
					var xpos = wcoir(0);
					var ypos = wcoir(0);
					var radius = wcoir(0);
					var fill = wcoir(1);
					this.svg.innerHTML += `<circle cx="${xpos}" cy="${ypos}" r="${radius}" fill="${fill}">`
					break;
			}
		}
		const xml = new XMLSerializer().serializeToString(this.svg);
		this.img = new Image()
		this.img.src = 'data:image/svg+xml;base64,' + btoa(xml)
	}
}

var Base64 = (function () {
    var Base64 = function () {};
    var _encode = function (value) {
        if (typeof(value) !== 'number') {
            throw 'Value is not number!';
        }
        var result = '', mod;
        do {
            mod = value % 64;
            result = wcobase64.charAt(mod) + result;
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
            result += wcobase64.indexOf(value[i]);
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

function wcoir(type) {
	switch (type) {
		case 0:
			var wcoresult = base64.decode(wcostr[wcoi + 1] + wcostr[wcoi + 2])
			wcoi += 2;
			return wcoresult;
		case 1:
			var wcoresult = "#" + wcostr[wcoi + 1] + wcostr[wcoi + 2] + wcostr[wcoi + 3] + wcostr[wcoi + 4] + wcostr[wcoi + 5] + wcostr[wcoi + 6];
			wcoi += 6;
			return wcoresult;
	}
}