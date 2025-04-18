import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({children}){
    const [authMetadata, setAuthMetadata] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    return (
    <AuthContext.Provider value={{authMetadata, setAuthMetadata, isAuthenticated, setIsAuthenticated}}>
        {children}
    </AuthContext.Provider>
)
}

function authContext(){
const ctx=  useContext(AuthContext)
return ctx;
}
export {authContext, AuthProvider}