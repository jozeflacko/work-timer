export function toString(date) {
    let h = date.getHours()
    let m = date.getMinutes();

    h = (h < 10 ? '0' : '') + h;
    m = (m < 10 ? '0' : '') + m;

    return  h + ':' + m;
}

export function toDate(minutes) {
    const h = parseInt(minutes/60);
    const m = minutes%60;
    const t = new Date();
    t.setHours(h);
    t.setMinutes(m);
    t.setSeconds(0);
    return t;
}

export function toMinutes(time) {
    return time.getHours()*60 + time.getMinutes();
}

export function getEstimatedEndTime(workingDayLength, lunchBreakLength, workingUnits) {

    let result = toMinutes(new Date()) + workingDayLength + lunchBreakLength;

    workingUnits.forEach((unit, index) => {
        const a = workingUnits[index].start;
        const b = workingUnits[index].end || toMinutes(new Date());
        result -= (b-a);
    });

    return result;
}