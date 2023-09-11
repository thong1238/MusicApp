import songs from '~/assets/songs.js';
import classNames from 'classnames/bind';
import styles from './FavorateSong.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { Context } from '~/hook/Context';
import { useContext, useEffect } from 'react';

const cx = classNames.bind(styles);

function FavorateSong() {
    const context = useContext(Context);

    const favorateSongs = songs.filter((song, index) => {
        if (context.orginDataLike[index].like === true) {
            return song;
        }
    });

    return (
        <div className={cx('wrapper')}>
            <ul>
                {favorateSongs.map((song, index) => (
                    <li
                        onClick={() => {
                            context.toSetIndex(song.index);
                            context.toPlay();
                        }}
                        key={index}
                        className={cx('playing')}
                    >
                        <img className={cx('curr-img')} src={song.img} alt="" />
                        <div className={cx('name-author')}>
                            <div className={cx('song-name')}>{song.name}</div>
                            <div className={cx('song-author')}>{song.singer}</div>
                        </div>
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                context.toSetIndex(song.index);
                                context.setFlag(true);
                            }}
                            className={cx('heart')}
                        >
                            <FontAwesomeIcon className={cx('liked')} icon={solidHeart} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FavorateSong;
