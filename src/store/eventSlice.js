import { v4 as uuidv4 } from 'uuid';
import { createSlice, current } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
    name: 'appointment ',
    initialState: {
        show: false,
        showEditModal: false,
        appointments: [
            {id: uuidv4(), date: "04.06.2022", start: "09:00", end: "10:00", name: "Геннадий", secondName: "Иванов", color: "#b5cc1866", comment: "комментарий", stage: 'atWork'},
            {id: uuidv4(), date: "02.06.2022", start: "10:00", end: "10:45", name: "Александр", secondName: "Петров", color: "#db282866", comment: "комментарий", stage: 'closed'},
            {id: uuidv4(), date: "03.06.2022", start: "11:00", end: "11:15", name: "Сергей", secondName: "Сидоров", color: "#2185D066", comment: "комментарий", stage: 'new'},
            // {id: uuidv4(), date: "05.06.2022", start: "11:00", end: "13:15", name: "asdfasdf", secondName: "asdf", color: "#2185d066", comment: "комментарий", stage: 'atWork'}
        ], 
        appointment: {},
        draggableAppointment: {},
    },

    reducers: {
        openModal(state, action) {
            state.show = true;
        },
        openModalEdit(state, action) {
            state.showEditModal = true;

            state.appointment = action.payload.props
        },
        closeModal(state) {
            state.show = false;
            state.showEditModal = false;
        },
        сreateAppointment(state, action) {
            state.appointments.push({
                id: action.payload.id,
                date: action.payload.date,
                start: action.payload.startAppointment,
                end: action.payload.endAppointment,
                secondName: action.payload.secondName,
                name: action.payload.name,
                comment: action.payload.comment,
                color: action.payload.color,
                stage: action.payload.stage
            })
        },
        editAppointment(state, action) {
            const findAppointment = state.appointments.find(item => item.id === action.payload.id);

            if (findAppointment) {
                findAppointment.date = action.payload.date;
                findAppointment.start = action.payload.startAppointment;
                findAppointment.end = action.payload.endAppointment;
                findAppointment.secondName = action.payload.secondName;
                findAppointment.name = action.payload.name;
                findAppointment.comment = action.payload.comment;
                findAppointment.color = action.payload.color;
                findAppointment.stage = action.payload.stage;
            }
        },
        deleteAppointment(state, action) {
            state.appointments = state.appointments.filter(item => item.id !== action.payload.id);
        },
        dragAppointment(state, action) {
            state.draggableAppointment = {
                id: action.payload.id,
                container: action.payload.container,
                indexCellCurrent: action.payload.indexCellCurrent
            }
        },
        dropAppointment(state, action) {
            const findAppointment = state.appointments.find(item => item.id === action.payload.id);

            if (findAppointment) {
                findAppointment.date = action.payload.date
                findAppointment.start = action.payload.start
                findAppointment.end = action.payload.end
            }
        },
        resizeAppointment(state, action) {
            const findAppointment = state.appointments.find(item => item.id === action.payload.id);

            if (findAppointment) {
                findAppointment.start = action.payload.resizeTimeStart;  
                findAppointment.end = action.payload.resizeTimeEnd;  
            }
        },
    }
})

export const { 
    openModal, 
    openModalEdit, 
    closeModal, 
    сreateAppointment, 
    editAppointment, 
    deleteAppointment, 
    dragAppointment,
    dropAppointment, 
    resizeAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer