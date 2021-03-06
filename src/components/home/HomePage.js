import React, { useEffect, useRef, useState } from 'react';
import { fetchApartmentsFromDB } from '../../server/api/apartment';
import LoginPage from '../login/LoginPage';
import SignupSecondPage from '../login/SignupSecondPage';
import WelcomeBanner from '../login/WelcomeBanner';
import Header from '../main/Header';
import Modal from '../main/Modal';
import Notification from '../main/Notification';
import AdvancedSearch from './advanced_search/AdvancedSearch';
import ApartmentsList from './ApartmentsList';
import SortApartments from './sorting_search/SortApartments';
import apartmentsStore from '../../stores/apartmentsStore';
import { addApartmentsAction, newApartmentsAction } from '../../features/apartmentsSlice';
import { useDispatch, useSelector } from 'react-redux';

function HomePage() {
    const apartmentsState = useSelector(state => state.apartments);
    const dispatch = useDispatch();

    const searchParamsData = useSelector(state => state.searchParamsData);

    const [isLoadingNewApartment, setIsLoadingNewApartments] = useState(false);
    const [isSortingDropdownOpen, setIsSortingDropdownOpen] = useState(false);

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isGoToPublish, setIsGoToPublish] = useState(false);
    const [isLoginNotification, setIsLoginNotification] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [isSignupSecondPage, setIsSignupSecondPage] = useState(false);
    const [emailVal, setEmailVal] = useState('');
    const [passwordVal, setPasswordVal] = useState('');

    const homePageRef = useRef(null);

    useEffect(() => {
        if (!isLoginModalOpen && isSignupSecondPage) setIsSignupSecondPage(false);
    }, [isLoginModalOpen, isSignupSecondPage]);

    // When search query params change, fetch new apartments and remove the old ones
    useEffect(() => {
         // fetch apartments
         fetchApartmentsFromDB(searchParamsData.searchParams, [])
         .then((newApartments) => {
             console.log(searchParamsData, newApartments);
             dispatch(newApartmentsAction(newApartments));
             setIsLoadingNewApartments(false);
         })
         .catch((err) => {
             console.log(err);
             setIsLoadingNewApartments(false);
         });
    }, [searchParamsData]);

    const pageOnScroll = () => {
        if (!homePageRef.current || isLoginModalOpen || isLoadingNewApartment) return;

        const { scrollTop, scrollHeight, clientHeight } = homePageRef.current;
        if (Math.abs(scrollTop + clientHeight - scrollHeight) > 1) return;
        
        setIsLoadingNewApartments(true);

        // fetch apartments
        fetchApartmentsFromDB(searchParamsData.searchParams, apartmentsState.apartmentIds || [])
        .then((newApartments) => {
            console.log(searchParamsData, newApartments);
            dispatch(addApartmentsAction(newApartments));
            setIsLoadingNewApartments(false);
        })
        .catch((err) => {
            console.log(err);
            setIsLoadingNewApartments(false);
        });
    };

    return (
        <>
        <div
            className={isLoginModalOpen ? "home-page no-scroll" : "home-page"}
            ref={homePageRef}
            onScroll={pageOnScroll}
            onClick={() => { setIsSortingDropdownOpen(false); }}
        >
            <Header setIsLoginModalOpen={setIsLoginModalOpen} setIsGoToPublish={setIsGoToPublish} />
            
            { isLoginModalOpen &&
                <Modal setIsModalOpen={setIsLoginModalOpen} setIsGoToPublish={setIsGoToPublish}>
                    <div className="login-page">
                        <WelcomeBanner isSignup={isSignup} />

                        <div className="login-main-content">
                            <div className="header-login">
                                <h3>{ isSignup ? "??????????" : "??????????????" }</h3>
                                <p>{ isSignup ? "?????? ???? ???????????? ?????? ????????????" : "?????? ???? ???????????? ?????? ????????????" }</p>
                            </div>

                            {
                            !isSignupSecondPage ?
                            <LoginPage
                                isSignup={isSignup}
                                setIsSignup={setIsSignup}
                                setIsLoginModalOpen={setIsLoginModalOpen}
                                setIsSignupSecondPage={setIsSignupSecondPage}
                                emailVal={emailVal}
                                setEmailVal={setEmailVal}
                                passwordVal={passwordVal}
                                setPasswordVal={setPasswordVal}
                                setIsLoginNotification={setIsLoginNotification}
                                isGoToPublish={isGoToPublish}
                            />
                            :
                            <SignupSecondPage
                                setIsLoginModalOpen={setIsLoginModalOpen}
                                setIsSignupSecondPage={setIsSignupSecondPage}
                                emailVal={emailVal}
                                setEmailVal={setEmailVal}
                                passwordVal={passwordVal}
                                setPasswordVal={setPasswordVal}
                                setIsLoginNotification={setIsLoginNotification}
                                isGoToPublish={isGoToPublish}
                            />
                            }
                        </div>
                    </div>
                </Modal>
            }

            <div className="headline first-headline">
                <span>????????</span>
                &nbsp;&nbsp;&nbsp;
                <span>/ &nbsp;&nbsp;??????"?? ????????????</span>
            </div>

            <AdvancedSearch />

            <div className="headline second-headline">
                <span>?????????? ???????????? </span>
                <span>{`???????? ${apartmentsState.apartments.length} ????????????`}</span>
            </div>

            <SortApartments
                isSortingDropdownOpen={isSortingDropdownOpen}
                setIsSortingDropdownOpen={setIsSortingDropdownOpen}
                apartmentsState={apartmentsState}
                dispatchApartmentsData={apartmentsStore.dispatch}
            />

            <ApartmentsList
                isLoadingNewApartment={isLoadingNewApartment}
                apartmentsState={apartmentsState}
                dispatchApartmentsData={apartmentsStore.dispatch}
            />
        </div>

        { isLoginNotification && <Notification text="???????????? ????????????" isSuccess={true} setIsNotificationOpen={setIsLoginNotification}  /> }
        </>
    );
}

export default HomePage;