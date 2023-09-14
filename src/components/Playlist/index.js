import songs from '~/assets/songs.js';
import classNames from 'classnames/bind';
import styles from './Playlist.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { saveSettings } from '~/config';

import { useContext, useState } from 'react';
import { Context } from '~/hook/Context';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Playlist({ add, hidePlaylist, menu }) {
    const classes = cx('wrapper', { add });
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

        const selectedFlag = context.flag.find((object) => object.name === context.selectedName);
        if (selectedFlag) {
            const newFlag = [...context.flag];
            const indexOfObject = newFlag.findIndex((object) => object.name === context.selectedName);
            if (indexOfObject !== -1) {
                context.setIndexOfObject(indexOfObject);
                selectedFlag.info[index] = true;
                newFlag[indexOfObject] = { ...selectedFlag };
                context.setFlag(newFlag);
                saveSettings('tickToAddSong', newFlag);
            }
        } else {
            console.log(`${context.selectedName} not found in context.flag.`);
        }
    };
    const toggleSetLike = (e, index) => {
        e.stopPropagation();

        const updateOrginDataLike = [...context.orginDataLike];
        updateOrginDataLike[index].like = !updateOrginDataLike[index].like;
        context.setOrginDataLike(updateOrginDataLike);
    };

    return (
        <div className={classes}>
            <h2>Danh sách phát</h2>
            {add ? <FontAwesomeIcon onClick={() => hidePlaylist()} className={cx('exit')} icon={faXmark} /> : null}
            <ul>
                {songs.map((song, index) => (
                    <li
                        key={index}
                        onClick={() => {
                            add ? handldeClick(index) : clickToPlay(index);
                        }}
                        className={cx('playing')}
                    >
                        <img className={cx('curr-img')} src={song.img} alt="" />
                        <div className={cx('name-author')}>
                            <div className={cx('song-name')}>{song.name}</div>
                            <div className={cx('song-author')}>{song.singer}</div>
                        </div>

                        {context.indexOfObject > -1 && context.flag[context.indexOfObject].info[index] ? <FontAwesomeIcon className={cx('done-icon', { menu })} icon={faCheck} /> : null}

                        <div onClick={(e) => toggleSetLike(e, index)} className={cx('heart')}>
                            {context.orginDataLike[index].like ? <FontAwesomeIcon className={cx('liked')} icon={solidHeart} /> : <FontAwesomeIcon className={cx('like')} icon={regularHeart} />}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Playlist;
