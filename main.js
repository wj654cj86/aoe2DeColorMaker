import cc from "./colorconvert.js";
let 顏色s = [
	{ 名稱: { 中文: "Ｐ１", 玩家: "Player 1", pal: "blue", ui: "Blue", png: "blue" }, 範圍: 24, 通常: { hsl: [240, 1, 0.55] }, 地圖: { hsl: [240, 1, 0.5] } },
	{ 名稱: { 中文: "Ｐ２", 玩家: "Player 2", pal: "red", ui: "Red", png: "red" }, 範圍: 40, 通常: { hsl: [0, 1, 0.5] }, 地圖: { hsl: [0, 1, 0.5] } },
	{ 名稱: { 中文: "Ｐ３", 玩家: "Player 3", pal: "green", ui: "Green", png: "green" }, 範圍: 245, 通常: { hsl: [120, 1, 0.4] }, 地圖: { hsl: [120, 1, 0.5] } },

	{ 名稱: { 中文: "Ｐ４", 玩家: "Player 4", pal: "yellow", ui: "Yellow", png: "yellow" }, 範圍: 247, 通常: { hsl: [60, 1, 0.4] }, 地圖: { hsl: [60, 1, 0.5] } },
	{ 名稱: { 中文: "Ｐ５", 玩家: "Player 5", pal: "teal", ui: "Aqua", png: "cyan" }, 範圍: 255, 通常: { hsl: [180, 1, 0.4] }, 地圖: { hsl: [180, 1, 0.5] } },
	{ 名稱: { 中文: "Ｐ６", 玩家: "Player 6", pal: "purple", ui: "Purple", png: "purple" }, 範圍: 256, 通常: { hsl: [330, 1, 0.75] }, 地圖: { hsl: [330, 1, 0.75] } },

	{ 名稱: { 中文: "Ｐ７", 玩家: "Player 7", pal: "grey", ui: "Grey", png: "grey" }, 範圍: 17, 通常: { hsl: [240, 0.4, 0.7] }, 地圖: { hsl: [240, 0.2, 0.4] } },
	{ 名稱: { 中文: "Ｐ８", 玩家: "Player 8", pal: "orange", ui: "Orange", png: "orange" }, 範圍: 89, 通常: { hsl: [30, 1, 0.55] }, 地圖: { hsl: [20, 1, 0.5] } },

	{ 名稱: { 中文: "蓋亞", 玩家: "Gaia", pal: "white", ui: "White" }, 按鈕: false, 通常: { hsl: [240, 1, 0.95] }, 地圖: { hsl: [240, 1, 0.95] } }
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
let 混色ui = {
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

function ui_format(json, tab = '') {
	if (typeof json == 'object') {
		if (Array.isArray(json)) {
			return `[${json.join(', ')}]`;
		} else {
			let a = [];
			for (let key in json) {
				a.push(`"${key}": ${ui_format(json[key], tab + '  ')}`);
			}
			return `{\r\n  ${tab}${a.join(',\r\n  ' + tab)}\r\n${tab}}`;
		}
	} else {
		return json;
	}
}

function sprite_format(json, tab = '') {
	if ('FloatRGBA' in json) {
		let f = c => c.toFixed(3);
		return (c => `{ "FloatRGBA": { "r": ${f(c.r)}, "g": ${f(c.g)}, "b": ${f(c.b)}, "a": ${f(c.a)} } }`)(json.FloatRGBA);
	} else if (typeof json == 'object') {
		let a = [];
		for (let key in json) {
			a.push(`"${key}": ${sprite_format(json[key], tab + '\t')}`);
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

let 按鈕表 = text2html(`<table class="bt"><tr><td>切換玩家：</td></tr><tr><td>通常顏色：</td></tr><tr><td>地圖顏色：</td></tr><tr><td>是否修改：</td></tr><tr></tr><tr></tr></table>`);
document.body.append(按鈕表);
let 按鈕trs = 按鈕表.querySelectorAll('tr');

let zip = new JSZip();
let 重新td = text2html('<td colspan="9"></td>');
按鈕trs[4].append(重新td);
let 重新 = text2html(`<button style="width:100px;">重新製作</button>`);
重新td.append('修改完顏色或是點選是否修改都要重新製作：', 重新);
let 下載td = text2html('<td colspan="9"></td>');
按鈕trs[5].append(下載td);
let 檔名 = text2html(`<input type="text" id="filename" value="Player Color">`);
下載td.append('檔案名稱：', 檔名);
let 下載 = text2html(`<button style="width:100px;">下載檔案</button>`);
下載td.append(下載);

let ui = await loadfile('json', `orgfile/${檔案路徑[1]}UIColors.json`);
let org_ui = await loadfile('json', `orgfile/${檔案路徑[1]}UIColors.json`);
let sprite = await loadfile('json', `orgfile/${檔案路徑[2]}spritecolors.json`);
let org_sprite = await loadfile('json', `orgfile/${檔案路徑[2]}spritecolors.json`);
let bina = await loadfile('text', `orgfile/${檔案路徑[2]}50500.bina`).then(str => str.replace(/\r\n/g, '\n').split('\n'));
let org_bina = await loadfile('text', `orgfile/${檔案路徑[2]}50500.bina`).then(str => str.replace(/\r\n/g, '\n').split('\n'));

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
let 製作顏色 = {
	通常: 顏色 => {
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
		顏色.輸出pal = 輸出pal;
		if (顏色.按鈕 !== false) {
			for (let [key, 檔案s] of Object.entries(圖片集)) {
				for (let [n, 檔案] of Object.entries(檔案s)) {
					圖片換色(圖片[key][n], 顏色.圖[key][n], 顏色);
				}
			}
		}
	},
	地圖: 顏色 => {
		顏色.ui = {};
		for (let key in ui.ColorTables[顏色.名稱.ui]) {
			let a = 混和(顏色.地圖.rgb, 混色[混色ui[key].x].rgb, 混色ui[key].y / 15).map(c => Math.round(c));
			顏色.ui[key] = [];
			顏色.ui[key][0] = a[0];
			顏色.ui[key][1] = a[1];
			顏色.ui[key][2] = a[2];
			let td = 顏色.pal表[8][key];
			td.style.backgroundColor = `rgb(${a.join(',')})`;
			td.innerHTML = 顯示顏色數值(a);
		}
	}
};

let 加載顏色 = {
	通常: 顏色 => {
		zip.file(`${檔案路徑[0]}playercolor_${顏色.名稱.pal}.pal`, 顏色.輸出pal);
		bina[顏色.範圍 - 1] = 顏色.通常.rgb.map(c => Math.round(c)).join(' ');
		for (let key in sprite) {
			(rgba => {
				rgba.r = 顏色.通常.rgb[0] / 255;
				rgba.g = 顏色.通常.rgb[1] / 255;
				rgba.b = 顏色.通常.rgb[2] / 255;
			})(sprite[key][顏色.名稱.玩家].FloatRGBA);
		}
		if (顏色.按鈕 !== false) {
			for (let [key, 檔案s] of Object.entries(圖片集)) {
				for (let [n, 檔案] of Object.entries(檔案s)) {
					let c = 顏色.圖[key][n];
					zip.file(`${圖片路徑[key]}${檔案.名稱(顏色.名稱.png)}.png`, c.toDataURL().replace(/^data:image\/png;base64,/, ''), { base64: true });
				}
			}
		}
	},
	地圖: 顏色 => {
		for (let key in ui.ColorTables[顏色.名稱.ui]) {
			let rgba = ui.ColorTables[顏色.名稱.ui][key];
			rgba[0] = 顏色.ui[key][0];
			rgba[1] = 顏色.ui[key][1];
			rgba[2] = 顏色.ui[key][2];
		}
	}
};

let 復原顏色 = {
	通常: 顏色 => {
		zip.remove(`${檔案路徑[0]}playercolor_${顏色.名稱.pal}.pal`);
		bina[顏色.範圍 - 1] = org_bina[顏色.範圍 - 1];
		for (let key in sprite) {
			((rgba, rgba2) => {
				rgba.r = rgba2.r;
				rgba.g = rgba2.g;
				rgba.b = rgba2.b;
			})(sprite[key][顏色.名稱.玩家].FloatRGBA, org_sprite[key][顏色.名稱.玩家].FloatRGBA);
		}
		if (顏色.按鈕 !== false) {
			for (let [key, 檔案s] of Object.entries(圖片集)) {
				for (let [n, 檔案] of Object.entries(檔案s)) {
					zip.remove(`${圖片路徑[key]}${檔案.名稱(顏色.名稱.png)}.png`);
				}
			}
		}
	},
	地圖: 顏色 => {
		for (let key in ui.ColorTables[顏色.名稱.ui]) {
			let rgba = ui.ColorTables[顏色.名稱.ui][key];
			let rgba2 = org_ui.ColorTables[顏色.名稱.ui][key];
			rgba[0] = rgba2[0];
			rgba[1] = rgba2[1];
			rgba[2] = rgba2[2];
		}
	}
};


for (let [i, 顏色] of Object.entries(顏色s)) {
	let tablebig = text2html(`<table class="show"><tr><td></td><td></td><td></td></tr></table>`);
	document.body.append(tablebig);
	let 按鈕td = text2html('<td></td>');
	按鈕trs[0].append(按鈕td);
	let 按鈕 = text2html(`<button>${顏色.名稱.中文}</button>`);
	按鈕.onclick = () => {
		let ss = document.querySelectorAll('.show');
		for (let s of ss) {
			s.style.display = 'none';
		}
		tablebig.style.display = 'inline';
	};
	if (顏色.名稱.中文 == "Ｐ１") 按鈕.click();
	按鈕td.append(按鈕);

	let 顏色與輸入配置 = (類型, 位置) => {
		類型.rgb = cc.hsl.rgb(...類型.hsl);
		類型.hex = cc.rgb.hex(...類型.rgb);
		let 輸入td = text2html('<td></td>');
		按鈕trs[位置].append(輸入td);
		let 輸入 = text2html('<input type="color">');
		輸入td.append(輸入);
		Object.defineProperty(類型, '輸入', {
			set: v => 輸入.value = v,
			get: () => 輸入.value
		});
		類型.輸入 = 類型.hex;
	};
	顏色與輸入配置(顏色.通常, 1);
	顏色與輸入配置(顏色.地圖, 2);

	let 修改td = text2html('<td></td>');
	按鈕trs[3].append(修改td);
	let 修改 = text2html('<input type="checkbox">');
	修改td.append(修改);
	修改.checked = true;
	Object.defineProperty(顏色, '修改', { get: () => 修改.checked });

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
	for (let key in ui.ColorTables[顏色.名稱.ui]) {
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
	製作顏色.通常(顏色);
	製作顏色.地圖(顏色);
	加載顏色.通常(顏色);
	加載顏色.地圖(顏色);
}

zip.file(`${檔案路徑[1]}UIColors.json`, ui_format(ui));
zip.file(`${檔案路徑[2]}spritecolors.json`, sprite_format(sprite));
zip.file(`${檔案路徑[2]}org_spritecolors.json`, sprite_format(org_sprite));
zip.file(`${檔案路徑[2]}50500.bina`, bina.join('\r\n'));
zip.file(`${檔案路徑[2]}org_50500.bina`, org_bina.join('\r\n'));

let content = await zip.generateAsync({ type: "base64" });
下載.onclick = () => startDownload('data:application/zip;base64,' + content, 檔名.value + '.zip');
重新.onclick = async () => {
	for (let [i, 顏色] of Object.entries(顏色s)) {
		let 判斷與製作 = 類型 => {
			if (顏色[類型].hex != 顏色[類型].輸入) {
				顏色[類型].hex = 顏色[類型].輸入;
				顏色[類型].rgb = cc.hex.rgb(顏色[類型].hex);
				顏色[類型].hsl = cc.rgb.hsl(...顏色[類型].rgb);
				製作顏色[類型](顏色);
			}
		};
		if (顏色.修改) {
			判斷與製作('通常');
			判斷與製作('地圖');
			加載顏色.通常(顏色);
			加載顏色.地圖(顏色);
		} else {
			復原顏色.通常(顏色);
			復原顏色.地圖(顏色);
		}
	}
	zip.file(`${檔案路徑[1]}UIColors.json`, ui_format(ui));
	zip.file(`${檔案路徑[2]}spritecolors.json`, sprite_format(sprite));
	zip.file(`${檔案路徑[2]}50500.bina`, bina.join('\r\n'));
	content = await zip.generateAsync({ type: "base64" });
};