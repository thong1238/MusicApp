import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { Context } from '~/hook/Context';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';

import { faRepeat } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Repeat() {
    const context = useContext(Context);
    return <FontAwesomeIcon onClick={() => context.toggleSetRepeat()} className={cx('repeat', { active: context.repeat })} icon={faRepeat} />;
}

export default Repeat;
