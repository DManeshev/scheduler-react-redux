import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

const DataAppointment = () => {

    const { appointments } = useSelector(state => state.appointment);
 
    let result = {
        'Новые записи': 0,
        'Записи в работе': 0, 
        'Записи в ожидании': 0, 
        'Принятые записи': 0, 
        'Закрытые записи': 0
    };

    for (let i = 0; i < appointments.length; i++) {
        let stage = appointments[i].stage;

        if (stage === 'new') stage = 'Новые записи'
        if (stage === 'atWork') stage = 'Записи в работе'
        if (stage === 'waiting') stage = 'Записи в ожидании'
        if (stage === 'accepted') stage = 'Принятые записи'
        if (stage === 'closed') stage = 'Закрытые записи'

        for (let key in result) {
            if (key === stage) {
                result[stage]++;
            }
        }
    }    

    const label = Object.keys(result);
    const dataValues = Object.values(result);

    const data = {
        labels: label,
        datasets: [
            {
                label: '# of Votes',
                data: dataValues,
                backgroundColor: [
                    '#2185D0',
                    '#B5CC18',
                    '#F2711C',
                    '#E03997',
                    '#DB2828',
                ],
                borderColor: [
                    '#2185D0',
                    '#B5CC18',
                    '#F2711C',
                    '#E03997',
                    '#DB2828',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='statistics__data'>
            <div className='statistics__data-container'>
                <Pie data={data}/>
            </div>
        </div>
    )   
}

export default DataAppointment;

