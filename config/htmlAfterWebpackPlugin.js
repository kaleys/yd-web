const pluginName = 'HtmlAfterWebpackPlugin';
class HtmlAfterWebpackPlugin{
  apply(compiler){
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(pluginName, htmlPluginData => {
        let _html = htmlPluginData.html;
        let styles = htmlPluginData.assets.css.map(item => {
          return `<link rel="stylesheet" href="${item.path}"/>`
        }).join('');
        let scripts = htmlPluginData.assets.js.map(item => {
          return `<script src="${item.path}"></script>`
        }).join('');
        _html = _html.replace('<!--injectStyles-->', styles)
          .replace('<!--injectScripts-->', scripts);
        htmlPluginData.html = _html;
      })
    })
  }
}
module.exports = HtmlAfterWebpackPlugin;