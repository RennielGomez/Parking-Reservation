import React from 'react';

import { useLocation } from 'react-router-dom';
import Card from './Card';


function ChooseSlot(props) {

    const location = useLocation();
    const state = location.state;
    const slots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];






    function renderContainer(path, size) {
        if (path === "/") {
            return (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", position: "static" }}>
                    {slots.map((slot, slotIndex) => {
                        return <Card size={size} key={slot} id={`${slot}${size}`} clickable={false} />
                    })}
                </div>
            )
        }
        else {
            return (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", position: "static" }}>
                    {slots.map((slot) => {
                        return <Card size={state.chosen} key={slot} id={`${slot}${state.chosen}`} clickable={true} />
                    })}
                </div>
            )
        }
    }

    return (
        <div>
            {renderContainer(props.from, props.size)}
        </div>
    )
}
export default ChooseSlot;
