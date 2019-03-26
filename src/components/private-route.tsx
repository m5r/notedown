import React, { FunctionComponent } from 'react';
import { Redirect } from 'react-router-dom';

const PrivateRoute: FunctionComponent = () => {
	return <Redirect to='/' />;
};

export default PrivateRoute;
