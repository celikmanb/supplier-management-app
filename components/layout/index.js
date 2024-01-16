// import Navbar from './navbar'
import AppHeader from '../header/index'
// import Footer from './footer'
import DeleteModal from '../delete-modal/index'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'

export default function Layout({ children }) {
  const {isOpen} = useSelector(state => state.modals)
  return (
    <>
      <AppHeader/>
      <main style={{marginTop: '10%'}}>{children}</main>
      <DeleteModal isOpen={isOpen} />
      {/* Loading is coming here for general loading */}
      {/* <CircularProgress /> */}
      {/* <Footer /> */}
    </>
  )
}