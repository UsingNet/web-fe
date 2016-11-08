import React, { PropTypes } from 'react';
import { Modal, Radio, Button, message } from 'antd';
import html2canvas from 'html2canvas';
import classNames from 'classnames';
import restHub from 'services/restHub';
import Cutter from '../Cutter';
import styles from './paste-image-modal.less';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class PasteImageModal extends React.Component {
  static propTypes = {
    orderId: PropTypes.number.isRequired,
    pasteImageVisible: PropTypes.bool.isRequired,
    togglePasteImageVisible: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
  }

  state = {
    step: 1,
    imgSrcBlob: null,
    currentTool: 'default',
    textareaFocus: false,
  }

  componentDidMount() {
    document.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeyUp);
  }

  onKeyUp = (e) => {
    if (e.keyCode === 44) {
      this.props.togglePasteImageVisible(true);
    }
  }

  // eslint-disable-next-line consistent-return
  onPasteImage = (e) => {
    if (e.clipboardData && e.clipboardData.getData) {
      const clipboardData = e.clipboardData;
      const that = this;

      for (let i = 0; i < clipboardData.items.length; i++) {
        const item = clipboardData.items[i];
        if (item && item.kind === 'file' && item.type.match(/^image\//i)) {
          const blob = item.getAsFile();
          const reader = new FileReader();
          reader.onload = () => {
            // that.props.updateState({ step: 2, imgSrcBlob: event.target.result });
            that.setState({ step: 2, imgSrcBlob: event.target.result });
          };
          reader.readAsDataURL(blob);
          return false;
        }
      }

      message.warning('粘贴内容不正确');
    }
  }

  onSendImage = (blob) => {
    this.props.togglePasteImageVisible(false);

    restHub.post('/upload', {
      body: {
        file: blob,
        type: 'image/png',
        encode: 'base64',
      },
    }).then(({ jsonResult }) => {
      if (jsonResult.success) {
        this.props.sendMessage({
          order_id: this.props.orderId,
          body: jsonResult.data,
        });
      }
    });

    this.setState({
      step: 1,
      imgSrcBlob: null,
    });
  }

  onNextStep = () => {
    if (this.state.step === 2) {
      const result = this.refs.cutter.getResult();
      const originImage = this.refs.originImage;
      const originWidth = originImage.width;

      this.setState({
        step: 3,
      }, () => {
        const img = new Image();
        img.src = originImage.src;
        const zoom = img.width / originWidth;
        // const canvas = document.createElement('canvas');
        const canvas = this.refs.canvas;
        canvas.width = result.width * zoom;
        canvas.height = result.height * zoom;
        const cxt = canvas.getContext('2d');
        img.onload = () => {
          cxt.drawImage(img,
                        result.left * zoom,
                        result.top * zoom,
                        result.width * zoom,
                        result.height * zoom,
                        0,
                        0,
                        result.width * zoom,
                        result.height * zoom);
        };
      });
    } else if (this.state.step === 3) {
      html2canvas(this.refs.canvasContainer).then(c => {
        const blob = c.toDataURL('image/png');
        this.setState({
          step: 1,
          imgSrcBlob: null,
        });

        this.onSendImage(blob);
      }).catch(() => {});
    }
  }

  onChangeTool = (e) => {
    const childLength = this.refs.canvasContainer.children.length;
    const canvasContainer = this.refs.canvasContainer;

    if (e.target.value === 'undo') {
      if (this.refs.canvasContainer.children.length === 1) {
        message.warning('已经恢复到初始状态了');
      } else {
        canvasContainer.removeChild(canvasContainer.children[childLength - 1]);
      }
      this.setState({ currentTool: 'default' });
    } else {
      this.setState({ currentTool: e.target.value });
    }

    window.getSelection().removeAllRanges();
  };

  onTextToolFocus = (e) => {
    if (this.dragState.in_tool_drag) {
      e.preventDefault();
      e.stopPropagation();
      e.target.blur();
      return false;
    }

    return true;
  };

  onCanvasMouseDown = (e) => {
    switch (this.state.currentTool) {
      case 'rectangular': {
        window.getSelection().removeAllRanges();
        const div = document.createElement('div');
        div.className = styles['rectangular-tool'];
        div.onmousedown = this.onCanvasMouseDown;

        this.refs.canvas.parentElement.appendChild(div);
        this.dragState = {
          startPositionX: e.clientX,
          startPositionY: e.clientY,
          endPositionX: e.clientX,
          endPositionY: e.clientY,
          in_tool_drag: true,
          tool_object: div,
        };

        this.refreshToolObject(e);
        this.initCanvasDrag();
        break;
      }
      case 'text': {
        window.getSelection().removeAllRanges();
        const txt = document.createElement('textarea');
        txt.className = styles['text-tool'];
        txt.onmousedown = this.onCanvasMouseDown;
        txt.onfocus = this.onTextToolFocus;

        this.refs.canvas.parentElement.appendChild(txt);
        this.dragState = {
          startPositionX: e.clientX,
          startPositionY: e.clientY,
          endPositionX: e.clientX,
          endPositionY: e.clientY,
          in_tool_drag: true,
          tool_object: txt,
        };
        this.refreshToolObject(e);
        this.initCanvasDrag();
        break;
      }
      default:
        break;
    }
  }

  onCanvasMove = (e) => {
    if (this.dragState.in_tool_drag) {
      window.getSelection().removeAllRanges();
      switch (this.state.currentTool) {
        case 'rectangular':
          this.dragState.endPositionX = e.clientX;
          this.dragState.endPositionY = e.clientY;
          this.refreshToolObject(e);
          break;
        case 'text':
          this.dragState.endPositionX = e.clientX;
          this.dragState.endPositionY = e.clientY;
          this.refreshToolObject(e);
          break;
        default:
          break;
      }
    }
  }

  onCanvasMouseUp = () => {
    if (this.dragState.in_tool_drag) {
      this.dragState.in_tool_drag = false;

      if (this.state.currentTool === 'text') {
        this.dragState.tool_object.focus();
        this.setState({
          currentTool: 'default',
        });
      }
    }

    this.removeCanvasDrag();
  }

  getElementPosition = (dom) => {
    let x = dom.offsetLeft;
    let y = dom.offsetTop;

    while (dom.offsetParent) {
      // eslint-disable-next-line no-param-reassign
      dom = dom.offsetParent;
      x += dom.offsetLeft;
      y += dom.offsetTop;
    }

    return {
      x,
      y,
    };
  }

  refreshToolObject = () => {
    if (this.dragState.tool_object) {
      const obj = this.dragState.tool_object;
      const position = this.getElementPosition(this.refs.canvas);

      const line = {
        top: Math.min(this.dragState.startPositionY, this.dragState.endPositionY),
        right: Math.max(this.dragState.startPositionX, this.dragState.endPositionX),
        bottom: Math.max(this.dragState.startPositionY, this.dragState.endPositionY),
        left: Math.min(this.dragState.startPositionX, this.dragState.endPositionX),
      };

      const style = {
        top: line.top - position.y,
        left: line.left - position.x,
        height: line.bottom - line.top,
        width: line.right - line.left,
      };

      if (style.top < 0) {
        style.height += style.top;
        style.top = 0;
      }

      if (style.top >= obj.parentElement.offsetHeight) {
        style.top = obj.parentElement.offsetHeight - 1;
      }

      if (style.height + style.top > obj.parentElement.offsetHeight) {
        style.height = obj.parentElement.offsetHeight - style.top;
      }

      if (style.left < 0) {
        style.width += style.left;
        style.left = 0;
      }

      if (style.left >= obj.parentElement.offsetWidth) {
        style.left = obj.parentElement.offsetWidth - 1;
      }

      if (style.width + style.left > obj.parentElement.offsetWidth) {
        style.width = obj.parentElement.offsetWidth - style.left;
      }

      for (const key of Object.keys(style)) {
        obj.style[key] = `${style[key].toString()}px`;
      }
    }
  };

  initCanvasDrag = () => {
    document.addEventListener('mousemove', this.onCanvasMove, true);
    document.addEventListener('mouseup', this.onCanvasMouseUp, true);
  }

  removeCanvasDrag = () => {
    document.removeEventListener('mousemove', this.onCanvasMove, true);
    document.removeEventListener('mouseup', this.onCanvasMouseUp, true);
  }

  render() {
    const { pasteImageVisible, togglePasteImageVisible } = this.props;
    let modalfFooter = [];

    if (this.state.step === 2) {
      modalfFooter = [
        <Button
          key="sendImage"
          type="primary"
          size="large"
          onClick={() => this.onSendImage(this.state.imgSrcBlob)}
        >
          直接发送全图
        </Button>,
        <Button
          key="submit"
          type="primary"
          size="large"
          loading={this.state.loading}
          onClick={this.onNextStep}
        >
          下一步
        </Button>,
      ];
    } else if (this.state.step === 3) {
      modalfFooter = [
        <Button
          key="submit"
          type="primary"
          size="large"
          loading={this.state.loading}
          onClick={this.onNextStep}
        >
          下一步
        </Button>,
      ];
    }

    let modalChildren = '';

    const pasteAreaClasses = classNames({
      [styles['paste-area']]: true,
      [styles.focus]: this.state.textareaFocus,
    });

    if (this.state.step === 1) {
      modalChildren = (
        <div>
          <p>按键盘上的【Print Screen】键获取屏幕截图（Windows 用户可直接按【Print Screen】显示此窗口）</p>
          <div className={pasteAreaClasses}>
            获取屏幕截图或已复制屏幕截图后，请在此处粘贴【Ctrl + V】
          </div>
          <textarea
            ref="pasteInput"
            className={styles['paste-input']}
            autoFocus
            onFocus={() => this.setState({ textareaFocus: true })}
            onBlur={e => {
              if (this.state.step === 1 && pasteImageVisible) {
                e.target.focus();
              }
            }}
            onPaste={this.onPasteImage}
          />
        </div>
      );
    }

    if (this.state.step === 2) {
      modalChildren = (
        <div>
          <p>选择截图区域</p>
          <div style={{ position: 'relative' }}>
            <img
              role="presentation"
              ref="originImage"
              src={this.state.imgSrcBlob}
              style={{ width: '100%' }}
            />
            <Cutter ref="cutter" />
          </div>
        </div>
      );
    }

    if (this.state.step === 3) {
      modalChildren = (
        <div style={{ textAlign: 'center' }}>
          <div>
            <RadioGroup
              value={this.state.currentTool}
              size="large"
              onChange={this.onChangeTool}
            >
              <RadioButton value="default">
                <span className="fa fa-mouse-pointer" />
              </RadioButton>
              <RadioButton value="rectangular">
                <span className="fa fa-square-o" />
              </RadioButton>
              <RadioButton value="text">
                <span className="fa fa-font" />
              </RadioButton>
              <RadioButton value="undo">
                <span className="fa fa-undo" />
              </RadioButton>
            </RadioGroup>
          </div>
          <div>
            <div
              ref="canvasContainer"
              className="canvasContainer"
              style={{
                position: 'relative',
                marginTop: 15,
                display: 'inline-block',
                lineHeight: 0,
              }}
            >
              <canvas
                ref="canvas"
                style={{ cursor: (() => {
                  switch (this.state.currentTool) {
                    case 'rectangular':
                      return 'crosshair';
                    case 'text':
                      return 'text';
                    default:
                      return 'default';
                  }
                })() }}
                onMouseDown={this.onCanvasMouseDown}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Modal
          title="获取屏幕截图"
          width={this.state.step === 1 ? '50%' : '65%'}
          visible={pasteImageVisible}
          maskClosable={false}
          onCancel={() => {
            this.setState({
              step: 1,
              imgSrcBlob: null,
              currentTool: 'default',
            });

            togglePasteImageVisible(false);
            this.removeCanvasDrag();
          }}
          footer={modalfFooter}
        >
          {modalChildren}
        </Modal>
      </div>
    );
  }
}

export default PasteImageModal;
