export const convertTo0x = unicode => {
    let convertedEmojiCode = '0x' + unicode.slice(2);
    return String.fromCodePoint(convertedEmojiCode)
}

export const convertToUnicode = xEmoji => {
    return 'U+' + xEmoji.slice(2)
}