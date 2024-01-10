export const incrementDate = date => {
    const dayPlusOne = new Date(date);
    dayPlusOne.setDate(dayPlusOne.getDate() + 1);
    return dayPlusOne;
};

export const decrementDate = date => {
    const dayMinusOne = new Date(date);
    dayMinusOne.setDate(dayMinusOne.getDate() - 1);
    return dayMinusOne;
};