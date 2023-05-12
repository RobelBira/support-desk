import { useState } from "react"
import { useSelector } from "react-redux"




function NewTicket() {
    const {user}=useSelector((state)=>state.auth)
    const [name]= useState(user.name)
    const [email]= useState(user.email)
    const [product,setProduct]= useState('iphone')
    const [description,setDescription]= useState('')

const onSubmit=(e)=>{
    e.preventDefault()
}

  return (
   <>
   <section className="heading">
    <h1>Create new ticket</h1>
    <p>please fill out the form below</p>
   </section>
   
   <section className="form">
    <div className="form-group">
        <label htmlFor="name">Customer name</label>
        <input type="text" className="form-control" value={name} disabled />
    </div>

    <div className="form-group">
        <label htmlFor="email">Customer email</label>
        <input type="email" className="form-control" value={email} disabled />
    </div>

    <form onSubmit={onSubmit}>
    <div className="form-group">
    <label htmlFor="product">Product</label>
<select name="product" id="product" value={product} onChange={(e)=>setProduct(e.target.value)}>
    <option value="iphone">iphone</option>
    <option value="macbook pro">macbook pro</option>
    <option value="imac">imac</option>
    <option value="ipad">ipad</option>

</select>
</div>

<div className="form-group">
    <label htmlFor="description">
        Description of the issue
    </label>
    <textarea name="description" id="description" className="form-control" placeholder="description " value={description} onChange={(e)=> setDescription(e.target.value)} >
    </textarea>

</div>

<div className="form-group">
    <button className="btn btn-block">
        Submit
    </button>
</div>
    </form>
   </section>
   </>
  )
}
export default NewTicket