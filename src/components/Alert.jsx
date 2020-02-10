import React from 'react';
import Style from './Githubusers/Usersearch.module.css';

const Alert = (props) => {
  const { alertShow, errorMessage } = props;
  return (
    <>
      {alertShow && (
      <div className={`${Style.alert} ${Style.alertWarning}`}>{errorMessage}</div>)}
    </>
  );
};

export default Alert;
