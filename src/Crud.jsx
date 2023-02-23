import React, { useRef, useState } from "react";

function Crud() {
    const list = [
        {
            id: 1,
            name: 'st1',
            phone: '01231551',
            email: 'nguyen@gmail.com'

        },
        {
            id: 2,
            name: 'st2',
            phone: '01231551',
            email: 'tran@gmail.com'

        }
    ]
    const [lists, setList] = useState(list)
    const [updateState, setUpdateState] = useState(-1)
    return (
        <div>
            <div>


                <AddList setList={setList} />
                <form action="" onSubmit={handleSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {lists.map((current) => (
                                updateState === current.id ? <EditList current={current} lists={lists} setList={setList} /> :
                                    <tr key={current.id}>
                                        <td>{current.name}</td>
                                        <td>{current.phone}</td>
                                        <td>{current.email}</td>
                                        <td>
                                            <button onClick={() => handleEdit(current.id)}>Edit</button>
                                            <button onClick={() => handleDelete(current.id)}>Delete</button>
                                        </td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    )

    function handleEdit(id) {
        setUpdateState(id)
    }

    function handleDelete(id) {
        const newlist = lists.filter((li) => li.id !== id)
        setList(newlist)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const name = e.target.elements.name.value
        const phone = e.target.elements.phone.value
        const email = e.target.elements.email.value

        const newlist = lists.map((li) => (
            li.id === updateState ? { ...li, name: name, phone: phone, email: email } : li
        ))

        setList(newlist)
        setUpdateState(-1)
    }
}

function EditList({ current, lists, setList }) {
    function handleInputname(e) {
        const value = e.target.value
        const newlist = lists.map((li) => (
            li.id === current.id ? { ...li, name: value } : li
        ))

        setList(newlist)
    }

    function handleInputphone(e) {
        const value = e.target.value
        const newlist = lists.map((li) => (
            li.id === current.id ? { ...li, phone: value } : li
        ))

        setList(newlist)
    }

    function handleInputemail(e) {
        const value = e.target.value
        const newlist = lists.map((li) => (
            li.id === current.id ? { ...li, email: value } : li
        ))

        setList(newlist)
    }
    return (
        <tr>
            <td><input type="text" onChange={handleInputname} name='name' value={current.name} /></td>
            <td><input type="text" onChange={handleInputphone} name="phone" value={current.phone} /></td>
            <td><input type="text" onChange={handleInputemail} name="email" value={current.email} /></td>
            <td><button>Update</button></td>
        </tr>
    )
}

function AddList({ setList }) {
    const nameRef = useRef()
    const phoneRef = useRef()
    const emailRef = useRef()
    function handleSubmit(e) {
        e.preventDefault()
        const name = e.target.elements.name.value
        const phone = e.target.elements.phone.value
        const email = e.target.elements.email.value
        const newlist = {
            name,
            phone,
            email
        }
        setList((prevList) => {
            return prevList.concat(newlist)
        })
        nameRef.current.value = ''
        phoneRef.current.value = ''
        emailRef.current.value = ''
    }
    return (
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="">Name:</label>
            <input type="text" name="name" id="" ref={nameRef} /><br />
            <label htmlFor="">Phone:</label>
            <input type="text" name="phone" id="" ref={phoneRef} /><br />
            <label htmlFor="">Email:</label>
            <input type="text" name="email" id="" ref={emailRef} /><br />
            <button>Submit</button>
        </form>
    )
}
export default Crud