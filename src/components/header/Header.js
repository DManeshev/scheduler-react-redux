import { Link } from 'react-router-dom';   

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHouse, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import './Header.sass'

const Header = () => {
    return (
        // <header className="header wrapper">
        //     <div className="header__container">
        //         <div className="header__list">
        //             <Link to='/' className="header__logo">Расписание</Link>
        //         </div>

        //         <Link to='statistics' className='header__link'>Статистика</Link>
        //     </div>
        // </header>
        <nav className='nav' style={{width: '5vw'}}>
            <div className='nav__container'>
                <Link to='/' className='nav__link'>
                    <FontAwesomeIcon icon={faHouse} />
                </Link>

                <Link to='statistics' className='nav__link'>
                    <FontAwesomeIcon icon={faClipboardList} />
                </Link>
            </div>

            <a href="https://github.com/DManeshev/scheduler-react-redux" target="_blank" className='nav__link'>
                <FontAwesomeIcon icon={faGithub} />
            </a>
        </nav>
    )
}

export default Header