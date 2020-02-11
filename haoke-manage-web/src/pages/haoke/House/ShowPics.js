import React from 'react';
import { Button, Carousel, Modal} from "antd";

class ShowPics extends React.Component {
  info = () => {
    Modal.info({
      title: '',
      iconType: '',
      width: '800px',
      okText: 'ok',
      content: (
        <div style={{width: 650, height: 400, lineHeight: 400, textAlign: "center"}}>
          <Carousel autoplay={true}>
            {
              this.props.pics.split(',').map((value, index) => {
                return <div><img style={{maxWidth: 600, maxHeight: 400, margin: "0 auto"}} src={value}/></div>
              })
            }
          </Carousel>
        </div>
      ),
      onOk() {
      },
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      btnDisable: !this.props.pics
    }
  }
  render() {
    return (
      <div>
        <Button disabled={this.state.btnDisable} icon="picture" shape="circle" onClick={()=>{
          this.info();
        }}/>
      </div>
    )
  }
}

export default ShowPics;
