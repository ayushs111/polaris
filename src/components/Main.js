import React, {useCallback, useState,useEffect} from 'react';
// import {Button} from '@shopify/polaris';
import View from './View';
import Model from './modalcom'


export default function Main() {

  const [searchTerm, setSearchTerm] = useState('')
  const [searchDate, setSearchDate] = useState('')
  const [searchResults, setSearchResults] = useState([])
  // const [startDate, setStartDate] = React.useState(new Date())
  const [active, setActive] = useState(false);
  const [filter, setFilter] = useState('')
  const [openEdit, setOpenEdit] = useState(false)
  const [obj, setObj] = useState([])
  const [edit, setEdit] = useState('')
  const [delet, setDelet] = useState([])
  const [blank, setBlank] = useState({
    name: '',
    email: '',
    date: new Date(),
    pass: '',
  })
  
  if (filter === '') {
  } else if (filter === 'descending') {
    obj.sort((a, b) => (b.date > a.date ? 1 : -1))
  } else if (filter === 'ascending') {
     obj.sort((a, b) => (b.date < a.date ? 1 : -1))
  }
  // console.log(delet);
  useEffect(() => {
    console.log(delet)
    let newArry = [...obj]
    delet.map( (deletI) => {
      // setObj(obj.filter( (user) => user.id !== deletI))
      newArry = newArry.filter((user) => user.id !== deletI)
    })
    setObj(newArry)
    // setDelet([]);
  },[delet])
  useEffect(() => {
    if (openEdit === true) {
      setBlank({
        name: obj[edit].name,
        email: obj[edit].email,
        pass: obj[edit].password,
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
  
    const handleChange = useCallback(() => setActive(!active),[active]);
  return <div>
    <View 
    data={searchDate.length < 1 && searchTerm.length < 1 ? obj : searchResults}
    onEdit={setEdit}
    onDelet={setDelet}
    term={searchTerm}
    // open={setOpen}
    openEdit={setOpenEdit}
    filter={setFilter}
    f={filter}
    handleChange={handleChange} 
    />
    <Model 
    active={active} 
    handleChange={handleChange} 
    searchKeyword={searchHandler}
    setOpenEdit={setOpenEdit}
    obj={setObj}
    data={obj}
    editModel={openEdit}
    ed={blank}
    setBlank={setBlank}
    onEdit={edit}
    />
  </div>;
}
