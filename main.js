function onOpen(e) {
	var spreadsheet = SpreadsheetApp.getActive();
	var menuItems = [{
		name: 'Open sidebar',
		functionName: 'showSidebar'
	}];
	spreadsheet.addMenu('Keeper Of The Infinite Keys', menuItems);

	showSidebar();
	seek();
}

function onInstall(e) {
	onOpen(e);
}

function showSidebar() {
	var ui = HtmlService.createHtmlOutputFromFile('sidebar').setTitle('Keeper Of The Infinite Keys');
	SpreadsheetApp.getUi().showSidebar(ui);
}



function log() {
	for (var i in arguments) {
		Logger.log(arguments[i]);
	}
}


function saveMatrix(sheetName, values, clear) {
	var ss = SpreadsheetApp.getActiveSpreadsheet();
	var sheet = ss.getSheetByName(sheetName);

	if (!sheet) sheet = ss.insertSheet(sheetName);
	if (clear) sheet.clear();

	sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
}



var chest = {
	inside: [],

	keep: function () {
		var inside = this.inside;
		var matrix = [
			[]
		];
		var column = {};
		var line;
		var i, j;

		// identifica as informacoes de todas os arquivos json
		for (i in inside) {
			for (j in inside[i]) {
				column[j] = null;
			}
		}

		// cria o cabeçalho da tabela
		for (j in column) {
			matrix[0].push(j);
		}

		for (i in inside) {
			line = [];

			for (j in column) {
				line.push(inside[i][j]);
			}

			matrix.push(line);
		}

		saveMatrix("keys", matrix, true);
	}
};


function seek() {
	var folder = DocsList.getFolder('KeeperOfTheInfiniteKeys');
	var files = folder.getFiles();
	for (var i in files) {
		var name = files[i].getName();

		if (name.indexOf(".json") > 0) {
			var key = JSON.parse(files[i].getContentAsString());

			chest.inside.push(key);

		}
	}

	chest.keep();
}