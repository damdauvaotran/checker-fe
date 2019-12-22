import React from "react";
import {Form, Icon, Input, Button, Checkbox, Row, Col} from 'antd';

import {withLayout} from '../../shared-component/Layout'

class ExamRegister extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div>

        <Form onSubmit={this.handleSubmit} className="login-form">
          <Input.Group compact>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item>
                  {getFieldDecorator('subject', {
                    rules: [{required: true, message: 'Hãy '}],
                  })(
                    <Input defaultValue="0571"/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  {getFieldDecorator('shift', {
                    rules: [{required: true, message: 'Please input your username!'}],
                  })(
                    <Input defaultValue="26888888"/>
                  )}
                </Form.Item>
              </Col>
            </Row>


          </Input.Group>
        </Form>
      </div>
    )
  }
}

export default withLayout(Form.create({name: 'exmaRegistee'})(ExamRegister))