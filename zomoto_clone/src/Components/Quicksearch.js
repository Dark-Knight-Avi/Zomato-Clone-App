import React from 'react';
import '../Styles/Home.css';
import QuickSearchItem from './QuickSearchItem';

class Quicksearch extends React.Component{

    render(){
       const{QuicksearchData} = this.props;
        return(
            <div>
                <div className="container">
    <main>
        <div className="bold">Quick Searches</div>
        <div className="para">Discover restaurants by type of meal</div>

        <div className="row">
        {QuicksearchData.map((item,index)=>{
            return <QuickSearchItem item={item} />
        })}
           
           
        </div>
    </main>

</div>



            </div>
        )
    }
} 

export default Quicksearch;