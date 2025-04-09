const API_BASE_URL = 'http://localhost:5000/api';

export const createPaymentOrder = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to create order');
    return await response.json();
  } catch (error) {
    console.error('Error creating payment order:', error);
    throw error;
  }
};

export const purchaseTicket = async (userId, paymentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, paymentId }),
    });
    if (!response.ok) throw new Error('Failed to purchase ticket');
    return await response.json();
  } catch (error) {
    console.error('Error purchasing ticket:', error);
    throw error;
  }
};

export const getUserTickets = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tickets/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch tickets');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user tickets:', error);
    throw error;
  }
};

export const generateWinningNumbers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/winning-numbers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to generate winning numbers');
    return await response.json();
  } catch (error) {
    console.error('Error generating winning numbers:', error);
    throw error;
  }
};