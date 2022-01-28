import React from 'react';
import { Icon, TextField } from '@shopify/polaris';
import { CustomersMajor, EmailMajor, LockMinor, HideMinor, ViewMinor } from '@shopify/polaris-icons';
import { Modal, TextContainer, Button } from '@shopify/polaris';
import moment from 'moment';
import validator from 'validator'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ModalExample({ active,
    handleChange,
    setOpenEdit,
    obj,
    data,
    editModel,
    ed,
    setBlank,
    onEdit, }) {
    let id = 1;
    
    const [startDate, setStartDate] = React.useState(new Date());

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');
        console.log(data);
    const addUser = () => {
        if (editModel !== true) {
            if (data.length > 0) {
                let lastId = data[data.length - 1].id;
                // console.log(lastId);
                id = lastId + 1 ;
            }
        }
        // setStartDate)
        if (!name) {
            alert('name is not enter')
        } else if (!validator.isEmail(email)) {
            alert('Enter valid Email!')
        } else if (!pass) {
            alert('pass is not enter')
        } else {
            console.log(id);
            let newObj = { id: id, name: name, email: email, password: pass, date: moment(startDate).format("YYYY MM DD"), show: 'password' }
            let newArray
            if (editModel === true) {
                // newObj.date = ed.date;
                data[onEdit] = newObj
                newArray = data
            } else {

                newArray = [...data, newObj]

            }
            obj(newArray)
            handleChange()
            setOpenEdit(false)
            setBlank({ id: '', name: '', email: '', pass: '', date: new Date(), show: false })
        }
    }

    React.useEffect(() => {
        id = ed.id;
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

    // console.log(pass);

    return (
        <div style={{ height: '500px' }}>
            <Modal
                open={active}
                onClose={handleChange}
                title="Add User"
                primaryAction={{
                    content: 'Close',
                    onAction: handleChange,
                }}
                secondaryActions={[
                    {
                        content: 'Add',
                        onAction: () => addUser(),
                    },
                ]}
            >
                <Modal.Section>
                    <TextContainer>
                        <div style={{ height: '225px' }}>
                            <TextField
                                onChange={setName}
                                label="name"
                                value={name}
                                prefix={<Icon source={CustomersMajor} color="base" />}
                                placeholder="Name"
                            />
                            <TextField
                                onChange={setEmail}
                                label="Email"
                                value={email}
                                prefix={<Icon source={EmailMajor} color="base" />}
                                placeholder="Email"
                            />
                            <TextField
                                onChange={setPass}
                                label="Password"
                                type={show}
                                value={pass}
                                prefix={<Icon source={LockMinor} color="base" />}
                                placeholder="Password"
                                suffix={<Button plain size="large" onClick={() => ayush()} ><Icon source={a ? ViewMinor : HideMinor} color="base" /></Button>}
                            />
                            <div>BOD</div>
                            <DatePicker selected={startDate} onChange={(date) => (setStartDate(date))} />
                        </div>
                    </TextContainer>
                </Modal.Section>
            </Modal>
        </div>
    );
}