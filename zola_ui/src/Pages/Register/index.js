import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMobileScreenButton,
	faLock,
	faAnglesLeft,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Toastify.scss';
import styles from './Register.module.scss';
import Button from '@/components/Button';
import { registerRoute } from '@/utils/APIRoute';
const cx = classNames.bind(styles);

const toastOptions = {
	position: 'bottom-right',
	autoClose: 5000,
	closeOnClick: true,
	draggable: true,
	theme: 'light',
};

function Register() {
	const [user, setUser] = useState({
		phone: '',
		username: '',
		password: '',
		confirmpassword: '',
	});
	const { phone, username, password, confirmpassword } = user;

	const handleForm = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const validateUser = () => {
		if (!phone.startsWith('0') || phone.length < 10) {
			toast.error('Số điện thoại không hợp lệ', toastOptions);
			return false;
		}
		if (password !== confirmpassword) {
			toast.error('Mật khẩu phải giống nhau!!', toastOptions);
			return false;
		}
		return true;
	};

	const handleSubmit = async function (e) {
		e.preventDefault();
		if (validateUser()) {
			const { data } = await axios.post(registerRoute, {
				phone: phone,
				username: username,
				password: password,
			});

			if (data.status) {
				toast.success(data.msg, toastOptions);
				setUser((prev) => ({ phone: '', username: '', password: '', confirmpassword: '' }));
			} else {
				toast.error(data.msg, toastOptions);
			}
		}
	};

	return (
		<div className={cx('wrapper')}>
			<div className={cx('tabs')}>
				<a href="/" className={cx('tab', 'tab-pane')} onClick={(e) => e.preventDefault()}>
					Đăng ký tài khoản
				</a>
			</div>
			<div className={cx('contents')}>
				<div className={cx('content-item')}>
					<form className={cx('form-signin')} onSubmit={(e) => handleSubmit(e)}>
						<div className={cx('form-group')}>
							<FontAwesomeIcon
								className={cx('form-icon')}
								icon={faMobileScreenButton}
							/>
							<input
								className={cx('form-input')}
								type="phone"
								placeholder="Số điện thoại"
								name="phone"
								value={phone}
								onChange={(e) => handleForm(e)}
							/>
						</div>
						<div className={cx('form-group')}>
							<FontAwesomeIcon className={cx('form-icon')} icon={faUser} />
							<input
								className={cx('form-input')}
								type="text"
								placeholder="Tên người dùng"
								name="username"
								autoComplete="off"
								value={username}
								onChange={(e) => handleForm(e)}
							/>
						</div>
						<div className={cx('form-group')}>
							<FontAwesomeIcon className={cx('form-icon')} icon={faLock} />
							<input
								className={cx('form-input')}
								type="password"
								placeholder="Mật khẩu"
								autoComplete="off"
								name="password"
								value={password}
								onChange={(e) => handleForm(e)}
							/>
						</div>
						<div className={cx('form-group')}>
							<FontAwesomeIcon className={cx('form-icon')} icon={faLock} />
							<input
								className={cx('form-input')}
								type="password"
								placeholder="Nhập lại mật khẩu"
								autoComplete="off"
								name="confirmpassword"
								value={confirmpassword}
								onChange={(e) => handleForm(e)}
							/>
						</div>
						<Button
							primary
							disabled={
								phone.length >= 6 &&
								username.length >= 1 &&
								password.length >= 8 &&
								confirmpassword.length >= 8
									? false
									: true
							}
							large
							type="submit"
						>
							Đăng ký với số điện thoại
						</Button>
						<Button
							className={cx('icon-btn')}
							text
							small
							leftIcon={<FontAwesomeIcon icon={faAnglesLeft} />}
							to="/login"
						>
							Quay lại
						</Button>
					</form>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}

export default Register;
