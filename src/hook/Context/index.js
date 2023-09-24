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

    //Xử lý thêm bài hát vào playlist
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
    const nameLocalStorage = loadSettings('nameLocalStorage');
    const [name, setName] = useState(nameLocalStorage || []);

    const addName = (name) => {
        const newData = [...data, { name, playlist: [] }];
        setData(newData);
        saveSettings('playlistDataLocal', newData);
    };
    const addPlaylist = (selectedName, playlist) => {
        const updatedData = data.map((item) => (item.name === selectedName ? { ...item, playlist: [...new Set([...item.playlist, ...playlist])] } : item));

        setData(updatedData);
        if (updatedData.length > 0) {
            saveSettings('playlistDataLocal', updatedData);
        }
    };

    const playlistDataLocalStorage = loadSettings('playlistDataLocal');

    const [selectedName, setSelectedName] = useState(null);
    const selectedData = (playlistDataLocalStorage ? playlistDataLocalStorage : data).find((item) => item.name === selectedName);
    useEffect(() => {
        addPlaylist(selectedName, playlist);
    }, [playlist, selectedName]);

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
    // const [orginDataLike, setOrginDataLike] = useState(
    //     dataLikeLocal
    //         ? dataLikeLocal
    //         : songs.map((item, i) => {
    //               return { i, like: false };
    //           }),
    // );

    const initialDataLike = dataLikeLocal ? dataLikeLocal : Array.from({ length: 200 }, (_, i) => ({ i, like: false }));

    const [orginDataLike, setOrginDataLike] = useState(initialDataLike);

    useEffect(() => {
        saveSettings('likeDataLocal', orginDataLike);
    }, [orginDataLike]);

    const flagLocalStore = loadSettings('tickToAddSong');
    const [flag, setFlag] = useState(flagLocalStore || []);
    saveSettings('tickToAddSong', flag);

    const dataindexOfObjectLocal = loadSettings('indexOfObjectDataLocal');
    const [indexOfObject, setIndexOfObject] = useState(dataindexOfObjectLocal || -1);

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
        name,
        setName,
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
        orginDataLike,
        setOrginDataLike,
        playlistDataLocalStorage,
        flag,
        setFlag,
        indexOfObject,
        setIndexOfObject,
    };
    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context, Provider };
