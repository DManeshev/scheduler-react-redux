import { useDispatch, useSelector } from "react-redux";

import { openModal, dropAppointment } from "../../store/eventSlice";

import Appointment from "../appointments/Appointment";

const HoursDayItem = ({ year, day, month, monthNum, weekday }) => {

    const timeline = useSelector(store => store.calendarView.timeline);
    const { appointments, draggableAppointment } = useSelector(state => state.appointment);
    
    const dispatch = useDispatch();

    const handelModal = (event, time) => {
        const { start } = time;

        if (event.target.classList.contains('hour__day-cell')) {
            // dispatch(openModal({
            //     cellDate: `${day}.${monthNum}.${year}.${start}`
            // }))
            dispatch(openModal())
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
                    {appointments.map(elem =>
                        `${day}.${monthNum}.${year}` === elem.date && `${item.start}` === elem.start ? 
                        <Appointment {...elem} key={elem.date} /> 
                        : 
                        null
                    )}
                </div>    
            )}           
        </div>
    )
}

export default HoursDayItem;