import React, { PropTypes } from 'react';
import echarts from 'echarts';

class ReactEcharts extends React.Component {
  static propTypes = {
    options: PropTypes.object,
    style: PropTypes.object,
  }

  componentDidMount() {
    const { options } = this.props;
    const echartsDom = this.refs.echarts;
    this.echartsInstance = echarts.init(echartsDom);
    this.echartsInstance.setOption(options);
  }

  componentDidUpdate() {
    const { options } = this.props;
    this.echartsInstance.showLoading();
    this.echartsInstance.setOption(options);
    this.echartsInstance.hideLoading();
  }

  componentWillUnmount() {
    echarts.dispose(this.refs.echarts);
  }

  render() {
    const { style } = this.props;
    return (
      <div ref="echarts" style={style}></div>
    );
  }
}

export default ReactEcharts;
