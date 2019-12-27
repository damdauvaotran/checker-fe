import React from "react";
import {withLayout} from '../../../shared-component/Layout/Layout'
import {getAllSemester, createSemester, updateSemester, deleteSemester, importSemester} from '../../../api/admin/semester'
import {Table, Divider, Button, Row, Modal, Col, Input, Form, Popconfirm, message, Upload} from 'antd'

class SemesterManager extends React.Component {
  state = {
    semesterList: [],
    isCreateModalVisible: false,
    isEditModalVisible: false,
    createdSemester: {},
    updatedSemester: {},
    selectedSemester: {},
    file: null,
    fileList: []
  };

  fetchSemester = async () => {
    const res = await getAllSemester()
    this.setState({
      semesterList: res.data.semesterList,
    })
  };

  columns = [
    {
      title: 'Tên phòng',
      dataIndex: 'semesterName',
      key: 'semesterName',
    },
    {
      title: 'Số chỗ ngồi',
      dataIndex: 'totalSlot',
      key: 'totalSlot',
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
           onConfirm={() => this.handleDeleteSemester(record)}
           okText="Yes"
           cancelText="No"
         >
     <Button type='danger' icon='delete'>Xóa</Button>
      </Popconfirm>,
      </span>
      ),
    },

  ];


  handleDeleteSemester = async (semester) => {
    const {semesterId} = semester;
    const res = await deleteSemester(semesterId)
    if (res.success) {
      message.success('Xóa thành công')
      await this.fetchSemester();
    } else {
      message.error(res.message)
    }

  }

  handleOpenCreateModal = () => {
    this.setState({isCreateModalVisible: true})
  }
  handleOpenEditModal = (selectedSemester) => {
    this.setState({
      isEditModalVisible: true,
      selectedSemester: selectedSemester
    })
  }

  handleCreateSemester = () => {
    this.props.form.validateFields(['createdSemesterName', 'createdSemesterCredit'], async (errors, values) => {
      if (!errors) {
        const res = await createSemester(values.createdSemesterName, parseInt(values.createdSemesterCredit, 10))
        if (res.success) {
          message.success('Thêm thành công');
          this.handleCloseCreateModal();
          await this.fetchSemester();
        } else {
          message.error(res.message)
        }
      }
    })
  };

  handleEditSemester = () => {
    this.props.form.validateFields(['updatedSemesterName', 'updatedSemesterCredit'], async (errors, values) => {
      if (!errors) {
        const {semesterId} = this.state.selectedSemester;
        const res = await updateSemester(semesterId, values.updatedSemesterName, parseInt(values.updatedSemesterCredit, 10))
        if (res.success) {
          message.success('Sửa thành công');
          this.handleCloseEditModal();
          await this.fetchSemester();
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
      selectedSemester: {}
    })
  }


  componentDidMount = async () => {
    await this.fetchSemester()
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
    const fmData = new FormData();
    fmData.append('semesters', file)
    try {
      const res = await importSemester(fmData)
      onSuccess("Ok");
      if (res.success) {
        message.success('Import thành công')
        await this.fetchSemester()
      } else {
        message.error(JSON.stringify(res.message))
      }

    } catch (e) {
      console.error(e)
      onError({err: e})
    }
  }

  render() {
    console.log('semester', this.state.semesterList)
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
    const {semesterList, isCreateModalVisible, isEditModalVisible, selectedSemester, fileList} = this.state
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
          <Table dataSource={semesterList} columns={this.columns} rowKey={(record) => record.semesterId}/>;
        </Row>
        <Modal
          title="Thêm phòng"
          visible={isCreateModalVisible}
          onOk={this.handleCreateSemester}
          onCancel={this.handleCloseCreateModal}
        >
          <Form  {...formItemLayout}>
            <Form.Item label="Tên phòng" hasFeedback>
              {getFieldDecorator('createdSemesterName', {
                rules: [
                  {
                    required: true,
                    message: 'Hãy nhập tên phòng',
                  },
                ],
              })(<Input></Input>)}
            </Form.Item>
            <Form.Item label="Số chỗ ngồi" hasFeedback>
              {getFieldDecorator('createdSemesterCredit', {
                rules: [
                  {
                    required: true,
                    message: 'Hãy nhập số chỗ ngồi',
                  },
                ],
              })(<Input></Input>)}
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Sửa"
          visible={isEditModalVisible}
          onOk={this.handleEditSemester}
          onCancel={this.handleCloseEditModal}
        >
          <Form  {...formItemLayout}>
            <Form.Item label="Tên phòng" hasFeedback>
              {getFieldDecorator('updatedSemesterName', {
                initialValue: selectedSemester && selectedSemester.semesterName,
                rules: [
                  {
                    required: true,
                    message: 'Hãy nhập tên phòng',
                  },
                ],
              })(<Input></Input>)}
            </Form.Item>
            <Form.Item label="Số chỗ ngồi" hasFeedback>
              {getFieldDecorator('updatedSemesterCredit', {
                initialValue: selectedSemester && selectedSemester.semesterCredit,
                rules: [
                  {
                    required: true,
                    message: 'Hãy nhập số chỗ ngồi',
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

export default withLayout('admin1')(Form.create({name: 'register'})(SemesterManager))

