import Thumbnail from '~/components/Thumbnail';
import Progress from '~/components/Progress';
import Dashboard from '~/components/Dashboard';
import Option from '~/components/Option';

import { Context } from '~/hook/Context';
import { useContext, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const context = useContext(Context);

    return (
        <div className={cx('wrapper')}>
            <Thumbnail />
            <Progress />
            <Dashboard full />
            <Option />
        </div>
    );
}
export default Home;
