import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Playlist from '~/components/Playlist';
import CurrentPlaying from '~/components/CurrentPlaying';
import Dashboard from '~/components/Dashboard';
import Progress from '~/components/Progress';
import RemovePlaylist from '~/components/RemovePlaylist';
import RemoveSong from '~/components/RemoveSong';

import { saveSettings } from '~/config';

import songs from '~/assets/songs';
import { image0 } from '~/assets/images';

import { useContext } from 'react';
import { Context } from '~/hook/Context';

import classNames from 'classnames/bind';
import styles from './AddSongToPlaylist.module.scss';
import { faAngleLeft, faCirclePlus, faEllipsis } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AddSongToPlaylist({ bottom }) {
    const context = useContext(Context);
    const classes = cx('wrapper', { bottom });
    const classesAnimation = cx('wave', 'active');

    const hideAddSongToPlaylist = () => {
        context.setComponentStates((prevState) => ({
            ...prevState,
            AddSongToPlaylist: false,
            CreatePlaylist: false,
        }));
    };
    const showPlaylist = () => {
        context.setComponentStates((prevState) => ({
            ...prevState,
            Playlist: true,
        }));

        const selectedFlag = context.flag.find((object) => object.name === context.selectedName);
        if (selectedFlag) {
            const newFlag = [...context.flag];
            const indexOfObject = newFlag.findIndex((object) => object.name === context.selectedName);
            if (indexOfObject !== -1) {
                context.setIndexOfObject(indexOfObject);
                saveSettings('indexOfObjectDataLocal', indexOfObject);
            }
        } else {
            console.log(`${context.selectedName} not found in context.flag.`);
        }
    };

    const hidePlaylist = () => {
        context.setComponentStates((prevState) => ({
            ...prevState,
            Playlist: false,
        }));
    };

    const waitImg = context.selectedData.playlist.length > 0 && context.selectedData ? songs[context.selectedData.playlist[0]].img : image0;
    const handleClick = (i) => {
        context.toSetIndex(i);
        context.toPlay(true);
    };

    const handleRandomPlay = () => {
        const arrayRandom = context.selectedData.playlist;
        const iRandom = Math.floor(Math.random() * arrayRandom.length);
        context.toSetIndex(arrayRandom[iRandom]);
        context.toRandomPlay(true);
        context.toPlay();
    };

    const handleRemove = () => {
        context.setComponentStates((prevState) => ({
            ...prevState,
            RemovePlaylist: true,
        }));
    };
    const showRemoveSong = (i) => {
        context.toSetI(i);

        context.setComponentStates((prevState) => ({
            ...prevState,
            RemoveSong: true,
        }));
    };

    return (
        <div className={classes}>
            <div onClick={() => hideAddSongToPlaylist()} className={cx('exit')}>
                <FontAwesomeIcon className={cx('exit-icon')} icon={faAngleLeft} />
            </div>

            <div
                onClick={() => {
                    handleRemove();
                }}
                className={cx('to-remove')}
            >
                <FontAwesomeIcon className={cx('to-remove-icon')} icon={faEllipsis} />
            </div>

            <div className={cx('wait-img')}>
                <img className={waitImg === image0 ? cx('default') : cx('custom')} src={waitImg} alt="" />
            </div>

            <h3 className={cx('name')}>{context.selectedData.name}</h3>
            {context.selectedData.playlist.length > 0 ? (
                <div className={cx('btn-title')}>
                    <div
                        onClick={() => {
                            handleRandomPlay();
                        }}
                        className={cx('auto-play')}
                    >
                        PHÁT NGẪU NHIÊN
                    </div>
                    <div onClick={() => showPlaylist()} className={cx('plus-box')}>
                        <FontAwesomeIcon className={cx('plus-box-icon')} icon={faCirclePlus} />
                        <div className={cx('add-song')}>Thêm bài</div>
                    </div>
                </div>
            ) : (
                <div onClick={() => showPlaylist()} className={cx('plus-title')}>
                    Thêm bài hát
                </div>
            )}
            <div className={cx('box-container')}>
                <ul className={cx('box-item')}>
                    {context.selectedData.playlist.map((i, index) => (
                        <li onClick={() => handleClick(i)} key={index} className={cx('song-item')}>
                            <img className={cx('curr-img')} src={songs[i].img} alt="" />
                            <div className={cx('name-author')}>
                                <div className={cx('song-name')}>{songs[i].name}</div>
                                <div className={cx('song-author')}>{songs[i].singer}</div>
                            </div>
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    showRemoveSong(i);
                                }}
                                className={cx('wave-animation')}
                            >
                                <div className={context.index === i && context.play ? classesAnimation : cx('wave')}></div>
                                <div className={context.index === i && context.play ? classesAnimation : cx('wave')}></div>
                                <div className={context.index === i && context.play ? classesAnimation : cx('wave')}></div>
                            </div>
                        </li>
                    ))}
                </ul>
                <Progress playlist />
                <CurrentPlaying playlist />
                <Dashboard playlist />
            </div>
            {context.componentStates.Playlist && <Playlist add hidePlaylist={hidePlaylist} />}
            {context.componentStates.RemovePlaylist && <RemovePlaylist />}
            {context.componentStates.RemoveSong && <RemoveSong />}
        </div>
    );
}
export default AddSongToPlaylist;
