import cc from "./colorconvert.js";
let 顏色s = [
	{ 中文: "藍色", 玩家名稱: "Player 1", 玩家名稱2: "Ｐ１", 名稱: "blue", 名稱2: "Blue", 名稱png: "blue", 通常: { hsl: [240, 1, 0.55] }, 地圖: { hsl: [240, 1, 0.5] } },
	{ 中文: "紅色", 玩家名稱: "Player 2", 玩家名稱2: "Ｐ２", 名稱: "red", 名稱2: "Red", 名稱png: "red", 通常: { hsl: [0, 1, 0.5] }, 地圖: { hsl: [0, 1, 0.5] } },
	{ 中文: "綠色", 玩家名稱: "Player 3", 玩家名稱2: "Ｐ３", 名稱: "green", 名稱2: "Green", 名稱png: "green", 通常: { hsl: [120, 1, 0.4] }, 地圖: { hsl: [120, 1, 0.5] } },

	{ 中文: "黃色", 玩家名稱: "Player 4", 玩家名稱2: "Ｐ４", 名稱: "yellow", 名稱2: "Yellow", 名稱png: "yellow", 通常: { hsl: [60, 1, 0.4] }, 地圖: { hsl: [60, 1, 0.5] } },
	{ 中文: "青色", 玩家名稱: "Player 5", 玩家名稱2: "Ｐ５", 名稱: "teal", 名稱2: "Aqua", 名稱png: "cyan", 通常: { hsl: [180, 1, 0.4] }, 地圖: { hsl: [180, 1, 0.5] } },
	{ 中文: "紫色", 玩家名稱: "Player 6", 玩家名稱2: "Ｐ６", 名稱: "purple", 名稱2: "Purple", 名稱png: "purple", 通常: { hsl: [330, 1, 0.75] }, 地圖: { hsl: [330, 1, 0.75] } },

	{ 中文: "灰色", 玩家名稱: "Player 7", 玩家名稱2: "Ｐ７", 名稱: "grey", 名稱2: "Grey", 名稱png: "grey", 通常: { hsl: [240, 0.8, 0.8] }, 地圖: { hsl: [240, 0.4, 0.15] } },
	{ 中文: "橘色", 玩家名稱: "Player 8", 玩家名稱2: "Ｐ８", 名稱: "orange", 名稱2: "Orange", 名稱png: "orange", 通常: { hsl: [30, 1, 0.55] }, 地圖: { hsl: [20, 1, 0.5] } },

	{ 中文: "白色", 玩家名稱: "Gaia", 玩家名稱2: "蓋亞", 名稱: "white", 名稱2: "White", 按鈕: false, 通常: { hsl: [240, 1, 0.95] }, 地圖: { hsl: [240, 1, 0.95] } }
];
let 混色 = [
	{ rgb: [0, 0, 0] },
	{ rgb: [32, 32, 32] },
	{ rgb: [64, 64, 64] },
	{ rgb: [128, 128, 128] },
	{ rgb: [192, 192, 192] },
	{ rgb: [224, 224, 224] },
	{ rgb: [255, 255, 255] },
	{ rgb: [128, 96, 64] },
	{ rgb: [96, 96, 96] }
];
let 混色2 = {
	"Text": { x: 6, y: 6 },
	"TextOutline": { x: 0, y: 15 },
	"Icons": { x: 0, y: 0 },
	"HealthBar": { x: 6, y: 6 },
	"TimelineDark": { x: 2, y: 8 },
	"TimelineLight": { x: 8, y: 5.5 },
	"MiniMap": { x: 0, y: 0 },
	"TechtreePreviewCiv": { x: 6, y: 6 }
};
let 檔案路徑 = [
	'resources/_common/palettes/',
	'widgetui/',
	''
];
let 圖片路徑 = [
	'widgetui/textures/menu/icons/',
	'widgetui/textures/ingame/icons/',
	'widgetui/textures/menu/timeline/',
	'widgetui/textures/ingame/panels/'
];

let 圖片集 = [
	[
		{ 名稱: c => `player_${c}_active` },
		{ 名稱: c => `player_${c}_hover` },
		{ 名稱: c => `player_${c}_normal` },
		{ 名稱: c => `player_${c}_other-players` },
		{ 名稱: c => `players_playercolor_icon_${c}` }
	], [
		{ 名稱: c => `player_${c}`, 換行: true }
	], [
		{ 名稱: c => `poststatistics_player_banner_${c}`, 換行: true },
		{ 名稱: c => `poststatistics_player_banner_${c}_left` },
		{ 名稱: c => `poststatistics_player_banner_${c}_middle` },
		{ 名稱: c => `poststatistics_player_banner_${c}_right`, 換格: true }
	], [
		{ 名稱: c => `player_banner_${c}` }
	]
];

function formatJson(json, tab = '') {
	if (typeof json == 'object') {
		if (Array.isArray(json)) {
			return `[${json.join(', ')}]`;
		} else {
			let a = [];
			for (let key in json) {
				a.push(`"${key}": ${formatJson(json[key], tab + '  ')}`);
			}
			return `{\r\n  ${tab}${a.join(',\r\n  ' + tab)}\r\n${tab}}`;
		}
	} else {
		return json;
	}
}

function formatJson2(json, tab = '') {
	if ('FloatRGBA' in json) {
		let f = c => c.toFixed(2);
		return (c => `{ "FloatRGBA": { "r": ${f(c.r)}, "g": ${f(c.g)}, "b": ${f(c.b)}, "a": ${f(c.a)} } }`)(json.FloatRGBA);
	} else if (typeof json == 'object') {
		let a = [];
		for (let key in json) {
			a.push(`"${key}": ${formatJson2(json[key], tab + '\t')}`);
		}
		return `{\r\n\t${tab}${a.join(',\r\n\t' + tab)}\r\n${tab}}`;
	} else {
		return json;
	}
}

function 混和(顏色1, 顏色2, 比例) {
	let 比例1 = 1 - 比例;
	return [
		顏色1[0] * 比例1 + 顏色2[0] * 比例,
		顏色1[1] * 比例1 + 顏色2[1] * 比例,
		顏色1[2] * 比例1 + 顏色2[2] * 比例
	];
}

function 圖片混色(r, g, b, 顏色) {
	let hwb = cc.rgb.hwb(r, g, b);
	let 灰階比例 = hwb[1] + hwb[2];
	let 顏色hsl = [...顏色.通常.hsl];
	顏色hsl[0] += hwb[0];
	顏色hsl[0] %= 360;
	let 顏色rgb = cc.hsl.rgb(...顏色hsl);
	let 灰階rgb = 灰階比例 == 0 ? [0, 0, 0] : cc.hwb.rgb(0, hwb[1] / 灰階比例, hwb[2] / 灰階比例);
	return 混和(顏色rgb, 灰階rgb, 灰階比例);
}

function 圖片建立(i1) {
	let i2 = document.createElement('canvas');
	i2.width = i1.naturalWidth;
	i2.height = i1.naturalHeight;
	return i2;
}

function 圖片換色(i1, i2, 顏色) {
	let w = i1.naturalWidth;
	let h = i1.naturalHeight;
	let ctx = i2.getContext('2d');
	ctx.clearRect(0, 0, w, h);
	ctx.drawImage(i1, 0, 0);
	let imgdt = ctx.getImageData(0, 0, w, h);
	let a = imgdt.data;
	for (let k = 0; k < a.length; k += 4) {
		let t = 圖片混色(a[k], a[k + 1], a[k + 2], 顏色);
		a[k] = Math.round(t[0]);
		a[k + 1] = Math.round(t[1]);
		a[k + 2] = Math.round(t[2]);
	}
	ctx.putImageData(imgdt, 0, 0);
}

let 按鈕表 = text2html(`<table class="bt"><tr><td>切換玩家：</td></tr><tr><td>通常顏色：</td></tr><tr><td>地圖顏色：</td></tr><tr></tr><tr></tr></table>`);
document.body.append(按鈕表);
let 按鈕trs = 按鈕表.querySelectorAll('tr');

let zip = new JSZip();
let 重新td = text2html('<td colspan="9"></td>');
按鈕trs[3].append(重新td);
let 重新 = text2html(`<button>重新製作</button>`);
重新td.append('修改完顏色需要重新製作：', 重新);
let 下載td = text2html('<td colspan="9"></td>');
按鈕trs[4].append(下載td);
let 檔名 = text2html(`<input type="text" id="filename" value="Player Color">`);
下載td.append('檔案名稱：', 檔名);
let 下載 = text2html(`<button>下載檔案</button>`);
下載td.append(下載);

let ui = await loadfile('json', `orgfile/${檔案路徑[1]}UIColors.json`);
let sprite = await loadfile('json', `orgfile/${檔案路徑[2]}spritecolors.json`);
let org_sprite = await loadfile('text', `orgfile/${檔案路徑[2]}org_spritecolors.json`);

let 圖片p = [];
let 圖片 = [];
for (let [key, 檔案s] of Object.entries(圖片集)) {
	圖片p[key] = [];
	for (let [n, 檔案] of Object.entries(檔案s)) {
		圖片p[key][n] = loadimg(`orgfile/${圖片路徑[key]}${檔案.名稱('red')}.png`);
	}
	圖片 = await Promise.all(圖片p.map(a => Promise.all(a)));
}
function 顯示顏色數值(rgb) {
	return '';
	let mod = 'rgb';
	let f = (a, b, c) => `<span>${a}<br>${b}<br>${c}</span>`;
	switch (mod) {
		case 'rgb':
			return f(rgb[0].toFixed(0), rgb[1].toFixed(0), rgb[2].toFixed(0));
		case 'hsl':
			let hsl = cc.rgb.hsl(...rgb);
			return f((hsl[0]).toFixed(1), (hsl[1] * 100).toFixed(3), (hsl[2] * 100).toFixed(3));
		case 'hwb':
			let hwb = cc.rgb.hwb(...rgb);
			return f((hwb[0]).toFixed(1), (hwb[1] * 100).toFixed(3), (hwb[2] * 100).toFixed(3));
		default:
			return f(rgb[0].toFixed(0), rgb[1].toFixed(0), rgb[2].toFixed(0));
	}
}

function 製作通常顏色(顏色) {
	let 輸出pal = 'JASC-PAL\r\n0100\r\n256\r\n';
	for (let k = 0; k < 8; k++) {
		for (let j = 0; j < 16; j++) {
			let a = 混和(顏色.通常.rgb, 混色[k].rgb, j / 15).map(c => Math.round(c));
			輸出pal += a.join(' ') + '\r\n';
			let td = 顏色.pal表[k][j];
			td.style.backgroundColor = `rgb(${a.join(',')})`;
			td.innerHTML = 顯示顏色數值(a);
		}
	}
	for (let j = 0; j < 128; j++) {
		輸出pal += '0 0 0\r\n';
	}
	zip.file(`${檔案路徑[0]}playercolor_${顏色.名稱}.pal`, 輸出pal);

	for (let key in sprite) {
		(rgba => {
			rgba.r = 顏色.通常.rgb[0] / 255;
			rgba.g = 顏色.通常.rgb[1] / 255;
			rgba.b = 顏色.通常.rgb[2] / 255;
		})(sprite[key][顏色.玩家名稱].FloatRGBA);
	}

	if (顏色.按鈕 !== false) {
		for (let [key, 檔案s] of Object.entries(圖片集)) {
			for (let [n, 檔案] of Object.entries(檔案s)) {
				圖片換色(圖片[key][n], 顏色.圖[key][n], 顏色);
				let c = 顏色.圖[key][n];
				zip.file(`${圖片路徑[key]}${檔案.名稱(顏色.名稱png)}.png`, c.toDataURL().replace(/^data:image\/png;base64,/, ''), { base64: true });
			}
		}
	}
}
function 製作地圖顏色(顏色) {
	for (let key in ui.ColorTables[顏色.名稱2]) {
		let a = 混和(顏色.地圖.rgb, 混色[混色2[key].x].rgb, 混色2[key].y / 15).map(c => Math.round(c));
		let rgba = ui.ColorTables[顏色.名稱2][key];
		rgba[0] = a[0];
		rgba[1] = a[1];
		rgba[2] = a[2];
		let td = 顏色.pal表[8][key];
		td.style.backgroundColor = `rgb(${a.join(',')})`;
		td.innerHTML = 顯示顏色數值(a);
	}
}

for (let [i, 顏色] of Object.entries(顏色s)) {
	顏色.通常.rgb = cc.hsl.rgb(...顏色.通常.hsl);
	顏色.通常.hex = cc.rgb.hex(...顏色.通常.rgb);
	顏色.地圖.rgb = cc.hsl.rgb(...顏色.地圖.hsl);
	顏色.地圖.hex = cc.rgb.hex(...顏色.地圖.rgb);
	let tablebig = text2html(`<table class="show"><tr><td></td><td></td><td></td></tr></table>`);
	document.body.append(tablebig);
	let 按鈕td = text2html('<td></td>');
	按鈕trs[0].append(按鈕td);
	let 按鈕 = text2html(`<button>${顏色.玩家名稱2}</button>`);
	按鈕.onclick = () => {
		let ss = document.querySelectorAll('.show');
		for (let s of ss) {
			s.style.display = 'none';
		}
		tablebig.style.display = 'inline';
	};
	if (顏色.玩家名稱2 == "Ｐ１") 按鈕.click();
	按鈕td.append(按鈕);

	let 通常輸入td = text2html('<td></td>');
	按鈕trs[1].append(通常輸入td);
	let 通常輸入 = text2html('<input type="text">');
	通常輸入td.append(通常輸入);
	Object.defineProperty(顏色.通常, '輸入', {
		set: v => 通常輸入.value = v,
		get: () => 通常輸入.value
	});
	顏色.通常.輸入 = 顏色.通常.hex;

	let 地圖輸入td = text2html('<td></td>');
	按鈕trs[2].append(地圖輸入td);
	let 地圖輸入 = text2html('<input type="text">');
	地圖輸入td.append(地圖輸入);
	Object.defineProperty(顏色.地圖, '輸入', {
		set: v => 地圖輸入.value = v,
		get: () => 地圖輸入.value
	});
	顏色.地圖.輸入 = 顏色.地圖.hex;

	let tdbigarr = tablebig.querySelectorAll('td');

	let table = text2html(`<table class="color"></table>`);
	tdbigarr[0].append(table);

	let trarr = [];
	for (let k = 0; k < 9; k++) {
		trarr[k] = text2html('<tr></tr>');
		table.append(trarr[k]);
	}
	顏色.pal表 = [];
	for (let k = 0; k < 8; k++) {
		for (let j = 0; j < 16; j++) {
			let td = text2html(`<td></td>`);
			trarr[k].append(td);
		}
		顏色.pal表[k] = trarr[k].querySelectorAll('td');
	}
	顏色.pal表[8] = [];
	for (let key in ui.ColorTables[顏色.名稱2]) {
		let td = text2html(`<td></td>`);
		trarr[8].append(td);
		顏色.pal表[8][key] = td;
	}
	顏色.圖 = [];
	let 格數 = 1;
	for (let [key, 檔案s] of Object.entries(圖片集)) {
		顏色.圖[key] = [];
		for (let [n, 檔案] of Object.entries(檔案s)) {
			let c = 圖片建立(圖片[key][n]);
			tdbigarr[格數].append(c);
			顏色.圖[key][n] = c;
			if (檔案.換行 === true) tdbigarr[格數].append(text2html('<br>'));
			if (檔案.換格 === true) 格數++;
		}
	}
	製作通常顏色(顏色);
	製作地圖顏色(顏色);
}

zip.file(`${檔案路徑[1]}UIColors.json`, formatJson(ui));
zip.file(`${檔案路徑[2]}spritecolors.json`, formatJson2(sprite));
zip.file(`${檔案路徑[2]}org_spritecolors.json`, org_sprite);

let content = await zip.generateAsync({ type: "base64" });
下載.onclick = function () {
	startDownload('data:application/zip;base64,' + content, 檔名 + '.zip');
};

let 確認hex = hex => hex.search(/^\#[0-9A-Fa-f]{3}$/) == 0 || hex.search(/^\#[0-9A-Fa-f]{6}$/) == 0;

重新.onclick = async () => {
	for (let [i, 顏色] of Object.entries(顏色s)) {
		if (顏色.通常.hex != 顏色.通常.輸入 && 確認hex(顏色.通常.輸入)) {
			顏色.通常.hex = 顏色.通常.輸入;
			顏色.通常.rgb = cc.hex.rgb(顏色.通常.hex);
			顏色.通常.hsl = cc.rgb.hsl(...顏色.通常.rgb);
			製作通常顏色(顏色);
		}
		if (顏色.地圖.hex != 顏色.地圖.輸入 && 確認hex(顏色.地圖.輸入)) {
			顏色.地圖.hex = 顏色.地圖.輸入;
			顏色.地圖.rgb = cc.hex.rgb(顏色.地圖.hex);
			顏色.地圖.hsl = cc.rgb.hsl(...顏色.地圖.rgb);
			製作地圖顏色(顏色);
		}
	}
	content = await zip.generateAsync({ type: "base64" });
};