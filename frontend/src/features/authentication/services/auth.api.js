import axios from "axios"

export const register = async({username, email, password})=>{
    try{
        const response = await axios.post('http://localhost:3000/auth/register', {username,email,password},
            {withCredentials:true}
        )

        return response.data
    }
    catch(err){
        console.log(err)
    }
}

export const login = async({email, password})=>{
    try{
        const response = await axios.post('http://localhost:3000/auth/login', {email,password},
            {withCredentials:true}
        )

        return response.data
    }
    catch(err){
        console.log(err)
        throw err;
    }
}

export const logout = async ()=>{
    try{
        const response = await axios.get("http://localhost:3000/auth/logout" , {withCredentials:true})

        return response.data
    }
    catch(err){
        console.log(err)
    }
}

export const getMe = async ()=>{
    try{
        const response = await axios.get("http://localhost:3000/auth/get-me" , {withCredentials:true})

        return response.data
    }
    catch(err){
        console.log(err)
    }
     
}