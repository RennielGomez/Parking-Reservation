import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Card as Tile, CardActions, Button } from '@mui/material';
import Axios from 'axios';

function Card(props) {

    const location = useLocation();
    const state = location.state;


    const [slotId, setSlotId] = useState(null);
    const [isVisible, setVisibility] = useState("none");
    const [isAvailable, setVacancy] = useState("Vacant");
    const [responseData, setResponseData] = useState([]);
    let copyResponseData;


    useEffect(() => {
        Axios.get("http://localhost:3001/parking-list")
            .then((res) => {
                setResponseData(() => [...res.data])
            })
    }, [copyResponseData])

    copyResponseData = useMemo(() => {
        for (let i = 0; i < responseData.length; i++) {
            if (responseData[i].slotNumber === props.id) {
                setVacancy("Occupied");
                break;
            }
            else {
                setVacancy("Vacant")
            }

        }
        return responseData;
    }, [responseData])



    // window.addEventListener("load", () => {
    //     Axios.get("http://localhost:3001/parking-list")
    //         .then((res) => {
    //             const responses = res.data;
    //             for (let i = 0; i < responses.length; i++) {
    //                 if (responses[i].slotNumber === props.id) {
    //                     setVacancy("Occupied");
    //                     break;
    //                 }
    //                 else {
    //                     setVacancy("Vacant")
    //                 }

    //             }
    //         })
    // })


    return (
        <Tile onClick={showModal} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className="hoverMe" sx={{ display: "flex", flexDirection: "column", padding: "8px", minHeight: "158px", minWidth: "270px" }} id={props.id} variant="outlined">
            <sup><strong style={{ textTransform: "uppercase" }}>{props.size}</strong></sup>
            <h1 style={{ alignSelf: "center" }}>{isAvailable}</h1>
            <div className="confirm" style={{ display: isVisible, marginTop: "16px" }}>
                <p style={{ fonstSize: "32px", marginBottom: "8px" }}>Do you like this spot?</p>
                <CardActions style={{ display: "flex", justifyContent: "space-around" }}>
                    <Button type='submit' variant="contained" onClick={addReservation}>Ok</Button>
                    <Button onClick={closeConfirmation} variant="text">Cancel</Button>
                </CardActions>
            </div>
        </Tile>
    )



    function getTime() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${year}-${month}-${day} ${hour}:${minutes}-${seconds}`;

    }

    function addReservation() {

        const { ownerName, plateNumber, chosen } = state;

        Axios.post("http://localhost:3001/parking-list", {
            ownerName: ownerName,
            plateNumber: plateNumber,
            carSize: chosen,
            slotNumber: slotId,
            timeIn: getTime()
        })

    }





    function showModal(event) {
        const elementId = event.target.id

        if (props.clickable === true) {
            setSlotId(elementId);
            console.log(slotId);
            if (isVisible === "none") {
                setVisibility("inline")
            }
            else {
                setVisibility("none");
            }
        }

    }

    function closeConfirmation() {
        document.querySelectorAll(".confirm")[props.id].style.display = "none";
    }

    function mouseEnter() {
        const hoveredCard = document.getElementById(props.id);
        hoveredCard.style.border = "solid 1px #1976d2";
    }

    function mouseLeave() {
        const hoveredCard = document.getElementById(props.id);
        hoveredCard.style.border = "solid 1px lightgrey";
        hoveredCard.style.color = "#000";
    }

}



export default Card;