import { handleActions } from 'redux-actions';
import * as MeActions from 'actions/me';

let imInit = false;

const me = handleActions({
  [`${MeActions.getMeSuccess}`](state, action) {
    const data = action.payload;

    if (!imInit) {
      const a = document.createElement('script');
      a.setAttribute('charset', 'UTF-8');
      a.src = '//im.usingnet.com/build/app.min.js';
      document.body.appendChild(a);
      window.usingnetJsonP = (usingnetInit) => {
        usingnetInit('943b3255785a550a13e007f63a6e58b8', {
          email: data.email,
          phone: data.phone,
          extend_id: data.token,
          name: data.name,
          img: data.img,
        });
      };

      imInit = true;
    }

    return {
      ...state,
      ...data,
      ...{
        changePassword: false,
        password: '',
        newpassord: '',
        newpassword_confirmation: '',
        avatarList: [{
          uid: -1,
          name: 'img',
          status: 'done',
          url: data.img || '',
          thumbUrl: `${data.img}-avatar`,
        }],
      },
    };
  },

  [`${MeActions.updateMeFields}`](state, action) {
    const { fields } = action.payload;
    const itemKey = Object.keys(fields)[0];
    const value = fields[itemKey].value;

    return {
      ...state,
      [itemKey]: value,
    };
  },
}, {
  img: '//o1hpnn7d6.qnssl.com/default-avatar.png',
});

export default me;
