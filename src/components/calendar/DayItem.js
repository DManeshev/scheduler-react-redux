import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

const DayItem = ({ year, day, month, monthNum, weekday }) => {

    let currentDay = day == new Date().getDate() && monthNum == new Date().getMonth() + 1 ? `#F7C91F`: null;

    return (
        <div className='calendar__day' style={{color: currentDay}}>
            <FontAwesomeIcon icon={faCalendar} className="calendar__day-icon" />
            <div className="calendar__day-label">
                <span>{day} {month} {year}</span>
                <span>{weekday}</span>
            </div>
        </div>
    )
}

export default DayItem;