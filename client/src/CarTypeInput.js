import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Button, Box } from '@mui/material';

function CarTypeInput() {



    const [customerData, setCustomerData] = useState({
        ownerName: "",
        plateNumber: "",
    });

    const [carSizeOption, setCarSizeOption] = useState({
        chosen: "",
        small: false,
        medium: false,
        large: false
    });


    function handleCustomerData(event) {
        const { name, value } = event.target;
        setCustomerData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }


    function handleCarSize(event) {
        const { value } = event.target;
        setCarSizeOption(() => {
            if (value === "small") {
                return {
                    chosen: "small",
                    small: true,
                    medium: false,
                    large: false
                }
            }
            else if (value === "medium") {

                return {
                    chosen: "medium",
                    small: false,
                    medium: true,
                    large: false
                }
            }
            else {

                return {
                    chosen: "large",
                    small: false,
                    medium: false,
                    large: true
                }
            }
        })


    }
    
    function hideForm(){
        document.querySelector("#carTypeInputForm").display = "none";
    }

    return (
        <div id="carTypeInputForm" style={{
            borderRadius: '8px', border: 'solid 1px grey', position: 'absolute', margin: "auto", backgroundColor: "#fff"
        }}>
            <Box sx={{ marginTop: '16px', width: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '16px' }}>
                <div className='my'>
                    <TextField label="Owner's Name" variant="outlined" onChange={handleCustomerData} name="ownerName" value={customerData.ownerName} />
                </div>
                <div className='my'>
                    <TextField label="Plate Number" variant="outlined" onChange={handleCustomerData} name="plateNumber" value={customerData.plateNumber} />
                </div>
                <div className='my'>
                    <FormControl>
                        <FormLabel>Car Size</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel onChange={handleCarSize} name="size" checked={carSizeOption.small} value="small" control={<Radio />} label="Small" />
                            <FormControlLabel onChange={handleCarSize} name="size" checked={carSizeOption.medium} value="medium" control={<Radio />} label="Medium" />
                            <FormControlLabel onChange={handleCarSize} name="size" checked={carSizeOption.large} value="large" control={<Radio />} label="Large" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className='my'>
                    <Button variant="outlined" size='large' onClick={hideForm}>Cancel</Button>
                    <Link to={'/choose-slot'} state={{ ...customerData, chosen: carSizeOption.chosen }}>
                        <Button variant="contained" size='large'>Next</Button>
                    </Link>
                </div>
            </Box>
        </div>
    )
}

export default CarTypeInput;