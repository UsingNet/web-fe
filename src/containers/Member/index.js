import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MemberActions from 'actions/member';
import Member from './Member';

function mapStateToProps({ member, me }) {
  return {
    members: member.members,
    me,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    memberActions: bindActionCreators(MemberActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Member);
