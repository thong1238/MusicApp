import AddSongToPlaylist from '~/components/AddSongToPlaylist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useContext, useRef, useState } from 'react';
import { Context } from '~/hook/Context';
import songs from '~/assets/songs';

import classNames from 'classnames/bind';
import styles from './CreatePlaylist.module.scss';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { saveSettings } from '~/config';

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
    const [showError, setShowError] = useState(false);
    const handeClick = (name) => {
        if (!context.name.includes(name)) {
            context.setName((prevName) => [...prevName, name]);
            saveSettings('nameLocalStorage', [...context.name, name]);
            context.addName(name);
            context.setSelectedName(name);
            showAddSongToPlaylist();

            const newFlag = [...context.flag, { name: name, info: new Array(songs.length).fill(false) }];
            context.setFlag(newFlag);
            saveSettings('indexOfObjectDataLocal', context.indexOfObject + 1);
            context.setIndexOfObject((prevIndex) => prevIndex + 1);

            saveSettings('tickToAddSong', newFlag);
        } else {
            setShowError(true);
        }
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
                <input
                    spellCheck="false"
                    ref={inputRef}
                    className={cx('name')}
                    type="text"
                    onChange={(e) => {
                        const inputText = e.target.value;
                        const capitalizedText = inputText.charAt(0).toUpperCase() + inputText.slice(1);
                        context.setInputValue(capitalizedText);
                    }}
                />
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
            {showError && <p style={{ marginLeft: '8%' }}>Playlist đã tồn tại, nhập tên khác!</p>}
        </div>
    );
}
export default CreatePlaylist;
