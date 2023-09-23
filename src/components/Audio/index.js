import { useRef, useEffect, useContext, useState } from 'react';
import { Context } from '~/hook/Context';

import songs from '~/assets/songs';

import classNames from 'classnames/bind';
import styles from './Audio.module.scss';

const cx = classNames.bind(styles);

function Audio() {
    const context = useContext(Context);
    const audioRef = useRef(null);
    const src = songs[context.index].path;
    const songsLength = songs.length;

    useEffect(() => {
        if (context.play) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [context.play]);

    // useEffect(() => {
    //     audioRef.current.load();
    //     if (context.play) audioRef.current.play();
    // }, [src]);
    useEffect(() => {
        const audioElement = audioRef.current;
        const handleCanPlay = () => {
            if (context.play) {
                audioElement.play();
            }
        };
        audioElement.addEventListener('canplaythrough', handleCanPlay);
        audioElement.load();
        return () => {
            audioElement.removeEventListener('canplaythrough', handleCanPlay);
        };
    }, [src]);
    //  context.play

    useEffect(() => {
        audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
        return () => {
            audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, []);
    const handleLoadedMetadata = () => {
        context.toSetDuration(audioRef.current.duration);
    };

    const handleEnded = () => {
        if (context.shuffle) {
            if (context.repeat) {
                audioRef.current.load();
                audioRef.current.play();
            } else {
                context.toSetIndex(Math.round(Math.random() * songsLength));
            }
        } else {
            if (context.repeat) {
                audioRef.current.load();
                audioRef.current.play();
            } else {
                if (context.randomPlay) {
                    let arrayRandom = context.selectedData.playlist;
                    let iRandom;
                    if (arrayRandom.length > 1) {
                        do {
                            iRandom = Math.floor(Math.random() * arrayRandom.length);
                        } while (arrayRandom[iRandom] === context.index);
                        context.toSetIndex(arrayRandom[iRandom]);
                    } else {
                        context.toSetIndex(arrayRandom[0]);
                        audioRef.current.load();
                        audioRef.current.play();
                    }
                } else {
                    context.toIncreaseIndex(context.index);
                }
            }
        }
    };

    useEffect(() => {
        audioRef.current.currentTime = context.progress;
    }, [context.progress]);

    return (
        <audio ref={audioRef} onEnded={handleEnded} onTimeUpdate={() => context.toSetCurrentTime(audioRef.current.currentTime)}>
            <source src={src} type="audio/mpeg" />
        </audio>
    );
}

export default Audio;
