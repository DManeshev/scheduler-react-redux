import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        monthNames: [ 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек' ],
        weekdays: [ 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ],
        daysArr: getCalendar(), 
        timeline: getTimezone(9, 18, 15),
        pos: { top: 0, left: 0, x: 0, y: 0 }
    },

    reducers: {
        setCalendarMonth(state, action) {
            state.daysArr.length = 0;

            const date = new Date(action.payload),
                year = date.getFullYear(),
                month = date.getMonth();

            const firstWeekdayOfMonth = new Date(year, month, 1).getDay();

            const daysInMonth = new Date(year, month + 1, 0).getDate();

            for (let i = 0; i <= daysInMonth; i++) {
                const stringDay = `${i < 10 ? `0${i}` : i}`;
                const stringMonth = `${month < 10 ? `0${month + 1}` : month + 1}`;
                const stringWeekday = state.weekdays[((i  + firstWeekdayOfMonth) % 7) - 1] === undefined ? state.weekdays[6] : state.weekdays[((i  + firstWeekdayOfMonth) % 7) - 1];

                state.daysArr.push({
                    year,
                    day: stringDay,
                    month: state.monthNames[month],
                    monthNum: stringMonth,
                    weekday: stringWeekday
                });
            }
        }
    }
})

function getTimezone (start, end, interval) {

    let timezoneArr = [];

    const startDate = new Date();
    const endDate = new Date();

    for (let min = 0; min < (end - start) * 60; min = min + interval) {
        startDate.setHours(start);
        startDate.setMinutes(min);

        endDate.setHours(start);
        endDate.setMinutes(min + interval);

        const strDate = (getHour, getminutes) => `${getHour < 10 ? `0${getHour}` : getHour}:${getminutes < 10 ? `0${getminutes}` : getminutes}`

        timezoneArr.push({
            start: strDate(startDate.getHours(), startDate.getMinutes()),
            end: strDate(endDate.getHours(), endDate.getMinutes())
        })
    }

    return timezoneArr
}

function getCalendar() {
    let daysArr = [],
        monthNames = [ 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря' ],
        weekdays = [ 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ];

    const date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth();

    const firstWeekdayOfMonth = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i <= daysInMonth; i++) {
        const stringDay = `${i < 10 ? `0${i}` : i}`;
        const stringMonth = `${month < 10 ? `0${month + 1}` : month + 1}`;
        const stringWeekday = weekdays[((i  + firstWeekdayOfMonth) % 7) - 1] === undefined ? weekdays[6] : weekdays[((i  + firstWeekdayOfMonth) % 7) - 1];

        daysArr.push({
            year,
            day: stringDay,
            month: monthNames[month],
            monthNum: stringMonth,
            weekday: stringWeekday
        });
    }

    return daysArr
}


export const { setCalendarMonth } = calendarSlice.actions;

export default calendarSlice.reducer


//     let d = new Date(e.target.value)

//     let time = d.getTime();
//     d = new Date(time - (time % 86400000));
    
//     let arr = [];
    
//     for (let i = 0; i < 7; i++, d.setDate(d.getDate() + 1)) {
//       arr.push(new Date(d.getTime()));
//     }
    
//     console.log(arr);