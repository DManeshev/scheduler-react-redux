import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import ruLocale from 'date-fns/locale/ru';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const CalendarStatistic = () => {
    const { appointments } = useSelector(state => state.appointment);
    const { monthNames, timeline } = useSelector(state => state.calendarView);

    const [ date, setDate ] = useState(new Date());
    const [ appointmentDay, setAppointmentDay ] = useState([]);

    const filterByDay = (event) => {
        setDate(event)

        setAppointmentDay(appointments.filter(item => {
            const date = new Date(item.date.split('.').reverse().join('.'));

            const stringDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
            const stringEvent = `${event.getDate()}.${event.getMonth()}.${event.getFullYear()}`;
            
            return stringDate === stringEvent;
        }))
    }

    let timelineHours = timeline.filter(time => { 
        let timeStart = time.start.split(':')

        return Number(timeStart[1]) === 0
    })

    useEffect(() => {
        filterByDay(date)
    }, [appointments])
    
    const selectDate = `${monthNames[date.getMonth()]} ${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}, ${date.getFullYear()}`

    const groups = timelineHours.reduce((groups, item) => {
        
        const group = (groups[item.start] || []);

        appointmentDay.forEach(elem => {
            if (elem.start.slice(0, 2) === item.start.slice(0, 2)) {
                group.push(elem);
            }
        })

        groups[item.start] = group;

        return groups;
    }, {}) 
    
    // console.log()
    
    return (
        <div className="statistic__calendar">
            <h2 className="statistic__logo">Календарь</h2>

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
                <CalendarPicker 
                    className='statistic__calendar-view'
                    date={date} 
                    onChange={filterByDay} />
            </LocalizationProvider>

            <div className='statistic__calendar-date'>{selectDate}</div>

            <ul className='statistic__calendar-list'>
                {Object.entries(groups).map((item, i) => 
                    <li key={i} className='statistic__calendar-item'>
                        <div className='statistic__calendar-time'>
                            {item[0]}
                        </div>
                        <div className='statistic__calendar-container'>
                            {Array.isArray(item[1]) && item[1].length > 0 ?
                                item[1].map(({ id, date, start, end, secondName, name }) => 
                                    <div className='statistic__calendar-appointment' key={id}> 
                                        <div className='statistic__calendar-appointment__time'>
                                            {start} - {end}
                                        </div> 
                                        <FontAwesomeIcon icon={faMinus} className='statistic__calendar-appointment__icon' />
                                        <div className='statistic__calendar-appointment__info'>
                                            {secondName} {name}
                                        </div> 
                                    </div>
                                )
                                :
                                <hr key={item[0]} className='statistic__calendar-hr'/>
                            }
                        </div>
                    </li>
                    // {this.headers.map(function (headers) {
                    //     return (
                    //       <option key={headers}>{headers}</option>
                    //     );
                    //   })}
                    // Array.isArray(item[1]) && item[1].length > 0 ?
                    //     item[1].map(({ id, date, start, end, secondName, name }) => 
                    //         <div className='statistic__calendar-item' key={id}> 
                    //             <div className='statistic__calendar-item__time'>
                    //                 {start} - {end}
                    //             </div> 
                    //             <FontAwesomeIcon icon={faMinus} className='statistic__calendar-item__icon' />
                    //             <div className='statistic__calendar-item__info'>
                    //                 {secondName} {name}
                    //             </div> 
                    //         </div>
                    //     )
                    //     :
                    //     <hr key={item[0]} className='statistic__calendar-hr'/>
                )}
                {/* <div className='statistic__calendar-list__time'>
                    {Object.keys(groups).map(time => 
                        <div 
                            key={time} 
                            className='statistic__calendar-time'>
                            {time}
                        </div>
                    )}
                </div>
                <div className='statistic__calendar-list__container'>
                    {Object.values(groups).map((appointment, i) => 
                        Array.isArray(appointment) && appointment.length > 0 ?
                            appointment.map(({ id, date, start, end, secondName, name }) => 
                                <div className='statistic__calendar-item' key={id}> 
                                    <div className='statistic__calendar-item__time'>
                                        {start} - {end}
                                    </div> 
                                    <FontAwesomeIcon icon={faMinus} className='statistic__calendar-item__icon' />
                                    <div className='statistic__calendar-item__info'>
                                        {secondName} {name}
                                    </div> 
                                </div>  
                            )
                            :
                            <hr key={i} className='statistic__calendar-hr'/>
                    )}
                </div> */}

            </ul>
        </div>
    )
}

export default CalendarStatistic;