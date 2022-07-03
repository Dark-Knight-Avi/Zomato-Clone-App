import React from 'react';
import '../Styles/Home.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';


class Wallpaper extends React.Component{
constructor(){
    super();
    this.state ={
        restaurants:[],
        searchText: undefined,
        suggestions:[],
        
    }
}




    handleLocationChange=(event)=>{
        const locId=event.target.value;
        const locationId=event.target.value;
        sessionStorage.setItem('location_id',locId);

        axios({
            url:`http://localhost:2029/restaurants/${locationId}`,
            method:'GET',
            headers:{'Content-Type':'application/json'}
        })
        .then(responce=>{
            this.setState({restaurants:responce.data.restaurants})
        })
        .catch()
    }
    handleInputChange=(event)=>{
        const{restaurants} =this.state
        const searchText = event.target.value;
        let searchRestaurants  =[];
        if(searchText){
            searchRestaurants =restaurants.filter((item)=> item.name.toLowerCase().includes(searchText.toLowerCase()));
        }
        
        this.setState({suggestions:searchRestaurants,searchText })
    }

    selectedText =(resItem)=>{
        this.props.history.push(`/details?restaurant=${resItem._id}`);
    }

    renderSuggestions=()=>{
        const{suggestions,searchText}= this.state;
        if(suggestions.length === 0 && searchText===""){
            return <ul>
                <li>Result not found</li>
               { window.location.reload(false)}
                </ul>
        }
        return(
            <ul>
                {
suggestions.map((item,index)=>(<li key={index} onClick={()=> this.selectedText(item) }><img className="searchimg" alt="noimg" src={`./${item.image}`} width=" 59px"/>{` ${item.name}-  ${item.locality},${item.city}`}</li>))
                }
            </ul>
        );
    }
    
   


    render(){
        const {a}=this.state;
       
const {locationsData,searchText}=this.props;

        return(
            <div >

<img src="Assets/homepage.png" alt="noimg" height="380px" width="100%" className="home-img"/>
<div className="container-fluid con">

   

    <div className="center">
        <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 item logo ">
                <a href="/" className="a">e!</a>
            </div>


        </div>


        <div className="row">


            <div className="col-lg-12 col-md-12 col-sm-12 item ">
                <h2 className="heading">Find the best restaurants, cafés, and bars</h2>
            </div>

        </div>


        <div className="row ">
            <div className="col-lg-12 col-md-12 col-sm-12 item ">
                <select className="drop" onChange={this.handleLocationChange}>
                    <option value="0">Please select a location</option>
                    {locationsData.map((item)=>{
                        return < option key={item.location_id}  value={item.location_id} >{`${item.name}, ${item.city}`}</option> 
                    })}
                </select>
<div id="notebooks">
                <input id="query" className="search " type="text" placeholder="Search for restaurants" value={searchText} onChange={this.handleInputChange}/>
                <i className="fas fa-search"></i>
               {this.renderSuggestions()}
                </div>
 
               

            </div>
        </div>
    </div>

</div>
   
            </div>
        )
    }
}

export default withRouter(Wallpaper);