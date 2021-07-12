import React, { useEffect, useState } from 'react';
import { logoutInDB } from '../../server/api/user';
import userIcon from '../../images/user-icon.png';
import CloseSymbol from './CloseSymbol';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/loginSlice';

function Navbar({ setIsNavbarOpen, setIsLoginModalOpen, publishNewApartmentOnClick }) {
    const userDataState = useSelector(state => state.userDataState);
    const dispatchUserData = useDispatch();

    const [backdropClassList, setBackdropClassList] = useState('hidden-backdrop backdrop');
    const [navClassList, setNavClassList] = useState('hidden-nav');

    useEffect(() => {
        setBackdropClassList('visible-backdrop backdrop');
        setNavClassList('visible-nav');
    }, []);

    const closeNavbarOnClick = () => {
        setBackdropClassList('hidden-backdrop backdrop');
        setNavClassList('hidden-nav');
        setTimeout(() => {
            setIsNavbarOpen(false);
        }, 500);
    }

    const logoutOnClick = () => {
        logoutInDB(userDataState.token)
        .catch((err) => { console.log(err) });

        dispatchUserData(logout());

        closeNavbarOnClick();
    }

    const goToLoginPageOnClick = () => {
        setIsLoginModalOpen(true);
        setIsNavbarOpen(false);
    }

    return (
        <div className="navbar-container">
            <nav className={navClassList}>
                <CloseSymbol classNames={"navbar-close"} closeFunc={closeNavbarOnClick} />

                {
                    !!userDataState.user ?
                    <div className="nav-top">
                        <div className="loggedin-container">
                            <span className="circle name-tag">{userDataState.user.firstName[0]}</span>
                            <div className="personal-area-container">
                                <span className="full-name">{userDataState.user.firstName + " " + userDataState.user.lastName}</span>
                                <span>לאזור האישי</span>
                            </div>
                        </div>
                        <button onClick={logoutOnClick} className="logout-button">התנתקות</button>
                    </div>
                    :
                    <div className="disconnected-container" onClick={goToLoginPageOnClick}>
                        <div className="circle user-icon">
                            <img src={userIcon} alt="user-icon"></img>
                        </div>
                        <span>התחברות</span>
                    </div>
                }

                <div className="publish-ad__link" onClick={publishNewApartmentOnClick}>
                    <span>פרסום מודעה</span>
                </div>
            </nav>

            <div className={backdropClassList} onClick={closeNavbarOnClick}></div>
        </div>
    );
}

export default Navbar;