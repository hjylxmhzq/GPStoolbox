const remote = require('electron').remote;
const {
    dialog
} = require('electron').remote
const os = require('os');
const Menu = remote.Menu;
const {
    ipcRenderer
} = require('electron');

let menus = [{
        label: '文件',
        submenu: [{
                label: '打开文件',
                accelerator: 'ctrl+n', // 绑定快捷键
                click: function () { // 绑定事件
                    dialog.showOpenDialog({
                        defaultPath: os.homedir(),
                        properties: [
                            'openFile',
                        ],
                        filters: [{
                            name: 'CSV File',
                            extensions: ['csv']
                        }, ]
                    }, function (res) {
                        ipcRenderer.send('openFile', res);
                    })
                }
            }
        ]
    },
    {
        label: '编辑',
        submenu: [{
                label: '复制',
                role: 'copy' // 调用内置角色实现对应功能
            },
            {
                label: '剪切',
                role: 'cut' // 调用内置角色实现对应功能
            }
        ]
    },
    {
        label: '地理编码',
        submenu: [{
                label: '当前打开文件',
                click: function(event) {
                    document.querySelector('#model1').style.display = 'block';
                    document.querySelector('#databox').style.display = 'none';
                }
            },
        ]
    },
    {
        label: '设置',
        submenu: [{
                label: '设置百度查询key',
                click: function (event) {
                    document.querySelector('#model').style.display = 'block';
                    document.querySelector('#databox').style.display = 'none';
                }
            },
        ]
    }
]

let m = Menu.buildFromTemplate(menus)
Menu.setApplicationMenu(m)