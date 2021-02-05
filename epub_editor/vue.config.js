module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      nodeModulesPath: ['../../node_modules', './node_modules'],

      builderOptions: {
        appId: 'com.ssafy.dabook',
        productName: 'dabook',
        asar: false,
        protocols: {
          name: 'dabook',
          schemes: [
            'dabook'
          ],
        },
        mac: {
          category: 'public.app-category.productivity',
          // target: 'mas',
          // identity: 'String - The name of certificate to use when signing. Consider using environment variables CSC_LINK or CSC_NAME instead of specifying this option. MAS installer identity is specified in the mas.',
        },
      },
    }
    
  },
}
