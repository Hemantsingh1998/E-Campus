import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from './createDataContext'
import { Alert } from "react-native";
import { navigate } from "../../navigationnRef";    
import actions from '../api/actions'
// import messaging from '@react-native-firebase/messaging'
const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload}
        case 'reg_error':
            return { ...state, errorMessage: action.payload}
        case 'login':
             return { errorMessage: '', token: action.payload}

        case 'register':
            return { errorMessage:''}

        case 'logout':
            return { errorMessage: '', token: null}
            
        default: return state
            break;
    }
}

const tryLocalLogin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
        const asyncU = await AsyncStorage.getItem('user')
        let user = JSON.parse(asyncU)
        if (user.role === 2){
            console.log("admin")
            navigate('adminFlow')
        } else {
            console.log('NULL AUTH')
        } 
        if (user.role === 1) {
            console.log("teacher")
            navigate('teacherFlow')
        } else{
            console.log("TEACHER FLOW")
        } 
        if (user.role === 0){
            console.log('student')
            navigate('studentFlow')
        } else {
            console.log("STUDENT FLOW")
        }
    } else {
        navigate('authFlow')
        console.log("user not exist")
    }
}

const register = dispatch => ({ firstName, middleName, lastName, mobileNumber, email, password}) => {
    let deviceToken = 123456890
    // messaging().getToken().then(deviceToken => {
        actions.post('/api/register', {firstName, middleName, lastName, mobileNumber, email, deviceToken, password}).then(res => {
            console.log("Register Response: ", res.data)
            dispatch({ type: 'register'})
            // navigate('Login', {emailExist: email})
        }).catch(error => {
            return Alert.alert(
                "Registration Error",
                `${error.response.data.error}`,
                [
                    {
                    text: "OK"
                    }
                ]
            )
        })
}

const login = dispatch => ({email, password}) => {
    let deviceToken = 1234567890
    actions.post('/api/login', {email, password, deviceToken}).then(res => {
        console.log("Logged in response", res.data)
        AsyncStorage.setItem('token', res.data.token)
        let user = {
            id: res.data.user._id,
            firstName: res.data.user.firstName,
            middleName: res.data.user.middleName,
            lastName: res.data.user.lastName,
            role: res.data.user.role
        }

        AsyncStorage.setItem('user', JSON.stringify(user))
        dispatch({type: 'login', payload: res.data.token})
        if (res.data.user.role === 2){
            navigate('adminFlow')
        } else if (res.data.user.role === 1) {
            navigate('teacherFlow')
        } else if ( res.data.user.role === 0) {
            navigate('studentFlow')
        }
    }).catch(error => {
        console.log(error)
        return Alert.alert(
            "Login Error",
            `${error}`,
            [
                {
                text: "OK"
                }
            ]
        )
    })
}

const logout = dispatch =>  () => {
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('user')
    dispatch({type: 'logout'})
    navigate('authFlow')
}



export const {Provider, Context} = createDataContext (
    authReducer, {register, login, tryLocalLogin, logout}, {token: null, errorMessage: ''}
)

export const addCourseAd = ({courseName, duration, postedBy}) => {
    console.log(courseName, duration, postedBy)
    actions.post(`/api/add-course`, {courseName, duration, postedBy}).then(res => {
        // console.log(res.data)
        return res.data
    }).catch(err => {
        console.log(err)
        return err
    })
}

export const addTeacher = ({courseName, duration, postedBy}) => {
    console.log(courseName, duration, postedBy)
    // actions.post(`/api/add-course`, {courseName, duration, postedBy}).then(res => {
    //     // console.log(res.data)
    //     return res.data
    // }).catch(err => {
    //     console.log(err)
    //     return err
    // })
}