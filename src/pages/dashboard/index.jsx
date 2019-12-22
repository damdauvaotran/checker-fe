import React from 'react';
import {withLayout} from '../../shared-component/Layout'
import ExamRegister  from "../examRegister";

class Dashboard extends React.Component{
    render(){
        return (
            <div>
                <ExamRegister></ExamRegister>
            </div>
        );
    }

}   

export default withLayout(Dashboard);