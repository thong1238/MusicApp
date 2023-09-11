import AddSongToPlaylist from '~/components/AddSongToPlaylist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useContext, useRef } from 'react';
import { Context } from '~/hook/Context';

import classNames from 'classnames/bind';
import styles from './CreatePlaylist.module.scss';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CreatePlaylist({ hideCreatePlaylist }) {
    const context = useContext(Context);
    const showAddSongToPlaylist = () => {
        context.setComponentStates((prevState) => ({
            ...prevState,
            AddSongToPlaylist: true,
        }));
    };

    // Thêm tên vào list tên
    const handeClick = (name) => {
        context.addName(name);
        context.setSelectedName(name);
        showAddSongToPlaylist();
    };

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div onClick={() => hideCreatePlaylist()} className={cx('exit')}>
                <FontAwesomeIcon className={cx('exit-icon')} icon={faAngleLeft} />
            </div>
            <h3 className={cx('title')}>Tên playlist</h3>
            <div className={cx('input')}>
                <input spellCheck="false" ref={inputRef} className={cx('name')} type="text" onChange={(e) => context.setInputValue(e.target.value)} />
            </div>
            <div
                onClick={() => {
                    context.inputValue.trim() && handeClick(context.inputValue.trim());
                    context.setPlaylist([]);
                }}
                className={cx('playlist-btn')}
            >
                TẠO PLAYLIST
            </div>
            {context.componentStates.AddSongToPlaylist && <AddSongToPlaylist />}
        </div>
    );
}
export default CreatePlaylist;
