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

export const getDayName = date => {
    return dayNames[date.getDay()]
}

const dayNames = {
        0: 'sunday',
        1: 'monday',
        2: 'tuesday',
        3: 'wednesday',
        4: 'thursday',
        5: 'friday',
        6: 'saturday'
}

export const getPreviousWeeks = (date, numberWeeks) => {
    const outputArr = [];
    const currentDate = new Date(date);
    for (let count = 0; count < numberWeeks; count++) {
        currentDate.setDate(currentDate.getDate() - 7);
        outputArr.push(new Date(currentDate));
    };
    return outputArr;
};