import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Timer from '~/components/Timer';
import Pause from './Pause';
import Play from './Play';
import Backward from './Backward';
import Forward from './Forward';
import Shuffle from './Shuffle';
import Repeat from './Repeat';

import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';

import { useContext } from 'react';
import { Context } from '~/hook/Context';

import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Dashboard({ full, menu, playlist }) {
    const context = useContext(Context);
    const classes = cx('dashboard', { full, menu, playlist });

    const handleShow = () => {
        context.setComponentStates((prevState) => ({
            ...prevState,
            Timer: true,
        }));
    };
    return (
        <div className={classes}>
            {full ? <Shuffle /> : null}
            {menu ? (
                <FontAwesomeIcon
                    onClick={() => {
                        handleShow();
                    }}
                    className={cx('clock', { action: context.time })}
                    icon={faClock}
                />
            ) : null}
            <Backward />
            {!context.play ? <Play /> : null}
            {context.play ? <Pause /> : null}

            <Forward />
            {full ? <Repeat /> : null}
            {menu ? <Link to="/">{<FontAwesomeIcon className={cx('bar')} icon={faSliders} />}</Link> : null}
            {menu && context.componentStates.Timer ? <Timer /> : null}
        </div>
    );
}

export default Dashboard;
