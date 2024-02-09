import {useEffect, useState} from "react";

interface StateI {
    id: number
    token: string
}

export const useCheckAuth = () => {
    const storedUser = localStorage.getItem('currentUser');
    const userInfo = storedUser ? JSON.parse(storedUser) : { user: "no token" };
    const [user, setUser] = useState<StateI | { user: string }>({user: 'no token'});

    useEffect(() => {
        const user = storedUser ? JSON.parse(storedUser) : { user: "no token" };
        setUser(user);
    }, [storedUser]);

    return !!userInfo.token;
}

