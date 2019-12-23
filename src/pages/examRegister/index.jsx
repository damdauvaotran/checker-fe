import React from "react";
import {Form, Icon, Input, Button, Checkbox, Row, Col} from 'antd';

import {withLayout} from '../../shared-component/Layout'
import {studentGetAllowedSubject} from '../../api/student/subject'

class ExamRegister extends React.Component {
  state = {
    allowedSubject: []
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  async componentDidMount() {
    const res = await studentGetAllowedSubject()

    this.setState({
      allowedSubject: res.data.subjectList
    })

    window.x = ()=>{
      console.log(this.state.allowedSubject)
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const  {allowedSubject }   = this.state;
    return (
      <div>

        <Form onSubmit={this.handleSubmit} className="login-form">
          {
            allowedSubject.map((subject , index)=>{
               return <Input.Group compact key={index}>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item>
                      {getFieldDecorator('subject', {
                        initialValue: subject.subjectName,
                        rules: [{required: true, message: 'Hãy '}],
                      })(
                        <Input/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item>
                      {getFieldDecorator('shift', {
                        rules: [{required: true, message: 'Please input your username!'}],
                      })(
                        <Input/>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Input.Group>
            })
          }

        </Form>
      </div>
    )
  }
}

export default withLayout(Form.create({name: 'exmaRegistee'})(ExamRegister))