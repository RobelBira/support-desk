import { useSelector,useDispatch } from "react-redux"
import { getTicket,closeTicket } from "../features/tickets/ticketSlice"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import { useEffect,useState } from "react"

import { useParams ,useNavigate} from "react-router-dom"
import {toast} from 'react-toastify'
// eslint-disable-next-line
import { getNotes,createNote ,reset as notesReset} from "../features/notes/noteSlice"
import NoteItem from '../components/NoteItem'
import Modal from 'react-modal'
import { FaPlus } from "react-icons/fa"




const customStyles={
  content:{
    width:'600px',
    top:'50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%,-50%)',
    position: 'relative',

  }
}
Modal.setAppElement('#root')



function Ticket() {

  const [modalIsOpen,setModalIsOpen]=useState(false)
  const [noteText,setNoteText]=useState('')


const {ticket,isLoading,isError,message}=useSelector((state)=>state.tickets)


const {notes,isLoading: notesIsLoading,}=useSelector((state)=>state.notes)
// eslint-disable-next-line
const params=useParams()
const navigate=useNavigate()
const dispatch=useDispatch()
const {ticketId}=useParams()


useEffect(()=>{
  if(isError){
toast.error(message)
  }
  dispatch(getTicket(ticketId))
  dispatch(getNotes(ticketId))
  // eslint-disable-next-line
},[isError,message,ticketId])


// close ticket
const onTicketClose=()=>{
  dispatch(closeTicket(ticketId))
  toast.success('Ticket closed')
  navigate('/tickets')
}
// create note submit
const onNotSubmit=(e)=>{
  e.preventDefault()
  dispatch(createNote({noteText,ticketId}))
  closeModal()
}



// open/close modal
const openModal=()=>setModalIsOpen(true)
const closeModal=()=>setModalIsOpen(false)



if (isLoading || notesIsLoading){
  return <Spinner/>
}
if(isError){
  return <h3>something went wrong</h3>
}
  return (
 <div className="ticket-page">
  <header className="ticket-header">
    <BackButton url='/tickets'/>
    <h2>Ticket Id: {ticket._id}
    <span className={`status status-${ticket.status}`}>
{ticket.status}
    </span>
    </h2>
    <h3>Date submitted:{new Date(ticket.createdAt).toLocaleDateString('en-US')}
    </h3>
    <h3>Product: {ticket.product}</h3>
    <hr />
    <div className="ticket-desc">
      <h3>Description of issue</h3>
      <p>{ticket.description}</p>
    </div>
    <h2>Notes</h2>
  </header>

  {ticket.status !== 'closed' && (
    <button 
   onClick={openModal} className="btn">
      <FaPlus/>Add note
      </button>
  )}

<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Add Note">

<h2>Add Note</h2>
<button className="btn-close" onClick={closeModal}>
  X
  </button>
  <form onSubmit={onNotSubmit}>
<div className="form-group">
  <textarea name="noteText" id="noteText" className="form-control" placeholder="note text" value={noteText} onChange={(e)=> setNoteText(e.target.value)}></textarea>
</div>

<div className="form-group">
  <button className="btn" type="submit">Submit</button>
</div>

  </form>
</Modal>


{notes.map((note)=>(
  <NoteItem key={note._id} note={note} />
))}

  {ticket.status !== 'closed' && (
    <button onClick={onTicketClose} className="btn btn-block btn-danger">Close ticket</button>
  )}
 </div>
  )
}
export default Ticket