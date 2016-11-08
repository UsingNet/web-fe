import React, { PropTypes } from 'react';
import { Router } from 'react-router';
import App from 'containers/App';
import Dashboard from 'containers/Dashboard';
import Chat from 'containers/Chat';
import ChatWrapper from 'containers/Chat/ChatWrapper';
import History from 'containers/History';
import Setting from 'containers/Setting';
import Sites from 'containers/Sites';
import AgentAssign from 'containers/AgentAssign';
import AppStore from 'containers/AppStore';
import ViewApp from 'containers/AppStore/ViewApp';
import Contact from 'containers/Contact';
import Agent from 'containers/Agent';
import Member from 'containers/Member';
import AgentGroup from 'containers/AgentGroup';
import Wechat from 'containers/Wechat';
import Weibo from 'containers/Weibo';
import Voip from 'containers/Voip';
import Sms from 'containers/Sms';
import Mail from 'containers/Mail';
import ExpenseRecord from 'containers/ExpenseRecord';
import Plugin from 'containers/Plugin';
import Permission from 'containers/Permission';
import Recharge from 'containers/Recharge';
import Combo from 'containers/Combo';
import Statistics from 'containers/Statistics';
import OverviewStats from 'containers/OverviewStats';
import AgentStats from 'containers/AgentStats';
import EvaluationStats from 'containers/EvaluationStats';
import VisitorStats from 'containers/VisitorStats';
import Profile from 'containers/Profile';
import BindWechat from 'containers/Profile/components/BindWechat';
import AccountInfo from 'containers/AccountInfo';
import QuickReply from 'containers/QuickReply';
import LimitTips from 'components/LimitTips';
import NotFound from 'components/NotFound';

import store from './store';
import notify from 'modules/notify';

import { initOrderExtraInfo } from 'actions/order';

const routes = [{
  path: '/',
  component: App,
  indexRoute: {
    component: Dashboard,
    name: '首页',
  },
  childRoutes: [{
    path: 'chat',
    name: '对话',
    component: Chat,
    childRoutes: [{
      path: ':id',
      component: ChatWrapper,
      onEnter: (nextState, replace, callback) => {
        const orderId = Number(nextState.params.id);
        store.dispatch(initOrderExtraInfo(orderId));
        notify.clearMessage();
        callback();
      },
    }],
  }, {
    path: 'history',
    name: '历史',
    component: History,
  }, {
    path: 'statistics',
    name: '统计',
    component: Statistics,
    indexRoute: {
      component: OverviewStats,
      name: '统计',
    },
    childRoutes: [{
      path: 'overview',
      component: OverviewStats,
    }, {
      path: 'agent',
      component: AgentStats,
    }, {
      path: 'evaluation',
      component: EvaluationStats,
    }, {
      path: 'visitor',
      component: VisitorStats,
    }],
  }, {
    path: 'contact',
    name: '联系人',
    component: Contact,
  }, {
    path: 'agent',
    name: '客服团队',
    component: Agent,
    indexRoute: {
      component: Member,
      name: '客服团队',
    },
    childRoutes: [{
      path: 'all',
      component: Member,
    }, {
      path: 'group',
      component: AgentGroup,
    }],
  }, {
    path: 'setting',
    name: '设置',
    component: Setting,
    indexRoute: {
      component: Sites,
      name: '设置',
    },
    childRoutes: [{
      path: 'web',
      component: Sites,
    }, {
      path: 'wechat',
      component: Wechat,
    }, {
      path: 'weibo',
      component: Weibo,
    }, {
      path: 'phoneAccess',
      component: Voip,
    }, {
      path: 'email',
      component: Mail,
    }, {
      path: 'smsAccess',
      component: Sms,
    }, {
      path: 'combo',
      component: Combo,
    }, {
      path: 'recharge',
      component: Recharge,
    }, {
      path: 'expense',
      component: ExpenseRecord,
    }, {
      path: 'plugin',
      component: Plugin,
    }, {
      path: 'permission',
      component: Permission,
    }, {
      path: 'assign',
      component: AgentAssign,
    }],
  }, {
    path: 'appstore',
    name: '应用',
    component: AppStore,
    childRoutes: [{
      path: ':id',
      component: ViewApp,
    }],
  }, {
    path: 'profile',
    name: '个人设置',
    component: Profile,
    indexRoute: {
      component: AccountInfo,
      name: '个人设置',
    },
    childRoutes: [{
      path: 'account',
      component: AccountInfo,
    }, {
      path: 'wechat',
      component: BindWechat,
    }, {
      path: 'quickReply',
      component: QuickReply,
    }],
  }, {
    path: 'limit',
    name: '在线座席提示',
    component: LimitTips,
  }, {
    path: '*',
    name: '页面未找到',
    component: NotFound,
  }],
}];

const Routes = ({ history }) => (<Router history={history} routes={routes} />);

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
