import React, { PropTypes } from 'react';
import { Tabs, Button } from 'antd';
import resizableTableHoc from 'components/ResizableTableHoc';
import ReplyTable from './components/ReplyTable';
import EditQuickReplyModal from './components/EditQuickReplyModal';

const TabPane = Tabs.TabPane;

class QuickReply extends React.Component {
  static propTypes = {
    quickReplyActions: PropTypes.object.isRequired,
    commonReplies: PropTypes.array.isRequired,
    personalReplies: PropTypes.array.isRequired,
    scrollHeight: PropTypes.number.isRequired,
  }

  componentDidMount() {
    const { quickReplyActions } = this.props;
    quickReplyActions.getCommonQuickReply();
    quickReplyActions.getPersonalQuickReply();

    this.refs.resizeTable.onWindowResize();
  }

  editReply = (record) => {
    const { quickReplyActions } = this.props;
    quickReplyActions.setEditReply(record);
    quickReplyActions.setModalTitle('编辑快捷回复');
    quickReplyActions.toggleModalVisible(true);
  }

  addReply = () => {
    const { quickReplyActions } = this.props;
    quickReplyActions.setEditReply({
      shortcut: '',
      content: '',
    });
    quickReplyActions.setModalTitle('添加快捷回复');
    quickReplyActions.toggleModalVisible(true);
  }

  render() {
    const { quickReplyActions, commonReplies, personalReplies, scrollHeight } = this.props;
    const { setScrollHeight } = quickReplyActions;

    const addQuickReply = (
      <Button
        icon="plus"
        type="ghost"
        onClick={this.addReply}
      >添加快捷回复</Button>
    );

    const CommonReplyTable = resizableTableHoc(ReplyTable, setScrollHeight, 228, {
      replies: commonReplies,
      scrollHeight,
      removeQuickReply: quickReplyActions.removeQuickReply,
      setEditReply: quickReplyActions.setEditReply,
      setModalTitle: quickReplyActions.setModalTitle,
      toggleModalVisible: quickReplyActions.toggleModalVisible,
    });

    const PersonalReplyTable = resizableTableHoc(ReplyTable, setScrollHeight, 228, {
      replies: personalReplies,
      scrollHeight,
      removeQuickReply: quickReplyActions.removeQuickReply,
      setEditReply: quickReplyActions.setEditReply,
      setModalTitle: quickReplyActions.setModalTitle,
      toggleModalVisible: quickReplyActions.toggleModalVisible,
    });

    return (
      <div>
        <Tabs
          tabBarExtraContent={addQuickReply}
          onChange={v => quickReplyActions.setActiveTab(v)}
        >
          <TabPane
            tab="通用"
            key="COMMON"
          >
            <CommonReplyTable ref="resizeTable" />
          </TabPane>

          <TabPane
            tab="自定义"
            key="PERSONAL"
          >
            <PersonalReplyTable ref="resizeTable" />
          </TabPane>
        </Tabs>

        <EditQuickReplyModal {...this.props} />
      </div>
    );
  }
}

export default QuickReply;
