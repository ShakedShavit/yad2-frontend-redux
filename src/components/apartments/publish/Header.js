import React from 'react';
import { useHistory } from 'react-router-dom';
import yad2LogoOrange from '../../../images/yad2-logo.png';
import userIcon from '../../../images/user-icon-orange.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

function Header() {
    const history = useHistory();

    const userDataState = useSelector(state => state.userDataState);

    const closePublishPage = () => {
        history.push('/');
    }

    return (
        <div className="publish-header">
            <div className="right-side">
                <img onClick={closePublishPage} src={yad2LogoOrange} alt="yad2-logo" className="logo"></img>
                <span className="headline">פרסום מודעה חדשה</span>
            </div>

            <div className="header-info">
                <img src={userIcon} alt="user-icon" className="user-icon"></img>
                <span>{userDataState.user.firstName + " " + userDataState.user.lastName}</span>

                <button className="circle-border" onClick={closePublishPage}><span>יציאה</span><FontAwesomeIcon icon={faTimes} /></button>
            </div>
        </div>
    );
}

export default Header;