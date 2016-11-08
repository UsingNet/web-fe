import React, { PropTypes } from 'react';
import classNames from 'classnames';
import resizableTableHoc from 'components/ResizableTableHoc';
import DateFilter from 'containers/DateFilter';
import MemberFilter from 'components/MemberFilter';
import HistoryTable from './components/HistoryTable';
import ConversationRecord from './components/ConversationRecord';
import ContactInfo from './components/ContactInfo';
import mainStyles from '../main.less';
import styles from './history.less';

class History extends React.Component {
  static propTypes = {
    OrderActions: PropTypes.object.isRequired,
    historyActions: PropTypes.object.isRequired,
    getMember: PropTypes.func.isRequired,
    getMessageList: PropTypes.func.isRequired,
    scrollHeight: PropTypes.number.isRequired,
    querystring: PropTypes.object.isRequired,
    isRecordOpen: PropTypes.bool.isRequired,
    statsOrder: PropTypes.object.isRequired,
    members: PropTypes.array.isRequired,
    messages: PropTypes.object.isRequired,
    openedOrder: PropTypes.object.isRequired,
    action: PropTypes.string.isRequired,
  }

  componentDidMount() {
    const { OrderActions, getMember } = this.props;
    OrderActions.getStatsOrder();
    getMember();

    this.refs.resizeTable.onWindowResize();
  }

  onTableChange = (pagination, filters) => {
    const { OrderActions } = this.props;
    const { setFetchQueryString, deleteFetchQueryString } = this.props.historyActions;

    setFetchQueryString({ page: pagination.current });

    if (filters.status && filters.status.length > 0) {
      setFetchQueryString({ status: filters.status[0] });
    } else {
      deleteFetchQueryString('status');
    }

    OrderActions.getStatsOrder();
  }

  // eslint-disable-next-line consistent-return
  onTableRowClick = (record) => {
    const { getMessageList, historyActions, isRecordOpen, openedOrder } = this.props;

    historyActions.toggleRecordOpen(true);
    historyActions.setOpenedOrder(record);

    if (isRecordOpen && record.id === openedOrder.id) {
      return false;
    }

    getMessageList({ order_id: record.id });
  }

  onMemberChange = (value) => {
    const { OrderActions } = this.props;
    const { setFetchQueryString, deleteFetchQueryString } = this.props.historyActions;
    const v = Number(value);

    if (v !== 0) {
      setFetchQueryString({ user_id: v });
    } else if (v === 0) {
      deleteFetchQueryString('user_id');
    }

    OrderActions.getStatsOrder();
  }

  onDateSelected = (dateRange) => {
    const { OrderActions } = this.props;

    this.props.historyActions.setFetchQueryString({
      begin: dateRange.begin,
      end: dateRange.end,
    });

    OrderActions.getStatsOrder();
  }

  onRecordClose = () => {
    const { historyActions } = this.props;
    historyActions.setAction('row');
    historyActions.toggleRecordOpen(false);
  }

  onLoadMoreMessage = () => {
    const { openedOrder, getMessageList, messages, historyActions } = this.props;

    historyActions.setAction('more');

    getMessageList({
      order_id: openedOrder.id,
      // eslint-disable-next-line no-underscore-dangle
      last_message_id: messages.messages[0]._id,
    });
  }

  render() {
    const { statsOrder, scrollHeight, members, messages, openedOrder } = this.props;
    const { setScrollHeight } = this.props.historyActions;
    const conversationWrapperClasses = classNames({
      [styles['conversation-history']]: true,
      [styles.open]: this.props.isRecordOpen,
    });

    const HistoryResizableTable = resizableTableHoc(HistoryTable, setScrollHeight, 228, {
      orders: statsOrder,
      onTableChange: this.onTableChange,
      scrollHeight,
      onRowClick: this.onTableRowClick,
    });

    return (
      <div className={styles.history}>
        <div className={mainStyles['table-operation-region']}>
          <MemberFilter
            members={members}
            onMemberChange={this.onMemberChange}
          />
          <DateFilter
            onDateSelected={this.onDateSelected}
          />
        </div>

        <HistoryResizableTable ref="resizeTable" />

        <div className={conversationWrapperClasses}>
          <ConversationRecord
            openedOrder={this.props.openedOrder}
            onCloseClick={this.onRecordClose}
            onLoadMoreMessage={this.onLoadMoreMessage}
            messages={messages.messages}
            action={this.props.action}
          />

          <ContactInfo contact={openedOrder.contact} />
        </div>
      </div>
    );
  }
}

export default History;
