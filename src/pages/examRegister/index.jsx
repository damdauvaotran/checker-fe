import React from "react";
import {Form, Icon, Input, Button, Checkbox, Row, Col, Table, Divider, Popconfirm, Select, message} from 'antd';

import {withLayout} from '../../shared-component/Layout/Layout'
import {studentGetAllowedSubject, studentGetRegisteredSubject} from '../../api/student/subject'
import {studentRegisterShift} from '../../api/student/shift'
import {PDFDownloadLink} from "@react-pdf/renderer";
import PdfStudentList from "../../shared-component/PdfStudentList";
import PdfSubjectList from "../../shared-component/PdfSubjectList";

const {Option} = Select;

// Todo: add registered subject
class ExamRegister extends React.Component {
  state = {
    allowedSubject: [],
    registerShift: [],
    registeredSubjectList: []
  };


  handleRegister = (index) => async (e) => {
    e.preventDefault();
    const {registerShift} = this.state
    try {
      const res = await studentRegisterShift(registerShift[index])
      if (res.success) {
        registerShift[index] = undefined;
        message.success('Đăng ký thành công');
        this.fetchAllShift()
      } else {
        message.error(JSON.stringify(res.message))
      }
    } catch (e) {
      console.error(e);
      message.error(JSON.stringify(e))
    }
  };

  handleChangeShift = (index) => (value) => {
    console.log('value', value);
    this.setState((prevState) => {
      const clonedRegisterShift = prevState.registerShift
      clonedRegisterShift[index] = value;
      return {
        registerShift: clonedRegisterShift
      }
    })
  }

  isAllowedRegister = (index) => {
    const {registerShift, allowedSubject} = this.state;
    if (registerShift[index]) {
      const selectShift = allowedSubject[index].examShifts.find((shift) => shift.examShiftId === registerShift[index])
      console.log(selectShift);
      return selectShift.registered < selectShift.room.totalSlot;
    }
    return false
  }


  fetchAllShift = async () => {
    const res = await studentGetAllowedSubject()
    this.setState({
      allowedSubject: res.data.subjectList
    })
  }

  fetchRegisteredSubject = async () => {
    const res = await studentGetRegisteredSubject();
    if (res.success) {
      this.setState({
        registeredSubjectList: res.data.subjectList
      })
    } else {
      message.error('Server chưa chạy')
    }
  }

  async componentDidMount() {

    await this.fetchAllShift()
    await this.fetchRegisteredSubject()
    window.x = () => {
      console.log(this.state.allowedSubject)
    }
  }

  columns = [
    {
      title: 'Môn',
      dataIndex: 'subjectName',
      key: 'subjectName',
    },
    {
      title: 'Ca',
      dataIndex: 'examShifts',
      key: 'examShifts',
      render: (text, record, index) => {
        const {registeredSubjectList} = this.state;
        const registeredSubject = registeredSubjectList.find(subject => {
          return subject.subjectId === record.subjectId
        });

        if (registeredSubject) {
          console.log('registeredSubject', registeredSubject);
          const registeredShift = registeredSubject.examShifts[0];
          return (
            <div>
              {'Phòng: ' + registeredShift.room.roomName + ' ' + registeredShift.examDate + ' ' + registeredShift.from + ': ' + registeredShift.registered + '/' + registeredShift.room.totalSlot}
            </div>
          )
        } else {
          return <div>
            <Select style={{width: 500}} onChange={this.handleChangeShift(index)}>
              {record.examShifts.map(shift => {
                return (
                  <Option key={shift.examShiftId} value={shift.examShiftId}>
                    {'Phòng: ' + shift.room.roomName + ' ' + shift.examDate + ' ' + shift.from + ': ' + shift.registered + '/' + shift.room.totalSlot}
                  </Option>
                )

              })}
            </Select>
            {/*{JSON.stringify(record)}*/}
          </div>
        }

      }
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record, i) => (
        <span>
          <Button type='primary' disabled={!this.isAllowedRegister(i)} onClick={this.handleRegister(i)}>Đăng ký</Button>
        </span>
      ),
    },

  ];

  render() {
    const {getFieldDecorator} = this.props.form;
    const {allowedSubject, registerShift, registeredSubjectList} = this.state;
    console.log('allowedSubject', allowedSubject)
    console.log('allowedSubject', registerShift)
    console.log('registeredSubject', registeredSubjectList)

    return (
      <div>
        {/*<Form onSubmit={this.handleSubmit} className="login-form">*/}
        {/*  {*/}
        {/*    allowedSubject.map((subject , index)=>{*/}
        {/*       return <Input.Group compact key={index}>*/}
        {/*        <Row gutter={8}>*/}
        {/*          <Col span={12}>*/}
        {/*            <Form.Item>*/}
        {/*              {getFieldDecorator('subject', {*/}
        {/*                initialValue: subject.subjectName,*/}
        {/*                rules: [{required: true, message: 'Hãy '}],*/}
        {/*              })(*/}
        {/*                <Input/>*/}
        {/*              )}*/}
        {/*            </Form.Item>*/}
        {/*          </Col>*/}
        {/*          <Col span={12}>*/}
        {/*            <Form.Item>*/}
        {/*              {getFieldDecorator('shift', {*/}
        {/*                rules: [{required: true, message: 'Please input your username!'}],*/}
        {/*              })(*/}
        {/*                <Input/>*/}
        {/*              )}*/}
        {/*            </Form.Item>*/}
        {/*          </Col>*/}
        {/*        </Row>*/}
        {/*      </Input.Group>*/}
        {/*    })*/}
        {/*  }*/}

        {/*</Form>*/}
        <Row>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <PDFDownloadLink document={<PdfSubjectList subjectList={registeredSubjectList}/>} fileName="Dangky.pdf">
              <Button type='primary' icon='file'>In kết quả</Button>
            </PDFDownloadLink>

          </div>
        </Row>
        <Row>
          <Table dataSource={allowedSubject} columns={this.columns} rowKey={(record) => record.subjectId}/>
        </Row>

      </div>
    )
  }
}

export default withLayout('1')(Form.create({name: 'exmaRegistee'})(ExamRegister))