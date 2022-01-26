import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Button from '@mui/material/Button'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import Typography from '@mui/material/Typography'


export default function View({
  data,
  onEdit,
  onDelet,
  open,
  openEdit,
  filter,
  f,
}) {
  let offset = 2
  let pages = Math.ceil(data.length / offset)
  if (pages === 0) {
    pages++
  }
  const [page, setPage] = useState(1)

  let rows = []
  let offsetData
  if (page <= 1) {
    offsetData = data.slice(0, offset)
  } else {
    let recodeStart = page * offset - offset
    let recodeEnd = page * offset

    offsetData = data.slice(recodeStart, recodeEnd)
  }
  rows = offsetData

  const [a, setA] = React.useState(false)
  function ayush(i) {
    if (a === true) {
      setA(false)
      rows[i].show = 'password'
    } else {
      setA(true)
      rows[i].show = 'text'
    }
  }
  const input = {
    border: 'none',
    background: '#fff',
    width: '50px',
  }
 
    let mgs = 'No Recode Found'
  return (
    <>
     
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">
                Date
                <IconButton
                  disabled={f === 'descending' ? true : false}
                  onClick={() => filter('descending')}
                >
                  <KeyboardArrowDownIcon />{' '}
                </IconButton>
                <IconButton
                  disabled={f === 'ascending' ? true : false}
                  onClick={() => filter('ascending')}
                >
                  <KeyboardArrowUpIcon />
                </IconButton>
              </TableCell>
              <TableCell align="left">Password</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableCell colSpan={7} align="center">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {mgs}
                </Typography>
              </TableCell>
            ) : (
              rows.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  {/* disabled */}
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="left">
                    <input
                      style={input}
                      disabled
                      defaultValue={row.pass}
                      type={row.show}
                    />
                    <IconButton onClick={() => ayush(i)}>
                      {row.show === 'text' ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="text"
                      onClick={() => {
                        onEdit(i)
                        open(true)
                        openEdit(true)
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="text" onClick={() => onDelet(i)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <center>
        <IconButton
          disabled={page === 1 ? true : false}
          onClick={() => setPage(page - 1)}
        >
          <NavigateBeforeIcon />{' '}
        </IconButton>
        <IconButton
          disabled={page === pages ? true : false}
          onClick={() => setPage(page + 1)}
        >
          <NavigateNextIcon />
        </IconButton>
      </center>
    </>
  )
}