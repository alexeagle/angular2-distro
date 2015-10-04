// Some of the code comes from WebComponents.JS
// https://github.com/webcomponents/webcomponentsjs/blob/master/src/HTMLImports/path.js
var lang_1 = require('angular2/src/core/facade/lang');
/**
 * Rewrites URLs by resolving '@import' and 'url()' URLs from the given base URL,
 * removes and returns the @import urls
 */
function resolveStyleUrls(resolver, baseUrl, cssText) {
    var foundUrls = [];
    cssText = extractUrls(resolver, baseUrl, cssText, foundUrls);
    cssText = replaceUrls(resolver, baseUrl, cssText);
    return new StyleWithImports(cssText, foundUrls);
}
exports.resolveStyleUrls = resolveStyleUrls;
var StyleWithImports = (function () {
    function StyleWithImports(style, styleUrls) {
        this.style = style;
        this.styleUrls = styleUrls;
    }
    return StyleWithImports;
})();
exports.StyleWithImports = StyleWithImports;
function extractUrls(resolver, baseUrl, cssText, foundUrls) {
    return lang_1.StringWrapper.replaceAllMapped(cssText, _cssImportRe, function (m) {
        var url = lang_1.isPresent(m[1]) ? m[1] : m[2];
        foundUrls.push(resolver.resolve(baseUrl, url));
        return '';
    });
}
function replaceUrls(resolver, baseUrl, cssText) {
    return lang_1.StringWrapper.replaceAllMapped(cssText, _cssUrlRe, function (m) {
        var pre = m[1];
        var originalUrl = m[2];
        if (lang_1.RegExpWrapper.test(_dataUrlRe, originalUrl)) {
            // Do not attempt to resolve data: URLs
            return m[0];
        }
        var url = lang_1.StringWrapper.replaceAll(originalUrl, _quoteRe, '');
        var post = m[3];
        var resolvedUrl = resolver.resolve(baseUrl, url);
        return pre + "'" + resolvedUrl + "'" + post;
    });
}
var _cssUrlRe = /(url\()([^)]*)(\))/g;
var _cssImportRe = /@import\s+(?:url\()?\s*(?:(?:['"]([^'"]*))|([^;\)\s]*))[^;]*;?/g;
var _quoteRe = /['"]/g;
var _dataUrlRe = /^['"]?data:/g;
//# sourceMappingURL=style_url_resolver.js.map