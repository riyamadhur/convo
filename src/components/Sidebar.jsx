import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import { useSelector } from 'react-redux'
import { chatSelector } from '../redux/chatSlice'

const Sidebar = () => {
  const { chatId } = useSelector(chatSelector)
  return (
    <div className={`sidebar ${chatId ? "active" : ""}`}>
        <Navbar/>
        <Search/>
    </div>
  )
}

export default Sidebar