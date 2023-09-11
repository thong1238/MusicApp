import classNames from 'classnames/bind';
import styles from './Progress.module.scss';
import Repeat from '~/components/Dashboard/Repeat';
import Shuffle from '~/components/Dashboard/Shuffle';
import { useContext } from 'react';
import { Context } from '~/hook/Context';

const cx = classNames.bind(styles);

function Progress({ menu, playlist }) {
    const classes = cx('progress', { menu, playlist });
    const context = useContext(Context);

    const progressValue = (context.currentTime * 100) / context.duration;
    const handleChangeProgress = (e) => {
        context.toSetProgress((e.target.value * context.duration) / 100);
    };

    const transformTime = (input) => {
        let time = null;

        const minutes = Math.floor(input / 60);
        const seconds = Math.floor(input % 60);
        if (seconds < 10) {
            if (minutes < 10) {
                time = '0' + minutes + ' : ' + '0' + seconds;
            } else {
                time = minutes + ' : ' + '0' + seconds;
            }
        } else {
            if (minutes < 10) {
                time = '0' + minutes + ' : ' + seconds;
            } else {
                time = minutes + ' : ' + seconds;
            }
        }
        return time;
    };

    return (
        <div className={classes}>
            {!menu ? !playlist ? <span className={cx('current-start')}>{context.currentTime ? transformTime(context.currentTime) : '00 : 00'}</span> : null : <Shuffle className={cx('shuffle')} />}
            <div className={cx('bar')}>
                <input onChange={handleChangeProgress} type="range" id="seek" min="0" value={progressValue.toString()} max="100" />
                <div style={{ width: `${progressValue}%` }} className={cx('slider__progress')}></div>
            </div>
            {!menu ? !playlist ? <span className={cx('current-end')}>{context.duration ? transformTime(context.duration) : '-- : --'}</span> : null : <Repeat />}
        </div>
    );
}

export default Progress;
