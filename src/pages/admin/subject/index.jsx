import React from "react";
import {withLayout} from '../../../shared-component/Layout/Layout'
import {getAllSubject, createSubject, updateSubject, deleteSubject} from '../../../api/admin/subject'
import {Table, Divider, Button, Row, Modal, Col, Input, Form, message} from 'antd'

class SubjectManager extends React.Component {
  state = {
    subjectList: [],
    isCreateModalVisible: false,
    isEditModalVisible: false,
    createdSubject: {},
    updatedSubject: {},
    selectedSubject: {}
  };

  fetchSubject = async () => {
    const res = await getAllSubject()
    this.setState({
      subjectList: res.data.subjectList,
    })
  };

  onCreateSubject = () => {
  };
  columns = [
    {
      title: 'Tên môn',
      dataIndex: 'subjectName',
      key: 'subjectName',
    },
    {
      title: 'Số tín chỉ',
      dataIndex: 'subjectCredit',
      key: 'subjectCredit',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <span>
        <Button type='primary' icon='edit' onClick={() => this.handleOpenEditModal(record)}>Sửa</Button>
        <Divider type="vertical"/>
        <Button type='danger' icon='delete'>Xóa</Button>
      </span>
      ),
    },

  ];

  handleOpenCreateModal = () => {
    this.setState({isCreateModalVisible: true})
  }
  handleOpenEditModal = (selectedSubject) => {
    this.setState({
      isEditModalVisible: true,
      selectedSubject: selectedSubject
    })
    console.log('selected', selectedSubject)
  }

  handleCreateSubject = () => {
    this.props.form.validateFields(['createdSubjectName', 'createdSubjectCredit'], async (errors, values) => {
      if (!errors) {
        console.log(values)
        const res = await createSubject(values.createdSubjectName, parseInt(values.createdSubjectCredit, 10))
        if (res.success) {
          message.success('Thêm thành công');
          await this.fetchSubject();
        } else {
          message.error(res.message)
        }
      }
    })
  };

  handleEditSubject = () => {
    this.props.form.validateFields(['updatedSubjectName', 'updatedSubjectCredit'], (errors, values) => {
      if (!errors) {
        console.log(values)
      }
    })
  };

  handleCloseCreateModal = () => {
    this.setState({
      isCreateModalVisible: false
    })
  }

  handleCloseEditModal = () => {
    this.setState({
      isEditModalVisible: false
    })
  }


  async componentDidMount() {
    await this.fetchSubject()
  }


  render() {
    console.log(this.state.subjectList)
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 5},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 19},
      },
    };
    const {subjectList, isCreateModalVisible, isEditModalVisible, selectedSubject} = this.state
    return (
      <div>
        <Row style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button type='primary' icon='file-add' onClick={this.handleOpenCreateModal}>Thêm </Button>
        </Row>
        <Row>
          <Table dataSource={subjectList} columns={this.columns} rowKey={(record) => record.subjectId}/>;
        </Row>
        <Modal
          title="Thêm môn"
          visible={isCreateModalVisible}
          onOk={this.handleCreateSubject}
          onCancel={this.handleCloseCreateModal}
        >
          <Form  {...formItemLayout}>
            <Form.Item label="Tên môn" hasFeedback>
              {getFieldDecorator('createdSubjectName', {
                rules: [
                  {
                    required: true,
                    message: 'Hãy nhập tên môn',
                  },
                ],
              })(<Input></Input>)}
            </Form.Item>
            <Form.Item label="Số tín chỉ" hasFeedback>
              {getFieldDecorator('createdSubjectCredit', {
                rules: [
                  {
                    required: true,
                    message: 'Hãy nhập số tín chỉ',
                  },
                ],
              })(<Input></Input>)}
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Sửa"
          visible={isEditModalVisible}
          onOk={this.handleEditSubject}
          onCancel={this.handleCloseEditModal}
        >
          <Form  {...formItemLayout}>
            <Form.Item label="Tên môn" hasFeedback>
              {getFieldDecorator('updatedSubjectName', {
                initialValue: selectedSubject && selectedSubject.subjectName,
                rules: [
                  {
                    required: true,
                    message: 'Hãy nhập tên môn',
                  },
                ],
              })(<Input></Input>)}
            </Form.Item>
            <Form.Item label="Số tín chỉ" hasFeedback>
              {getFieldDecorator('updatedSubjectCredit', {
                initialValue: selectedSubject && selectedSubject.subjectCredit,
                rules: [
                  {
                    required: true,
                    message: 'Hãy nhập số tín chỉ',
                  },
                ],
              })(<Input></Input>)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default withLayout('admin1')(Form.create({name: 'register'})(SubjectManager))

