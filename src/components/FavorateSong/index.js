import songs from '~/assets/songs.js';
import classNames from 'classnames/bind';
import styles from './FavorateSong.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

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

    const removeLike = (index) => {
        const updateOrginDataLike = [...context.orginDataLike];
        updateOrginDataLike[index].like = !updateOrginDataLike[index].like;
        context.setOrginDataLike(updateOrginDataLike);
    };

    const handleRandomPlay = () => {
        const arrayRandom = favorateSongs.map((item) => item.index);

        const iRandom = Math.floor(Math.random() * arrayRandom.length);
        context.toSetIndex(arrayRandom[iRandom]);
        context.toRandomPlay(true);
        context.toPlay();
    };
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
                                removeLike(song.index);
                            }}
                            className={cx('heart')}
                        >
                            {context.orginDataLike[song.index] && <FontAwesomeIcon className={cx('liked')} icon={solidHeart} />}
                        </div>
                    </li>
                ))}
            </ul>
            {favorateSongs.length > 0 && (
                <div className={cx('btn-title')}>
                    <div
                        onClick={() => {
                            handleRandomPlay();
                        }}
                        className={cx('auto-play')}
                    >
                        PHÁT NGẪU NHIÊN
                    </div>
                </div>
            )}
        </div>
    );
}

export default FavorateSong;
