import Navbar from '~/components/Navbar';
import CurrentPlaying from '~/components/CurrentPlaying';
import Dashboard from '~/components/Dashboard';

import classNames from 'classnames/bind';
import styles from './Favorate.module.scss';
import FavorateSong from '~/components/FavorateSong';

const cx = classNames.bind(styles);

function Favorate() {
    return (
        <div className={cx('wrapper')}>
            <Navbar>BÀI HÁT YÊU THÍCH</Navbar>
            <FavorateSong />
            <CurrentPlaying />
            <Dashboard />
        </div>
    );
}
export default Favorate;
