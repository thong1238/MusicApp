import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext, useEffect } from 'react';
import { Context } from '~/hook/Context';

import classNames from 'classnames/bind';
import styles from './Timer.module.scss';

const cx = classNames.bind(styles);

function Timer() {
    const context = useContext(Context);

    const [countDownTimer, setCountDownTimer] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const [firstRender, setFirstRender] = useState(true);

    const timeState = [5, 10, 25, 45, 60, 120];
    const handleSetTimer = (time) => {
        context.toSetTimer(time);
        context.toSetTime(time);
    };

    //Thời gian còn lại
    useEffect(() => {
        let initialTime = context.time;
        if (intervalId) {
            clearInterval(intervalId);
        }
        setIntervalId(
            setInterval(() => {
                if (initialTime > 0) {
                    initialTime = initialTime - 1;
                    context.handleSetTimeRemain(initialTime);
                } else {
                    clearInterval(intervalId);
                }
            }, 60000),
        );
        return () => {
            clearInterval(intervalId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.time]);

    //Cài hẹn giờ
    useEffect(() => {
        context.handleSetState('Tắt hẹn giờ');
        const milisecond = context.time * 60 * 1000;
        if (countDownTimer) {
            clearTimeout(countDownTimer);
        }

        setCountDownTimer(
            setTimeout(() => {
                setFirstRender(false);
                if (!firstRender) {
                    context.toPause(true);
                }
                context.handleSetState('Hẹn thời gian tắt');
                context.toSetTime(null);
            }, milisecond),
        );
        return () => {
            clearTimeout(countDownTimer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.time]);

    //Hủy cài hẹn giờ
    const handleTurnOffTimer = () => {
        if (context.state === 'Tắt hẹn giờ') {
            context.handleSetTimeRemain(null);
            clearInterval(intervalId);
            context.toSetTime(null);
            clearTimeout(countDownTimer);
            context.handleSetState('Hẹn thời gian tắt');
            setCountDownTimer(null);
        }
    };
    const handleExit = () => {
        context.setComponentStates((prevState) => ({
            ...prevState,
            Timer: false,
        }));
    };

    return (
        context.componentStates.Timer && (
            <div className={cx('timer')}>
                <h5
                    onClick={() => {
                        handleTurnOffTimer();
                    }}
                >
                    {context.state === 'Hẹn thời gian tắt'
                        ? context.state
                        : context.timeRemain
                        ? `Tắt hẹn giờ (còn ${context.timeRemain} phút)`
                        : context.state === 'Tắt hẹn giờ'
                        ? `Tắt hẹn giờ (còn ${context.timer} phút)`
                        : null}
                </h5>
                {<FontAwesomeIcon onClick={() => handleExit()} className={cx('exit')} icon={faXmark} />}
                <ul className={cx('timeoff')}>
                    {timeState.map((time, index) => (
                        <li
                            onClick={() => {
                                handleSetTimer(time);
                            }}
                            key={index}
                        >
                            Sau {time} phút
                        </li>
                    ))}
                </ul>
            </div>
        )
    );
}

export default Timer;
