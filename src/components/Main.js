import React, { useEffect, useState } from 'react'
import Modelcom from './modalcom'
import Button from '@mui/material/Button'
import View from './View'
import TextField from '@mui/material/TextField'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../App.css'
import moment from 'moment'

export default function Main() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchDate, setSearchDate] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [startDate, setStartDate] = React.useState(new Date())
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const [openEdit, setOpenEdit] = useState(false)
  const [obj, setObj] = useState([])
  const [edit, setEdit] = useState()
  const [delet, setDelet] = useState()
  const [blank, setBlank] = useState({
    name: '',
    email: '',
    date: new Date(),
    pass: '',
  })
  // let sortedRows;
  if (filter === '') {
  } else if (filter === 'descending') {
    obj.sort((a, b) => (b.date > a.date ? 1 : -1))
    
    // console.log(sortedRows)
  } else if (filter === 'ascending') {
     obj.sort((a, b) => (b.date < a.date ? 1 : -1))
    // console.log(sortedRows)
  }
  useEffect(() => {
    setObj(obj.filter((user, i) => i !== delet))
  }, [delet])
  useEffect(() => {
    if (openEdit === true) {
      setBlank({
        name: obj[edit].name,
        email: obj[edit].email,
        pass: obj[edit].pass,
        date: new Date(obj[edit].date),
      })
    }
  }, [edit])

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm)
    if (searchTerm !== '') {
      const setObj = obj.filter((user) => {
        return Object.values(user.email)
          .join('')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      })
      setSearchResults(setObj)
    } else {
      setSearchResults(obj)
    }
  }
  const DatesearchHandler = (searchDate) => {
    setSearchDate("'"+searchDate+"'")
    if (searchDate !== '') {
      const setObj = obj.filter((user) => {
        return Object.values(user.date)
        .join('')
        .includes(searchDate)
      })
      setSearchResults(setObj)
      console.log(searchResults)
    } else {
      setSearchResults(obj)
    }
    console.log(searchDate)
  }

  return (
    <div>
      <TextField
        sx={{ m: 2 }}
        id="standard-search"
        label="Search By Email"
        type="search"
        variant="standard"
        onChange={(e) => searchHandler(e.target.value)}
      />
      <label id="DP">Search By BOD:</label>
      <DatePicker
        id="DP"
        selected={startDate}
        onChange={(date) => {
          setStartDate(date)
          DatesearchHandler(moment(date).format('YYYY MM DD'))
        }}
      />
      <Button
        id="btn"
        onClick={() => {
          setOpen(true)
        }}
      >
        add user
      </Button>
      {open && (
        <Modelcom
          term={searchTerm}
          searchKeyword={searchHandler}
          closeModel={setOpen}
          setOpenEdit={setOpenEdit}
          obj={setObj}
          data={obj}
          editModel={openEdit}
          ed={blank}
          setBlank={setBlank}
          onEdit={edit}
        />
      )} 
      <View
        data={searchDate.length < 1 && searchTerm.length < 1 ? obj : searchResults}
        onEdit={setEdit}
        onDelet={setDelet}
        open={setOpen}
        openEdit={setOpenEdit}
        filter={setFilter}
        f={filter}
      />
    </div>
  )
}