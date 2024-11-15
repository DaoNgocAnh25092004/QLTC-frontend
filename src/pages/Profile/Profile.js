import classNames from 'classnames/bind';
import { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './Profile.module.scss';
import Image from '~/components/Image';
import images from '~/assets/images';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faEdit, faEnvelope, faPhone, faSave, faSignature, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useUpdatePlayerMutation } from '~/hooks/userMutationHook';
import { ToastContext } from '~/components/ToastMessage';
import * as PlayerService from '~/Services/PlayerService';
import { updateAccount } from '~/redux/slides/accountSlide';

const cx = classNames.bind(styles);

function Profile() {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);
    const [edit, setEdit] = useState(false);
    const [errors, setErrors] = useState({});
    const { toast } = useContext(ToastContext);
    const [imageAvatar, setImageAvatar] = useState();
    const [formValues, setFormValues] = useState({
        email: account.email || '',
        username: account.username || '',
        phone: account.phone || '',
        avatar: account.avatar || '',
        fullName: '',
        address: '',
        dayOfBirth: '',
        gender: '',
    });

    // validation rules
    const validationRules = useMemo(
        () => ({
            email: { regex: /\S+@\S+\.\S+/, errorMessage: 'Email không hợp lệ.' },
            phone: { regex: /^\d{10,11}$/, errorMessage: 'Số điện thoại không hợp lệ.' },
            avatar: { regex: /\.(jpg|jpeg|png)$/i, errorMessage: 'Chỉ chấp nhận file ảnh .jpg, .jpeg, .png.' },
            dayOfBirth: { regex: /^\d{4}-\d{2}-\d{2}$/, errorMessage: 'Ngày sinh không hợp lệ.' },
        }),
        [],
    );

    const validateInput = useCallback(
        (name, value) => {
            const rule = validationRules[name];
            return rule && !rule.regex.test(value) ? rule.errorMessage : '';
        },
        [validationRules],
    );

    // Set form values
    useEffect(() => {
        setFormValues({
            email: account.email || '',
            username: account.username || '',
            fullName: account.fullName || '',
            phone: account.phone || '',
            avatar: account.avatar || '',
            address: account.address || '',
            dayOfBirth: account.dayOfBirth || '',
            gender: account.gender || '',
        });
    }, [account, toast]);

    // Handle change input
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (!edit) {
            setErrors((prev) => ({ ...prev, [name]: 'Bạn cần nhấn "Chỉnh sửa" trước khi thay đổi thông tin.' }));
            return;
        }

        if (type === 'file' && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageAvatar(reader.result);
                setFormValues((prev) => ({ ...prev, avatar: reader.result }));
            };
            reader.onerror = () => setErrors((prev) => ({ ...prev, avatar: 'Lỗi khi đọc file ảnh.' }));
            reader.readAsDataURL(file);
        } else {
            setFormValues((prev) => ({ ...prev, [name]: value }));
            setErrors((prev) => ({ ...prev, [name]: validateInput(name, value) }));
        }
    };

    // Update player
    const mutationUpdate = useUpdatePlayerMutation(({ id, formValues }) => PlayerService.updateDetailPlayer(id, formValues));
    const handleUpdateInfo = async () => {
        if (edit) {
            const id = account.userId;
            mutationUpdate.mutate(
                { id, formValues },
                {
                    onSuccess: () => {
                        toast.success('Cập nhật thành công.');
                        const combinedDetails = {
                            username: formValues.username,
                            fullName: formValues.fullName,
                            email: formValues.email,
                            phone: formValues.phone,
                            avatar: formValues.avatar,
                            userId: id,
                        };
                        dispatch(updateAccount(combinedDetails));
                    },
                    onError: () => toast.error('Cập nhật thất bại.'),
                },
            );
        } else {
            toast.info('Bạn đang ở chế độ chỉnh sửa.');
        }
        setErrors({});
        setEdit((prev) => !prev);
    };

    // Get detail player
    useEffect(() => {
        const fetchPlayerDetails = async () => {
            const id = account.userId;

            if (!id) return;

            const token = JSON.parse(localStorage.getItem('access_token'));
            try {
                const detailPlayer = await PlayerService.getDetailPlayer(id, token);
                setFormValues((prev) => ({
                    ...prev,
                    avatar: detailPlayer.avatar || prev.avatar,
                    address: detailPlayer.address || prev.address,
                    dayOfBirth: detailPlayer.dob || prev.dayOfBirth,
                    fullName: detailPlayer.fullName || prev.fullName,
                    gender: detailPlayer.gender || prev.gender,
                }));
            } catch (error) {
                toast.error('Lấy thông tin người chơi thất bại.');
            }
        };
        fetchPlayerDetails();
    }, [account.userId, toast]);

    return (
        <div className={cx('container')}>
            <div className={cx('cover-photo')}></div>

            <div className={cx('avatar')}>
                <Image src={imageAvatar ? imageAvatar : account.avatar || images.avatar} alt="Avatar" />
            </div>

            <div className={cx('name')}>{account.fullName || account.username}</div>

            <h2 className={cx('title')}>Thông tin cá nhân</h2>

            <div className={cx('info')}>
                <div className={cx('info-left')}>
                    <div className={cx('box-input', 'input-name')}>
                        <div>Tên tài khoản</div>
                        <div>
                            <input
                                className={cx('input', {
                                    'input-error': errors.username,
                                })}
                                placeholder="Nhập tên tài khoản của bạn"
                                name="name"
                                value={formValues.username}
                                onChange={handleChange}
                            />
                            <FontAwesomeIcon icon={faSignature} />
                            {errors.username && <p className={cx('error')}>{errors.username}</p>}
                        </div>
                    </div>
                    <div className={cx('box-input', 'input-email')}>
                        <div>Email</div>
                        <div>
                            <input
                                className={cx('input', {
                                    'input-error': errors.email,
                                })}
                                placeholder="Nhập email của bạn"
                                name="email"
                                value={formValues.email}
                                onChange={handleChange}
                                autoComplete="email"
                            />
                            <FontAwesomeIcon icon={faEnvelope} />
                            {errors.email && <p className={cx('error')}>{errors.email}</p>}
                        </div>
                    </div>

                    <div className={cx('box-input', 'input-phone')}>
                        <div>Số điện thoại</div>
                        <div>
                            <input
                                className={cx('input', {
                                    'input-error': errors.phone,
                                })}
                                placeholder="Nhập số điện thoại của bạn"
                                name="phone"
                                value={formValues.phone}
                                onChange={handleChange}
                            />
                            <FontAwesomeIcon icon={faPhone} />
                            {errors.phone && <p className={cx('error')}>{errors.phone}</p>}
                        </div>
                    </div>

                    <div className={cx('box-input', 'input-name')}>
                        <div>Họ và tên</div>
                        <div>
                            <input
                                className={cx('input', {
                                    'input-error': errors.fullName,
                                })}
                                placeholder="Nhập họ và tên của bạn"
                                name="fullName"
                                value={formValues.fullName}
                                onChange={handleChange}
                            />
                            <FontAwesomeIcon icon={faSignature} />
                            {errors.fullName && <p className={cx('error')}>{errors.fullName}</p>}
                        </div>
                    </div>

                </div>
                <div className={cx('info-right')}>
                    <div className={cx('box-input', 'input-avatar')}>
                        <div>Ảnh đại diện</div>
                        <div>
                            <input
                                className={cx('input', {
                                    'input-error': errors.avatar,
                                })}
                                name="avatar"
                                onChange={handleChange}
                                type="file"
                                disabled={!edit}
                            />
                            <FontAwesomeIcon icon={faUserTie} />
                            {errors.avatar && <p className={cx('error')}>{errors.avatar}</p>}
                        </div>
                    </div>

                    <div className={cx('box-input', 'input-address')}>
                        <div>Địa chỉ</div>
                        <div>
                            <input
                                className={cx('input', {
                                    'input-error': errors.address,
                                })}
                                name="address"
                                placeholder="Nhập địa chỉ của bạn"
                                value={formValues.address}
                                onChange={handleChange}
                            />
                            <FontAwesomeIcon icon={faAddressBook} />
                            {errors.address && <p className={cx('error')}>{errors.address}</p>}
                        </div>
                    </div>
                    <div className={cx('box-input', 'input-dayOfBirth')}>
                        <div>Ngày sinh</div>
                        <div>
                            <input
                                className={cx('input', {
                                    'input-error': errors.dayOfBirth,
                                })}
                                name="dayOfBirth"
                                value={formValues.dayOfBirth}
                                onChange={handleChange}
                                type="date"
                            />
                            {errors.dayOfBirth && <p className={cx('error')}>{errors.dayOfBirth}</p>}
                        </div>
                    </div>
                    <div className={cx('box-input', 'input-gender')}>
                        <div>Giới tính</div>
                        <div className={cx('radio')}>
                            <div>
                                <input
                                    type="radio"
                                    id="radio-nam"
                                    name="gender"
                                    value="Nam"
                                    checked={formValues.gender === 'Nam'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="radio-nam">Nam</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="radio-nu"
                                    name="gender"
                                    value="Nữ"
                                    checked={formValues.gender === 'Nữ'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="radio-nu">Nữ</label>
                            </div>
                        </div>

                        <div>{errors.gender && <p className={cx('error')}>{errors.gender}</p>}</div>
                    </div>

                    <div className={cx('box-left-btn')}>
                        <Button
                            large
                            leftIcon={<FontAwesomeIcon icon={edit ? faSave : faEdit} />}
                            primary
                            className={cx('btn-edit')}
                            onClick={handleUpdateInfo}
                        >
                            {edit ? 'Lưu' : 'Chỉnh sửa'}
                        </Button>
                    </div>
                </div>
            </div>

            <h2 className={cx('title', 'title-list-friend')}>Danh sách bạn bè</h2>
            <h2 className={cx('title', 'title-list-friend')}>Danh sách trò chơi của bạn</h2>
        </div>
    );
}

export default Profile;
