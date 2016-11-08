import { handleActions } from 'redux-actions';
import * as WebActions from 'actions/web';

const defaultSite = {
  name: '新站点',
  logo: '',
  title_bg_color: 'f96868',
  title_txt_color: 'ffffff',
  button_bg_color: 'f96868',
  button_txt_color: 'ffffff',
  message_left_bg_color: 'ffffff',
  message_left_font_color: '000000',
  message_right_bg_color: 'f96868',
  message_right_font_color: 'ffffff',
  input_placeholder: '您好，有什么可以帮您?',
  direction: 'bottom-right',
  page_distance: '20',
  page_bottom_distance: 0,
  icon_shape: 'bar',
  customer_icon: 'https://o1hpnn7d6.qnssl.com/3d5791fe1bfe88b7e550a2d2f2360d61.png',
  type: 'IM',
  invite_text: '',
};

const sites = handleActions({
  [`${WebActions.setActiveTab}`](state, action) {
    return {
      ...state,
      activeTab: action.payload,
    };
  },

  [`${WebActions.getSitesSuccess}`](state, action) {
    const siteList = action.payload;
    return {
      ...state,
      sites: siteList.map(s => ({
        ...s,
        orderIndex: state.orderIndex,
        logoList: [{
          uid: -1,
          name: 'logo',
          status: 'done',
          url: s.logo || '',
          thumbUrl: s.logo || '',
        }],
        welcomeImageList: [{
          uid: -1,
          name: 'welcome',
          status: 'done',
          url: s.welcome || '',
          thumbUrl: s.welcome || '',
        }],
      })),
      // fileList: [{
      //   uid: -1,
      //   name: 'logo',
      //   status: 'done',
      //   url: firstSite.logo || '',
      //   thumbUrl: firstSite.logo || '',
      // }],
    };
  },

  [`${WebActions.updateSiteValue}`](state, action) {
    const { siteIndex, fields } = action.payload;
    // const site = Object.assign({}, state.sites[index]);

    const key = Object.keys(fields)[0];

    if (key === 'orderIndex') {
      const indexForOrder = fields[key].value;
      return {
        ...state,
        sites: state.sites.map((s, i) => {
          if (i === siteIndex) {
            return {
              ...s,
              [key]: fields[key].value,
            };
          }

          return s;
        }),
        orderIndex: `${indexForOrder}`,
      };
    }

    // if (key === 'fileList') {
    //   return {
    //     ...state,
    //     fileList: fields[key].value,
    //   };
    // }

    if (key === 'button_bg_color') {
      return {
        ...state,
        sites: state.sites.map((s, i) => {
          if (i === siteIndex) {
            return {
              ...s,
              [key]: fields[key].value,
              message_right_bg_color: fields[key].value,
              title_bg_color: fields[key].value,
            };
          }

          return s;
        }),
      };
    }

    return {
      ...state,
      sites: state.sites.map((s, i) => {
        if (i === siteIndex) {
          return {
            ...s,
            [key]: fields[key].value,
          };
        }

        return s;
      }),
    };
  },

  [`${WebActions.togglePageDistanceEdit}`](state) {
    return {
      ...state,
      pageDistanceCustomVisible: !state.pageDistanceCustomVisible,
    };
  },

  [`${WebActions.changeOrder}`](state, action) {
    return {
      ...state,
      orderIndex: action.payload,
    };
  },

  [`${WebActions.addOrderForm}`](state, action) {
    const { siteIndex } = action.payload;
    return {
      ...state,
      sites: state.sites.map((site, i) => {
        if (i === siteIndex) {
          return {
            ...site,
            order: [
              ...site.order,
              [{
                title: '',
                items: [{
                  placeholder: '',
                  type: 'input',
                }],
              }],
            ],
          };
        }
        return site;
      }),
      orderIndex: state.sites[siteIndex].order ? `${state.sites[siteIndex].order.length}` : '0',
    };
  },

  [`${WebActions.toggleCustomColorVisible}`](state) {
    return {
      ...state,
      customColorVisible: !state.customColorVisible,
    };
  },

  [`${WebActions.toggleAccessCode}`](state, action) {
    return {
      ...state,
      accessCodeVisible: action.payload,
    };
  },

  [`${WebActions.updateOrderForm}`](state, action) {
    const { data, siteIndex, orderIndex } = action.payload;
    return {
      ...state,
      sites: state.sites.map((s, i) => {
        if (i === siteIndex) {
          return {
            ...s,
            order: s.order.map((o, j) => {
              if (j === Number(orderIndex)) {
                return data;
              }

              return o;
            }),
          };
        }

        return s;
      }),
    };
  },

  [`${WebActions.addSite}`](state) {
    return {
      ...state,
      activeTab: `${state.sites.length}`,
      sites: [
        ...state.sites,
        ...[defaultSite],
      ],
    };
  },

  [`${WebActions.removeAddedSite}`](state) {
    return {
      ...state,
      sites: state.sites.slice(0, state.sites.length - 1),
    };
  },
}, {
  sites: [],
  // fileList: [],
  pageDistanceCustomVisible: false,
  customColorVisible: false,
  orderIndex: '0',
  activeTab: '0',
  accessCodeVisible: false,
});

export default sites;
