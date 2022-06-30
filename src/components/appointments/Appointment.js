import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModalEdit, dragAppointment, resizeAppointment } from '../../store/eventSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import './Appointment.sass';

const Appointment = (props) => {
    const timeline = useSelector(store => store.calendarView.timeline);

    const dispatch = useDispatch()

    const { id, date, start, end, secondName, name, comment, color } = props;

    // index start with 0 
    const indexCellStart = timeline.findIndex(time => time.start === start)
    const indexCellEnd = timeline.findIndex(time => time.end === end)

    // index + 1
    const indexCellCurrent = indexCellEnd - indexCellStart + 1;

    const dragStart = (event) => {
        event.target.classList.add('draggable'); 

        dispatch(dragAppointment({
            id,
            container: event.target,
            indexCellCurrent
        }))
    } 

    let resizeEl, 
        resizer, 
        resizeTimeStart = start,
        resizeTimeEnd = end, 
        originalWidth = 0, 
        originalMouseX = 0,
        originalX = 0;

    const resizeStart = (e, idEvent) => {
        e.preventDefault()

        resizeEl = e.target.closest('.appointment');
        resizer = e.target.closest('.appointment__resize');
        
        resizeEl.draggable = false;

        originalWidth = parseFloat(getComputedStyle(resizeEl, null).getPropertyValue('width').replace('px', ''));
        originalMouseX = e.pageX;
        originalX = resizeEl.getBoundingClientRect().left;

        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', evt => {
            stopResize(evt, idEvent)
        });
    }

    function resize(e) { 
        if (resizer.classList.contains('appointment__resize--right')) {
            resizeEl.style.width = e.pageX - resizeEl.getBoundingClientRect().left + 'px';
            
            let remainder = resizeEl.style.width.replace('px', '') / 100;

            let roundNumber = (remainder % 1).toFixed(2);

            let newIndexEnd = 1 - roundNumber + remainder - 1;
            
            resizeTimeEnd = timeline[Math.round(indexCellStart + newIndexEnd)].end;

            resizeEl.querySelector('.appointment__time-end').innerHTML = resizeTimeEnd;
        } else if (resizer.classList.contains('appointment__resize--left')) {
            const width = originalWidth - (e.pageX - originalMouseX);

            if (width > 50) {
                resizeEl.style.width = width + 'px';
                resizeEl.style.left = originalX - originalX + (e.pageX - originalMouseX) + 'px';
            } 
            
            let resizeElLeft = resizeEl.style.left.replace('px', '');
            let newIndexStart;

            if (resizeElLeft < 0 ) {
                let positiveLeft = Math.abs(resizeElLeft);
    
                newIndexStart = indexCellStart - Math.round(positiveLeft / 100);
            } else {
                newIndexStart = indexCellStart + Math.round(resizeElLeft / 100)
            }
            
            resizeTimeStart = timeline[newIndexStart].start
            resizeEl.querySelector('.appointment__time-start').innerHTML = resizeTimeStart;
        }
    } 

    function stopResize(e, idEvent) {
        resizeEl.draggable = true;

        dispatch(resizeAppointment({
            id: idEvent,
            resizeTimeEnd, 
            resizeTimeStart
        }))

        window.removeEventListener('mousemove', resize);
    }

    const styleAppointment = {
        width: `calc((100% + 1px) * ${indexCellCurrent})`,
        backgroundColor: color,
        border: `2px solid ${color.substring(0, color.length - 2)}`
    }

    return (
        <div 
            style={styleAppointment}
            className='appointment' 
            onClick={() => dispatch(openModalEdit({props}))}
            draggable="true"
            onDragStart={dragStart}
            onDragEnd={(e) => e.target.classList.remove('draggable')}
            >
            <div className="appointment__edit">
                <FontAwesomeIcon icon={faEllipsisV} />
            </div>
            <div className='appointment__time'>
                <span className='appointment__time-start'>{start}</span>
                <span className='appointment__time-end'>{end}</span>
            </div>
            <div className='appointment__info'>
                <div className='appointment__info--overflow'>{secondName} {name}</div>
                <div className='appointment__info--overflow'>{comment}</div>
            </div>
            <div className="appointment__resize appointment__resize--left" onMouseDown={e => resizeStart(e, id)}>
                <FontAwesomeIcon icon={faCircle} />
            </div>
            <div 
                className="appointment__resize appointment__resize--right"
                onMouseDown={e => resizeStart(e, id)}>
                <FontAwesomeIcon icon={faCircle} />
            </div>
        </div>
    )
}

export default Appointment;


