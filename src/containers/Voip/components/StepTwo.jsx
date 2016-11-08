import React, { PropTypes } from 'react';
import PhoneAccessForm from './PhoneAccessForm';

// eslint-disable-next-line react/prefer-stateless-function
class StepTwo extends React.Component {
  static propTypes = {
    showEditForm: PropTypes.bool.isRequired,
  };

  render() {
    const { showEditForm } = this.props;

    return (
      <div
        style={{ display: showEditForm ? 'block' : 'none' }}
      >
        <PhoneAccessForm
          {...this.props}
        />
      </div>
    );
  }
}

export default StepTwo;
