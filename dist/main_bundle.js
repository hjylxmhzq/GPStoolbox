/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/menu.js":
/*!*********************!*\
  !*** ./src/menu.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const remote = __webpack_require__(/*! electron */ \"electron\").remote;\r\nconst {\r\n    dialog\r\n} = __webpack_require__(/*! electron */ \"electron\").remote\r\nconst os = __webpack_require__(/*! os */ \"os\");\r\nconst Menu = remote.Menu;\r\nconst {\r\n    ipcRenderer\r\n} = __webpack_require__(/*! electron */ \"electron\");\r\n\r\nlet menus = [{\r\n        label: '文件',\r\n        submenu: [{\r\n                label: '打开文件',\r\n                accelerator: 'ctrl+n', // 绑定快捷键\r\n                click: function () { // 绑定事件\r\n                    dialog.showOpenDialog({\r\n                        defaultPath: os.homedir(),\r\n                        properties: [\r\n                            'openFile',\r\n                        ],\r\n                        filters: [{\r\n                            name: 'CSV File',\r\n                            extensions: ['csv']\r\n                        }, ]\r\n                    }, function (res) {\r\n                        ipcRenderer.send('openFile', res);\r\n                    })\r\n                }\r\n            }\r\n        ]\r\n    },\r\n    {\r\n        label: '编辑',\r\n        submenu: [{\r\n                label: '复制',\r\n                role: 'copy' // 调用内置角色实现对应功能\r\n            },\r\n            {\r\n                label: '剪切',\r\n                role: 'cut' // 调用内置角色实现对应功能\r\n            }\r\n        ]\r\n    },\r\n    {\r\n        label: '地理编码',\r\n        submenu: [{\r\n                label: '当前打开文件',\r\n                click: function(event) {\r\n                    document.querySelector('#model1').style.display = 'block';\r\n                    document.querySelector('#databox').style.display = 'none';\r\n                }\r\n            },\r\n        ]\r\n    },\r\n    {\r\n        label: '设置',\r\n        submenu: [{\r\n                label: '设置百度查询key',\r\n                click: function (event) {\r\n                    document.querySelector('#model').style.display = 'block';\r\n                    document.querySelector('#databox').style.display = 'none';\r\n                }\r\n            },\r\n        ]\r\n    }\r\n]\r\n\r\nlet m = Menu.buildFromTemplate(menus)\r\nMenu.setApplicationMenu(m)\n\n//# sourceURL=webpack:///./src/menu.js?");

/***/ }),

/***/ "./src/renderer.js":
/*!*************************!*\
  !*** ./src/renderer.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n    ipcRenderer, dialog\n} = __webpack_require__(/*! electron */ \"electron\");\n__webpack_require__(/*! ./menu.js */ \"./src/menu.js\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst os = __webpack_require__(/*! os */ \"os\");\n\nlet map = null;\nlet csvData = null;\nlet selectedcol = null;\nlet resultData = null;\nlet tempAddresses = null;\nlet addressCsv = null;\n\n\nlet form = document.querySelector('#search');\nlet resultDiv = document.querySelector('#result');\nlet td = document.getElementsByTagName('td');\nlet keyForm = document.querySelector('#keyform');\nlet databox = document.querySelector('#databox');\nlet datatable = document.querySelector('#datatable');\nlet savebutton = document.querySelector('#savefile');\nlet datalength = null;\n\ndocument.querySelector('#keyform1').onsubmit = function(e) {\n    e.preventDefault();\n    if (csvData) {\n        selectedcol = e.target.elements[0].value;\n        document.querySelector('#model1').style.display = 'none';\n        let addresses = csvData[0].slice(1).map(function(value) {\n            return value[selectedcol];\n        })\n        tempAddresses = addresses;\n        ipcRenderer.send('getAddresses', addresses);\n        datalength = addresses.length;\n        $('#processbox').show(200);\n        ipcRenderer.send('processed', '');\n    }\n}\n\ndocument.onclick = function(e) {\n    databox.style.display = 'none';\n}\n\ndatabox.onclick = function(e) {       \n    e.stopPropagation()\n}\n\nsavebutton.onclick = function(e) {\n    ipcRenderer.send('savefile', addressCsv)\n}\n\ndocument.querySelector('#offline').onclick = function (e) {\n    e.target.style.display = 'none';\n}\n\nform.onsubmit = function (e) {\n    e.preventDefault();\n    let value = e.target.elements[0].value;\n    ipcRenderer.send('searchData', value);\n}\n\nkeyForm.onsubmit = function (e) {\n    let value = e.target.elements[0].value;\n    ipcRenderer.send('setkey', value);\n    e.preventDefault();\n    document.querySelector('#model').style.display = 'none';\n}\n\nipcRenderer.on('returnData', function (e, data) {\n    if (data.status === 0) {\n        resultDiv.style.display = 'block';\n        td['comprehension'].innerHTML = data.result.comprehension;\n        td['confidence'].innerHTML = data.result.confidence;\n        td['level'].innerHTML = data.result.level;\n        td['lng'].innerHTML = data.result.location.lng.toString().slice(0, 8);\n        td['lat'].innerHTML = data.result.location.lat.toString().slice(0, 8);\n        console.log(data)\n    } else {\n        resultDiv.style.display = 'none';\n    }\n    if (!map) {\n        initialMap(parseFloat(data.result.location.lng), parseFloat(data.result.location.lat));\n    } else {\n        moveMap(parseFloat(data.result.location.lng), parseFloat(data.result.location.lat));\n    }\n})\n\nipcRenderer.on('returnAddresses', function(e, data) {\n    returnData = data;\n    document.querySelector('#processbox').style.display = 'none';\n    document.querySelector('#processbackground').style.width = '0%';\n    savebutton.style.display = 'block';\n    databox.style.display = 'block';\n    addressCsv = 'address,comprehension,confidence,level,lng,lat\\n';\n    console.log(data);\n    let string = `<tr><td>address</td><td>comprehension</td><td>confidence</td><td>level</td><td>lng</td><td>lat</td></tr>`;\n    for (let i =0; i<data.length; i++) {\n        try{\n        let com = data[i].result.comprehension;\n        let confidence = data[i].result.confidence;\n        let level = data[i].result.level;\n        let lng = data[i].result.location.lng.toString().slice(0, 8);\n        let lat = data[i].result.location.lat.toString().slice(0, 8);\n        addressCsv += `${tempAddresses[i]},${com},${confidence},${level},${lng},${lat}\\n`;\n        string += `<tr><td>${tempAddresses[i]}</td><td>${com}</td><td>${confidence}</td><td>${level}</td><td>${lng}</td><td>${lat}</td></tr>`\n        } catch (err) {\n            addressCsv += `${''},${''},${''},${''},${''},${''}\\n`;\n            string += `<tr><td>${tempAddresses[i]}</td><td>${'查询错误'}</td><td>${''}</td><td>${''}</td><td>${''}</td><td>${''}</td></tr>`\n        }\n    }\n    datatable.innerHTML = string;\n})\n\nipcRenderer.on('returnprocessed', function(e, len) {\n    document.querySelector('#processbackground').style.width = (len/datalength*100).toString()+'%';\n})\n\nipcRenderer.on('returncsvdata', function (e, data) {\n    map = null;\n    if (Array.isArray(data) && data.length > 0) {\n        csvData = data;\n        let string = '';\n        let list = document.querySelector('#selectlist');\n        let option = ''\n        for (let i = 0; i < data[0][0].length; i++) {\n            option+=`<option value=${i}>`+data[0][0][i]+`</option>`\n        }\n        list.innerHTML = option;\n        for (let i of data[0].slice(0, 20)) {\n            string += '<tr><td>' + i.join('</td><td>') + '</td></tr>'\n        }\n        document.querySelector('#databox').style.display = 'block';\n        datatable.innerHTML = string;\n    }\n})\n\n\n\nfunction initialMap(lng, lat) {\n    map = new BMap.Map(\"map\", {\n        enableMapClick: true\n    }); // 创建Map实例\n    map.centerAndZoom(new BMap.Point(lng, lat, 23.598428), 12); // 初始化地图,设置中心点坐标和地图级别\n    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放\n}\n\nfunction moveMap(lng, lat) {\n    map.panTo(new BMap.Point(lng, lat));\n    map.setZoom(16);\n    map.clearOverlays();\n    var marker = new BMap.Marker(new BMap.Point(lng, lat));\n    map.addOverlay(marker);\n}\n\n\nfunction updateOnlineStatus() {\n    let status = navigator.onLine ? 'online' : 'offline';\n    let model = document.querySelector('#offline');\n    if (status === 'offline') {\n        model.style.display = 'block';\n    } else {\n        model.style.display = 'none';\n    }\n};\n\nfunction updateTable(data) {\n    let string = '';\n    for (let i of data) {\n        string += '<tr><td>' + i.join('</td><td>') + '</td></tr>'\n    }\n    \n}\n\nfunction saveFile(data) {\n    ipcRenderer.send('savefile', data);\n}\n\nwindow.addEventListener('online', updateOnlineStatus);\nwindow.addEventListener('offline', updateOnlineStatus);\n\nupdateOnlineStatus();\n\n//# sourceURL=webpack:///./src/renderer.js?");

/***/ }),

/***/ 0:
/*!*******************************!*\
  !*** multi ./src/renderer.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/renderer.js */\"./src/renderer.js\");\n\n\n//# sourceURL=webpack:///multi_./src/renderer.js?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron\");\n\n//# sourceURL=webpack:///external_%22electron%22?");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"os\");\n\n//# sourceURL=webpack:///external_%22os%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });