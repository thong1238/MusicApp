import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

function Navbar({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('list-navbar')}>
                <h2>{children}</h2>
                <Link to="/">{<FontAwesomeIcon className={cx('exit')} icon={faXmark} />}</Link>
            </div>
        </div>
    );
}

export default Navbar;
