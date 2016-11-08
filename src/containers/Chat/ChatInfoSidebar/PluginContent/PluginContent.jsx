import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Icon } from 'antd';

const PluginContent = ({ planSlug, plugin, extendId, contactId }) => {
  if (plugin.plugin) {
    if (planSlug === 'experience') {
      return (
        <div style={{ textAlign: 'center', paddingTop: 20 }}>
          <p>套餐已到期，请续费后使用插件</p>
          <Link to="/setting/combo">点击续费</Link>
        </div>
      );
    }

    return (
      <iframe
        className="plugin"
        src={`${plugin.plugin}?extend_id=${extendId}&contact_id=${contactId}`}
      />
    );
  }

  return (
    <div key="0" style={{ textAlign: 'center', paddingTop: 20 }}>
      <p>
        <Icon type="frown" />
        <span key="0" style={{ paddingLeft: 5 }}>未开通插件</span>
      </p>
      <Link to="/setting/plugin">马上开通</Link>
    </div>
  );
};

PluginContent.propTypes = {
  planSlug: PropTypes.string.isRequired,
  plugin: PropTypes.object.isRequired,
  extendId: PropTypes.string.isRequired,
  contactId: PropTypes.number.isRequired,
};

export default PluginContent;
