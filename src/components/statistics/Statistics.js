import AppointmentStatistics from "./AppointmentStatistics";
import DataAppointment from "./DataAppointment";
import CalendarStatistic from "./CalendarStatistics";

import './Statistics.sass';

const Statistics = () => {
    return (
        <main className="main">
            <div className="statistic">
                <AppointmentStatistics />
                {/* <DataAppointment /> */}
                <CalendarStatistic />
            </div>
        </main>
    )
}

export default Statistics;