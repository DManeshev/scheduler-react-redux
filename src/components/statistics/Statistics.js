import AppointmentStatistics from "./AppointmentStatistics";
import CalendarStatistic from "./CalendarStatistics";

import './Statistics.sass';

const Statistics = () => {
    return (
        <main className="main">
            <div className="statistic">
                <AppointmentStatistics />
                <CalendarStatistic />
            </div>
        </main>
    )
}

export default Statistics;