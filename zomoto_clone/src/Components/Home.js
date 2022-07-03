import React from 'react';
import axios from 'axios';
import Wallpaper from './Wallpaper';
import Quicksearch from './Quicksearch'

class Home extends React.Component{
    constructor(){
        super();
        this.state={
            locations:[],
            MealTypes:[]
        }
    }
    componentDidMount(){
        sessionStorage.clear();
        axios({
            url:'http://localhost:2029/locations',
            method:'GET',
            headers:{'Content-Type':'application/json'}
        })
        .then(responce=>{
            this.setState({locations:responce.data.locations})
        })
        .catch()
        

        axios({
            url:'http://localhost:2029/MealTypes',
            method:'GET',
            headers:{'Content-Type':'application/json'}
        })
        .then(responce=>{
            this.setState({MealTypes:responce.data.mealtypes})
        })
        .catch()
    }

    render(){
        const {locations,MealTypes}=this.state;
        return (
            <div>
               <Wallpaper locationsData={locations}/> 
               <Quicksearch QuicksearchData={MealTypes}/>
            </div>
        )
    }
}
export default Home;