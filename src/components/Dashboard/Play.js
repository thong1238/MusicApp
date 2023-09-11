import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useRef, useState, useContext } from 'react';
import { Context } from '~/hook/Context';

import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';

import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Play() {
    const context = useContext(Context);
    return <FontAwesomeIcon onClick={() => context.toPlay()} className={cx('play')} icon={faCirclePlay} />;
}

export default Play;
