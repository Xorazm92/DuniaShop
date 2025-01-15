const API_BASE_URL = 'http://localhost:5050/api';

// Auth functions
async function register(username, email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
    } catch (error) {
        console.error('Ro\'yxatdan o\'tishda xatolik:', error);
        throw error;
    }
}

async function login(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
    } catch (error) {
        console.error('Kirishda xatolik:', error);
        throw error;
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login.html';
}

function getAuthToken() {
    return localStorage.getItem('token');
}

function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Mahsulotlarni olish
async function getProducts() {
    try {
        const token = getAuthToken();
        const headers = {
            'Content-Type': 'application/json',
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(`${API_BASE_URL}/products`, {
            headers
        });
        
        if (!response.ok) {
            throw new Error('Mahsulotlarni yuklashda xatolik yuz berdi');
        }
        
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Xatolik:', error);
        throw error;
    }
}

// Bitta mahsulotni ID bo'yicha olish
async function getProductById(id) {
    try {
        const token = getAuthToken();
        const headers = {
            'Content-Type': 'application/json',
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            headers
        });
        
        if (!response.ok) {
            throw new Error('Mahsulotni yuklashda xatolik yuz berdi');
        }
        
        const product = await response.json();
        return product;
    } catch (error) {
        console.error('Xatolik:', error);
        throw error;
    }
}

// Yangi mahsulot qo'shish
async function addProduct(productData) {
    try {
        const token = getAuthToken();
        const headers = {
            'Content-Type': 'application/json',
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers,
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            throw new Error('Mahsulot qo\'shishda xatolik yuz berdi');
        }
        
        const savedProduct = await response.json();
        return savedProduct;
    } catch (error) {
        console.error('Xatolik:', error);
        throw error;
    }
}

// Export all functions
window.auth = {
    register,
    login,
    logout,
    getAuthToken,
    getCurrentUser
};

window.api = {
    getProducts,
    getProductById,
    addProduct
};
