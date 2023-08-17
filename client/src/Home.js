import React from 'react';
import "./App.css";
import Axios from "axios";
import {Table} from 'react-bootstrap';

export default function Home() {
  
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [users, setUsers] = React.useState([]);
  const [filteredUsers, setFilteredUsers] = React.useState(users);
  const [delValue, setDelValue] = React.useState(0);

  const handleFilterChange = () => {
    const fid = parseInt(document.getElementById('filter').value);
    const filteredData = fid? users.filter(item => item.id === fid) : users;
    setFilteredUsers(filteredData);
  };

  React.useEffect(() => {
    getLister();
  }, [])  

  function getLister()
  {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setUsers(response.data)
      setFilteredUsers(response.data)
    })
  }


  const submitUser = () => {
    Axios.post('http://localhost:3001/api/insert',
        {
            first_name: firstName,
            last_name: lastName
        }).then((response) => { 
          alert(response.data.message); // Show a success message
          getLister();
        })
        .catch((error) => {
          alert("Failed to insert data. Please try again."); // Show an error message
          console.warn(error);
        });
  };


  const deleteUser = () => {
    Axios.delete(`http://localhost:3001/api/delete/${delValue}`)
    .then((response) => {getLister();}).catch((error) => {
      alert("Failed to delete User");
      console.warn(error)
    });
  }

  const updateUser = (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const first_name = e.target.first_name.value;
    const last_name = e.target.last_name.value;

    Axios.put(`http://localhost:3001/api/update/${id}`,
        {
            first_name: first_name,
            last_name: last_name
        }).then((response) => { 
          alert(response.data.message); // Show a success message
          getLister(); // Redirect after successful data insertion
        })
        .catch((error) => {
          alert("Failed to update data. Please try again."); // Show an error message
          console.warn(error);
        });
  };

  return (

    <div className='App'>
       <h1>CRUD Application</h1>

       <div className='form'>
        <label>First Name</label>
        <input 
          type='text' 
          name='firstName'
          onChange={(e) => {setFirstName(e.target.value)}} 
        /><br/>
        <label> Last Name</label>
        <input 
          type='text' 
          name='lastName'
          onChange={(e) => {setLastName(e.target.value)}} 
        /><br/>
        <button onClick={submitUser}>Submit</button>
        <input id='filter' type='text' defaultValue={null} onChange={handleFilterChange} />
        
        <Table striped bordered hover size="sm" variant='dark'>   
          <thead>          
            <tr> 
              <td>id</td> 
              <td>first_name</td> 
              <td>last_name</td> 
            </tr> 
          </thead> 
          <tbody> 
        {filteredUsers.map((val, i) => {
          
          return(
              <tr key={i}> 
              <td>{val.id}</td> 
              <td>{val.first_name}</td> 
              <td>{val.last_name}</td> 
              </tr>
          )
        })}
          </tbody>
        </Table>
        <label>Delete User With Id</label>
        <input type='text' defaultValue={delValue} onChange={(e) => parseInt(setDelValue(e.target.value))} />
        <button onClick={deleteUser}>Delete</button>
       </div>
       <br/>
       <div>
            <h2>Update User</h2>
            <form onSubmit={updateUser}>
            <div>
                    <label>User ID:</label><br/>
                    <input type="text" name="id" />
                </div>
                <div>
                    <label>First Name: </label><br/>
                    <input type="text" name="first_name" />
                </div>
                <div>
                    <label>Last Name: </label><br/>
                    <input type="text" name="last_name" />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>

    </div>
  );
}