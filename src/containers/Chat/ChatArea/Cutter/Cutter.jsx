import React from 'react';
import styles from './cutter.less';

class Cutter extends React.Component {
  constructor() {
    super();
    document.addEventListener('mouseup', (e) => {
      if (this.state.inResize || this.state.inDrag) {
        this.onCenterDragAndResizeEnd(e);
      }
    }, true);
    document.addEventListener('mousemove', (e) => {
      if (this.state.inResize || this.state.inDrag) {
        this.onCenterMove(e);
      }
    }, true);
  }

  state = {
    top: 0,
    left: 0,
    height: 130,
    width: 130,
    inDrag: false,
    inResize: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeCutter);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeCutter);
  }

  onResizeStart = (e, directions) => {
    e.stopPropagation();
    window.getSelection().removeAllRanges();
    this.setState({
      inResize: true,
      directions,
      startPositionX: e.clientX,
      startPositionY: e.clientY,
    });
  }

  onCenterDragStart = (e) => {
    window.getSelection().removeAllRanges();
    this.setState({
      inDrag: true,
      startPositionX: e.clientX,
      startPositionY: e.clientY,
    });
  }

  onCenterMove = (e) => {
    if (this.state.inDrag) {
      if (e.buttons) {
        window.getSelection().removeAllRanges();
        const deltaX = {
          left: this.state.left + (e.clientX - this.state.startPositionX),
          startPositionX: e.clientX,
        };

        if (deltaX.left < 0) {
          deltaX.startPositionX -= deltaX.left;
          deltaX.left = 0;
        }

        if (this.refs.container.offsetWidth < deltaX.left + this.state.width) {
          const overflowX = this.refs.container.offsetWidth - deltaX.left - this.state.width;
          deltaX.startPositionX += overflowX;
          deltaX.left += overflowX;
        }

        this.setState(deltaX);

        const deltaY = {
          top: this.state.top + (e.clientY - this.state.startPositionY),
          startPositionY: e.clientY,
        };

        if (deltaY.top < 0) {
          deltaY.startPositionY -= deltaY.top;
          deltaY.top = 0;
        }

        if (this.refs.container.offsetHeight < deltaY.top + this.state.height) {
          const overflowY = this.refs.container.offsetHeight - deltaY.top - this.state.height;
          deltaY.startPositionY += overflowY;
          deltaY.top += overflowY;
        }

        this.setState(deltaY);
      } else {
        this.onCenterDragAndResizeEnd(e);
      }
    } else if (this.state.inResize) {
      window.getSelection().removeAllRanges();
      if (this.state.directions.indexOf('top') > -1) {
        let deltaTop = e.clientY - this.state.startPositionY;
        let top = this.state.top + deltaTop;
        if (top < 0) {
          top = 0;
        }
        if ((this.state.top + this.state.height) - top < 20) {
          top = this.state.top + this.state.height - 20;
        }

        deltaTop = top - this.state.top;

        this.setState({
          top,
          startPositionY: (this.state.startPositionY + deltaTop),
          height: (this.state.height - deltaTop),
        });
      }
      if (this.state.directions.indexOf('left') > -1) {
        let deltaLeft = e.clientX - this.state.startPositionX;
        let left = this.state.left + deltaLeft;

        if (left < 0) {
          left = 0;
        }

        if ((this.state.left + this.state.width) - left < 20) {
          left = this.state.left + this.state.width - 20;
        }

        deltaLeft = left - this.state.left;

        this.setState({
          left,
          startPositionX: (this.state.startPositionX + deltaLeft),
          width: (this.state.width - deltaLeft),
        });
      }

      if (this.state.directions.indexOf('bottom') > -1) {
        let deltaHeight = e.clientY - this.state.startPositionY;
        let height = this.state.height + deltaHeight;
        if (height < 20) {
          height = 20;
        }
        if (this.state.top + height > this.refs.container.offsetHeight) {
          height = this.refs.container.offsetHeight - this.state.top;
        }
        deltaHeight = height - this.state.height;
        this.setState({
          height,
          startPositionY: this.state.startPositionY + deltaHeight,
        });
      }

      if (this.state.directions.indexOf('right') > -1) {
        let deltaWidth = e.clientX - this.state.startPositionX;
        let width = this.state.width + deltaWidth;

        if (width < 20) {
          width = 20;
        }

        if (this.state.left + width > this.refs.container.offsetWidth) {
          width = this.refs.container.offsetWidth - this.state.left;
        }

        deltaWidth = width - this.state.width;

        this.setState({ width, startPositionX: this.state.startPositionX + deltaWidth });
      }
    }
  }

  onCenterDragAndResizeEnd = () => {
    this.setState({ inDrag: false, inResize: false });
  };

  getResult = () => ({
    top: this.state.top,
    left: this.state.left,
    height: this.state.height,
    width: this.state.width,
  });

  resizeCutter = () => {
    const ratio = 130 / 1920;
    const width = ratio * (window.innerWidth + this.state.width);
    const height = ratio * (window.innerWidth + this.state.height);

    this.setState({
      width,
      height,
    });
  }

  render() {
    return (
      <div className={styles.cutter} ref="container">
        <div className={`${styles.shadow} ${styles.top}`} style={{ height: this.state.top }}></div>
        <div
          className={`${styles.shadow} ${styles.right}`}
          style={{
            top: this.state.top,
            left: (this.state.left + this.state.width),
            height: this.state.height,
          }}
        ></div>

        <div
          className={`${styles.shadow} ${styles.bottom}`}
          style={{ top: this.state.top + this.state.height }}
        ></div>

        <div
          className={`${styles.shadow} ${styles.left}`}
          style={{
            top: this.state.top,
            width: this.state.left,
            height: this.state.height,
          }}
        ></div>

        <div
          className={styles.center}
          ref="center"
          style={{
            top: this.state.top,
            left: this.state.left,
            height: this.state.height,
            width: this.state.width,
          }}
          onMouseDown={this.onCenterDragStart}
        >
          <div className={styles['image-editor-selection-border-top"']}></div>
          <div className={styles['image-editor-selection-border-bottom']}></div>
          <div className={styles['image-editor-selection-border-left']}></div>
          <div className={styles['image-editor-selection-border-right']}></div>

          <span
            className={`${styles['resizable-n']} ${styles['resizable-handle']}`}
            onMouseDown={e => this.onResizeStart(e, ['top'])}
          />
          <span
            className={`${styles['resizable-e']} ${styles['resizable-handle']}`}
            onMouseDown={e => this.onResizeStart(e, ['right'])}
          />
          <span
            className={`${styles['resizable-w']} ${styles['resizable-handle']}`}
            onMouseDown={e => this.onResizeStart(e, ['left'])}
          />
          <span
            className={`${styles['resizable-s']} ${styles['resizable-handle']}`}
            onMouseDown={e => this.onResizeStart(e, ['bottom'])}
          />
          <span
            className={`${styles['resizable-nw']} ${styles['resizable-handle']}`}
            onMouseDown={e => this.onResizeStart(e, ['top', 'left'])}
          />
          <span
            className={`${styles['resizable-ne']} ${styles['resizable-handle']}`}
            onMouseDown={e => this.onResizeStart(e, ['top', 'right'])}
          />
          <span
            className={`${styles['resizable-sw']} ${styles['resizable-handle']}`}
            onMouseDown={e => this.onResizeStart(e, ['bottom', 'left'])}
          />
          <span
            className={`${styles['resizable-se']} ${styles['resizable-handle']}`}
            onMouseDown={e => this.onResizeStart(e, ['bottom', 'right'])}
          />
        </div>
      </div>
    );
  }
}

export default Cutter;
