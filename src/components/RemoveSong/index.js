import classNames from 'classnames/bind';
import styles from './RemoveSong.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { Context } from '~/hook/Context';
import songs from '~/assets/songs';

import { saveSettings, loadSettings, removeSettings } from '~/config/index';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function RemoveSong() {
    const context = useContext(Context);
    const handleDelete = () => {
        context.setComponentStates((prevState) => ({
            ...prevState,
            RemoveSong: false,
        }));
        const newSelectedDataPlaylist = context.selectedData.playlist.filter((item) => {
            return item != context.i;
        });

        const updatedData = context.data.map((item) => {
            return { ...item, playlist: [...newSelectedDataPlaylist] };
        });
        context.setData(updatedData);
        saveSettings('playlistDataLocal', updatedData);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('background')}></div>
            <div className={cx('container')}>
                <div className={cx('current-playing')}>
                    <img className={cx('curr-img')} src={songs[context.i].img} alt="" />
                    <div className={cx('name-author')}>
                        <div className={cx('song-name')}>{songs[context.i].name}</div>
                        <div className={cx('song-author')}>{songs[context.i].singer}</div>
                    </div>
                </div>
                <div className={cx('remove-container')}>
                    <div
                        onClick={() => {
                            handleDelete();
                        }}
                        className={cx('remove-playlist')}
                    >
                        <FontAwesomeIcon className={cx('remove-icon')} icon={faTrash} />
                        Xóa khỏi Playlist
                    </div>
                    <div
                        onClick={() => {
                            context.setComponentStates((prevState) => ({
                                ...prevState,
                                RemoveSong: false,
                            }));
                        }}
                        className={cx('cancel')}
                    >
                        Hủy
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RemoveSong;
