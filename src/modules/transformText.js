import { QQFaceMap, QQCodeFaceMap, QQFaceList, QQFaceMapExtend } from './emojiMap';

export default function transformText(text) {
  let html = text.replace(/[|]/, '');

  const faceKeys = Object.keys(QQCodeFaceMap);

  /* eslint-disable prefer-template */
  for (const k of faceKeys) {
    while (html.indexOf(k) !== -1) {
      html = html.replace(k, match => (
        '<span class="qqemoji qqemoji' + QQCodeFaceMap[match] + '"></span>'
      ));
    }
  }

  html = html.replace(/\[([^\]]*)\]/g, (all, match) => {
    const index = QQFaceList.indexOf(match);
    if (index === -1) {
      return all;
    }

    return '<span class="qqemoji qqemoji' + QQFaceMap[match] + '"></span>';
  });

  html = html.replace(/<([^>\s\\\/]*)>/g, (all, match) => {
    const code = QQFaceMapExtend[match];
    if (!code) {
      return all;
    }

    return '<span class="emoji emoji' + code + '"></span>';
  });
  /* eslint-enable prefer-template */

  return html;
}
