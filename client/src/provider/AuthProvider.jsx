import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import axios from 'axios';
import { app } from '../Firebase/firebase.config';

export const AuthContext = createContext(null);
const auth = getAuth(app);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // user create here
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // sign in function here
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // update profile here
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    };

    // logout function
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };
    // save user by role function
    const saveUser = async (user) => {
        const currentUser = {
            email: user?.email,
            name: user?.displayName,
            role: 'user',
            status: 'Verified',
        };
        try {
            const { data } = await axios.put(
                `http://localhost:5000//users`,
                currentUser
            );
            return data;
        } catch (error) {
            console.error("Error saving user:", error);
            throw error;
        }
    };

    // userEffect API here
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(true); // Start loading

            if (currentUser) {
                try {
                    // const tokenData = await getToken(currentUser.email);
                    // const userData = await saveUser(currentUser);

                    const userInfo = { email: currentUser?.email };
                    console.log(userInfo)
                    // const res = await axios.post('/jwt', userInfo);

                    // if (res.data.token) {
                    //     localStorage.setItem('access-token', res.data.token);
                    //     setLoading(false);
                    // }

                } catch (error) {
                    console.error("Error during auth state change:", error);
                } finally {
                    setLoading(false); // End loading
                }
            } else {
                localStorage.removeItem('access-token');
                setLoading(false); // End loading
            }
        });

        return () => unsubscribe();
    }, []);

    // Due amount updated
    const updateSelectedCustomerDue = (newTotalDue) => {
        setSelectedCustomer((prevCustomer) => {
            const updatedCustomer = { ...prevCustomer, totalDue: newTotalDue };
            return updatedCustomer;
        });
    };

    // here have some স্টেট 
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [productsDetails, setProductsDetails] = useState([])
    const [subtotalAmount, setSubtotalAmount] = useState(null)
    const [invoiceId, setInvoiceId] = useState('')


    // console.log(selectedCustomer);



    const authInfo = {
        user,
        loading,
        selectedCustomer,
        productsDetails,
        subtotalAmount,
        setSubtotalAmount,
        setProductsDetails,
        setSelectedCustomer,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        saveUser,
        invoiceId,
        setInvoiceId,
        updateSelectedCustomerDue,
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;