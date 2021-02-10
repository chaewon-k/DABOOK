'use strict'

import { app, protocol, Menu, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const { dialog } = require('electron')
const isDevelopment = process.env.NODE_ENV !== 'production'
const isMac = process.platform === 'darwin'
let win;
let menuEnabled = true;

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  {
    label: '파일',
    submenu: [
      {
        label: '이북 생성하기',
        click: function () {
          win.webContents.send('fileTab', 0);
        },
        enabled: menuEnabled
      },
      {
        label: '이북 불러오기',
        click: function () {
          win.webContents.send('fileTab', 1);
        },
        enabled: menuEnabled
      },
      {
        label: '저장하기',
        click: function () {
          win.webContents.send('fileTab', 2);
        },
        enabled: menuEnabled
      },
      {
        label: '이북 미리보기',
        click: function () {
          win.webContents.send('fileTab', 3);
        },
        enabled: menuEnabled
      },
      {
        label: 'ePub으로 내보내기',
        click: function () {
          win.webContents.send('fileTab', 4);
        },
        enabled: menuEnabled
      },
      {
        label: '목차 추가하기',
        click: function () {
          win.webContents.send('fileTab', 5);
        },
        enabled: menuEnabled
      },
    ],
  },
  {
    label: '편집',
    submenu: [
      {
        label: '실행취소',
        click: function () {
          win.webContents.send('editTab', 0);
        },
        enabled: menuEnabled
      },
      {
        label: '되돌리기',
        click: function () {
          win.webContents.send('editTab', 1);
        },
        enabled: menuEnabled
      },
      {
        label: '잘라내기',
        click: function () {
          win.webContents.send('editTab', 2);
        },
        enabled: menuEnabled
      },
      {
        label: '복사하기',
        click: function () {
          win.webContents.send('editTab', 3);
        },
        enabled: menuEnabled
      },
      {
        label: '붙여넣기',
        click: function () {
          win.webContents.send('editTab', 4);
        },
        enabled: menuEnabled
      },
      {
        label: '찾기',
        click: function () {
          win.webContents.send('editTab', 5);
        },
        enabled: menuEnabled
      },
      {
        label: '바꾸기',
        click: function () {
          win.webContents.send('editTab', 6);
        },
        enabled: menuEnabled
      },
      // {
      //   role: 'toggleDevTools'
      // }
    ],
  },
  {
    label: '도구상자',
    submenu: [
      {
        label: '제목1',
        click: function () {
          win.webContents.send('toolsTab', 1);
        },
        enabled: menuEnabled
      },
      {
        label: '제목2',
        click: function () {
          win.webContents.send('toolsTab', 2);
        },
        enabled: menuEnabled
      },
      {
        label: '제목3',
        click: function () {
          win.webContents.send('toolsTab', 3);
        },
        enabled: menuEnabled
      },
      {
        label: '제목4',
        click: function () {
          win.webContents.send('toolsTab', 4);
        },
        enabled: menuEnabled
      },
      {
        label: '제목5',
        click: function () {
          win.webContents.send('toolsTab', 5);
        },
        enabled: menuEnabled
      },
      {
        label: '제목6',
        click: function () {
          win.webContents.send('toolsTab', 6);
        },
        enabled: menuEnabled
      },
      {
        type: 'separator'
      },
      {
        label: '이탤릭체',
        click: function () {
          win.webContents.send('toolsTab', 'Italic');
        },
        enabled: menuEnabled
      },
      {
        label: '줄 바꿈',
        click: function () {
          win.webContents.send('toolsTab', 'Enter');
        },
        enabled: menuEnabled
      },
      {
        label: '선',
        click: function () {
          win.webContents.send('toolsTab', 'LineTag');
        },
        enabled: menuEnabled
      },
      {
        label: '인용구',
        click: function () {
          win.webContents.send('toolsTab', 'BlockquoteTag');
        },
        enabled: menuEnabled
      },
      {
        label: '인용문',
        click: function () {
          win.webContents.send('toolsTab', 'CiteTag');
        },
        enabled: menuEnabled
      },
      {
        label: '굵게',
        click: function () {
          win.webContents.send('toolsTab', 'BoldTag');
        },
        enabled: menuEnabled
      },
      {
        label: '밑줄',
        click: function () {
          win.webContents.send('toolsTab', 'UnderlineTag');
        },
        enabled: menuEnabled
      },
      {
        label: '취소선',
        click: function () {
          win.webContents.send('toolsTab', 'MediumlineTag');
        },
        enabled: menuEnabled
      },
      {
        label: '아래첨자',
        click: function () {
          win.webContents.send('toolsTab', 'SubscriptTag');
        },
        enabled: menuEnabled
      },
      {
        label: '윗첨자',
        click: function () {
          win.webContents.send('toolsTab', 'SuperscriptTag');
        },
        enabled: menuEnabled
      },
      {
        label: '순서 없는 목록',
        click: function () {
          win.webContents.send('toolsTab', 'UnorderedListTag');
        },
        enabled: menuEnabled
      },
      {
        label: '순서 있는 목록',
        click: function () {
          win.webContents.send('toolsTab', 'OrderedListTag');
        },
        enabled: menuEnabled
      },
      {
        label: '이미지',
        click: function () {
          win.webContents.send('toolsTab', 'ImageTag');
        },
        enabled: menuEnabled
      },
      {
        label: '링크',
        click: function () {
          win.webContents.send('toolsTab', 'Link');
        },
        enabled: menuEnabled
      },
      {
        label: '표',
        click: function () {
          win.webContents.send('toolsTab', 'Table');
        },
        enabled: menuEnabled
      },
    ],
  },
  {
    label: '스타일',
    submenu: [
      {
        label: '왼쪽 정렬',
        click: function () {
          win.webContents.send('styleTab', 0);
        },
        enabled: menuEnabled
      },
      {
        label: '가운데 정렬',
        click: function () {
          win.webContents.send('styleTab', 1);
        },
        enabled: menuEnabled
      },
      {
        label: '오른쪽 정렬',
        click: function () {
          win.webContents.send('styleTab', 2);
        },
        enabled: menuEnabled
      },
      {
        label: '양쪽 정렬',
        click: function () {
          win.webContents.send('styleTab', 3);
        },
        enabled: menuEnabled
      },
      {
        label: '글자색 적용',
        click: function () {
          win.webContents.send('styleTab', 4);
        },
        enabled: menuEnabled
      },
      {
        label: '배경색 적용',
        click: function () {
          win.webContents.send('styleTab', 5);
        },
        enabled: menuEnabled
      },
      {
        label: '글꼴',
        click: function () {
          win.webContents.send('styleTab', 6);
        },
        enabled: menuEnabled
      },
      {
        label: '글자크기 축소',
        click: function () {
          win.webContents.send('styleTab', 7);
        },
        enabled: menuEnabled
      },
      {
        label: '글자크기 확대',
        click: function () {
          win.webContents.send('styleTab', 8);
        },
        enabled: menuEnabled
      },
      {
        label: '나만의 style',
        click: function () {
          win.webContents.send('styleTab', 9);
        },
        enabled: menuEnabled
      },
    ],
  },
  {
    label: '윈도우',
    role: 'windowMenu'
  },
  // {
  //   label: '윈도우',
  //   submenu: [
  //     { 
  //       label: '최소화',
  //       role: 'minimize'
  //     },
  //     { role: 'zoom' },
  //     ...(isMac ? [
  //       { type: 'separator' },
  //       { role: 'front' },
  //       { type: 'separator' },
  //       { role: 'window' }
  //     ] : [
  //       { 
  //         label: '닫기',
  //         role: 'close'
  //       }
  //     ])
  //   ]
  // },
  {
    label: '도움말',
    submenu: [
      {
        label: 'editor 사용 설명서 보기',
        click: function () {
          win.webContents.send('helpTab', 0);
        },
        enabled: menuEnabled
      },
    ],
  },
];
const menu = Menu.buildFromTemplate(template)

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 950,
    height: 700,
    // autoHideMenuBar: ismac ? false : true,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
  if (isMac === true) { // mac이면  
    console.log('isMac')
    win.webContents.send('isMac', true);
  }
  let close = false    

  win.on('close', (ev) => {
    if (close === false) {
      ev.preventDefault()
      dialog.showMessageBox({
        type: 'warning',
        buttons: ['아니오', '네'],
        message: '변경 내역을 모두 저장하셨나요?',
        cancelId: 0,
        defaultId: 1,
        noLink: true
      }).then((val) => {
        if (val.response === 0) {
          // Cancel the close process
        } else if (win) {
          close = true
          app.quit()
        }
      })
    }
  })
  // win.addEventListenter('beforeunload', function (event) {
  //   console.log('I do not want to be closed')
  //   const options = {
  //     type: 'question',
  //     message: '변경 사항을 모두 저장하셨나요?',
  //     buttons: ['네', '아니오'],
  //   }
  //   const result = dialog.showMessageBoxSync(options);
  //   event.returnValue = result;
  // })
}

// app.on('before-quit', () => {
//   const options = {
//     type: 'question',
//     message: '변경 사항을 모두 저장하셨나요?',
//     buttons: ['네', '아니오'],
//   }
//   const result = dialog.showMessageBoxSync(options);
// })



// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  app.quit()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  Menu.setApplicationMenu(menu);
  createWindow()
})



// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
