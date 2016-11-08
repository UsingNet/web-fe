import React, { PropTypes } from 'react';
import PhoneAccessCheckingForm from './PhoneAccessCheckingForm';

// eslint-disable-next-line react/prefer-stateless-function
class StepThree extends React.Component {
  static propTypes = {
    showEditForm: PropTypes.bool.isRequired,
  };

  render() {
    const { showEditForm } = this.props;

    return (
      <div
        style={{ display: !showEditForm ? 'block' : 'none' }}
      >
        <PhoneAccessCheckingForm
          {...this.props}
        />
      </div>
    );
  }
}

export default StepThree;
