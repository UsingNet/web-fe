import React from 'react';

function resizableTableHoc(WrappedComponent, setScrollHeight, heightDelta, tableProps) {
  return class ResizableTable extends React.Component {

    componentDidMount() {
      window.addEventListener('resize', this.onWindowResize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize = () => {
      const height = window.innerHeight - heightDelta;
      setScrollHeight(height);
    }

    render() {
      return (
        <WrappedComponent {...tableProps} />
      );
    }
  };
}

export default resizableTableHoc;
