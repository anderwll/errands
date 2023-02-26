import React from 'react';

import OtherRegistrationsForms from '../OtherRegistrationsForms';
import FormLogin from './FormLogin';
import MyCadastre from './MyCadastre';

function Login() {
    return (
        <>
            <FormLogin />
            <OtherRegistrationsForms />
            <MyCadastre />
        </>
    );
}

export default Login;
