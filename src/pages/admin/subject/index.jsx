import React from "react";
import {withLayout} from '../../../shared-component/Layout'
import {getAllSubject} from '../../../api/admin/subject'

class SubjectManager extends React.Component {
  state = {
    subjectList: []
  }
  fetchSubject =async  () => {
    const subjectList = await getAllSubject()
    this.setState({
      subjectList: subjectList,
    })
  };

  onCreateSUbject = () => {

  };

  componentDidMount() {
    
  }


  render() {
    return (
      <div>


      </div>
    )
  }
}

export default withLayout(SubjectManager)

