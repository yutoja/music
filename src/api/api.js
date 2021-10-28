import axios from 'axios'
import https from './https'
axios.defaults.baseURL = https
axios.defaults.method = 'GET'

export default axios
