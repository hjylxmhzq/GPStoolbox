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
            },
            {
                label: '新建窗口',
                click: function () {
                    console.log('新建窗口')
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
        label: '设置',
        submenu: [{
                label: '设置百度查询key',
                click: function (event) {
                    document.querySelector('#model').style.display = 'block';
                }
            },
            {
                label: '搜索'
            }
        ]
    }
]

let m = Menu.buildFromTemplate(menus)
Menu.setApplicationMenu(m)