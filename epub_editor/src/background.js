'use strict'

import { app, protocol, Menu, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
// const { ipcMain } = require('electron')
// const { webContents } = require('electron')
// let menuMessage = 0


const template = [
  {
    label: '파일',
    submenu: [
      {
        label: '이북 생성하기',
        click: function () {
          console.log('이북 생성하기')
        }
      },
      {
        label: '이북 불러오기',
        click: function () {
          console.log('이북 불러오기')
        }
      },
      {
        label: '저장하기',
        click: function () {
          console.log('저장하기')
        }
      },
      {
        label: '이북 미리보기',
        click: function () {
          console.log('이북 미리보기')
        }
      },
      {
        label: 'ePub으로 내보내기',
        click: function () {
          console.log('ePub으로 내보내기')
        }
      },
      {
        label: '목차 추가하기',
        click: function () {
          console.log('목차 추가하기')
        }
      },
    ],
  },
  {
    label: '편집',
    submenu: [
      {
        label: '실행취소',
        click: function () {
          console.log('실행취소')
        }
      },
      {
        label: '되돌리기',
        click: function () {
          console.log('되돌리기')
        }
      },
      {
        label: '잘라내기',
        click: function () {
          console.log('잘라내기')
        }
      },
      {
        label: '복사하기',
        click: function () {
          console.log('복사하기')
        }
      },
      {
        label: '붙여넣기',
        click: function () {
          console.log('붙여넣기')
        }
      },
      {
        label: '찾기',
        click: function () {
          console.log('찾기')
        }
      },
      {
        label: '바꾸기',
        click: function () {
          console.log('바꾸기')
        }
      },
    ],
  },
  {
    label: '도구상자',
    submenu: [
      {
        label: '제목1',
        click: function () {
          console.log('제목1')
        }
      },
      {
        label: '제목2',
        click: function () {
          console.log('제목2')
        }
      },
      {
        label: '제목3',
        click: function () {
          console.log('제목3')
        }
      },
      {
        label: '제목4',
        click: function () {
          console.log('제목4')
        }
      },
      {
        label: '제목5',
        click: function () {
          console.log('제목5')
        }
      },
      {
        label: '제목6',
        click: function () {
          console.log('제목6')
        }
      },
      {
        type: 'separator'
      },
      {
        label: '이탤릭체',
        click: function () {
          console.log('이탤릭체')
        }
      },
      {
        label: '줄 바꿈',
        click: function () {
          console.log('줄 바꿈')
        }
      },
      {
        label: '선',
        click: function () {
          console.log('선')
        }
      },
      {
        label: '인용구',
        click: function () {
          console.log('인용구')
        }
      },
      {
        label: '인용문',
        click: function () {
          console.log('인용문')
        }
      },
      {
        label: '굵게',
        click: function () {
          console.log('굵게')
        }
      },
      {
        label: '밑줄',
        click: function () {
          console.log('밑줄')
        }
      },
      {
        label: '취소선',
        click: function () {
          console.log('취소선')
        }
      },
      {
        label: '아래첨자',
        click: function () {
          console.log('아래첨자')
        }
      },
      {
        label: '윗첨자',
        click: function () {
          console.log('윗첨자')
        }
      },
      {
        label: '순서 없는 목록',
        click: function () {
          console.log('순서 없는 목록')
        }
      },
      {
        label: '순서 있는 목록',
        click: function () {
          console.log('순서 있는 목록')
        }
      },
      {
        label: '이미지',
        click: function () {
          console.log('이미지')
        }
      },
      {
        label: '링크',
        click: function () {
          console.log('링크')
        }
      },
      {
        label: '표',
        click: function () {
          console.log('표')
        }
      },
    ],
  },
  {
    label: '스타일',
    submenu: [
      {
        label: '왼쪽 정렬',
        click: function () {
          console.log('왼쪽 정렬')
        }
      },
      {
        label: '가운데 정렬',
        click: function () {
          console.log('가운데 정렬')
        }
      },
      {
        label: '오른쪽 정렬',
        click: function () {
          console.log('오른쪽 정렬')
        }
      },
      {
        label: '양쪽 정렬',
        click: function () {
          console.log('양쪽 정렬')
        }
      },
      {
        label: '글자색 적용',
        click: function () {
          console.log('글자색 적용')
        }
      },
      {
        label: '배경색 적용',
        click: function () {
          console.log('배경색 적용')
        }
      },
      {
        label: '글꼴',
        click: function () {
          console.log('글꼴')
        }
      },
      {
        label: '글자크기 축소',
        click: function () {
          console.log('글자크기 축소')
        }
      },
      {
        label: '글자크기 확대',
        click: function () {
          console.log('글자크기 확대')
        }
      },
      {
        label: '나만의 style',
        click: function () {
          console.log('나만의 style')
        }
      },
    ],
  },
  {
    label: '도움말',
    submenu: [
      {
        label: 'editor 사용 설명서 보기',
        click: function () {
          console.log('editor 사용 설명서 보기')
        }
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
  const win = new BrowserWindow({
    width: 950,
    height: 700,
    // autoHideMenuBar: true,
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
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
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
