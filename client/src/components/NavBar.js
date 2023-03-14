import React,{useState} from 'react'
import Container from 'react-bootstrap/Container'
import NavBar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import {  FaUserCircle, FaCaretDown } from 'react-icons/fa'
import './NavBar.css'
import { useAppContext } from '../context/appContext'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';



const Navbar=() => {
	const {user,logOutUser} = useAppContext()
	const [showLogout, setShowLogout] = useState(false)
	return (
		<NavBar  expand='lg' variant='dark' className='Navbar'>
			<Container variant='dark' >
				<NavBar.Brand className='Navbar-title' variant='dark' href="#">TODO App</NavBar.Brand>
			{!user ? ( 
				<>
				<Button   className='Navbar-btn' >Login</Button>
				</>
				
		):(<>
		  <DropdownButton id="dropdown-basic-button" title={ user.userName}>
				
      <Dropdown.Item onClick={logOutUser}>LogOut</Dropdown.Item>
    </DropdownButton>
</>
		)}
	
			</Container>
			
			
		</NavBar>
	)
}

export default Navbar