import { useRef, useEffect } from 'react';

import './Modal.sass';

const ColorPicker = ({ handleColor, color }) => {

    const currentColor = useRef()

    useEffect(() => {        
        const inputsElements = currentColor.current.querySelectorAll('input')
        
        inputsElements.forEach(input => input.value === color ? input.checked = true : input.checked = false)
    }, [])
    
    
    return (
        <div className="color__picker" ref={currentColor}>
            <input type="radio" name="color" id="red" value="#db282866" onChange={handleColor} />
            <label htmlFor="red" className="color__picker-label"><span className="red"></span></label>

            <input type="radio" name="color" id="olive" value="#b5cc1866" onChange={handleColor} />
            <label htmlFor="olive" className="color__picker-label"><span className="olive"></span></label>

            <input type="radio" name="color" id="orange" value="#f2711c66" onChange={handleColor} />
            <label htmlFor="orange" className="color__picker-label"><span className="orange"></span></label>

            <input type="radio" name="color" id="blue" value="#2185d066" onChange={handleColor} />
            <label htmlFor="blue" className="color__picker-label"><span className="blue"></span></label>

            <input type="radio" name="color" id="pink" value="#e0399766" onChange={handleColor} />
            <label htmlFor="pink" className="color__picker-label"><span className="pink"></span></label>
        </div>
    )
}

export default ColorPicker;