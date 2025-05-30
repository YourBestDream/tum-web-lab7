const API_URL = 'http://localhost:8000/api/v1';

// Token management
let token = localStorage.getItem('token');

export const setToken = (newToken) => {
    token = newToken;
    localStorage.setItem('token', newToken);
};

export const getToken = () => token;

export const clearToken = () => {
    token = null;
    localStorage.removeItem('token');
};

// API calls
const headers = () => ({
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
});

export const login = async (permissions) => {
    const response = await fetch(`${API_URL}/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ permissions }),
    });
    if (!response.ok) throw new Error('Login failed');
    const data = await response.json();
    setToken(data.access_token);
    return data;
};

export const getCarParts = async (skip = 0, limit = 10, category = null) => {
    const url = new URL(`${API_URL}/car-parts/`);
    url.searchParams.append('skip', skip);
    url.searchParams.append('limit', limit);
    if (category) url.searchParams.append('category', category);

    const response = await fetch(url, {
        headers: headers(),
    });
    if (!response.ok) throw new Error('Failed to fetch car parts');
    return response.json();
};

export const createCarPart = async (carPart) => {
    const response = await fetch(`${API_URL}/car-parts/`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(carPart),
    });
    if (!response.ok) throw new Error('Failed to create car part');
    return response.json();
};

export const updateCarPart = async (id, carPart) => {
    const response = await fetch(`${API_URL}/car-parts/${id}`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(carPart),
    });
    if (!response.ok) throw new Error('Failed to update car part');
    return response.json();
};

export const deleteCarPart = async (id) => {
    const response = await fetch(`${API_URL}/car-parts/${id}`, {
        method: 'DELETE',
        headers: headers(),
    });
    if (!response.ok) throw new Error('Failed to delete car part');
    return null;
};

export const likeCarPart = async (id) => {
    const response = await fetch(`${API_URL}/car-parts/${id}/like`, {
        method: 'POST',
        headers: headers(),
    });
    if (!response.ok) throw new Error('Failed to like car part');
    return response.json();
}; 