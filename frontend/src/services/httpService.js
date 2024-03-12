import axios from "axios";

// Create an instance of axios with default configurations
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000, // Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Define a custom type for the response data
// This is not needed in JavaScript

// Define a custom error type
// This is not needed in JavaScript

// Define your HTTP service methods
export const httpService = {
  get: async function (url, data = undefined, config) {
    try {
      const response = await http.get(url, addAuthorizationHeader(config));
      return handleResponse(response);
    } catch (error) {
      throw handleRequestError(error);
    }
  },

  post: async function (url, data, config) {
    try {
      const response = await http.post(
        url,
        data,
        addAuthorizationHeader(config)
      );
      return handleResponse(response);
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  put: async function (url, data, config) {
    try {
      const response = await http.put(
        url,
        data,
        addAuthorizationHeader(config)
      );
      return handleResponse(response);
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  delete: async function (url, config) {
    try {
      const response = await http.delete(url, addAuthorizationHeader(config));
      return handleResponse(response);
    } catch (error) {
      throw handleRequestError(error);
    }
  },
};

// Add the authorization header to the request config if a token is provided
const addAuthorizationHeader = function (config) {
  const token = localStorage.getItem("token");

  if (token) {
    return {
      ...config,
      headers: {
        ...config?.headers,
        Authorization: `${token}`,
      },
    };
  }

  return config || {};
};

// Handle the response, including checking for a 401 status and redirecting to the login page
const handleResponse = function (response) {
  if (response.status === 401) {
    redirectToLoginPage();
  }

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

// Redirect to the login page
const redirectToLoginPage = function () {
  localStorage.clear();
  window.location.pathname = "/";
};

// Handle Axios errors and format them into a consistent structure
const handleRequestError = function (error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      redirectToLoginPage();
    }
    return {
      response: error.response?.data,
    };
  } else {
    throw error;
  }
};
