const {
    ipcRenderer, dialog
} = require('electron');
require('./menu.js');
const path = require('path');
const os = require('os');

let map = null;
let csvData = null;
let selectedcol = null;
let resultData = null;
let tempAddresses = null;
let addressCsv = null;


let form = document.querySelector('#search');
let resultDiv = document.querySelector('#result');
let td = document.getElementsByTagName('td');
let keyForm = document.querySelector('#keyform');
let databox = document.querySelector('#databox');
let datatable = document.querySelector('#datatable');
let savebutton = document.querySelector('#savefile');
let datalength = null;

document.querySelector('#keyform1').onsubmit = function(e) {
    e.preventDefault();
    if (csvData) {
        selectedcol = e.target.elements[0].value;
        document.querySelector('#model1').style.display = 'none';
        let addresses = csvData[0].slice(1).map(function(value) {
            return value[selectedcol];
        })
        tempAddresses = addresses;
        ipcRenderer.send('getAddresses', addresses);
        datalength = addresses.length;
        $('#processbox').show(200);
        ipcRenderer.send('processed', '');
    }
}

document.onclick = function(e) {
    databox.style.display = 'none';
}

databox.onclick = function(e) {       
    e.stopPropagation()
}

savebutton.onclick = function(e) {
    ipcRenderer.send('savefile', addressCsv)
}

document.querySelector('#offline').onclick = function (e) {
    e.target.style.display = 'none';
}

form.onsubmit = function (e) {
    e.preventDefault();
    let value = e.target.elements[0].value;
    ipcRenderer.send('searchData', value);
}

keyForm.onsubmit = function (e) {
    let value = e.target.elements[0].value;
    ipcRenderer.send('setkey', value);
    e.preventDefault();
    document.querySelector('#model').style.display = 'none';
}

ipcRenderer.on('returnData', function (e, data) {
    if (data.status === 0) {
        resultDiv.style.display = 'block';
        td['comprehension'].innerHTML = data.result.comprehension;
        td['confidence'].innerHTML = data.result.confidence;
        td['level'].innerHTML = data.result.level;
        td['lng'].innerHTML = data.result.location.lng.toString().slice(0, 8);
        td['lat'].innerHTML = data.result.location.lat.toString().slice(0, 8);
        console.log(data)
    } else {
        resultDiv.style.display = 'none';
    }
    if (!map) {
        initialMap(parseFloat(data.result.location.lng), parseFloat(data.result.location.lat));
    } else {
        moveMap(parseFloat(data.result.location.lng), parseFloat(data.result.location.lat));
    }
})

ipcRenderer.on('returnAddresses', function(e, data) {
    returnData = data;
    document.querySelector('#processbox').style.display = 'none';
    document.querySelector('#processbackground').style.width = '0%';
    savebutton.style.display = 'block';
    databox.style.display = 'block';
    addressCsv = 'address,comprehension,confidence,level,lng,lat\n';
    console.log(data);
    let string = `<tr><td>address</td><td>comprehension</td><td>confidence</td><td>level</td><td>lng</td><td>lat</td></tr>`;
    for (let i =0; i<data.length; i++) {
        try{
        let com = data[i].result.comprehension;
        let confidence = data[i].result.confidence;
        let level = data[i].result.level;
        let lng = data[i].result.location.lng.toString().slice(0, 8);
        let lat = data[i].result.location.lat.toString().slice(0, 8);
        addressCsv += `${tempAddresses[i]},${com},${confidence},${level},${lng},${lat}\n`;
        string += `<tr><td>${tempAddresses[i]}</td><td>${com}</td><td>${confidence}</td><td>${level}</td><td>${lng}</td><td>${lat}</td></tr>`
        } catch (err) {
            addressCsv += `${''},${''},${''},${''},${''},${''}\n`;
            string += `<tr><td>${tempAddresses[i]}</td><td>${'查询错误'}</td><td>${''}</td><td>${''}</td><td>${''}</td><td>${''}</td></tr>`
        }
    }
    datatable.innerHTML = string;
})

ipcRenderer.on('returnprocessed', function(e, len) {
    document.querySelector('#processbackground').style.width = (len/datalength*100).toString()+'%';
})

ipcRenderer.on('returncsvdata', function (e, data) {
    map = null;
    if (Array.isArray(data) && data.length > 0) {
        csvData = data;
        let string = '';
        let list = document.querySelector('#selectlist');
        let option = ''
        for (let i = 0; i < data[0][0].length; i++) {
            option+=`<option value=${i}>`+data[0][0][i]+`</option>`
        }
        list.innerHTML = option;
        for (let i of data[0].slice(0, 20)) {
            string += '<tr><td>' + i.join('</td><td>') + '</td></tr>'
        }
        document.querySelector('#databox').style.display = 'block';
        datatable.innerHTML = string;
    }
})



function initialMap(lng, lat) {
    map = new BMap.Map("map", {
        enableMapClick: true
    }); // 创建Map实例
    map.centerAndZoom(new BMap.Point(lng, lat, 23.598428), 12); // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
}

function moveMap(lng, lat) {
    map.panTo(new BMap.Point(lng, lat));
    map.setZoom(16);
    map.clearOverlays();
    var marker = new BMap.Marker(new BMap.Point(lng, lat));
    map.addOverlay(marker);
}


function updateOnlineStatus() {
    let status = navigator.onLine ? 'online' : 'offline';
    let model = document.querySelector('#offline');
    if (status === 'offline') {
        model.style.display = 'block';
    } else {
        model.style.display = 'none';
    }
};

function updateTable(data) {
    let string = '';
    for (let i of data) {
        string += '<tr><td>' + i.join('</td><td>') + '</td></tr>'
    }
    
}

function saveFile(data) {
    ipcRenderer.send('savefile', data);
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

updateOnlineStatus();