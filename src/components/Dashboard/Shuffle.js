import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useContext } from 'react';
import { Context } from '~/hook/Context';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';

import { faShuffle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Shuffle() {
    const context = useContext(Context);
    return <FontAwesomeIcon onClick={() => context.toggleSetShuffle()} className={cx('shuffle', { active: context.shuffle })} icon={faShuffle} />;
}

export default Shuffle;
