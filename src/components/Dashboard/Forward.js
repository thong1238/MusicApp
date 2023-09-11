import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';

import { useContext } from 'react';
import { Context } from '~/hook/Context';

import { faForwardStep } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Forward() {
    const context = useContext(Context);
    return <FontAwesomeIcon onClick={() => context.toIncreaseIndex(context.index)} className={cx('forward')} icon={faForwardStep} />;
}

export default Forward;
