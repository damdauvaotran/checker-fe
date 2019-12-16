import React from "react";
import withLayout from "../../shared-component/Layout";
import {login} from '../../api/auth'
import {Form, Icon, Input, Button, Checkbox, Card, message} from "antd";
import "./style.scss";
import {withTranslation} from "react-i18next";
import cookies from 'js-cookie'

class Login extends React.Component {
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
            cookies.set('checkerToken', res.data.token, {expires: 3})
          } else {
            message.error(res.message);
          }
        } catch (e) {
          console.error(e)
        }
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {t} = this.props;
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
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                {t('page.login.button.login')}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({name: "normal_login"})(Login);
export default withTranslation()(WrappedNormalLoginForm);
