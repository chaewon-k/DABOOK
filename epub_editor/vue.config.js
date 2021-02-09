module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      nodeModulesPath: ['../../node_modules', './node_modules'],
      builderOptions: {
        extraResources: [
          "src/assets/**",
        ],
        appId: 'com.dabook.app',
        nsis: {
          shortcutName: 'DABOOK'
        },
        productName: 'DABOOK',
        asar: false,
        protocols: {
          name: 'DABOOK',
          schemes: [
            'DABOOK'
          ],
        },
        mas: {
          hardenedRuntime: false, //IMPORTANT!!!!
          type: "distribution",
          category: "public.app-category.utilities",
          entitlements: "build/entitlements.mas.plist",
          entitlementsInherit: "build/entitlements.mas.inherit.plist"
        },
        mac: {
          category: 'public.app-category.utilities',
          target: ['mas', 'dmg'],
          cscLink: "build/all-certs.p12",//'String - The name of certificate to use when signing. Consider using environment variables CSC_LINK or CSC_NAME instead of specifying this option. MAS installer identity is specified in the mas.',
          cscKeyPassword : "skrgnswnqls@123",
          icon: "build/MyIcon.icns",
          provisioningProfile : "build/dabook.provisionprofile",
        },
        win: {
          target: [
            {
              target: "nsis",
              arch: [
                'x64',
                'ia32'
              ],
            }
          ]
        }
      },
    }
  },
}