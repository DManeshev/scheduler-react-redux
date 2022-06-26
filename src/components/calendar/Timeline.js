import { useSelector } from "react-redux";

const Timeline = () => {

    const timeline = useSelector(store => store.calendarView.timeline)

    let styleTimeline = `repeat(${timeline.length}, 100px)`

    return (
        <div className="timeline" style={{gridTemplateColumns: styleTimeline}}>
            {timeline.map(time => 
                <div 
                    key={time.start} 
                    className="timeline__item">
                    {time.start}
                </div>
            )}
        </div>
    )
}

export default Timeline;