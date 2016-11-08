import React, { PropTypes } from 'react';
import { Button, Input } from 'antd';
import resizableTableHoc from 'components/ResizableTableHoc';
import ContactTable from './components/ContactTable';
import EditContactModal from './EditContactModal';
import styles from './contact.less';
import mainStyles from '../main.less';

const InputGroup = Input.Group;

class Contact extends React.Component {
  static propTypes = {
    getTags: PropTypes.func.isRequired,
    contact: PropTypes.object.isRequired,
    contactActions: PropTypes.object.isRequired,
    launchChat: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.contactActions.getContacts();
    this.props.getTags();

    this.refs.resizeTable.onWindowResize();
  }

  onTableChange = (pagination, filters) => {
    const { setFetchQueryString, deleteFetchQueryString } = this.props.contactActions;

    setFetchQueryString({ page: pagination.current });

    if (filters.email && filters.email.length > 0) {
      setFetchQueryString({ email: filters.email });
    } else {
      deleteFetchQueryString('email');
    }

    if (filters.phone && filters.phone.length > 0) {
      setFetchQueryString({ phone: filters.phone });
    } else {
      deleteFetchQueryString('phone');
    }

    if (filters.tags && filters.tags.length > 0) {
      setFetchQueryString({ tags: filters.tags });
    } else {
      deleteFetchQueryString('tags');
    }

    this.props.contactActions.getContacts();
  }

  onAddContact = () => {
    const { contactActions } = this.props;
    contactActions.changeModalTitle('添加联系人');
    contactActions.setEditContact({});
    contactActions.toggleModalVisible();
  }

  onEditContact = (contact) => {
    const { contactActions } = this.props;
    contactActions.changeModalTitle('编辑联系人');
    contactActions.setEditContact(contact);
    contactActions.toggleModalVisible();
  }

  onDeleteContact = (id) => {
    this.props.contactActions.deleteContact(id);
  }

  // eslint-disable-next-line no-unused-vars
  onLaunchChat = (id) => {
    /**
     * @todo 发起对话
     */
  }

  render() {
    const { contact, tags, contactActions, launchChat } = this.props;
    const { setScrollHeight } = contactActions;

    const ContactResizableTable = resizableTableHoc(ContactTable, setScrollHeight, 228, {
      contacts: contact.contacts,
      tags,
      onTableChange: this.onTableChange,
      onEditContact: this.onEditContact,
      onDeleteContact: this.onDeleteContact,
      onLaunchChat: launchChat,
      scrollHeight: contact.scrollHeight,
    });

    return (
      <div className={styles.contact}>
        <div className={mainStyles['table-operation-region']}>
          <div className="ant-search-input-wrapper" style={{ width: 180 }}>
            <InputGroup className="ant-search-input">
              <Input
                placeholder="请输入关键字"
                onChange={(event) => contactActions.changeSearchKeyword(event.target.value)}
                onPressEnter={contactActions.searchContacts}
              />
              <div className="ant-input-group-wrap">
                <Button
                  className="ant-search-btn"
                  icon="search"
                  onClick={contactActions.searchContacts}
                />
              </div>
            </InputGroup>
          </div>
          <Button icon="plus" onClick={this.onAddContact}>添加联系人</Button>
        </div>

        <ContactResizableTable ref="resizeTable" />

        <EditContactModal />
      </div>
    );
  }
}

export default Contact;
