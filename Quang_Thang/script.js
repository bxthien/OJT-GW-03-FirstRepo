// Constants
const API_URL = 'https://fakestoreapi.com/users/1';

// Global state
let isEditing = false;

// Toggle edit mode
function toggleEdit() {
    isEditing = !isEditing;
    const inputs = document.querySelectorAll('.info-input');
    const editBtn = document.querySelector('.edit-btn');
    const saveBtn = document.querySelector('.save-btn');

    // Enable/disable all input fields
    inputs.forEach(input => {
        input.disabled = !isEditing;
    });

    // Toggle button visibility
    if (isEditing) {
        editBtn.style.display = 'none';
        saveBtn.style.display = 'flex';
    } else {
        editBtn.style.display = 'flex';
        saveBtn.style.display = 'none';
    }
}

// Save changes to API
async function saveChanges() {
    try {
        // Get form data and format it
        const fullName = document.getElementById('fullname').value.split(' ');
        const lastName = fullName.pop(); // Get last name
        const firstName = fullName.join(' '); // Get first name(s)

        // Prepare data according to API structure
        const formData = {
            email: document.getElementById('email').value,
            username: document.getElementById('company').value,
            phone: document.getElementById('phone').value,
            name: {
                firstname: firstName,
                lastname: lastName
            },
            address: {
                street: document.getElementById('address').value.split(',')[0],
                city: document.getElementById('address').value.split(',')[1]?.trim() || '',
                number: 0,
                zipcode: '00000',
                geolocation: {
                    lat: '0',
                    long: '0'
                }
            },
            password: 'password123', // Required by API
            id: 1
        };

        // Send PUT request to API
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedData = await response.json();
        console.log('Dữ liệu đã được cập nhật:', updatedData);

        // Show success message
        showMessage('Đã lưu thành công!', 'success');

        // Exit edit mode
        toggleEdit();

    } catch (error) {
        console.error('Lỗi khi cập nhật:', error);
        showMessage('Có lỗi xảy ra khi lưu dữ liệu!', 'error');
    }
}

// Show notification message
function showMessage(message, type = 'success') {
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = message;
    successMessage.style.backgroundColor = type === 'success' ? '#34A853' : '#DC3545';
    successMessage.style.display = 'block';

    // Hide message after 3 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

// Validate form data
function validateForm() {
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const fullname = document.getElementById('fullname').value;

    if (!email || !phone || !fullname) {
        showMessage('Vui lòng điền đầy đủ thông tin!', 'error');
        return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Email không hợp lệ!', 'error');
        return false;
    }

    // Phone number validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        showMessage('Số điện thoại không hợp lệ!', 'error');
        return false;
    }

    return true;
}

// Fetch customer data from API
async function fetchCustomerData() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Dữ liệu khách hàng:', data);
        
        // Update form fields with API data
        document.getElementById('fullname').value = `${data.name.firstname} ${data.name.lastname}`;
        document.getElementById('phone').value = data.phone;
        document.getElementById('email').value = data.email;
        document.getElementById('address').value = `${data.address.street}, ${data.address.city}`;
        document.getElementById('company').value = data.username;
        document.getElementById('date').value = '2023-01-01'; // Default date since API doesn't provide it
        
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
        showMessage('Không thể tải dữ liệu khách hàng!', 'error');
    }
}

// Form field change handlers
function handleInputChange(event) {
    const input = event.target;
    
    // Remove error styling if exists
    input.classList.remove('error');
    
    // Add basic validation feedback
    if (input.id === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            input.classList.add('error');
        }
    } else if (input.id === 'phone') {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(input.value)) {
            input.classList.add('error');
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load initial data
    fetchCustomerData();
    
    // Add input event listeners
    const inputs = document.querySelectorAll('.info-input');
    inputs.forEach(input => {
        input.addEventListener('input', handleInputChange);
    });
});