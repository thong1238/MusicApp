import songs from '~/assets/songs';
import { Context } from '~/hook/Context';
import { useContext, useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

import classNames from 'classnames/bind';
import styles from './Thumbnail.module.scss';

const cx = classNames.bind(styles);

function Thumbnail() {
    const context = useContext(Context);

    const toggleSetLike = () => {
        context.orginDataLike[context.index].like = !context.orginDataLike[context.index].like;
        context.setIsLiked(!context.isLiked);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('thumbnail', { rotate: context.play })}>
                <img src={songs[context.index].img} alt="" />
            </div>
            <div className={cx('song')}>
                <div className={cx('song-name')}>{songs[context.index].name}</div>
                <div onClick={() => toggleSetLike()} className={cx('heart')}>
                    {context.isLiked ? <FontAwesomeIcon className={cx('liked')} icon={solidHeart} /> : <FontAwesomeIcon className={cx('like')} icon={regularHeart} />}
                </div>

                <div className={cx('song-author')}>{songs[context.index].singer}</div>
            </div>
        </div>
    );
}

export default Thumbnail;
