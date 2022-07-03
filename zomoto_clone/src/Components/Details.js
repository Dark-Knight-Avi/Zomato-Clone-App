import React from 'react';
import queryString from 'query-string';
import axios from 'axios';
import '../Styles/Details.css';
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'antiquewhite',
      border: 'solid 1px brown'
    },
  };

  const closerStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'antiquewhite',
      border: 'solid 1px brown',
      width: '297px',
    height: '63px'
    },
  };

  const ImageBOXStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-49%, -49%)',
      backgroundColor: 'black',
      border: 'solid 1px brown',
      width: '80%',
    height: '90%',
    
    },
  };

class Details extends React.Component{

    navigatetoFilter=()=>{
        
        this.props.history.push('/filter');
        
    }

    constructor(){
        super();
        this.state= {
            restaurant :{},
            itemsModalIsOpen: false,
            restaueantId:undefined,
            menuItems:[],
            subTotal:0,
            AddressModalIsOpen:false,
            imageModalIsOpen:false,
            PaymentModalIsOpen:false,
            a:[],
            b:[],
            c:[],
            d:[],
            email:undefined,
            AddItemsModalIsOpen:false,
            restaurantId:undefined,
            qty:0,
            e:[],
            f:[],
            g:[]
            

        }
    }

    componentDidMount(){
        //"this.props.location.search" is syntax to read value from query string & it's constant
   const qs = queryString.parse(this.props.location.search);
   const{restaurant}=qs;

   axios({
    url:`http://localhost:2029/restaurant/${restaurant}`,
    method:'GET',
    headers:{'Content-Type':'application/json'}
})
.then(responce=>{
    this.setState({restaurant:responce.data.restaurant,restaueantId:restaurant})
})
.catch()

    }
   
   
    handleOrder=()=>{
        const{restaueantId}=this.state;
        
            axios({
                url:`http://localhost:2029/menuitems/${restaueantId}`,
                method:'GET',
                headers:{'Content-Type':'application/json'}
            })
            .then(responce=>{
                this.setState({menuItems:responce.data.items,itemsModalIsOpen: true})
            })
            .catch()
      
        
        

    
    }


    handleCloseModal=(state,value)=>{
      /*auto refresh page, below line*/
window.location.reload(false);

this.setState({[state]:value,subTotal:0});

}

handlePay=(state,value)=>{
    if(localStorage.getItem("isLoggedIn")==="true"){
    const{subTotal}=this.state;
    if(subTotal=== 0){
        alert("Must add food to proceed further!" );
        
    }
    else{
        
        this.setState({[state]:value,AddressModalIsOpen:true});
    }
    
}else{
    alert("Please login to place order")
}
    
}

openImageBox=()=>{
    this.setState({imageModalIsOpen:true});
}


PaymenthandlePay=(state,value)=>{
    const{a,b,c,d,subTotal,restaurant,e,f,g}=this.state;
    const e1=[...new Set(e)];
    const f1=[...new Set(f)];
    const g1=[...new Set(g)];
  
   console.log(e1)
   console.log(f1)
   console.log(g1)
    let x = document.forms["myForm"]["fname"].value;
    if (x === "") {
      alert("Name must be filled out");
      return false;
    }
    let y = document.forms["myForm"]["fmobile"].value;
    if (y === "") {
      alert("Mobile must be filled out");
      return false;
    }
    let y1 = document.forms["myForm"]["femail"].value;
    if (y1 === "") {
      alert("Email must be filled out");
      return false;
    }
    let z = document.forms["myForm"]["faddress"].value;
    if (z === "") {
      alert("Address must be filled out");
      return false;
    }
a.push(x);
b.push(y);
c.push(z);
d.push(y1);

    this.setState({[state]:value,AddressModalIsOpen:false});

    axios({
        url:'http://localhost:2029/PayDetail',
        method:'POST',
        headers:{'Content-Type':'application/json'},
        data:{ name:x,
    mobile:y,
    email:y1,
    address:z,
    amount:subTotal,
    shop:restaurant,
    shopName:restaurant.name,
    accountuser:localStorage.getItem("loggedInUser"),
    meal1:e1[e1.length-2],
    cost1:f1[f1.length-2],
    img1:g1[g1.length-2],
    meal2:e1[e1.length-1],
    cost2:f1[f1.length-1],
    img2:g1[g1.length-1]
}
        
    })
    .then(response=> {
    this.setState({PayDetails:response.data.PayDetails,x,y,y1,z,subTotal,restaurant})
console.log(  {img1:g1[g1.length-2]})    
})
    .catch()
}


addItems = (index, operationType,meal,cost,img) => {
    const{e,f,g}=this.state;
    
  
    let total = 0;
    
    const items = [...this.state.menuItems];
    
    const item = items[index];
 
    
    if (operationType === 'add') 
    
    { 
         item.qty += 1; 
         e.push(meal);
         f.push(cost);
         g.push(img);

         console.log(meal,cost,item.qty );
   
    }
    else {
    
    item.qty -=  1;
    
    }
    
    items[index]  =item;
    
    items.map((item) => {
    
   return total += item.qty * item.price;
   
    })
    
    this.setState({ itemsList: items, subTotal: total });
   
}

/* start code to payment */

isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === '[object Date]'
}

isObj = (val) => {
    return typeof val === 'object'
}

stringifyValue = (val) => {
    if (this.isObj(val) && !this.isDate(val)) {
        return JSON.stringify(val)
    } else {
        return val
    }
}
buildForm = ({ action, params }) => {
    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('action', action)

    Object.keys(params).forEach(key => {
        const input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name', key)
        input.setAttribute('value', this.stringifyValue(params[key]))
        form.appendChild(input)
    })
    return form
}

post = (details) => {
    const form = this.buildForm(details)
    document.body.appendChild(form)
    form.submit()
    form.remove()
}

getData = async (data) => {
    try {
        const response = await fetch(`http://localhost:2029/payment`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
}

Payment = () => {
    
    const { subTotal, email } = this.state;

    const paymentObj = {
        amount: subTotal,
        email
    };
    

    this.getData(paymentObj).then(response => {
        var information = {
            action: "https://securegw-stage.paytm.in/order/process",
            params: response
        }
        this.post(information)
    })

}
handleInputChange=(event,state)=>{
this.setState({[state]:event.target.value})
}

/* start code to Additems */
handleItems=()=>{
    this.setState({AddItemsModalIsOpen:true});
}

AddResturentItems=(state,value)=>{
    const{restaurant,qty,restaurantId}=this.state;
    let x12 = document.forms["myForm12"]["fname12"].value;
    if (x12 === "") {
      alert("Name must be filled out");
      return false;
    }
    let y12 = document.forms["myForm12"]["fdes12"].value;
    if (y12 === "") {
      alert("Description must be filled out");
      return false;
    }
    let y112 = document.forms["myForm12"]["fprice12"].value;
    if (y112 === "") {
      alert("Price must be filled out");
      return false;
    }
    let z12 = document.forms["myForm12"]["fimg12"].value;
    
    this.setState({[state]:value,AddItemsModalIsOpen:false});

    axios({
        url:'http://localhost:2029/items',
        method:'POST',
        headers:{'Content-Type':'application/json'},
        data:{ name:x12,
            description:y12,
            price:y112,
            image:z12,
            qty:0,
           restaurantId:restaurant
}
        
    })
    .then(response=> {
    this.setState({items:response.data.items,x12,y12,y112,z12,qty,restaurantId,ItemsModalconfirmation:true})
    })
    .catch()
}


    render(){
        const{a,b,c,d,restaurant,itemsModalIsOpen,menuItems,subTotal,AddressModalIsOpen,imageModalIsOpen,PaymentModalIsOpen,AddItemsModalIsOpen,ItemsModalconfirmation}=this.state;

        return(
        <div>

            
            <div>
            <img className="Topimg" src={`../${restaurant.image}`}alt="Sorry no img" />

        <button className="button"  onClick={this.openImageBox}>Click to see Image Gallery</button> 
        
        </div>
        <button onClick={this.navigatetoFilter} class="navigate btn btn-success"><i className="fa">&#xf060;</i>Back to filter</button>
        
        <div className="headings">{restaurant.name}</div>
      
        
        <button className="btn-order" onClick={this.handleOrder}>Place Online Order</button>
        {localStorage.getItem("isLoggedIn")==="true" ? 
        
        <button type="button" class="btn btn-primary" onClick={this.handleItems}>Add items</button>:
        localStorage.removeItem("isLoggedIn")
        }
        
        <div className="tabs">
        
        <div className="tab">
        
        <input className="rd" type="radio" id="tab-1" name="tab-group-1" checked/> <label for="tab-1">Overview</label>
        
        
        
        <div className="content">
        
        <div className="about">About this place</div>
        <div className="head">cuisine</div>
       < div className="value">  {restaurant && restaurant.cuisine && restaurant.cuisine.map(item=>`${item.name}   ,`)} </div>

<div className="head">Average Cost</div> 
<div className="value">&#8377; {restaurant.min_price} for two people (approx) </div>

</div>

</div>

<div className="tab">

<input type="radio" id="tab-2" name="tab-group-1"/>

<label for="tab-2">Contact</label>



<div className="content">

<div className="head">Phone Number</div>

<div className="value">{restaurant.contact_number}</div>

<div className="head">{restaurant.name}</div>

<div className="value">{`${restaurant.locality}, ${restaurant.city}`}</div>

</div>

</div>

</div>

  
<Modal
     isOpen={itemsModalIsOpen}
     style={customStyles}
                >
                    <div>
                        <div className="glyphicon glyphicon-remove" style={{ float: 'right', margin: '5px' }} onClick={() => this.handleCloseModal('itemsModalIsOpen', false)}></div>
                        <div >
                            <h3 className="restaurant-name" style={{ fontSize: '40px'}}>{restaurant.name}</h3>
                            <h3 className="item-total" style={{ marginBottom: '45px', fontWeight: '600'}}>SubTotal: 
                            
                            <span className="total-amount" style={{marginLeft: '24px'}}>&#8377;{subTotal}
                           
                            </span>
                            
                            </h3>
                            <button className="btn btn-danger order-button" onClick={()=>this.handlePay('itemsModalIsOpen', false)}> Pay Now</button>
                            {menuItems.map((item, index) => {
                                return <div style={{ width: '44rem', marginTop: '-50px', marginBottom: '10px' }}>
                                    <div className="card" style={{ border:'0 white'}}>
                                        <div className="row" style={{backgroundColor: 'antiquewhite' }}>
                                            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 " style={{ paddingLeft: '10px', paddingBottom: '56px' }}>
                                                <span className="card-body" >
                                                    <h5 className="item-name" style={{  fontWeight: '600'}}>{item.name}</h5>
                                                    <h5 className="item-price" style={{  fontWeight: '600'}}>&#8377;{item.price}</h5>
                                                    <p className="item-descp" style={{ color: '#192f60'}}>{item.description}</p>
                                                </span>
                                                <hr/>
                                            </div>
                                            
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"> <img className="card-img-center title-img" alt="noimg" src={`../${item.image}`} style={{ height: '97px', width: '103px', 'border-radius': '20px' ,marginTop: '26px', marginBottom: '-2px'}} />
                                                {item.qty === 0 ? <div><button className="boxbtn" onClick={() => this.addItems(index, 'add',item.name,item.price,item.image)}>Add</button></div> :
                                                    <div className="add-number" style={{ marginLeft: '14px'}}><button onClick={() => this.addItems(index, 'subtract')}>-</button><span style={{ marginLeft: '2px',marginRight: '4px'}}>{item.qty}</span><button onClick={() => this.addItems(index, 'add',item.name,item.price,item.image)}>+</button></div>}
                                            </div>
                                           
                                        </div>
                                    </div>
                                   
                                </div>
                                
                            })}
    
                        </div>
                    </div>
                </Modal>

                <Modal
                 isOpen={AddressModalIsOpen}
                 style={customStyles}
                           >
                               <div className="glyphicon glyphicon-remove" style={{ float: 'right', margin: '5px' }} onClick={() => this.handleCloseModal('AddressModalIsOpen', false)}></div>
                        
                            <h3 className="restaurant-name" style={{ fontSize: '40px'}}>{restaurant.name}</h3>

<form name="myForm"   style={{ marginTop: '37px'}}>
  <div class="form-group">
    <label for="formGroupExampleInput">Name</label>
    <input type="text" name="fname" class="form-control" id="formGroupExampleInput" placeholder="*Enter your name" required/>
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">Mobile Number </label>
    <input type="text" name="fmobile" class="form-control" id="formGroupExampleInput2" placeholder="*Enter mobile number" required/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Email address</label>
    <input type="email" name="femail"  class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={(event)=>this.handleInputChange(event,'email')} required/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1" >Address</label>
    <textarea class="form-control" name="faddress" id="exampleFormControlTextarea1" rows="3" placeholder="*Enter your address" style={{height: '118px'}} required></textarea>
  </div>
  
  <input type="submit"onClick={()=>this.PaymenthandlePay('PaymentModalIsOpen',true)}style={{position: 'fixed',top: '545px',backgroundColor:'#d9534f',color: '#fff',borderColor: '#d43f3a',
    width: '125px',
    padding: '10px',
    margin: '-36px',
    left: '418px',
    border: 'none'}} />
  
</form>

                </Modal>

{/*image box modal*/}

     <Modal
     isOpen={imageModalIsOpen}
     style={ImageBOXStyles}
                >

 <button type="button" class="btn-close btn-close-white" aria-label="Close" style={{backgroundColor:'powderblue',width:'29px',height:'28px',borderRadius:'19px'}}
onClick={() => this.handleCloseModal('imageModalIsOpen', false)}></button>
         <img className="" src={`../${restaurant.image}`} alt="noimg" style={{width:'450px',position: 'fixed', left: '302px',borderRadius: '22px',top: '111px'}} /> 
    <div>
      
            
   
       </div>     
</Modal>

{/*Payment box modal*/}
<Modal
     isOpen={PaymentModalIsOpen}
     style={customStyles}
                >
<div>
<div className="glyphicon glyphicon-remove" style={{ float: 'right', margin: '5px' }} onClick={() => this.handleCloseModal('PaymentModalIsOpen', false)}></div>
    <h2>Choose payment method </h2>
   
    
    <img className="itemimgs" src='../Assets/paytm.png' alt="Sorry no img" style={{
            width: '139px',
            height: '159px',
            position: 'relative',
            top: '81px'
    }} />
    <button type="button" class="btn btn-danger" style={{
           position: 'relative',
           left: '79px',
           width: '311px',
           padding: '10px',
           top: '80px',
           margin: '-36px',
           backgroundColor:'#ce0505',
           fontWeight:'bold'
    }} onClick={this.Payment}>PAY &#8377;{subTotal}</button>

<h4  style={{
    position: 'relative',
    top: '91px',
    fontWeight:'bold'
}}>Address Details:</h4>
<h5 style={{
    position: 'relative',
    top: '106px'
}}>{a}</h5>
<h5 style={{
    position: 'relative',
    top: '106px'
}}>Mobile:{b}</h5>
<h5 style={{
    position: 'relative',
    top: '106px'
}}>{d}</h5>

<h5 style={{
    position: 'relative',
    top: '106px',
    
}}>{c}</h5>

</div>

                </Modal>


{/*AddItems box modal*/}
<Modal
     isOpen={AddItemsModalIsOpen}
     style={customStyles}
                >
<div className="glyphicon glyphicon-remove" style={{ float: 'right', margin: '5px' }} onClick={() => this.handleCloseModal('AddItemsModalIsOpen', false)}></div>
<h3 className="restaurant-name" style={{ fontSize: '40px'}}>{restaurant.name}</h3>
<form name="myForm12" >
<div class="form-group">
    <label for="formGroupExampleInput">Name</label>
    <input type="text" name="fname12" class="form-control" id="formGroupExampleInput" placeholder="*Item name" required/>
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput">Description</label>
    <input type="text" name="fdes12" class="form-control" id="formGroupExampleInput" placeholder="*Description" required/>
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput">price</label>
    <input type="text" name="fprice12" class="form-control" id="formGroupExampleInput" placeholder="*Enter price" required/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlFile1"> image(Optional)</label>
    <input type="file" onChange={this.fileSelectedHandler} name="fimg12" class="form-control-file" id="exampleFormControlFile1"/>
  
  </div>
    


    <input type="submit" onClick={()=>this.AddResturentItems('ItemsModalconfirmation',true)}style={{position: 'fixed',top: '545px',backgroundColor:'#d9534f',color: '#fff',borderColor: '#d43f3a',
    width: '125px',
    padding: '10px',
    margin: '-36px',
    left: '418px',
    border: 'none'}} />
</form>


                </Modal>


                <Modal
     isOpen={ItemsModalconfirmation}
     style={closerStyles}
                >
<div className="glyphicon glyphicon-remove" style={{ float: 'right', margin: '5px' }} onClick={() => this.handleCloseModal('AddItemsModalIsOpen', false)}></div>
Item Added successfully!

                </Modal>

</div>


)
}
    }

export default Details;