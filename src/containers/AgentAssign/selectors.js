import { createSelector } from 'reselect';

const getAssign = state => state.assign;

const getSites = state => state.web.sites;
const getAssignWeb = state => state.assign.web;

const getWechats = state => state.wechat.wechat;
const getAssignWeChat = state => state.assign.wechat;

const getWeibo = state => state.weibo.weibo;
const getAssignWeibo = state => state.assign.weibo;

export const getAllSitesGroupIds = createSelector(
  [getSites, getAssignWeb],
  (sites, webIds) => sites.map(site => {
    const webObj = webIds.find(w => w.web_id === site.id);
    if (webObj) {
      return {
        web_id: site.id,
        name: site.name,
        group_id: webObj.group_id.map(id => `${id}`),
      };
    }

    return {
      web_id: site.id,
      name: site.name,
      group_id: [],
    };
  })
);

export const getAllWechatWithGroupIds = createSelector(
  [getWechats, getAssignWeChat],
  (wechats, wechatIds) => wechats.map(w => {
    const wechatObj = wechatIds.find(idObj => idObj.wechat_id === w.id);

    if (wechatObj) {
      return {
        wechat_id: w.id,
        name: w.nick_name,
        group_id: wechatObj.group_id.map(id => `${id}`),
      };
    }

    return {
      wechat_id: w.id,
      name: w.nick_name,
      group_id: [],
    };
  })
);

export const getAllWeiboWithGroupIds = createSelector(
  [getWeibo, getAssignWeibo],
  (weibo, weiboIds) => weibo.map(w => {
    const weiboObj = weiboIds.find(idObj => idObj.weibo_id === w.id);

    if (weiboObj) {
      return {
        weibo_id: w.id,
        name: w.name,
        group_id: weiboObj.group_id.map(id => `${id}`),
      };
    }

    return {
      weibo_id: w.id,
      name: w.name,
      group_id: [],
    };
  })
);

export const getAssignWithExtraInfo = createSelector(
  [
    getAllSitesGroupIds,
    getAllWechatWithGroupIds,
    getAllWeiboWithGroupIds,
    getAssign,
  ],
  (web, wechat, weibo, assign) => ({
    ...assign,
    web,
    wechat,
    weibo,
  })
);
