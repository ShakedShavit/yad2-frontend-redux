import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { goToNextPublishPageAction } from '../../../../features/publishApartmentSlice';

function PageFooter(props) {
    const publishApartmentData = useSelector(state => state.publishApartmentData);
    const dispatch = useDispatch();

    const goToNextPageOnClick = () => {
        const { isFormValid, newProperties } = props.validateForm();

        if (!isFormValid || publishApartmentData.maxPage === props.pageNum) return;

        dispatch(goToNextPublishPageAction(newProperties));
    }

    return (
        <>
        { props.isCurrPage &&
            <div className="publish-card-footer">
                <button onClick={() => { props.goToPrevPageOnClick(props.pageNum - 1); }}>חזרה</button>
                <button onClick={() => { goToNextPageOnClick(); }}><span className="continue-text-mobile">המשך</span><span className="continue-text-desktop">להמשיך לשלב הבא</span></button>
            </div>
        }
        </>
    );
}

export default PageFooter;