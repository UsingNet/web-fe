import { createSelector } from 'reselect';

const orderLegends = ['已接待对话数', '未接待对话数'];
const orderColors = ['#D48265', '#D0CECE'];

const messageLegends = ['客服发出消息', '访客发出消息'];
const messageColors = ['#91C7AE', '#D0CECE'];

const fromMap = {
  im: '网站',
  wechat: '微信',
  mail: '邮件',
  voip: '电话',
  weibo: '微博',
};

const evaluateMap = {
  good: '好评',
  bad: '差评',
  general: '中评',
  unevaluated: '未评价',
};

const defaultHistogramOptions = {
  title: {
    text: '对话数',
    textStyle: {
      fontWeight: 'normal',
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: 20,
    right: 20,
    bottom: 20,
    containLabel: true,
  },
  xAxis: {
    type: 'category',
  },
  yAxis: {
    type: 'value',
    minInterval: 1,
    splitNumber: 6,
    axisLine: {
      show: false,
    },
  },
};

const defaultHorizontalHistogramOptions = {
  title: {
    text: '',
    textStyle: {
      fontWeight: 'normal',
    },
  },
  grid: {
    left: 60,
    right: 40,
    bottom: 5,
  },
  xAxis: {
    type: 'value',
    min: 0,
    max: 100,
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    // splitLine: {
    //   show: false,
    // },
  },
  yAxis: {
    type: 'category',
    splitLine: {
      show: true,
    },
    axisLine: {
      show: false,
    },
  },
  series: [{
    name: '占比',
    type: 'bar',
    label: {
      normal: {
        show: true,
        position: 'right',
        formatter: '{c}%',
        textStyle: {
          color: '#000',
        },
      },
    },
    itemStyle: {
      normal: {},
    },
  }],
};

const defaultPieOptions = {
  title: {
    text: '',
    textStyle: {
      fontWeight: 'normal',
    },
  },
  legend: {
    y: 'center',
    right: '10%',
    width: '50%',
    height: '80%',
    orient: 'vertical',
  },
  series: {
    type: 'pie',
    radius: [20, '65%'],
    center: ['40%', '50%'],
    roseType: 'radius',
    label: {
      normal: {
        show: true,
        formatter: '{b}：{c}个，占{d}%',
      },
      emphasis: {
        show: true,
        formatter: '{b}：{c}个，占{d}%',
      },
    },
    labelLine: {
      normal: {
        show: true,
        length: 5,
        length2: 5,
        smooth: false,
      },
    },
  },
};

const mergeHistogramOptions = (options) => {
  const { title, xAxis, yAxis, legends, colors } = options;

  return {
    ...defaultHistogramOptions,
    title: {
      ...defaultHistogramOptions.title,
      text: title,
    },
    legend: {
      data: legends,
    },
    xAxis: {
      ...defaultHistogramOptions.xAxis,
      data: xAxis,
    },
    series: yAxis.map((s, i) => ({
      name: legends[i],
      type: 'bar',
      stack: '总量',
      itemStyle: {
        normal: {
          color: colors[i],
        },
      },
      data: s,
    })),
  };
};

const mergeHorizontalHitstogramOptions = (options) => {
  const { title, yAxis, percent, color } = options;

  return {
    ...defaultHorizontalHistogramOptions,
    title: {
      ...defaultHorizontalHistogramOptions.title,
      text: title,
    },
    yAxis: {
      ...defaultHorizontalHistogramOptions.yAxis,
      data: yAxis,
    },
    series: defaultHorizontalHistogramOptions.series.map(s => ({
      ...s,
      itemStyle: {
        ...defaultHorizontalHistogramOptions.itemStyle,
        normal: {
          color,
        },
      },
      data: percent,
    })),
  };
};

const mergePieOptions = (options) => {
  const { title, legend, data } = options;
  return {
    ...defaultPieOptions,
    title: {
      ...defaultPieOptions.title,
      text: title,
    },
    legend: {
      ...defaultPieOptions.legend,
      data: legend,
    },
    series: {
      ...defaultPieOptions.series,
      data,
    },
  };
};

const getXaxis = state => state.key;

const getOrderHistogramYaxis = state => (
  [state.order.replied, state.order.unreplied]
);

const getMessageHistogramYaxis = state => (
  [state.message.agent, state.message.contact]
);

const getFirstResponsesPercents = state => {
  const firstResponses = state.first_responses;
  return firstResponses.map(res => parseFloat(res));
};

const getResponsesPercents = state => {
  const responses = state.responses;
  return responses.map(res => parseFloat(res));
};

const getSessionsPercents = state => {
  const sessions = state.sessions;
  return sessions.map(res => parseFloat(res));
};

const getFromList = state => {
  const from = state.from;
  const fromList = [];
  for (const key of Object.keys(from)) {
    const v = from[key];
    fromList.push({
      name: fromMap[key],
      value: v,
    });
  }

  return fromList;
};

const getEvaluateList = state => {
  const evaluate = state.evaluate;
  const evaluateList = [];

  for (const key of Object.keys(evaluate)) {
    const v = evaluate[key];

    evaluateList.push({
      name: evaluateMap[key],
      value: v,
    });
  }

  return evaluateList;
};

const getCategories = state => {
  const categories = state.categories;
  const categoryData = [];

  for (const key of Object.keys(categories)) {
    categoryData.push({
      name: key,
      value: categories[key],
    });
  }

  return {
    legend: Object.keys(categories),
    data: categoryData,
  };
};

export const getOrderHistogramOptions = createSelector(
  [getXaxis, getOrderHistogramYaxis],
  (xAxis, yAxis) => mergeHistogramOptions({
    title: '对话数',
    xAxis,
    yAxis,
    legends: orderLegends,
    colors: orderColors,
  })
);

export const getMessageHistogramOptions = createSelector(
  [getXaxis, getMessageHistogramYaxis],
  (xAxis, yAxis) => mergeHistogramOptions({
    title: '消息数',
    xAxis,
    yAxis,
    type: 'message',
    legends: messageLegends,
    colors: messageColors,
  })
);

export const getFirstResponseTimeOptions = createSelector(
  [getFirstResponsesPercents],
  (percents) => mergeHorizontalHitstogramOptions({
    title: '首次响应时间',
    yAxis: ['<15s', '15s-30s', '30s-45s', '45s-1m', '>1m', '>1h', '>1天'],
    percent: percents,
    color: '#3FBF88',
  })
);

export const getResponsesOptions = createSelector(
  [getResponsesPercents],
  (percents) => mergeHorizontalHitstogramOptions({
    title: '响应时间',
    yAxis: ['<15s', '15s-30s', '30s-45s', '45s-1m', '>1m', '>1h', '>1天'],
    percent: percents,
    color: '#62A8EA',
  })
);

export const getSessionsOptions = createSelector(
  [getSessionsPercents],
  (percents) => mergeHorizontalHitstogramOptions({
    title: '会话时长',
    yAxis: ['<2m', '2m-4m', '4m-6m', '6m-8m', '>8m', '>1h', '>1天'],
    percent: percents,
    color: '#926DDE',
  })
);

export const getSourcePieOptions = createSelector(
  [getFromList],
  (source) => mergePieOptions({
    title: '客户来源',
    legend: ['网站', '微信', '邮件', '电话', '微博'],
    data: source,
  })
);

export const getEvaluatePieOptions = createSelector(
  [getEvaluateList],
  (evaluate) => mergePieOptions({
    title: '满意度',
    legend: ['好评', '差评', '中评', '未评价'],
    data: evaluate,
  })
);

export const getCategoryPieOptions = createSelector(
  [getCategories],
  (categoryData) => mergePieOptions({
    title: '咨询分类',
    legend: categoryData.legend,
    data: categoryData.data,
  })
);

export const getReplyTextStats = state => (
  [{
    title: '对话数',
    needPopover: false,
    data: `${state.orders}`,
  }, {
    title: '回复率',
    needPopover: true,
    popoverTitle: '已接待对话数与对话总数的比值',
    data: `${state.reply_ratio}%`,
  }]
);

export const getMessageStats = state => (
  [{
    title: '总消息数',
    needPopover: false,
    data: `${state.messages}`,
  }, {
    title: '问答比',
    needPopover: true,
    popoverTitle: '客服发出消息与访客发出消息的比值',
    data: `${state.answer_ratio}%`,
  }]
);

export const getResponseStats = state => (
  [{
    title: '平均首次响应时间',
    needPopover: false,
    data: state.first_response_avg,
  }, {
    title: '平均响应时间',
    needPopover: false,
    data: state.response_avg,
  }, {
    title: '平均会话时长',
    needPopover: false,
    data: state.session_avg,
  }]
);

export const getEvaluateStats = state => (
  [{
    title: '相对满意度',
    needPopover: true,
    popoverTitle: '好评的个数与评价数的比值',
    data: `${state.relative_ratio}%`,
  }, {
    title: '绝对满意度',
    needPopover: true,
    popoverTitle: '好评的个数与总对话数的比值',
    data: `${state.absolute_ratio}%`,
  }]
);
