import React, { PropTypes } from 'react';
import { Row, Col } from 'antd';
import ReactEcharts from 'components/ReactEcharts';
import ChartWrapper from './ChartWrapper';
import TextWrapper from './TextWrapper';
import styles from './overview-statistics.less';

const OverviewStatistics = (props) => {
  const {
    replyTextStats,
    messageStats,
    responseStats,
    evaluateStats,
    orderHistogramOptions,
    messageHistogramOptions,
    firstResponseOptions,
    responsesOptions,
    sessionsOptions,
    sourcePieOptions,
    evaluatePieOptions,
    categoryPieOptions,
    firstResponseTimeEmpty,
    responsesEmpty,
    sessionsEmpty,
    sourceEmpty,
    evaluateEmpty,
    categoryEmpty,
  } = props;

  return (
    <div>
      <div className={styles['graph-card']}>
        <Row gutter={16}>
          <Col span={5}>
            <TextWrapper data={replyTextStats} className={styles['text-content']} />
          </Col>

          <Col span={5}>
            <TextWrapper data={messageStats} className={styles['text-content']} />
          </Col>

          <Col span={9}>
            <TextWrapper data={responseStats} className={styles['text-content']} />
          </Col>

          <Col span={5}>
            <TextWrapper data={evaluateStats} className={styles['text-content']} />
          </Col>
        </Row>
      </div>

      <ChartWrapper className={styles['graph-card']}>
        <ReactEcharts style={{ height: 400 }} options={orderHistogramOptions} />
      </ChartWrapper>

      <ChartWrapper className={styles['graph-card']}>
        <ReactEcharts style={{ height: 400 }} options={messageHistogramOptions} />
      </ChartWrapper>

      <div className={styles['graph-card']}>
        <Row gutter={16}>
          <Col span={8}>
            <ChartWrapper
              title="首次响应时间"
              empty={firstResponseTimeEmpty}
            >
              <ReactEcharts style={{ height: 220 }} options={firstResponseOptions} />
            </ChartWrapper>
          </Col>
          <Col span={8}>
            <ChartWrapper
              title="响应时间"
              empty={responsesEmpty}
            >
              <ReactEcharts style={{ height: 220 }} options={responsesOptions} />
            </ChartWrapper>
          </Col>
          <Col span={8}>
            <ChartWrapper
              title="会话时长"
              empty={sessionsEmpty}
            >
              <ReactEcharts style={{ height: 220 }} options={sessionsOptions} />
            </ChartWrapper>
          </Col>
        </Row>
      </div>

      <div className={styles['graph-card']}>
        <Row gutter={16}>
          <Col span={12}>
            <ChartWrapper
              title="客户来源"
              empty={sourceEmpty}
            >
              <ReactEcharts style={{ height: 220 }} options={sourcePieOptions} />
            </ChartWrapper>
          </Col>

          <Col span={12}>
            <ChartWrapper
              title="满意度"
              empty={evaluateEmpty}
            >
              <ReactEcharts style={{ height: 220 }} options={evaluatePieOptions} />
            </ChartWrapper>
          </Col>
        </Row>
      </div>

      <div className={styles['graph-card']}>
        <ChartWrapper
          title="咨询分类"
          empty={categoryEmpty}
        >
          <ReactEcharts style={{ height: 220 }} options={categoryPieOptions} />
        </ChartWrapper>
      </div>
    </div>
  );
};

OverviewStatistics.propTypes = {
  orderHistogramOptions: PropTypes.object.isRequired,
  messageHistogramOptions: PropTypes.object.isRequired,
  firstResponseOptions: PropTypes.object.isRequired,
  responsesOptions: PropTypes.object.isRequired,
  sessionsOptions: PropTypes.object.isRequired,
  sourcePieOptions: PropTypes.object.isRequired,
  evaluatePieOptions: PropTypes.object.isRequired,
  categoryPieOptions: PropTypes.object.isRequired,
  replyTextStats: PropTypes.array.isRequired,
  messageStats: PropTypes.array.isRequired,
  responseStats: PropTypes.array.isRequired,
  evaluateStats: PropTypes.array.isRequired,
  firstResponseTimeEmpty: PropTypes.bool.isRequired,
  responsesEmpty: PropTypes.bool.isRequired,
  sessionsEmpty: PropTypes.bool.isRequired,
  sourceEmpty: PropTypes.bool.isRequired,
  evaluateEmpty: PropTypes.bool.isRequired,
  categoryEmpty: PropTypes.bool.isRequired,
};

export default OverviewStatistics;
