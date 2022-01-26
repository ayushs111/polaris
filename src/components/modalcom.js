import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import '../App.css'
import TextField from '@mui/material/TextField'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import validator from 'validator'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function Modelcom({
  closeModel,
  setOpenEdit,
  obj,
  data,
  editModel,
  ed,
  setBlank,
  onEdit,
}) {
  const [startDate, setStartDate] = React.useState(new Date());
  
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [pass, setPass] = React.useState('')
  
  const addUser = () => {
    // setStartDate)
    if (!name) {
      alert('name is not enter')
    } else if (!validator.isEmail(email)) {
      alert('Enter valid Email!')
    } else if (!pass) {
      alert('pass is not enter')
    } else {
      let newObj = { name: name, email: email, pass: pass, date : moment(startDate).format("YYYY MM DD") , show: 'password' }
      let newArray
      if (editModel === true) {
        // newObj.date = ed.date;
        data[onEdit] = newObj
        newArray = data
      } else {
      
        newArray = [...data, newObj]

      }
      obj(newArray)
      closeModel(false)
      setOpenEdit(false)
      setBlank({ name: '', email: '', pass: '',date : new Date() , show: false })
    }
  }

  React.useEffect(() => {
    setName(ed.name)
    setEmail(ed.email)
    setPass(ed.pass)
    setStartDate(ed.date)
  }, [ed])
  const [a, setA] = React.useState(false)
  const [show, setShow] = React.useState('password')

  function ayush() {
    if (a === true) {
      setA(false)
      setShow('password')
    } else {
      setA(true)
      setShow('text')
    }
  }
  return (
    <>
      <div    >
        <Box id="md" sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add user
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           
            <TextField
              required
              id="standard-required"
              label="Name"
              variant="standard"
              className="txt"
              sx={{ mt: 2 }}
              value={name}
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              required
              id="standard-required"
              label="Email"
              type="email"
              variant="standard"
              className="txt"
              sx={{ my: 2 }}
              value={email}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl sx={{ mt: 1, width: '25ch' }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                required
                id="standard-adornment-password"
                type={show}
                value={pass}
                autoComplete="off"
                onChange={(e) => setPass(e.target.value)}
                endAdornment={
                  <IconButton component="span" onClick={() => ayush()}>
                    {a ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                }
              />
           <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
            </FormControl>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <InputLabel htmlFor="standard-adornment-password">
                BOD
              </InputLabel>
            <DatePicker selected={startDate} onChange={(date) => (setStartDate(date))} /></Typography>
            <br />
            <Button variant="outlined" sx={{ my: 2 }} onClick={addUser}>
              Add
            </Button>
            <Button
              variant="outlined"
              sx={{ m: 2 }}
              onClick={() => closeModel(false)}
            >
              Close
            </Button>
          </Typography>
        </Box>
      </div>
      
    </>
  )
}
