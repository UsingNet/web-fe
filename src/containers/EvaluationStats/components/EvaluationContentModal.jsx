import React, { PropTypes } from 'react';
import { Modal, Icon, Button } from 'antd';
import styles from '../evaluation-stats.less';

const EvaluationContentModal = (props) => {
  const { modalVisible, toggleModalVisible, content } = props;
  return (
    <Modal
      visible={modalVisible}
      onCancel={toggleModalVisible}
      footer={<Button type="primary" size="large" onClick={toggleModalVisible}>关闭</Button>}
    >
      <div className={styles['content-modal']}>
        <div>
          <Icon type="info-circle" />
          <span>评价内容</span>
        </div>
        <div className={styles['content-body']} dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </Modal>
  );
};

EvaluationContentModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  toggleModalVisible: PropTypes.func.isRequired,
  content: PropTypes.string,
};

export default EvaluationContentModal;
