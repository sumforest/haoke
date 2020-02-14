import React from 'react';
import {Checkbox, Form, Input, Modal} from "antd";
import PicturesWall from "../Utils/PicturesWall";
import {connect} from "dva";
const FormItem = Form.Item;
const InputGroup = Input.Group;
const CheckboxGroup = Checkbox.Group;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

@connect()
@Form.create()
class EditHouseResources extends React.Component{
  constructor(props){
    super(props);
    this.state={
      visible:false,
      pics:new Set()
    };
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  handleSave = () => {
    const { dispatch, form, record } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {if(this.state.pics.size > 0){
        values.pic = [...this.state.pics].join(',');
      }
        values.id = record.id;
        dispatch({
          type: 'house/updateHouseForm',
          payload: values,
        });
        setTimeout(()=>{
          this.handleCancel();
          this.props.reload();
        },500)
      }
    });
  };
  handleFileList = (obj)=>{
    let pics = new Set();
    obj.forEach((v, k) => {
      if(v.response){
        pics.add(v.response.name);
      }
      if(v.url){
        pics.add(v.url);
      }
    });
    this.setState({
      pics : pics
    })
  }
  render(){
    const record = this.props.record;
    const {
      form: { getFieldDecorator }
    } = this.props;

    return (
      <React.Fragment>
        <a onClick={()=>{this.showModal()}}>编辑</a>
        <Modal
          title={'编辑'}
          width={640}
          visible={this.state.visible}
          onOk={()=>{this.handleSave()}}
          onCancel={()=>{this.handleCancel()}}
          destroyOnClose={true}
        >
          <div style={{ overflowY:'auto'}}>
          <Form hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="房源标题">
              {getFieldDecorator('title',{initialValue:record.title ,rules:[{required: true, message:"此项为必填项" }]})(<Input style={{ width: '100%' }} disabled={false} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="租金">
              <InputGroup compact>
                {getFieldDecorator('rent',{initialValue:record.rent ,rules:[{required: true, message:"此项为必填项" }]})(<Input style={{ width: '50%' }} addonAfter="元/月" />)}
              </InputGroup>
            </FormItem>
            <FormItem {...formItemLayout} label="建筑面积">
              <InputGroup compact>
                {getFieldDecorator('coveredArea', {initialValue:record.coveredArea,rules:[{ required: true, message:"此项为必填项"}]})(<Input style={{ width: '40%' }} addonAfter="平米" />)}
              </InputGroup>
            </FormItem>
            <FormItem {...formItemLayout} label="上传室内图">
              <PicturesWall handleFileList={this.handleFileList.bind(this)} fileList={record.pic}/>
            </FormItem>
          </Form>
        </div>
        </Modal>

      </React.Fragment>
    )
  }
}
export default EditHouseResources;
