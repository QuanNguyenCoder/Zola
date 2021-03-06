import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './NavItem.module.scss';

const cx = classNames.bind(styles);

const NavItem = forwardRef(({ to, onClick, active, children }, ref) => {
	let Component = 'button';
	let props = {
		onClick,
	};
	if (to) {
		Component = Link;
		props.to = to;
	}
	let classes = cx('icon');
	return (
		<div className={cx('wrapper', { active })} ref={ref}>
			<Component className={classes} {...props}>
				{children}
			</Component>
		</div>
	);
});

export default NavItem;
