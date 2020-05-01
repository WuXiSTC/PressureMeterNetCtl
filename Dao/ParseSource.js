/**
 * 在地址前加http://
 * @param source 要处理的地址
 * @param default_proto 默认协议
 * @returns {string} 处理后的地址
 * @constructor
 */
function ParseSource(source, default_proto = "http") {
    if (!((source.length > "http://".length && source.slice(0, 7) === "http://") ||
        (source.length > "https://".length && source.slice(0, 8) === "https://"))) {
        source = default_proto + "://" + source
    }
    return source;
}

module.exports = ParseSource;