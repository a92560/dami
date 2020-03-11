/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-11 22:49:10
 * @LastEditors  : Darren
 * @LastEditTime : 2020-01-12 23:06:55
 */
module.exports = {
  "presets": [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}