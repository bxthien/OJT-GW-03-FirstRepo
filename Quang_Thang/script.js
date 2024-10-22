// Khởi tạo dữ liệu khách hàng
let isEditing = false;
const customerData = {
    name: 'Nguyễn Văn A',
    phone: '0912345678',
    email: 'nguyenvana@email.com',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    company: 'Công ty TNHH XYZ',
    date: '01/01/2023'
};

// Hàm chuyển đổi giữa chế độ xem và chỉnh sửa
function toggleEdit() {
    isEditing = !isEditing;
    const editBtn = document.querySelector('.edit-btn');
    const editText = document.querySelector('.edit-text');
    const containers = document.querySelectorAll('.info-content');

    if (isEditing) {
        // Chuyển sang chế độ chỉnh sửa
        editText.textContent = 'Lưu';
        editBtn.style.backgroundColor = '#4CAF50';
        
        containers.forEach(container => {
            const value = container.querySelector('.info-value').textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'info-input';
            input.value = value;
            container.innerHTML = '';
            container.appendChild(input);
        });
    } else {
        // Chuyển sang chế độ xem và lưu dữ liệu
        editText.textContent = 'Chỉnh sửa';
        editBtn.style.backgroundColor = '#1a73e8';
        
        containers.forEach(container => {
            const input = container.querySelector('.info-input');
            const span = document.createElement('span');
            span.className = 'info-value';
            span.textContent = input.value;
            container.innerHTML = '';
            container.appendChild(span);
        });

        // Cập nhật dữ liệu
        updateCustomerData();
    }
}

// Hàm cập nhật dữ liệu khách hàng
function updateCustomerData() {
    const inputs = document.querySelectorAll('.info-input');
    const containers = ['name', 'phone', 'email', 'address', 'company', 'date'];
    
    inputs.forEach((input, index) => {
        customerData[containers[index]] = input.value;
    });

    // Có thể thêm code để gửi dữ liệu lên server tại đây
    console.log('Dữ liệu đã được cập nhật:', customerData);
}

// Hàm khởi tạo dữ liệu ban đầu
function initializeData() {
    const containers = document.querySelectorAll('.info-content');
    const values = Object.values(customerData);
    
    containers.forEach((container, index) => {
        const span = container.querySelector('.info-value');
        span.textContent = values[index];
    });
}

// Khởi tạo dữ liệu khi trang được load
document.addEventListener('DOMContentLoaded', initializeData);