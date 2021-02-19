module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      nodeModulesPath: [
        '../../node_modules',
        './node_modules'
      ],
      builderOptions: {
        extraResources: [
          "src/assets/**",
        ],
        appId: 'com.dabook.app',
        productName: 'DABOOK',
        asar: false,
        protocols: {
          name: 'DABOOK',
          schemes: [
            'DABOOK'
          ]
        },
        mas: {
          hardenedRuntime: false,
          type: 'distribution',
          category: 'public.app-category.utilities',
          entitlements: 'build/entitlements.mas.plist',
          entitlementsInherit: 'build/entitlements.mas.inherit.plist'
        },
        mac: {
          category: 'public.app-category.utilities',
          target: 'mas',
          cscLink: 'build/all-certs.p12',
          cscKeyPassword: 'skrgnswnqls@123',
          icon: 'build/MyIcon.icns',
          provisioningProfile: 'build/dabook.provisionprofile'
        },
        win: {
          target: [
            {
              target: "nsis",
              arch: [
                "x64",
                "ia32"
              ]
            }
          ]
        }
      }
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
}
