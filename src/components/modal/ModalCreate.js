import { v4 as uuidv4 } from 'uuid';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { closeModal, сreateAppointment } from "../../store/eventSlice";

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

const ButtonCreate = styled(Button, {})({
    border: '2px solid #000',
    borderRadius: '8px',
    color: '#F7C91F',
    
    '&:hover': {
        background: '#efefef',
    }
});

const ModalCreate = () => {
    const { timeline } = useSelector(state => state.calendarView);
    const { show, clicked } = useSelector(state => state.appointment);

    const [ date, setDate ] = useState('');
    const [ startAppointment, setStartAppointment ] = useState('');
    const [ endAppointment, setEndAppointment ] = useState('');
    const [ secondName, setSecondName ] = useState('');
    const [ name, setName ] = useState('');
    const [ comment, setComment ] = useState('');
    const [ color, setColor ] = useState('#2185d066');

    const dispatch = useDispatch();

    const handleStartTime = (event) => setStartAppointment(event.target.value);
    const handleEndTime = (event) => setEndAppointment(event.target.value);
    const handleColor = (event) => setColor(event.target.value)

    useEffect(() => {
        setDate(new Date(clicked.date))
        setStartAppointment(clicked.start)
        setEndAppointment(clicked.end)
        
    }, [clicked])

    function close() {
        dispatch(closeModal())

        setDate('')
        setStartAppointment('')
        setEndAppointment('')
        setSecondName('')
        setName('')
        setComment('')
    }   

    const submitForm = (event) => {
        event.preventDefault()

        const dMonth = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1; 
        const dYear = date.getFullYear(); 
        const dDay = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(); 
        
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
        
        dispatch(сreateAppointment({
            id: uuidv4(),
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

    
    return (
        <Modal
            open={show}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <FontAwesomeIcon 
                    icon={faXmark} 
                    className="modal__close" 
                    onClick={close} />
                
                <h2 className='modal__logo'>Создать запись</h2>  
                <form onSubmit={submitForm}>
                    <div className='form__grid' >
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
                            <DatePicker
                                mask="__.__.____"
                                value={date}
                                onChange={(newValue) => setDate(newValue)}
                                renderInput={(params) => <TextField {...params} className="date__input" required />}
                            />
                        </LocalizationProvider> 
                        <FormControl sx={{ minWidth: 120 }} size="small" className="form__grid-select">
                            <InputLabel id="addStartAppointment" className="form__grid-input">
                                Начало приема
                            </InputLabel>
                            <Select
                                MenuProps={{ classes: { list: 'form__grid-select--height' }}}
                                labelId="addStartAppointment"
                                id="addStartAppointment"
                                value={startAppointment ?? ''}
                                label="Начало приема"
                                onChange={handleStartTime} 
                                required>
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
                                onChange={handleEndTime} 
                                required>
                                {timeline.map(({ end }) => 
                                    <MenuItem key={end} value={end}>{end}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <TextField
                            className="form__grid-input"
                            value={secondName}
                            id="secondName" 
                            label="Фамилия" 
                            variant="outlined"
                            size="small"
                            name='addSecondName'
                            onChange={e => setSecondName(e.target.value)}
                            required />
                        <TextField 
                            className="form__grid-input"
                            value={name}
                            id="name" 
                            label="Имя" 
                            variant="outlined" 
                            size="small"
                            name='addName'
                            onChange={e => setName(e.target.value)}
                            required />
                        <TextField 
                            className="form__grid-input form__grid--row"
                            fullWidth 
                            value={comment}
                            label="Комментарий" 
                            id="commentary" 
                            variant="outlined" 
                            size="small"
                            name='addCommentary'
                            onChange={e => setComment(e.target.value)} />
                    </div>
                    <ColorPicker handleColor={handleColor} color='#2185d066' />
                    <ButtonCreate type="submit" variant="outline">Создать запись</ButtonCreate>
                </form>
            </Box>
        </Modal>
    )
}

export default ModalCreate;