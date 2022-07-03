import React from 'react';
import '../Styles/Filter.css'
import queryString from 'query-string';
import axios from 'axios';




class Filter extends React.Component{

    navigate=()=>{
this.props.history.push('/');
    }

    constructor(){
        super();
        this.state= {
            restaurants :[],
            locations:[],
            location:undefined,
            mealtype:undefined,
            cuisine:[],
            lcost:undefined,
            hcost:undefined,
            sort:undefined,
            page:undefined,
            lrate:undefined,
            hrate:undefined,
            MealTypes:[],
            pageCount:[]
   
            
        }
    }
 componentDidMount(){
     //"this.props.location.search" is syntax to read value from query string & it's constant
const qs = queryString.parse(this.props.location.search);
const{mealtype,location}=qs;


const filterObj = {
    mealtype: mealtype,
    location:location

};

axios({
    url:'http://localhost:2029/filter',
    method:'POST',
    headers:{'Content-Type':'application/json'},
    data:filterObj
})
.then(response=> {
this.setState({restaurants:response.data.restaurants,mealtype,location,pageCount: response.data.pageCount})
})
.catch()

axios({
    url:'http://localhost:2029/locations',
    method:'GET',
    headers:{'Content-Type':'application/json'}
})
.then(responce=>{
    this.setState({locations:responce.data.locations})

    responce.data.locations.map(item=>{
        
        if(item.location_id==location) {
         
           
            this.setState({locationbyid:item.city})
            
        }
         
     })
    
})
.catch()

axios({
    url:'http://localhost:2029/MealTypes',
    method:'GET',
    headers:{'Content-Type':'application/json'}
})
.then(responce=>{
    this.setState({MealTypes:responce.data.mealtypes})
  

    responce.data.mealtypes.map(item=>{
        
       if(item.meal_type==mealtype) {
        
     
      this.setState({mealtypebyclick:item.name})
   
       
       }
        
    })
    
        
})
.catch()
    }

handleLocationChange= (event)=>{
   
const location = event.target.value;

const{mealtype, cuisine, lcost, hcost, page, sort ,lrate,hrate}=this.state;

const filterObj = {
    
    mealtype: mealtype,
    location:location,
    cuisine:cuisine.length === 0 ? undefined :cuisine,
    lcost,
    hcost,
    sort,
    page,
    lrate,
    hrate

};

axios({
    url:'http://localhost:2029/filter',
    method:'POST',
    headers:{'Content-Type':'application/json'},
    data:filterObj,
    
})
.then(response=> {
window.location.reload(false) 
    
this.setState({restaurants:response.data.restaurants,location,pageCount: response.data.pageCount})

})
.catch()

this.props.history.push(`/filter?mealtype=${mealtype}&location=${location}`);

    }

    handleSortChange=(sort)=>{
        const{location,mealtype, cuisine, lcost, hcost, page,lrate,hrate}=this.state;
        const filterObj = {
        mealtype: mealtype,
         location:location,
         cuisine:cuisine.length === 0 ? undefined :cuisine,
         lcost,
         hcost,
         sort,
         page,
         lrate,
         hrate
        
        };
        
        axios({
            url:'http://localhost:2029/filter',
            method:'POST',
            headers:{'Content-Type':'application/json'},
            data:filterObj
        })
        .then(response=> {
        this.setState({restaurants:response.data.restaurants,sort,pageCount:response.data.pageCount})
        })
        .catch()
    }

    handleCostChange =(lcost,hcost)=>{

        
            const{location,mealtype, cuisine, sort, page,lrate,hrate}=this.state;
            const filterObj = {
            mealtype: mealtype,
             location:location,
             cuisine:cuisine.length === 0 ? undefined :cuisine,
             lcost,
             hcost,
             sort,
             page,
             lrate,
             hrate
            
            };
            
            axios({
                url:'http://localhost:2029/filter',
                method:'POST',
                headers:{'Content-Type':'application/json'},
                data:filterObj
            })
            .then(response=> {
            this.setState({restaurants:response.data.restaurants,lcost,hcost,pageCount: response.data.pageCount})
            })
            .catch()
        }

        handleRateChange=(lrate,hrate)=>{
            const{location,mealtype, cuisine, sort, page,lcost,hcost}=this.state;
            const filterObj = {
            mealtype: mealtype,
             location:location,
             cuisine:cuisine.length === 0 ? undefined :cuisine,
             lcost,
             hcost,
             sort,
             page,
             lrate,
             hrate
            
            };
            
            axios({
                url:'http://localhost:2029/filter',
                method:'POST',
                headers:{'Content-Type':'application/json'},
                data:filterObj
            })
            .then(response=> {
            this.setState({restaurants:response.data.restaurants,lrate,hrate,pageCount: response.data.pageCount})
            })
            .catch()
        }
        

        handleCuisineChange = (cuisineID)=>{
            const{location,mealtype, cuisine,sort, page,lcost,hcost,lrate,hrate}=this.state;

           const index = cuisine.indexOf(cuisineID);
           if(index >= 0){
               cuisine.splice(index,1);
           }
           else{
            cuisine.push(cuisineID);
           }
           
            
            const filterObj = {
            mealtype: mealtype,
             location:location,
             cuisine:cuisine.length === 0 ? undefined :cuisine,
             lcost,
             hcost,
             sort,
             page,
             lrate,
             hrate
            
            };
            
            axios({
                url:'http://localhost:2029/filter',
                method:'POST',
                headers:{'Content-Type':'application/json'},
                data:filterObj
            })
            .then(response=> {
            this.setState({restaurants:response.data.restaurants,cuisine,pageCount: response.data.pageCount})
            })
            .catch()
        }
    
        handleNavigate=(resID)=>{
            this.props.history.push(`/details?restaurant=${resID}`);
        }

        handlePageChange = (page) => {
            
            const { location,mealtype, cuisine,sort,lcost,hcost,lrate,hrate} = this.state;
            
            const filterObj = {
                mealtype: mealtype,
                location:location,
                cuisine:cuisine.length === 0 ? undefined :cuisine,
                lcost,
                hcost,
                sort,
                lrate,
                hrate,
                page
            };
    
            axios({
                url: 'http://localhost:2029/filter',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                data: filterObj
            })
                .then(response => {
                    this.setState({ restaurants: response.data.restaurants, page,cuisine, pageCount: response.data.pageCount })
                    
                    
                })
                .catch()
        }

    render(){
        const{restaurants,locations,pageCount,page,mealtypebyclick,locationbyid}=this.state;
      
        return (
            <div>
           
            <div className="container ">
            
            
            <div className="fheading">{mealtypebyclick} Places {locationbyid} <button onClick={this.navigate} class="btn btn-success"><i className="fa">&#xf060;</i>Back to Home</button></div> 
           
            <div className="row">
            
                <button type="button" className="btn btn-lg btn-info collapsed bton" data-toggle="collapse" data-target="#demo">Filters / Sort
                    <i  className="fa" >&#xf107;</i>
                </button>
               
            {/* Below is small filter*/}
                <div className="  col-sm-12 col-12 filter collapse" id="demo">
            
                    <div className="F">Filters</div>
                    <div className="S">Select Location</div>
                    <select className="fdrop" onChange={this.handleLocationChange}>
                    <option value="0">Select a location</option>
                    {locations.map((item)=>{
                        return < option key={item.location_id}  value={item.location_id} >{`${item.name}, ${item.city}`}</option> 
                    })}
                </select>
                    <div className="C">Cuisine</div>
                    <div className="check">
                        <div>
                            <input type="checkbox"></input>
                            <label>North Indian</label>
                        </div>
            
                        <div>
                            <input type="checkbox"/>
                            <label>South Indian</label>
                        </div>
            
                        <div>
                            <input type="checkbox"/>
                            <label>Chinese</label>
                        </div>
            
                        <div>
                            <input type="checkbox"/>
                            <label>Fast Food</label>
                        </div>
            
                        <div>
                            <input type="checkbox"/>
                            <label>Street Food</label>
                        </div>
            
                    </div>
            
            
                    <div className="Co">Cost For Two</div>
            
                    <div className="Radio1">
                        <div>
                            <input type="radio" name="rad" onChange={()=>this.handleCostChange(1,500)}/>
                            <label className="abc">Less than &#8377; 500 </label>
                        </div>
            
                        <div>
                            <input type="radio" name="rad" onChange={()=>this.handleCostChange(500,1000)}/>
                            <label className="abc"> &#8377; 500 to &#8377; 1000</label>
                        </div>
            
                        <div>
                            <input type="radio" name="rad" onChange={()=>this.handleCostChange(1000,1500)} />
                            <label className="abc"> &#8377; 1000 to &#8377; 1500</label>
                        </div>
            
                        <div>
                            <input type="radio" name="rad" onChange={()=>this.handleCostChange(1500,2000)}/>
                            <label className="abc"> &#8377; 1500 to &#8377; 2000</label>
                        </div>
            
                        <div>
                            <input type="radio" name="rad" onChange={()=>this.handleCostChange(2000,50000)}/>
                            <label className="abc"> &#8377; 2000+</label>
                        </div>
            
            
            
                    </div>
            
            
            
                    <div className="SO">Sort</div>
            
                    <div className="Radio1">
                        <div>
                            <input type="radio" name="range" onChange={()=>this.handleSortChange(1)}/>
                            <label className="abc"> Price low to high</label>
                        </div>
            
            
                        <div>
                            <input type="radio" name="range" onChange={()=>this.handleSortChange(-1)}/>
                            <label className="abc"> Price high to low</label>
                        </div>

                        
                    </div>
{/*small flter rating */}
                    <div className="SO">Sort By Ratings</div>
                    <div className="Radio1">
                        <div>
                        <input type="radio" name="rad" onChange={()=>this.handleRateChange(5.0,4.0)}/>
                            <label className="abc">  5 to 4</label>
                        </div>
                        <div>
                        <input type="radio" name="rad" onChange={()=>this.handleRateChange(4.0,3.0)}/>
                            <label className="abc">  4 to 3</label>
                        </div>
                        <div>
                        <input type="radio" name="rad" onChange={()=>this.handleRateChange(3.0,2.0)}/>
                            <label className="abc">  3 to 2</label>
                        </div>
                        <div>
                        <input type="radio" name="rad" onChange={()=>this.handleRateChange(2.0,1.0)}/>
                            <label className="abc">  2 to 1</label>
                        </div>
        
                        
                    </div>




                    <div className="appbtn" href="#">Apply</div>
                </div>
            
            </div>
        
            <div className="row">
                {/* Below is Big filter*/}
            
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-9 filter1">
            
            
            
                    <div className="F">Filters</div>
                    <div className="S">Select Location</div>
                    <select className="fdrop" onChange={this.handleLocationChange}>
                    <option value="0">Select a location</option>
                    {locations.map((item)=>{
                        return < option key={item.location_id}  value={item.location_id} >{`${item.name}, ${item.city}`}</option> 
                    })}
                </select>
                    <div className="C">Cuisine</div>
                    <div className="check">
                        <div>
                            <input type="checkbox" onChange={()=>this.handleCuisineChange(1)}/>
                            <label>North Indian</label>
                        </div>
            
                        <div>
                            <input type="checkbox" onChange={()=>this.handleCuisineChange(2)}/>
                            <label>South Indian</label>
                        </div>
            
                        <div>
                            <input type="checkbox" onChange={()=>this.handleCuisineChange(3)}/>
                            <label>Chinese</label>
                        </div>
            
                        <div>
                            <input type="checkbox" onChange={()=>this.handleCuisineChange(4)}/>
                            <label>Fast Food</label>
                            
                        </div>
            
                        <div>
                            <input type="checkbox" onChange={()=>this.handleCuisineChange(5)}/>
                            <label>Street Food</label>
                        </div>
            
                    </div>
            
            
                    <div className="Co">Cost For Two</div>
            
                    <div className="Radio1">
                        <div>
                            <input type="radio" name="rad" onChange={()=>this.handleCostChange(1,500)}/>
                            <label className="abc">Less than &#8377; 500 </label>
                        </div>
            
                        <div>
                            <input type="radio" name="rad" onChange={()=>this.handleCostChange(500,1000)}/>
                            <label className="abc"> &#8377; 500 to &#8377; 1000</label>
                        </div>
            
                        <div>
                            <input type="radio" name="rad" onChange={()=>this.handleCostChange(1000,1500)} />
                            <label className="abc"> &#8377; 1000 to &#8377; 1500</label>
                        </div>
            
                        <div>
                            <input type="radio" name="rad" onChange={()=>this.handleCostChange(1500,2000)}/>
                            <label className="abc"> &#8377; 1500 to &#8377; 2000</label>
                        </div>
            
                        <div>
                            <input type="radio" name="rad" onChange={()=>this.handleCostChange(2000,50000)}/>
                            <label className="abc"> &#8377; 2000+</label>
                        </div>
            
            
            
                    </div>
            
            
            
                    <div className="SO">Sort</div>
            
                    <div className="Radio1">
                        <div>
                            <input type="radio" name="range" onChange={()=>this.handleSortChange(1)}/>
                            <label className="abc"> Price low to high</label>
                        </div>
            
            
                        <div>
                            <input type="radio" name="range" onChange={()=>this.handleSortChange(-1)}/>
                            <label className="abc"> Price high to low</label>
                        </div>
                    </div>

                    
                </div>
            {/*Below is right BOX */}
            
                <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 ">
            {restaurants.length>0 ? restaurants.map((item,index)=>{
                  return  <div className="rightf" key={index}>
            
                  <img src={item.image} className="Image" alt="sorry for img"/>
      
                  <div className="Top">
                      <div className="B">{item.name}</div>
                      
                      <div><strong className="stro">{item.locality}</strong></div>
                      <div className="Address">{item.city}</div>
                      
                  </div>
                  <hr className="line"/>
                  <div className="cato">
                      <div>CUISINES:</div>
                      <div>COST FOR TWO:</div>
                  </div>
                  <div className="iteamf">
                      <div>{item.cuisine.map((val)=>`${val.name}, `)}</div>
                      <div> &#8377;{item.min_price}
                      <span className="Pagno">Pageno: 0{page}</span>
                      </div>
                      <button type="button" class="Detils btn btn-dark" onClick={()=>this.handleNavigate(item._id)}>Details </button>
                      <span className="rating">Ratings:  {item.aggregate_rating}</span>
                  </div>
                  
              </div>
            }):<div className=" NoData">No Records Found...</div>}
                    
            </div>

                </div>
{/* rating box */}
                <div className="ratingbox">
                <div className="rat">Sort By Ratings</div>
                <div className="rate">
                
                            <input type="radio" name="rad" onChange={()=>this.handleRateChange(5.0,4.0)}/>
                            <label className="abc">  5 to 4</label>
                        </div>
                        <div className="rate">
                            <input type="radio" name="rad" onChange={()=>this.handleRateChange(4.0,3.0)}/>
                            <label className="abc">  4 to 3</label>
                        </div>
                        <div className="rate">
                            <input type="radio" name="rad" onChange={()=>this.handleRateChange(3.0,2.0)}/>
                            <label className="abc">  3 to 2</label>
                        </div>
                        <div className="rate">
                            <input type="radio" name="rad" onChange={()=>this.handleRateChange(2.0,1.0)}/>
                            <label className="abc">  2 to 1</label>
                        </div>
                </div>






            
            
                <div>
                       { restaurants.length > 0 ? <div className="pagination">
                            <div className="page-link" >&laquo;</div>
                            { pageCount.map((page)=>{
                                
                                return<div onClick={() => this.handlePageChange(page)} className="page-item">{page}</div>
                            })}
                            <div className="page-link" >&raquo;</div>
                        </div>:null }
                    </div>
            
            </div>
           
            
                </div>
        )
    }
}

export default Filter;