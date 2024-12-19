export const truncateText = (text, length) => {
    if (text.length > length) {
        return text.substring(0, length) + '....';
    }
    return text;
};

export const formatAddress = (address) => {
    return address.slice(0, 7) + '...' + address.slice(-5);
};