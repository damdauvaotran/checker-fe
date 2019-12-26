import React from "react";
import {withLayout} from '../../../shared-component/Layout/Layout'
import {getAllShift, createShift, updateShift, deleteShift, importShift} from '../../../api/admin/shift'
import {Table, Divider, Button, Row, Modal, Col, Input, Form, Popconfirm, message, Upload} from 'antd'

class ShiftManager extends React.Component {
  state = {
    shiftList: [],
    isCreateModalVisible: false,
    isEditModalVisible: false,
    createdShift: {},
    updatedShift: {},
    selectedShift: {},
    file: null,
    fileList: []
  };

  fetchShift = async () => {
    const res = await getAllShift()
    this.setState({
      shiftList: res.data.shiftList,
    })
  };

  columns = [
    {
      title: 'Tên phòng',
      dataIndex: 'shiftName',
      key: 'shiftName',
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
           onConfirm={() => this.handleDeleteShift(record)}
           okText="Yes"
           cancelText="No"
         >
     <Button type='danger' icon='delete'>Xóa</Button>
      </Popconfirm>,
      </span>
      ),
    },

  ];


  handleDeleteShift = async (shift) => {
    const {shiftId} = shift;
    const res = await deleteShift(shiftId)
    if (res.success) {
      message.success('Xóa thành công')
      await this.fetchShift();
    } else {
      message.error(res.message)
    }

  }

  handleOpenCreateModal = () => {
    this.setState({isCreateModalVisible: true})
  }
  handleOpenEditModal = (selectedShift) => {
    this.setState({
      isEditModalVisible: true,
      selectedShift: selectedShift
    })
  }

  handleCreateShift = () => {
    this.props.form.validateFields(['createdShiftName', 'createdShiftCredit'], async (errors, values) => {
      if (!errors) {
        const res = await createShift(values.createdShiftName, parseInt(values.createdShiftCredit, 10))
        if (res.success) {
          message.success('Thêm thành công');
          this.handleCloseCreateModal();
          await this.fetchShift();
        } else {
          message.error(res.message)
        }
      }
    })
  };

  handleEditShift = () => {
    this.props.form.validateFields(['updatedShiftName', 'updatedShiftCredit'], async (errors, values) => {
      if (!errors) {
        const {shiftId} = this.state.selectedShift;
        const res = await updateShift(shiftId, values.updatedShiftName, parseInt(values.updatedShiftCredit, 10))
        if (res.success) {
          message.success('Sửa thành công');
          this.handleCloseEditModal();
          await this.fetchShift();
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
      selectedShift: {}
    })
  }


  componentDidMount = async () => {
    await this.fetchShift()
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
    fmData.append('shifts', file)
    try {
      const res = await importShift(fmData)
      onSuccess("Ok");
      if (res.success) {
        message.success('Import thành công')
        await this.fetchShift()
      } else {
        message.error(JSON.stringify(res.message))
      }

    } catch (e) {
      console.error(e)
      onError({err: e})
    }
  }

  render() {
    console.log('shift', this.state.shiftList)
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
    const {shiftList, isCreateModalVisible, isEditModalVisible, selectedShift, fileList} = this.state
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
          <Table dataSource={shiftList} columns={this.columns} rowKey={(record) => record.shiftId}/>;
        </Row>
        <Modal
          title="Thêm phòng"
          visible={isCreateModalVisible}
          onOk={this.handleCreateShift}
          onCancel={this.handleCloseCreateModal}
        >
          <Form  {...formItemLayout}>
            <Form.Item label="Tên phòng" hasFeedback>
              {getFieldDecorator('createdShiftName', {
                rules: [
                  {
                    required: true,
                    message: 'Hãy nhập tên phòng',
                  },
                ],
              })(<Input></Input>)}
            </Form.Item>
            <Form.Item label="Số chỗ ngồi" hasFeedback>
              {getFieldDecorator('createdShiftCredit', {
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
          onOk={this.handleEditShift}
          onCancel={this.handleCloseEditModal}
        >
          <Form  {...formItemLayout}>
            <Form.Item label="Tên phòng" hasFeedback>
              {getFieldDecorator('updatedShiftName', {
                initialValue: selectedShift && selectedShift.shiftName,
                rules: [
                  {
                    required: true,
                    message: 'Hãy nhập tên phòng',
                  },
                ],
              })(<Input></Input>)}
            </Form.Item>
            <Form.Item label="Số chỗ ngồi" hasFeedback>
              {getFieldDecorator('updatedShiftCredit', {
                initialValue: selectedShift && selectedShift.shiftCredit,
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

export default withLayout('admin4')(Form.create({name: 'register'})(ShiftManager))

