import { handleActions } from 'redux-actions';
import { setSidebarMenu } from 'actions/menu';

const settingMenu = {
  link: '/setting',
  icon: 'setting',
  name: '设置',
};

const homeMenu = {
  link: '/',
  icon: 'home',
  name: '首页',
};

const chatMenu = {
  link: '/chat',
  icon: 'message',
  name: '对话',
};

const historyMenu = {
  link: '/history',
  icon: 'clock-circle-o',
  name: '历史',
};

const statisticsMenu = {
  link: '/statistics',
  icon: 'line-chart',
  name: '统计',
};

const contactMenu = {
  link: '/contact',
  icon: 'team',
  name: '客户',
};

const appMenu = {
  link: '/appstore',
  icon: 'appstore-o',
  name: '应用',
};

const agentMenu = {
  link: '/agent',
  icon: 'customerservice',
  name: '客服',
};

const menus = handleActions({
  [`${setSidebarMenu}`](state, action) {
    let menu = [homeMenu, chatMenu];
    const { me, permission } = action.payload;
    if (me.role === 'MEMBER') {
      for (const p of permission) {
        if (p.used) {
          switch (p.slug) {
            case 'history':
              menu.push(historyMenu);
              break;
            case 'statistics':
              menu.push(statisticsMenu);
              break;
            case 'contact':
              menu.push(contactMenu);
              break;
            case 'agent':
              menu.push(agentMenu);
              break;
            case 'setting':
              menu.push(settingMenu);
              break;
            default:
              break;
          }
        }
      }
    } else {
      menu = menu.concat([
        historyMenu,
        statisticsMenu,
        contactMenu,
        agentMenu,
        appMenu,
        settingMenu,
      ]);
    }

    return menu;
  },
}, []);

export default menus;
