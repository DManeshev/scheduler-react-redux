import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCalendarMonth } from '../../store/calendarSlice';
import { Link } from 'react-router-dom';

import ruLocale from 'date-fns/locale/ru';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';    

import './Header.css'

const Header = () => {
    const [value, setValue] = useState(new Date());

    const dispatch = useDispatch();

    const handleDate = event => {
        setValue(event)

        const d = new Date(event)
        const dMonth = d.getMonth() + 1; 
        const dYear = d.getFullYear(); 
        const dDay = d.getDate(); 

        dispatch(setCalendarMonth(`${dYear}-${dMonth}-${dDay}`))
    }

    return (
        <header className="header wrapper">
            <div className="header__container">
                <div className="header__list">
                    <Link to='/' className="header__logo">Расписание</Link>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
                        <DatePicker
                            views={['month', 'year']}
                            value={value}
                            onChange={handleDate}
                            renderInput={(params) => <TextField {...params} className='date__input' />}
                        />
                    </LocalizationProvider>
                </div>

                <Link to='statistics' className='header__link'>Статистика</Link>
            </div>
        </header>
    )
}

export default Header