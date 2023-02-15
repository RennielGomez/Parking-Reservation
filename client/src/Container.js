import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import ChooseSlot from './ChooseSlot';
import { Fab, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CarTypeInput from './CarTypeInput';

function Container() {

    const location = useLocation();
    const current = location.pathname;
    
    function showForm() {
        document.querySelector(".showForm").style.display = "inline"
    }

    return (
        <div>

            <Fab color="primary" onClick={showForm} sx={{ position: "fixed", bottom: "64px", right: "64px" }} title="Add">
                <AddIcon />
            </Fab>
            <Link to={'/occupied'}>
                <Button>Occupied List</Button>
            </Link>
            <div className="showForm" style={{ display: "none", position: "fixed", left:`calc(50% - 150px)`}}>
                <CarTypeInput />
            </div>
            <ChooseSlot from={current} size="small" />
            <ChooseSlot from={current} size="medium" />
            <ChooseSlot from={current} size="large" />
        </div >
    )
}

export default Container