import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Button, DatePicker } from 'antd';
import styles from './date-filter.less';

const ButtonGroup = Button.Group;
const RangePicker = DatePicker.RangePicker;

class DateFilter extends React.Component {
  static propTypes = {
    onDateSelected: PropTypes.func.isRequired,
    highlight: PropTypes.bool.isRequired,
    activeBtn: PropTypes.number.isRequired,
    dateFilterActions: PropTypes.object.isRequired,
  }

  onDateClick = (v) => {
    const { onDateSelected } = this.props;
    const { togglePickerHighlight, setActiveDateButton } = this.props.dateFilterActions;

    setActiveDateButton(v);

    let begin = '';
    const date = new Date();
    date.setDate(date.getDate());
    const end = date.toISOString().substr(0, 10);
    const map = {
      1: 0,
      2: 7,
      3: 30,
    };

    if (v === 4) {
      begin = new Date(0).toISOString().substr(0, 10);
    } else {
      date.setDate(date.getDate() - map[v]);
      begin = date.toISOString().substr(0, 10);
    }

    togglePickerHighlight(false);

    onDateSelected({
      begin,
      end,
    });
  }

  onPickerChange = (value, dateString) => {
    const { togglePickerHighlight } = this.props.dateFilterActions;

    if (dateString[0]) {
      this.props.onDateSelected({
        begin: dateString[0],
        end: dateString[1],
      });

      togglePickerHighlight(true);
    } else {
      this.onDateClick(1);
    }
  }

  render() {
    const divClasses = classNames({
      [styles['date-filter']]: true,
      [styles['picker-highlight']]: this.props.highlight,
    });

    const { activeBtn } = this.props;

    return (
      <div className={divClasses}>
        <ButtonGroup className={styles['date-group']}>
          <Button
            type={activeBtn === 1 ? 'primary' : 'ghost'}
            onClick={() => this.onDateClick(1)}
          >
            今天
          </Button>

          <Button
            type={activeBtn === 2 ? 'primary' : 'ghost'}
            onClick={() => this.onDateClick(2)}
          >
            最近7天
          </Button>

          <Button
            type={activeBtn === 3 ? 'primary' : 'ghost'}
            onClick={() => this.onDateClick(3)}
          >
            最近30天
          </Button>

          <Button
            type={activeBtn === 4 ? 'primary' : 'ghost'}
            onClick={() => this.onDateClick(4)}
          >
            全部
          </Button>
        </ButtonGroup>
        <RangePicker
          className={styles.picker}
          style={{ width: 184 }}
          onChange={this.onPickerChange}
        />
      </div>
    );
  }
}

export default DateFilter;
