import songs from '~/assets/songs.js';
import classNames from 'classnames/bind';
import styles from './Playlist.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useContext, useEffect } from 'react';
import { Context } from '~/hook/Context';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Playlist({ add, hidePlaylist }) {
    const classes = cx('wrapper', { add });
    const classesAnimation = cx('wave', 'active');
    const context = useContext(Context);
    const clickToPlay = (index) => {
        context.toSetIndex(index);
        if (!add) {
            context.toPlay();
        }
    };

    // thêm bài hát khi click vào playlist

    const handldeClick = (index) => {
        context.setPlaylist([index]);
    };

    return (
        <div className={classes}>
            <h2>Danh sách phát</h2>
            {add ? <FontAwesomeIcon onClick={() => hidePlaylist()} className={cx('exit')} icon={faXmark} /> : null}
            <ul>
                {songs.map((song, index) => (
                    <li
                        onClick={() => {
                            add ? handldeClick(index) : clickToPlay(index);
                        }}
                        key={index}
                        className={cx('playing')}
                    >
                        <img className={cx('curr-img')} src={song.img} alt="" />
                        <div className={cx('name-author')}>
                            <div className={cx('song-name')}>{song.name}</div>
                            <div className={cx('song-author')}>{song.singer}</div>
                        </div>
                        <div className={cx('wave-animation')}>
                            <div className={context.index === index && context.play ? classesAnimation : cx('wave')}></div>
                            <div className={context.index === index && context.play ? classesAnimation : cx('wave')}></div>
                            <div className={context.index === index && context.play ? classesAnimation : cx('wave')}></div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Playlist;
