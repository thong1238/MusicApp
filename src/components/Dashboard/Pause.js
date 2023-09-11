import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useRef, useState, useContext } from 'react';
import { Context } from '~/hook/Context';

import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';

import { faCirclePause, faCirclePlay } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Pause() {
    const context = useContext(Context);
    return <FontAwesomeIcon onClick={() => context.toPause()} className={cx('pause')} icon={faCirclePause} />;
}

export default Pause;
