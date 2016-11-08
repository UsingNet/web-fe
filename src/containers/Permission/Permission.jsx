import React, { PropTypes } from 'react';
import { Checkbox, Button } from 'antd';
import styles from './permission.less';

class Permission extends React.Component {
  static propTypes = {
    permission: PropTypes.object.isRequired,
    permissionActions: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.permissionActions.getPermission();
  }

  onPermissionChange = (event, p) => {
    const { permissionActions } = this.props;

    if (event.target.checked) {
      permissionActions.updatePermission({ p, checked: true });
    } else {
      permissionActions.updatePermission({ p, checked: false });
    }
  }

  render() {
    const { permission, permissionActions } = this.props;
    const checkboxNode = permission.permissions.map(p => (
      <Checkbox
        key={p.id}
        checked={p.used}
        onChange={(event) => this.onPermissionChange(event, p)}
      >
        {p.name}
      </Checkbox>
    ));

    return (
      <div className={styles.permission}>
        <h3>客服权限</h3>
        <h5 className={styles.help}>勾选客服可见的菜单</h5>
        {checkboxNode}
        <div>
          <Button
            className={styles.submit}
            type="primary"
            onClick={permissionActions.postPermission}
          >
            提交
          </Button>
        </div>
      </div>
    );
  }
}

export default Permission;
