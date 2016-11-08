import React, { PropTypes } from 'react';
import { Timeline } from 'antd';
import styles from '../../chat-info.less';

const TimelineItem = Timeline.Item;

const TrackTimeline = ({ trackData }) => {
  if (!trackData.length) {
    return (
      <span>没有数据</span>
    );
  }

  const timelineItems = trackData.map((t, i) => (
    <TimelineItem key={i}>
      <span>{t.created_at.substr(11)}</span>
      {'  '}
      <a href={t.url} target="_blank">{t.title}</a>
    </TimelineItem>
  ));

  return (
    <div className={styles.timeline}>
      <h5>{trackData[0].date}</h5>
      <Timeline>
        {timelineItems}
      </Timeline>
    </div>
  );
};

TrackTimeline.propTypes = {
  trackData: PropTypes.array.isRequired,
};

export default TrackTimeline;
