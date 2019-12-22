import React from 'react';
import {withLayout} from '../../shared-component/Layout'

class Dashboard extends React.Component{
    render(){
        return (
            <div>Hello world</div>
        );
    }

}   

export default withLayout(Dashboard);