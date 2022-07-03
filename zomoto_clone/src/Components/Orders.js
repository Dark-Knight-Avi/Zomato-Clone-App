import React from 'react';
import '../Styles/Orders.css';
import axios from 'axios';
import queryString from 'query-string';




class Orders extends React.Component{

    constructor(){
        super();
        this.state= {
            Paydetails :[],
            

        }
    }

    componentDidMount(){
        //"this.props.location.search" is syntax to read value from query string & it's constant
   const qs = queryString.parse(this.props.location.search);
   const{account}=qs;

   axios({
    url:`http://localhost:2029/PayDetail/${account}`,
    method:'GET',
    headers:{'Content-Type':'application/json'}
})
.then(responce=>{
    this.setState({Paydetails:responce.data.Paydetails})
})
.catch()

    }
   
    render(){
        const{Paydetails}=this.state;
return(


    <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 container">
        <h1 className="Orderhead">Orders Placed</h1>

{Paydetails.length>0 ?Paydetails.map((item)=>{
                        return <div>
                            <h3>{item.shopName}</h3>
                            <div className="meal1">
                        <span className="ordermeal">{item.meal1}</span> 
                        <br/>
                        <span className="Amount">Amount: &#8377;{item.cost1}</span>
                        <br/>
                        <img className="mealimg" src={item.img1}  alt="sorry for img" height="100px" width="100px"/>
                        </div>

                        <div className="meal2"> 
                        <span className="ordermeal">{item.meal2}</span> 
                        <br/>
                        <span className="Amount">Amount: &#8377;{item.cost2}</span>
                        <br/>
                        <img className="mealimg" src={item.img2}  alt="sorry for img" height="100px" width="100px"/>
                        </div>
                    
                        <div className="Amount">TotalAmount: &#8377;{item.amount}</div>
                        <div className="Adddetails">
                            <h4>Address Details</h4>
                         <div>{item.name}</div>
                         <div>{item.mobile}</div>
                         <div>{item.email}</div>
                         <div>{item.address}</div>
                     </div>
                       
                       
                        </div>
                         
                        
                    }):<div className=" NoData">No orders Placed...</div>}

  
            
    
</div>

   )

}}
export default Orders;