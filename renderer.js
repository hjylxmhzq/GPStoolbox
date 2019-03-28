const {
    ipcRenderer
} = require('electron');
require('./menu.js')


let form = document.querySelector('#search');
let resultDiv = document.querySelector('#result');
let td = document.getElementsByTagName('td');
let keyForm = document.querySelector('#keyform');
let map = null;

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

ipcRenderer.on('returncsvdata', function (e, data) {
    map = null;
    if (Array.isArray(data) && data.length > 0) {
        let string = '<table>';
        for (let i of data.slice(0, 20)) {
            string += '<tr><td>' + i.join('</td><td>') + '</td></tr>'
        }
        string += '</table>';
        document.querySelector('#map').style.overflow = 'scroll';
        document.querySelector('#map').innerHTML = string;
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


var updateOnlineStatus = function () {
    let status = navigator.onLine ? 'online' : 'offline';
    let model = document.querySelector('#offline');
    if (status === 'offline') {
        model.style.display = 'block';
    } else {
        model.style.display = 'none';
    }
};

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

updateOnlineStatus();