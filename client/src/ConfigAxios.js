import axios from 'axios';

const AxiosConfig = () => {
    // Indicate to the API that all requests for this app are AJAX
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain
    // Use your API's port number in place of 8090.
    axios.defaults.baseURL = `http://www.cs.sonoma.edu:8158/api/v1`;


    // Allow the browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;

    return axios;
};

export default AxiosConfig();
