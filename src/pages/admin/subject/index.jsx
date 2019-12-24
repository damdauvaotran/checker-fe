import React from "react";
import {withLayout} from '../../../shared-component/Layout/Layout'
import {getAllSubject, createSubject, updateSubject, deleteSubject, importSubject} from '../../../api/admin/subject'
import {Table, Divider, Button, Row, Modal, Col, Input, Form, Popconfirm, message, Upload} from 'antd'

class SubjectManager extends React.Component {
  state = {
    subjectList: [],
    isCreateModalVisible: false,
    isEditModalVisible: false,
    createdSubject: {},
    updatedSubject: {},
    selectedSubject: {},
    file: null,
    fileList: []
  };

  fetchSubject = async () => {
    const res = await getAllSubject()
    this.setState({
      subjectList: res.data.subjectList,
    })
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
         <Popconfirm
           title="Bạn có thật sự muốn xóa"
           onConfirm={() => this.handleDeleteSubject(record)}
           okText="Yes"
           cancelText="No"
         >
     <Button type='danger' icon='delete'>Xóa</Button>
      </Popconfirm>,
      </span>
      ),
    },

  ];


  handleDeleteSubject = async (subject) => {
    const {subjectId} = subject;
    const res = await deleteSubject(subjectId)
    if (res.success) {
      message.success('Xóa thành công')
      await this.fetchSubject();
    } else {
      message.error(res.message)
    }

  }

  handleOpenCreateModal = () => {
    this.setState({isCreateModalVisible: true})
  }
  handleOpenEditModal = (selectedSubject) => {
    this.setState({
      isEditModalVisible: true,
      selectedSubject: selectedSubject
    })
  }

  handleCreateSubject = () => {
    this.props.form.validateFields(['createdSubjectName', 'createdSubjectCredit'], async (errors, values) => {
      if (!errors) {
        console.log(values)
        const res = await createSubject(values.createdSubjectName, parseInt(values.createdSubjectCredit, 10))
        if (res.success) {
          message.success('Thêm thành công');
          this.handleCloseCreateModal();
          await this.fetchSubject();
        } else {
          message.error(res.message)
        }
      }
    })
  };

  handleEditSubject = () => {
    this.props.form.validateFields(['updatedSubjectName', 'updatedSubjectCredit'], async (errors, values) => {
      if (!errors) {
        const {subjectId} = this.state.selectedSubject;
        const res = await updateSubject(subjectId, values.updatedSubjectName, parseInt(values.updatedSubjectCredit, 10))
        if (res.success) {
          message.success('Sửa thành công');
          this.handleCloseEditModal();
          await this.fetchSubject();
        } else {
          message.error(res.message)
        }
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
      isEditModalVisible: false,
      selectedSubject: {}
    })
  }


  componentDidMount = async () => {
    await this.fetchSubject()
  }


  handleUploadFile = (info) => {
    // if (info.file.status !== 'uploading') {
    //   console.log(info.file, info.fileList);
    // }
    // if (info.file.status === 'done') {
    //   message.success(`${info.file.name} file uploaded successfully`);
    // } else if (info.file.status === 'error') {
    //   message.error(`${info.file.name} file upload failed.`);
    // }

    let fileList = [...info.fileList];
    // 1. Limit the number of uploaded files
    // Only to show one recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    // 2. Read from response and show file link

    this.setState({fileList});
  }

  uploadFile = async (options) => {
    const {onSuccess, onError, file, onProgress} = options;
    console.log('options', options)
    const fmData = new FormData();
    fmData.append('subjects', file)
    try {
      const res = await importSubject(fmData)
      onSuccess("Ok");
      if (res.success) {
        message.success('Import thành công')
        await this.fetchSubject()
      } else {
        message.error(JSON.stringify(res.message))
      }

    } catch (e) {
      console.error(e)
      onError({err: e})
    }
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
    const {subjectList, isCreateModalVisible, isEditModalVisible, selectedSubject, fileList} = this.state
    return (
      <div>
        <Row style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Upload onChange={this.handleUploadFile} customRequest={this.uploadFile} fileList={fileList}>
            <Button type='primary' icon='file-excel'>Import </Button>
          </Upload>
          <Divider type='vertical'/>
          <Button type='primary' icon='folder-add' onClick={this.handleOpenCreateModal}>Thêm </Button>
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

