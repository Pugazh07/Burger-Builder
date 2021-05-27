import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-107a8-default-rtdb.firebaseio.com/'
})

export default instance;