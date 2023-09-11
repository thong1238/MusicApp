import { saveSettings, loadSettings, removeSettings } from '~/config/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';
import { Context } from '~/hook/Context';
import CreatePlaylist from '~/components/CreatePlaylist';
import AddSongToPlaylist from '~/components/AddSongToPlaylist';
import { image0 } from '~/assets/images';
import songs from '~/assets/songs';

import classNames from 'classnames/bind';
import styles from './Library.module.scss';

const cx = classNames.bind(styles);

function Library({ hideLibrary }) {
    const context = useContext(Context);

    const showCreatePlaylist = () => {
        context.setComponentStates((prevState) => ({
            ...prevState,
            CreatePlaylist: true,
        }));
    };

    const hideCreatePlaylist = () => {
        context.setComponentStates((prevState) => ({
            ...prevState,
            CreatePlaylist: false,
        }));
    };
    const showAddSongToPlaylist = () => {
        context.setComponentStates((prevState) => ({
            ...prevState,
            AddSongToPlaylist: true,
        }));
    };

    const handleSelectName = (name) => {
        context.setSelectedName(name);
        context.setPlaylist([]);
    };
    const handleCombinedClick = (name) => {
        showAddSongToPlaylist();
        handleSelectName(name);
    };

    return (
        <div className={cx('library')}>
            <h5>
                Thảo Minh <FontAwesomeIcon style={{ color: 'red' }} icon={faHeart} />
            </h5>
            {<FontAwesomeIcon onClick={() => hideLibrary()} className={cx('exit')} icon={faXmark} />}
            <h3>Playlist</h3>
            <div onClick={showCreatePlaylist} className={cx('item')}>
                <div className={cx('plus')}>
                    <div className={cx('plus-sign')}>+</div>
                    <div className={cx('plus-title')}>Tạo playlist mới</div>
                </div>
            </div>
            <ul className={cx('list-item')}>
                {context.componentStates.CreatePlaylist && <CreatePlaylist hideCreatePlaylist={hideCreatePlaylist} />}
                {(context.playlistDataLocalStorage && context.playlistDataLocalStorage.length > 0 ? context.playlistDataLocalStorage : context.data).map((item, index) => (
                    <li onClick={() => handleCombinedClick(item.name)} key={index} className={cx('item')}>
                        <div className={cx('plus')}>
                            <img className={item.playlist.length > 0 ? cx('plus-sign') : cx('plus-sign', 'custom')} src={item.playlist.length > 0 ? songs[item.playlist[0]].img : image0} />
                            <div className={cx('plus-title')}>{item.name}</div>
                        </div>
                    </li>
                ))}
                {context.componentStates.AddSongToPlaylist && <AddSongToPlaylist bottom />}
            </ul>
        </div>
    );
}

export default Library;
