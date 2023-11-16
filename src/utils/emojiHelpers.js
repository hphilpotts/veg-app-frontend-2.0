export const convertEmoji = code => {
    return String.fromCodePoint(code)
}

export const convertToUnicode = xEmoji => {
    return 'U+' + xEmoji.slice(2)
}