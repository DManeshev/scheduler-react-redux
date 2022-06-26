import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { closeModal, editAppointment, deleteAppointment } from "../../store/eventSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import ruLocale from 'date-fns/locale/ru';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';    
import { styled } from '@mui/material/styles';

import ColorPicker from './ColorPicker';

import './Modal.sass';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: 3,
    boxShadow: 24,
    p: 2,
    outline: 'none'
};

const ButtonEdit = styled(Button, {})({
    border: '2px solid #000',
    borderRadius: '8px',
    color: '#00AD45',
    
    '&:hover': {
        border: '2px solid #000',
        background: '#efefef',
    }
});
const ButtonDelete = styled(Button, {})({
    marginRight: '20px',
    border: '2px solid #000',
    borderRadius: '8px',
    color: '#DB2828',
    
    '&:hover': {
        border: '2px solid #000',
        background: '#efefef',
    }
});

const ModalEdit = () => {    
    const { timeline } = useSelector(state => state.calendarView);
    let { showEditModal, appointment } = useSelector(state => state.appointment);

    const [ date, setDate ] = useState('');
    const [ startAppointment, setStartAppointment ] = useState('');
    const [ endAppointment, setEndAppointment ] = useState('');
    const [ secondName, setSecondName ] = useState('');
    const [ name, setName ] = useState('');
    const [ comment, setComment ] = useState('');
    const [ color, setColor ] = useState('');

    useEffect(() => {
        let dateFormat = appointment.date ? appointment.date.split('.').reverse().join('-') : '';
        
        setDate(dateFormat)
        setStartAppointment(appointment.start)
        setEndAppointment(appointment.end)
        setSecondName(appointment.secondName)
        setName(appointment.name)
        setComment(appointment.comment)
        setColor(appointment.color)
        
    }, [appointment])

    const dispatch = useDispatch();

    const handleStartTime = (event) => setStartAppointment(event.target.value);
    const handleEndTime = (event) => setEndAppointment(event.target.value);
    const handleColor = (event) => setColor(event.target.value);

    const close = () => dispatch(closeModal())

    const edit = (id, e) => {
        e.preventDefault()

        const d = new Date(date);
        const dMonth = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1; 
        const dYear = d.getFullYear(); 
        const dDay = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate(); 

        let stage;
                
        switch (color) {
            case '#2185d066': 
                stage = 'new'
                break;
            case '#b5cc1866': 
                stage = 'atWork'
                break;
            case '#f2711c66': 
                stage = 'waiting'
                break;
            case '#e0399766': 
                stage = 'accepted'
                break;
            case '#db282866': 
                stage = 'closed'
                break;
            default: 
                stage = 'new'
        }

        dispatch(editAppointment({
            id, 
            date: `${dDay}.${dMonth}.${dYear}`,
            startAppointment,
            endAppointment,
            secondName,
            name,
            comment,
            color,
            stage
        }))

        close()
    }

    const removeEvent = () => {
        let id = appointment.id;

        dispatch(deleteAppointment({id}))

        close()
    }

    return (
        <Modal
            open={showEditModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onSubmit={(e) => edit(appointment.id, e)}
        >
            <Box sx={style}>
                <FontAwesomeIcon 
                    icon={faXmark} 
                    className="modal__close" 
                    onClick={close} />
                
                <h2 className='modal__logo'>Редактировать запись</h2>  
                <form>
                    <div className='form__grid' >
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
                            <DatePicker
                                mask="__.__.____"
                                value={date}
                                name='addDate'
                                onChange={(newValue) => setDate(newValue)}
                                renderInput={(params) => <TextField {...params} className="date__input" />}
                            />
                        </LocalizationProvider> 
                        <FormControl sx={{ minWidth: 120 }} size="small" className="form__grid-select">
                            <InputLabel id="addStartAppointment" className="form__grid-input">Начало приема</InputLabel>
                            <Select
                                MenuProps={{ classes: { list: 'form__grid-select--height' }}}
                                labelId="addStartAppointment"
                                id="addStartAppointment"
                                value={startAppointment ?? ''}
                                label="Начало приема"
                                onChange={handleStartTime} >
                                {timeline.map(({ start }) => 
                                    <MenuItem key={start} value={start} size="small">{start}</MenuItem>  
                                )}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: 120 }} size="small" className="form__grid-select">
                            <InputLabel id="addEndAppointment">Конец приема</InputLabel>
                            <Select
                                MenuProps={{ classes: { list: 'form__grid-select--height' }}}
                                className="form__grid-input"
                                labelId="addEndAppointment"
                                id="addEnd"
                                value={endAppointment ?? ''}
                                label="Конец приема"
                                onChange={handleEndTime} >
                                {timeline.map(({ end }) => 
                                    <MenuItem key={end} value={end}>{end}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <TextField
                            className="form__grid-input"
                            value={secondName ?? ''}
                            id="secondName" 
                            label="Фамилия" 
                            variant="outlined"
                            size="small"
                            name='addSecondName'
                            onChange={e => setSecondName(e.target.value)} />
                        <TextField 
                            className="form__grid-input"
                            value={name ?? ''}
                            id="name" 
                            label="Имя" 
                            variant="outlined" 
                            size="small"
                            name='addName'
                            onChange={e => setName(e.target.value)} />
                        <TextField 
                            className="form__grid-input form__grid--row"
                            fullWidth 
                            value={comment ?? ''}
                            label="Комментарий" 
                            id="commentary" 
                            variant="outlined" 
                            size="small"
                            name='addCommentary'
                            onChange={e => setComment(e.target.value)} />
                    </div>
                    
                    <ColorPicker handleColor={handleColor} color={appointment.color} />

                    <ButtonDelete variant="outlined" onClick={removeEvent}>Удалить запись</ButtonDelete>
                    <ButtonEdit type="submit" variant="outlined">Редактировать запись</ButtonEdit>
                </form>
            </Box>
        </Modal>
    )
}

export default ModalEdit;