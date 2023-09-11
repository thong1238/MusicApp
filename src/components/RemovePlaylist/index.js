import classNames from 'classnames/bind';
import styles from './RemovePlaylist.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { Context } from '~/hook/Context';
import { saveSettings, loadSettings, removeSettings } from '~/config/index';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function RemovePlaylist() {
    const context = useContext(Context);
    const handleDelete = () => {
        context.setComponentStates((prevState) => ({
            ...prevState,
            RemovePlaylist: false,
            CreatePlaylist: false,
            AddSongToPlaylist: false,
        }));

        const updatedData = context.data.filter((item) => item.name !== context.selectedName);
        context.setData(updatedData);
        saveSettings('playlistDataLocal', updatedData);
        context.setSelectedName(null);
        context.setPlaylist([]);
        context.toRandomPlay(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('background')}></div>
            <div className={cx('container')}>
                <h3 className={cx('name')}>{}</h3>
                <div
                    onClick={() => {
                        handleDelete();
                    }}
                    className={cx('remove-playlist')}
                >
                    <FontAwesomeIcon icon={faTrash} />
                    Xóa playlist
                </div>
                <div
                    onClick={() => {
                        context.setComponentStates((prevState) => ({
                            ...prevState,
                            RemovePlaylist: false,
                        }));
                    }}
                    className={cx('cancel')}
                >
                    Hủy
                </div>
            </div>
        </div>
    );
}

export default RemovePlaylist;
