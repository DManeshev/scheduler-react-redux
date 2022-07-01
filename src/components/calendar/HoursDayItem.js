import { useDispatch, useSelector } from "react-redux";

import { openModal, dropAppointment } from "../../store/eventSlice";

import Appointment from "../appointments/Appointment";

const HoursDayItem = ({ year, day, month, monthNum, weekday }) => {

    const timeline = useSelector(store => store.calendarView.timeline);
    const { appointments, draggableAppointment } = useSelector(state => state.appointment);
    
    const dispatch = useDispatch();

    const handelModal = (event, time) => {
        const { start, end } = time;

        if (event.target.classList.contains('hour__day-cell')) {
            dispatch(openModal({
                date: `${year}-${monthNum}-${day}`,
                start, 
                end
            }))
        }
        
    }
 
    const dragDropAppointment = (event, time) => {
        event.stopPropagation();

        const { id, indexCellCurrent } = draggableAppointment;
        const { start } = time;

        const indexStart = timeline.findIndex(time => time.start === start)
        const indexEnd = indexStart + indexCellCurrent - 1

        dispatch(dropAppointment({
            id, 
            date: `${day}.${monthNum}.${year}`,
            start, 
            end: timeline[indexEnd].end
        }))

        event.target.classList.remove('hour__day-cell--drop')
    }

    let styleTimeline = `repeat(${timeline.length}, 100px)`;

    const findAppointmentForDay = time => {
        const appointmentForDay = appointments.find(elem => `${day}.${monthNum}.${year}` === elem.date && `${time.start}` === elem.start)

        if (appointmentForDay)
            return <Appointment {...appointmentForDay} key={appointmentForDay.date} />
        else 
            return null
    }
    

    return (
        <div 
            className="hour__day"
            style={{gridTemplateColumns: styleTimeline}}>
            {timeline.map((item, i) => 
                <div
                    key={`${day}.${monthNum}.${year}.${item.start}`} 
                    className="hour__day-cell"
                    onClick={(e) => handelModal(e, item)}
                    onDragEnter={e => e.target.classList.add('hour__day-cell--drop')}
                    onDragLeave={e => e.target.classList.remove('hour__day-cell--drop')}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => dragDropAppointment(e, item)}>
                    {findAppointmentForDay(item)}
                </div>    
            )}           
        </div>
    )
}

export default HoursDayItem;