import React from 'react';
import {withRouter} from 'react-router-dom';

class QuickSearchItem extends React.Component{
    handleNavigate = (mealTypeID)=>{
        const locationId= sessionStorage.getItem('location_id')
        if(locationId){
            this.props.history.push(`/filter?mealtype=${mealTypeID}&location=${locationId}`);

        }
        else{
            this.props.history.push(`/filter?mealtype=${mealTypeID}`);
           
        }
    }

    render(){
        const {item}= this.props;
        return (
            
            <div onClick={()=>this.handleNavigate(item.meal_type)} key={item.meal_type} className="col-4 col-lg-6 col-md-6 col-sm-12 item1">
            <div className="left">
                <img className="imgbox" src={`./${item.image}`} width="150px" height="150px" alt="noimg"/>
            </div>

            <div className="right">
                <div className="righthd">{item.name}</div>
                <div className="rightdn">{item.content}</div>

            </div>

        </div>
        

        )
    }
}

export default withRouter(QuickSearchItem);