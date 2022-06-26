import { useSelector } from 'react-redux';

import Timeline from './Timeline';
import DayItem from './DayItem';
import HoursDayItem from './HoursDayItem';

import './Calendar.css';

const Calendar = () => {

    const daysArr = useSelector(state => state.calendarView.daysArr);

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = function (e) {
        let ele = e.target.closest('.right__side')

        ele.style.userSelect = 'none';

        pos = {
            left: ele.scrollLeft,
            top: ele.scrollTop,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
        let ele = e.target.closest('.right__side')

        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function (e) {
        let ele = e.target.closest('.right__side')
        
        ele.style.removeProperty('user-select');

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    // onMouseDown={(e) => mouseDownHandler(e)}
    return (
        <>
            <div className='calendar'>
                <div className='left__side'>
                    {daysArr.map(item =>
                        <DayItem key={item.day} {...item} />
                    )}
                </div> 
                <div className='right__side'> 
                    <Timeline />
                    <div className='calendar__hours'>
                        {daysArr.map((item, i) =>
                            i === 0 ? null : <HoursDayItem key={item.day} {...item} />
                        )}
                    </div> 
                </div>
            </div>
            <div className="calendar__footer">
                <ul className="calendar__footer-list">
                    <li className="calendar__footer-item">
                        <span className="calendar__footer-marker blue"></span>
                        <div className="calendar__footer-text">- новая</div>
                    </li>
                    <li className="calendar__footer-item">
                        <span className="calendar__footer-marker olive"></span>
                        <div className="calendar__footer-text">- в работе</div>
                    </li>
                    <li className="calendar__footer-item">
                        <span className="calendar__footer-marker orange"></span>
                        <div className="calendar__footer-text">- ожидает</div>
                    </li>
                    <li className="calendar__footer-item">
                        <span className="calendar__footer-marker pink"></span>
                        <div className="calendar__footer-text">- принята</div>
                    </li>
                    <li className="calendar__footer-item">
                        <span className="calendar__footer-marker red"></span>
                        <div className="calendar__footer-text">- закрыта</div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Calendar;