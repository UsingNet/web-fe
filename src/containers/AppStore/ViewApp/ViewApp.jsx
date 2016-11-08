import React, { PropTypes } from 'react';

class ViewApp extends React.Component {
  static propTypes = {
    getApp: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    link: PropTypes.string,
    params: PropTypes.object,
  }

  componentDidMount() {
    const { location } = this.props;
    if (!location.state) {
      this.props.getApp(this.props.params.id);
    }
  }

  render() {
    const { location } = this.props;
    if (location.state && location.state.url) {
      return (
        <iframe src={location.state.url}></iframe>
      );
    }

    return (
      <iframe src={this.props.link}></iframe>
    );
  }
}

export default ViewApp;
