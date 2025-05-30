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

// Helper function to handle 401 errors
const handleUnauthorized = async () => {
    // Try to refresh the token
    try {
        await login(['READ', 'WRITE']);
        return true;
    } catch (err) {
        clearToken();
        return false;
    }
};

// Wrapper for fetch that handles 401 errors
const fetchWithAuth = async (url, options = {}) => {
    const response = await fetch(url, {
        ...options,
        headers: headers(),
    });

    if (response.status === 401) {
        const refreshed = await handleUnauthorized();
        if (refreshed) {
            // Retry the request with the new token
            return fetch(url, {
                ...options,
                headers: headers(),
            });
        }
    }

    return response;
};

export const getCarParts = async (skip = 0, limit = 10, category = null) => {
    const url = new URL(`${API_URL}/car-parts/`);
    url.searchParams.append('skip', skip);
    url.searchParams.append('limit', limit);
    if (category) url.searchParams.append('category', category);

    const response = await fetchWithAuth(url);
    if (!response.ok) throw new Error('Failed to fetch car parts');
    return response.json();
};

export const createCarPart = async (carPart) => {
    const response = await fetchWithAuth(`${API_URL}/car-parts/`, {
        method: 'POST',
        body: JSON.stringify(carPart),
    });
    if (!response.ok) throw new Error('Failed to create car part');
    return response.json();
};

export const updateCarPart = async (id, carPart) => {
    const response = await fetchWithAuth(`${API_URL}/car-parts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(carPart),
    });
    if (!response.ok) throw new Error('Failed to update car part');
    return response.json();
};

export const deleteCarPart = async (id) => {
    const response = await fetchWithAuth(`${API_URL}/car-parts/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete car part');
    return null;
};

export const likeCarPart = async (id) => {
    const response = await fetchWithAuth(`${API_URL}/car-parts/${id}/like`, {
        method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to like car part');
    return response.json();
}; 