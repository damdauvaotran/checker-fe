import React from "react";
import withLayout from "../../shared-component/Layout/Layout";
import {login, register} from '../../api/auth'
import {Form, Icon, Input, Button, Checkbox, Card, message} from "antd";
import "./style.scss";
import {withTranslation} from "react-i18next";

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        try {
          const res = await login({
            username: values.username,
            password: values.password,
          });
          console.log("res", res)
          if (res.success) {
            message.success('Đăng nhập thành công');
          } else {
            message.error(res.message);
          }

        } catch (e) {

        }

      }
    });
  };

  render() {
    const {t} = this.props;
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="login-background">
        <Card style={{width: 300}}>
          <div>
            <div className='login-title'>{t('app.title')}</div>
            <div>{t('app.slogan')}</div>
          </div>

          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  {required: true, message: "Please input your username!"}
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{color: "rgba(0,0,0,.25)"}}/>
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {required: true, message: "Please input your Password!"}
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('repeatPassword', {
                rules: [
                  {
                    required: true,
                    message: "Please repeat your password"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>
                  }
                  type="password"
                  placeholder="Repeat Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: "Please enter your name "
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>
                  }
                  type="test"
                  placeholder="Name"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                {t('page.register.button.register')}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const WrappedNormalRegisterForm = Form.create({name: "normal_register"})(Register);
export default withTranslation()(WrappedNormalRegisterForm);
