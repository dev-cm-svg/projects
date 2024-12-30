import React, { createContext, useContext, useState } from 'react';

const MottoContext = createContext();

export const MottoProvider = ({ children }) => {
    const [mottos, setMottos] = useState([]);

    return (
        <MottoContext.Provider value={{ mottos, setMottos }}>
            {children}
        </MottoContext.Provider>
    );
};

export const useMottos = () => {
    return useContext(MottoContext);
};
