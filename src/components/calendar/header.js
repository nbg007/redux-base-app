// header.js
// header.js
import React, { Component, PropTypes } from 'react';
import moment from 'moment';

// const generateCell = (value, key) => { return (<th style={styles.th} key={key}>{value}</th>) };

class Header extends Component {
  
  _renderWeekDayNames(){
    let names = [];
    for( let i = 0; i < 7; i++) { 
      // names.push( generateCell( moment().weekday(i).format('ddd'), i) ); 
      names.push( (<th style={styles.th} key={i}>{moment().weekday(i).format('ddd')}</th>) );
    }
    return names;
  }

  render() {
    const { onPrevMonthClick, currentDate, onNextMonthClick} = this.props;
    return( 
      <thead>
        <tr>
          <th className='prev' style={styles.th}><button className='button-link' onClick={onPrevMonthClick}><span className='fa fa-chevron-left'></span>Prev</button></th>
          <th className='month' style={styles.th} colSpan='5' >{ moment(currentDate).format('MMMM / YYYY') }</th>
          <th className='next' style={styles.th}><button className='button-link' onClick={onNextMonthClick}>Next<span className='fa fa-chevron-right'></span></button></th>
        </tr>
        <tr className='week-day'>
          { this._renderWeekDayNames() }
        </tr>
      </thead>
    );
  }
}

Header.propTypes = {
  onPrevMonthClick: PropTypes.func.isRequired,
  onNextMonthClick: PropTypes.func.isRequired,
  currentDate: PropTypes.number,
}

const styles = {
  th: {
    verticalAlign: 'bottom',
    borderBottom: '1px solid #ddd',
    lineHeight: '1.42857143',
    borderTop: '1px solid #ddd',
  }
}

export default Header;