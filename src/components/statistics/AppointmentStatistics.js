import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';

import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faPlus } from "@fortawesome/free-solid-svg-icons";

import { openModal } from "../../store/eventSlice";

const AppointmentStatistics = () => {
    let { appointments } = useSelector(state => state.appointment);
    const { monthNames } = useSelector(state => state.calendarView);
    
    const [ stage, setStage ] = useState('');
    const [ appointmentArr, setAppointmentArr ] = useState([]);
    const [ dateModal, setDateModal ] = useState(new Date());

    const dispatch = useDispatch();

    useEffect(() => {
        setAppointmentArr(appointments)
    }, [appointments])

    const filterAppointments = (e) => {
        setStage(e.target.value)

        if (e.target.value === 'all') 
            setAppointmentArr(appointments)
        else 
            setAppointmentArr(appointments.filter(item => item.stage === e.target.value))
    };

    let filteredAppointmentArr = [...appointmentArr]    

    const AppointmentStatisticsView = () => {

        if (Array.isArray(filteredAppointmentArr) && filteredAppointmentArr.length > 0) {
            return (
                filteredAppointmentArr.sort((a, b) => new Date(a.date) - new Date(b.date)).map(item => {
                    let { id, date, start, end, secondName, name, stage, comment, color } = item;

                    const dateFormat = date.split('.');

                    const dateFormatMonth = Number(dateFormat[1]);
                    const dateStr = `${monthNames[dateFormatMonth - 1]} ${dateFormat[0]}, ${dateFormat[2]}`
                    
                    if (stage === 'new') stage = 'Новая запись'
                    if (stage === 'atWork') stage = 'Запись в работе'
                    if (stage === 'waiting') stage = 'Запись в ожидании'
                    if (stage === 'accepted') stage = 'Принятая запись'
                    if (stage === 'closed') stage = 'Закрытая запись'

                    const stageColor = {
                        border: `2px solid ${color.substring(0, color.length - 2)}`,
                        color: color.substring(0, color.length - 2)
                    }

                    return (
                        <li key={id} className="statistic__item">
                            <div className="statistic__item-info">
                                <div className="statistic__item-info__date">{dateStr}</div>
                                <div className="statistic__item-info__time">{start} - {end}</div>
                            </div>
                            <div className="statistic__item-name">
                                <div className="statistic__item-name__icon">
                                    <FontAwesomeIcon icon={faCircleUser} />
                                </div>
                                {secondName} {name}
                            </div>
                            <div className="statistic__item-stage" style={stageColor}>{stage}</div>
                            <div className="statistic__item-comment">{comment}</div>
                        </li>
                    )
                })
            )
        } else {
            return (
                <li className="statistic__view-list__message">
                    <span>Нет записей по выбранному фильтру</span>
                </li>
            )
        }
    }

    const view = AppointmentStatisticsView();
 

    const createAppointmentFromStat = () => {

        const initialTimeStart = '09:00';
        const initialTimeEnd = '09:15';

        dispatch(openModal({
            date: `${dateModal.getFullYear()}-${dateModal.getMonth() + 1}-${dateModal.getDate()}`,
            start: initialTimeStart, 
            end: initialTimeEnd
        }))
    }

    return (
        <div className="statistic__view">
            <div className="statistic__view-header">
                <h2 className="statistic__logo">Список записей</h2>
                <button className="statistic__view-btn" onClick={createAppointmentFromStat}>
                    <FontAwesomeIcon icon={faPlus} />
                    Новая запись
                </button>
            </div>
            <FormControl sx={{ minWidth: 150, marginBottom: 2, background: '#fff' }} size="small" className="form__grid-select">
                <InputLabel id="stageLabel" className="form__grid-input">Стадия</InputLabel>
                <Select
                    MenuProps={{ classes: { list: 'form__grid-select--default' }}}
                    labelId="stageLabel"
                    id="stage"
                    value={stage}
                    label="Стадия"
                    onChange={filterAppointments} >
                    <MenuItem value='all'>Все записи</MenuItem>
                    <MenuItem value='new'>Новые записи</MenuItem>
                    <MenuItem value='atWork'>Записи в работе</MenuItem>
                    <MenuItem value='waiting'>Записи в ожидании</MenuItem>
                    <MenuItem value='accepted'>Принятые записи</MenuItem>
                    <MenuItem value='closed'>Закрытые записи</MenuItem>
                </Select>
            </FormControl>
            <hr className="statistic__view-hr"/>
            <ul className="statistic__view-list">
                {view}
            </ul>
        </div>
    )
}

export default AppointmentStatistics;