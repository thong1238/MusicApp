import Navbar from '~/components/Navbar';
import CurrentPlaying from '~/components/CurrentPlaying';
import Playlist from '~/components/Playlist';
import Progress from '~/components/Progress';
import Dashboard from '~/components/Dashboard';

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Menu() {
    return (
        <div className={cx('wrapper')}>
            <Navbar>Đang phát</Navbar>
            <CurrentPlaying menu />
            <Playlist menu />
            <Progress menu />
            <Dashboard menu />
        </div>
    );
}
export default Menu;
