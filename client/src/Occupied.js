import React, { useState, useEffect, useMemo } from 'react';
import Axios from 'axios';
import { Card as Tile, CardActions, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function Occupied() {

  const [responses, setOccupied] = useState([])
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState();
  const [timeDiff, setTimeDiff]= useState();
  const [bill, setBill]= useState();



  const handleClickOpen = (slotNumber) => {
    setOpen(true);
    setTarget(slotNumber);

    Axios.post("http://localhost:3001/occupied", {
      id: slotNumber
    }).then((res) => {
      const time = res.data[0].timeIn;
      const prevDate = new Date(time);
      const presDate = new Date ();
      setTimeDiff(()=>{
        const prevUTC = Date.UTC(prevDate.getFullYear(), prevDate.getMonth(), prevDate.getDate(), prevDate.getHours(),prevDate.getMinutes(), prevDate.getSeconds())
        const presUTC = Date.UTC(presDate.getFullYear(), presDate.getMonth(), presDate.getDate(), presDate.getHours(),presDate.getMinutes(), presDate.getSeconds())
        return(Math.floor((presUTC - prevUTC) / (1000 * 60 * 60)))
      })
      setBill(timeDiff * 50)
    })};

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = (slotNumber) => {

    Axios.patch("http://localhost:3001/occupied", {
      id: slotNumber,
      timeOut: getTime()
    }).then((err, res) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(res);
      }
    })
  }


  // window.addEventListener("load", () => {
  //   Axios.get("http://localhost:3001/occupied").then((res) => {
  //     setOccupied(res.data)
  //   })
  // })

  let copyResponse;

  useEffect(()=>{
    Axios.get("http://localhost:3001/occupied").then((res)=>{
      setOccupied(res.data);
    })
  },[copyResponse])

  copyResponse = useMemo(() => responses, [responses])

  function getTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;

  }


  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", position: "static" }}>
      {responses.map((response) => {
        return <Tile sx={{ display: "flex", flexDirection: "column", padding: "8px", minHeight: "158px", minWidth: "270px" }} id={response.slotNumber} key={response.slotNumber} variant="outlined" >
          <sup><strong style={{ textTransform: "uppercase" }}>{response.carSize}</strong></sup>
          <h1 style={{ alignSelf: "center" }}>Occupied</h1>
          <div className="confirm" style={{ marginTop: "16px" }}>
            <CardActions style={{ display: "flex", justifyContent: "space-around" }}>
              <Button type='submit' variant="contained" sx={{ backgroundColor: "red" }} onClick={() => { handleClickOpen(response.slotNumber) }}>Leave</Button>
            </CardActions>
          </div>
        </Tile>
      })
      }


      <div>
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
        >
          <DialogTitle>{"Are you leaving parking lot now?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {/* <div sx={{ display: "flex", flexDirection: "column" }}> */}
                <span> Hours of Stay: {timeDiff}</span><br/>
                <span>Payment each Hour: ₱ 50.00</span><br/>
                <span>Total Bill: ₱ {bill}.00</span>
              {/* </div> */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => { handleUpdate(target) }}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>

    </div>
  )

}
export default Occupied