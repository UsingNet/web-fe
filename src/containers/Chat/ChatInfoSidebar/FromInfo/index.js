import { connect } from 'react-redux';
import FromInfo from './FromInfo';

const mapStateToProps = ({ order, track }) => ({
  fromInfo: order.selectedOrder.contact.source,
  track: track.track,
  wechatName: order.selectedOrder.contact.wechat.nick_name,
});

export default connect(mapStateToProps)(FromInfo);
