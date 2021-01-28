module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      nodeModulesPath: ['../../node_modules', './node_modules'],
      builderOptions: {
        appId: 'com.ssafy.epubeditor',
        nsis: {
          shorcutName: 'epub-editor'
        },
        win: {
          target: [
            {
              target: "nsis",
              arch: [
                'x64',
                'ia32'
              ]
            }
          ]
        },
      },
    }
  },
}
