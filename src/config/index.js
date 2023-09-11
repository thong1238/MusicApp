// Lưu thông tin cài đặt vào localStorage
export const saveSettings = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

// Lấy thông tin cài đặt từ localStorage
export const loadSettings = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};

// Xóa thông tin cài đặt từ localStorage
export const removeSettings = (key) => {
    localStorage.removeItem(key);
};
