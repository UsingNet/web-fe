import { connect } from 'react-redux';
import PluginContent from './PluginContent';

const mapStateToProps = ({ plugin, baseSetting, order }) => ({
  contactId: order.selectedOrder.contact.id,
  extendId: order.selectedOrder.contact.extend_id,
  planSlug: baseSetting.plan.slug,
  plugin,
});

export default connect(mapStateToProps)(PluginContent);
