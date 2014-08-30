  function onOpen(e) {
  	var spreadsheet = SpreadsheetApp.getActive();
  	var menuItems = [{
  		name: 'Open sidebar',
  		functionName: 'showSidebar'
  	}];
  	spreadsheet.addMenu('Keeper Of The Infinite Keys', menuItems);

  	showSidebar();
  }

  function onInstall(e) {
  	onOpen(e);
  }

  function showSidebar() {
  	var ui = HtmlService.createHtmlOutputFromFile('sidebar').setTitle('Keeper Of The Infinite Keys');
  	SpreadsheetApp.getUi().showSidebar(ui);
  }



  var chest = {
  	inside: [],

  	keep: function (k) {
  		this.inside.push(k);
  	}
  };


  function seek() {
  	var folder = DocsList.getFolder('KeeperOfTheInfiniteKeys');
  	var files = folder.getFiles();
  	for (var i in files) {
  		var name = files[i].getName();

  		if (name.indexOf(".json") > 0) {
  			var key = JSON.parse(files[i].getContentAsString());

  			chest.keep(key);
  		}
  	}

  	Logger.log(chest.inside);
  }