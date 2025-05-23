import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminRegisterApi from "../api/AdminRegisterApi";

const AdminRegister = () => {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        profession: '',
        username: '',
        password: '',
        profilepic: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    profilepic: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({});

        try {
            const adminData = {
                fullName: formData.fullName,
                email: formData.email,
                profession: formData.profession,
                userSaveRequestDTO: {
                    username: formData.username,
                    password: formData.password,
                    profilepic: formData.profilepic
                }
            };

            const response = await AdminRegisterApi(adminData);

            if (response.success) {
                // Navigate to login with success message
                navigate("/admin-auth", {
                    state: {
                        message: "Đăng ký quản trị viên thành công! Vui lòng đăng nhập."
                    }
                });
            } else {
                setErrors({
                    submit: response.message || "Đăng ký không thành công. Vui lòng thử lại."
                });
            }
        } catch (error) {
            console.error('Lỗi đăng ký', error);
            setErrors({
                submit: "Đăng ký không thành công. Vui lòng kiểm tra thông tin chi tiết của bạn."
            });
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Đăng ký quản trị</h2>
                    <p className="mt-2 text-gray-600">Tạo tài khoản quản trị viên</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {errors.submit && (
                            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4">
                                {errors.submit}
                            </div>
                        )}

                        {/* Full Name Field */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                            Họ và tên 
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="Nhập tên "
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="Nhập email"
                            />
                        </div>

                        {/* Profession Field */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                            Nghề nghiệp
                            </label>
                            <input
                                type="text"
                                name="profession"
                                value={formData.profession}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="Quản trị viên hệ thống"
                            />
                        </div>

                        {/* Credentials Section */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Username Field */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                Tên người dùng
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Tên người dùng"
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Mật khẩu"
                                />
                            </div>
                        </div>

                        {/* Profile Picture Upload */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                            Ảnh đại diện
                            </label>
                            <input
                                type="file"
                                onChange={handleFileUpload}
                                className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-indigo-50 file:text-indigo-700
                                    hover:file:bg-indigo-100"
                                accept="image/*"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                        >
                            Hoàn tất đăng ký
                        </button>
                    </form>

                    {/* Login Redirect */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                        Đã đăng ký?{" "}
                            <Link
                                to="/admin-auth"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Tiến hành đăng nhập
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;