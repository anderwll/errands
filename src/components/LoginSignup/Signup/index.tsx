import React from 'react';

import OtherRegistrationsForms from '../OtherRegistrationsForms';
import FormSignup from './FormSignup';
import HaveAccount from './HaveAccount';

function Signup() {
    return (
        <>
            <FormSignup />
            <OtherRegistrationsForms />
            <HaveAccount />
        </>
    );
}

export default Signup;
