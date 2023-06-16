import { getAccordionDetailsUtilityClass } from '@mui/material'
import {atom} from 'recoil'
import {getData, getUsers, getSavings, getCurrentUser} from '../utils/Serivces'


export const atomisIncomeVisible = atom({
    key: 'atomisIncomeVisible',
    default:false
})
export const atomisExpenseVisible = atom({
    key: 'atomisExpenseVisible',
    default:false
})

export const atomUsers = atom({
    key: 'atomUsers',
    default: getUsers(),
})
export const atomIsLoggedIn = atom({
    key: 'atomIsLoggedIn',
    default : false
})

export const atomData = atom({
    key: 'atomData',
    default: getData()
})
export const atomDate = atom({
    key: 'atomDate',
    default: new Date()
})
export const atomSavings = atom({
    key: 'atomSavings',
    default:getSavings()
})
export const atomCurrentUser = atom({
    key: 'atomCurrentUser',
    default:getCurrentUser()
    
})
export const atomIsSideBarVisible = atom({
    key: 'atomIsSideBarVisible',
    default: false,
})

export const monthArray = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
]