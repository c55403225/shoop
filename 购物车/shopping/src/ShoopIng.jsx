import React, { Component } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import { Modal, Form, Input, Button, message } from 'antd';
export default class ShoopIng extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [{
        title: '图片',
        dataIndex: 'Img',
        key: 'name',
        render: (_, record) => <img style={{ width: '50px', margin: '5px 15px' }} src={record.Img} />,
      },
      {
        title: '商品信息',
        dataIndex: 'Shoop',
        key: 'shoop',
      },
      {
        title: '数量',
        dataIndex: 'Number',
        key: 'name',
        render: (_, record) => <div>
          <button style={{ width: '40px', height: '30px' }} onClick={record => record.Number + 1}>-</button>
          <input value={record.Number} type="text" style={{ width: '40px', margin: "0 20px", textAlign: 'center' }} onChange={(e,value)=>{value=e.target.value}} />
          <button style={{ width: '40px', height: '30px' }}>+</button>
        </div>,
      },
      {
        title: '单价(元)',
        dataIndex: 'Monovalent',
        key: 'name',
      },
      {
        title: '金额(元)',
        dataIndex: 'Money',
        key: 'name',
      },
      {
        title: '操作',
        dataIndex: 'Operate',
        key: 'name',
        render: (_, record) => <a onClick={
          () => axios.post('http://localhost:4000/delete', {
            params: {
              id: record.number_id
            },
          }).then((response) => {
            message.success('删除成功!');
            this.initData()
            console.log(response, 'response')
          }).catch((response) => {
            console.log(response);
          })
        }>{record.Operate}</a>,
      }
      ],
      data: [],
      open: false,
      loading: false
    }
  }
  componentDidMount() {
    this.initData()
  };
  //初始化接口
  initData() {
    axios.post('http://localhost:4000/query', {
      params: {},
    }).then((res) => {
      console.log(res.data.result, 'res')
      this.setState({
        data: res.data.result
      })
    }).catch((response) => {
      console.log(response);
    })
  }

  //Modul关闭
  handleCancel() {
    this.setState({ open: false });
  };
  //数据获取提交
  onFinish(values) {
    this.setState({ loading: true });
    values.id = Math.ceil(Math.random() * 10)
    axios.post("http://localhost:4000/add", {
      params: { values }
    }).then((res) => {
      this.setState({ loading: false });
      this.setState({ open: false });
      console.log('插入成功')
      console.log(res.data.result, 'res')
      this.setState({
        data: res.data.result
      })
    }).catch((response) => {
      console.log(response);
    })
    console.log('Success:', values);
  };
  onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  };
  render() {
    return (
      <div style={{ border: '1px solid red', width: '100vw', height: '100vh', boxSizing: 'border-box', margin: '0', padding: '0' }}>
        <div style={{ position: 'relative', top: '50%', left: '50%', transform: 'transLate(-50%,-50%)', width: '80%', height: '40%', border: '1px solid #666' }}>
          <button onClick={() => this.setState({ open: true })}>增加商品</button>
          {this.state.open &&
            <Modal cancelText="取消" okText="添加" title="Basic Modal" visible={this.state.open} footer={false} onCancel={this.handleCancel.bind(this)}>
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={this.onFinish.bind(this)}
                onFinishFailed={this.onFinishFailed.bind(this)}
              >
                <Form.Item
                  label="图书图片地址"
                  name="Img"
                  rules={[{ required: true, message: '请输入图书图片地址!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="图书名称"
                  name="Shoop"
                  rules={[{ required: true, message: '请输入图书名称!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="图书数量"
                  name="Number"
                  rules={[{ required: true, message: '请输入图书数量!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="图书单价"
                  name="Monovalent"
                  rules={[{ required: true, message: '请输入图书单价!' }]}
                >
                  <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={this.state.loading}>
                  Submit
                </Button>
              </Form>
            </Modal>
          }
          <Table columns={this.state.columns} dataSource={this.state.data} pagination={false} />
        </div>
      </div>
    )
  }
}
