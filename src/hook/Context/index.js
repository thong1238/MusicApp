import { saveSettings, loadSettings, removeSettings } from '~/config/index';
import { createContext, useState, useEffect } from 'react';
import songs from '~/assets/songs';
const Context = createContext();
function Provider({ children }) {
    const songsLength = songs.length;

    const [play, setPlay] = useState(false);
    const toPlay = () => setPlay(true);
    const toPause = () => setPlay(false);

    const [index, setIndex] = useState(0);
    const toSetIndex = (i) => setIndex(i);

    //Xử lý bài hát yêu thích
    const [i, setI] = useState(0);
    const toSetI = (i) => setI(i);

    const toIncreaseIndex = (preIndex) => {
        if (shuffle) {
            setIndex(Math.round(Math.random() * songsLength));
        } else {
            preIndex >= songsLength - 1 ? setIndex(0) : setIndex(preIndex + 1);
        }
    };
    const toDecreaseIndex = (preIndex) => {
        if (shuffle) {
            setIndex(Math.round(Math.random() * songsLength));
        } else {
            preIndex <= 0 ? setIndex(songsLength - 1) : setIndex(preIndex - 1);
        }
    };

    const repeatDataLocalStorage = loadSettings('repeatDataLocal');
    const [repeat, setRepeat] = useState(repeatDataLocalStorage ? repeatDataLocalStorage : false);
    const toggleSetRepeat = () => {
        setRepeat((prevState) => !prevState);
        saveSettings('repeatDataLocal', !repeat);
    };
    const shuffleDataLocalStorage = loadSettings('shuffleDataLocal');
    const [shuffle, setShuffle] = useState(shuffleDataLocalStorage ? shuffleDataLocalStorage : false);
    const toggleSetShuffle = () => {
        setShuffle((prevState) => !prevState);
        saveSettings('shuffleDataLocal', !shuffle);
    };

    const [randomPlay, setRandomPlay] = useState(false);
    const toRandomPlay = (data) => setRandomPlay(data);

    const [currentTime, setCurrentTime] = useState(0);
    const toSetCurrentTime = (data) => setCurrentTime(data);

    const [duration, setDuration] = useState(null);
    const toSetDuration = (data) => setDuration(data);

    const [progress, setProgress] = useState(0);
    const toSetProgress = (data) => setProgress(data);

    const [inputValue, setInputValue] = useState('');

    const [playlist, setPlaylist] = useState([]);
    const [data, setData] = useState(loadSettings('playlistDataLocal') ? loadSettings('playlistDataLocal') : []);

    const addName = (name) => {
        const newData = [...data, { name, playlist: [] }];
        setData(newData);
        saveSettings('playlistDataLocal', newData);
    };
    const addPlaylist = (selectedName, playlist) => {
        const updatedData = data.map((item) => (item.name === selectedName ? { ...item, playlist: [...item.playlist, ...playlist] } : item));
        setData(updatedData);
        if (updatedData.length > 0) {
            saveSettings('playlistDataLocal', updatedData);
        }
    };

    // const [playlistDataLocalStorage, setPlaylistDataLocalStorage] = useState(loadSettings('playlistDataLocal'));
    const playlistDataLocalStorage = loadSettings('playlistDataLocal');

    const [selectedName, setSelectedName] = useState(null);
    const selectedData = (playlistDataLocalStorage ? playlistDataLocalStorage : data).find((item) => item.name === selectedName);

    useEffect(() => {
        addPlaylist(selectedName, playlist);
    }, [playlist, selectedName]);

    //Data để lưu vào loacalStorage
    const logData = {
        data: data,
        playlist: playlist,
        selectedName: selectedName,
        selectedData: selectedData,
    };

    const [componentStates, setComponentStates] = useState({
        Library: false,
        CreatePlaylist: false,
        AddSongToPlaylist: false,
        Playlist: false,
        RemovePlaylist: false,
        RemoveSong: false,
        Timer: false,
    });

    const [state, setState] = useState('Hẹn thời gian tắt');
    const handleSetState = (data) => setState(data);
    const [timeRemain, setTimeRemain] = useState(null);
    const handleSetTimeRemain = (data) => setTimeRemain(data);

    const [timer, setTimer] = useState(null);
    const toSetTimer = (data) => {
        setTimer(data);
    };

    const [time, setTime] = useState(null);
    const toSetTime = (data) => {
        setTime(data);
    };

    //Handle like unlike the songs and localStorage save
    const dataLikeLocal = loadSettings('likeDataLocal');
    const [orginDataLike, setOrginDataLike] = useState(
        dataLikeLocal
            ? dataLikeLocal
            : songs.map((item, i) => {
                  return { i, like: false };
              }),
    );
    const [isLiked, setIsLiked] = useState(orginDataLike[index].like);

    useEffect(() => {
        setIsLiked(orginDataLike[index].like);
        saveSettings('likeDataLocal', orginDataLike);
    }, [orginDataLike[index].like]);

    const [flag, setFlag] = useState(false);
    useEffect(() => {
        orginDataLike[index].like = false;
        setIsLiked(false);
        setFlag(false);
    }, [flag]);

    const value = {
        play,
        toPlay,
        toPause,
        index,
        toSetIndex,
        i,
        toSetI,
        toIncreaseIndex,
        toDecreaseIndex,
        repeat,
        toggleSetRepeat,
        shuffle,
        toggleSetShuffle,
        randomPlay,
        toRandomPlay,
        currentTime,
        toSetCurrentTime,
        duration,
        toSetDuration,
        progress,
        toSetProgress,
        inputValue,
        setInputValue,
        componentStates,
        setComponentStates,
        playlist,
        setPlaylist,
        data,
        setData,
        addName,
        addPlaylist,
        selectedName,
        setSelectedName,
        selectedData,
        timer,
        toSetTimer,
        state,
        handleSetState,
        timeRemain,
        handleSetTimeRemain,
        time,
        toSetTime,
        isLiked,
        setIsLiked,
        orginDataLike,
        playlistDataLocalStorage,
        flag,
        setFlag,
    };
    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context, Provider };
