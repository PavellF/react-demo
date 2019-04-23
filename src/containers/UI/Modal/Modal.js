import React, {useEffect} from 'react';
import classes from './Modal.module.css'
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => {

    useEffect(() => console.log("modal updated"))

    const modalClasses = [classes.Modal];

    if (props.show) {
        modalClasses.push(classes.showAnimation);
    } else {
        modalClasses.push(classes.hideAnimation);
    }

    return (
        <React.Fragment>
            <div className={modalClasses.join(' ')}>
                {props.children}
            </div>
            <Backdrop backdropHandler={props.modalCloseHandler} show={props.show}></Backdrop>
        </React.Fragment>
    );
}

export default React.memo(modal, function areEqual(prevProps, nextProps) {
    /*
    return true if passing nextProps to render would return
    the same result as passing prevProps to render,
    otherwise return false
    */
    return false//prevProps.show === nextProps.show;
});