import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MemberActions from 'actions/member';
import EditMemberModal from './EditMemberModal';

function mapStateToProps({ member, tag, me }) {
  return {
    editMember: member.editMember,
    modalVisible: member.modalVisible,
    tagList: tag,
    me,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    memberActions: bindActionCreators(MemberActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMemberModal);
