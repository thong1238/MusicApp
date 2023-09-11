import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Context } from '~/hook/Context';
import Library from '~/components/Library';

import classNames from 'classnames/bind';
import styles from './Option.module.scss';
import { faHeartCirclePlus, faMusic, faPlus, faSliders } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Option() {
    const context = useContext(Context);
    const showLibrary = () => {
        context.setComponentStates((prevState) => ({
            ...prevState,
            Library: true,
        }));
    };

    const hideLibrary = () => {
        context.setComponentStates((prevState) => ({
            ...prevState,
            Library: false,
        }));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('option')}>
                <Link to="/favorate">{<FontAwesomeIcon className={cx('add')} icon={faHeartCirclePlus} />}</Link>

                <div onClick={showLibrary} className={cx('create-playlist')}>
                    <FontAwesomeIcon className={cx('icon-music')} icon={faMusic} />
                    <FontAwesomeIcon className={cx('icon-plus')} icon={faPlus} />
                </div>
                {context.componentStates.Library && <Library hideLibrary={hideLibrary} />}

                <Link to="/menu">{<FontAwesomeIcon className={cx('menu')} icon={faSliders} />}</Link>
            </div>
        </div>
    );
}

export default Option;
