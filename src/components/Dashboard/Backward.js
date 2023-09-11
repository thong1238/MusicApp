import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';

import { faBackwardStep } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { Context } from '~/hook/Context';

const cx = classNames.bind(styles);

function Backward() {
    const context = useContext(Context);

    return <FontAwesomeIcon onClick={() => context.toDecreaseIndex(context.index)} className={cx('backward')} icon={faBackwardStep} />;
}

export default Backward;
