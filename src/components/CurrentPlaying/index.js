import songs from '~/assets/songs';

import { Context } from '~/hook/Context';
import { useContext } from 'react';

import classNames from 'classnames/bind';
import styles from './CurrentPlaying.module.scss';

const cx = classNames.bind(styles);

function CurrentPlaying({ menu, playlist }) {
    const classes = cx('playing', { menu, playlist });
    const context = useContext(Context);
    return (
        <div className={classes}>
            <img className={cx('curr-img')} src={songs[context.index].img} alt="" />
            <div className={cx('name-author')}>
                <div className={cx('song-name')}>{songs[context.index].name}</div>
                <div className={cx('song-author')}>{songs[context.index].singer}</div>
            </div>
        </div>
    );
}

export default CurrentPlaying;
