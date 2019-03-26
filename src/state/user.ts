import { Action, action } from 'easy-peasy';
import Firebase from 'firebase';

export type UserModel = {
	user: Firebase.User | null;
	setUser: Action<UserModel, Firebase.User | null>
}

const user: UserModel = {
	user: null,
	setUser: action((state, payload) => {
		state.user = payload;
	}),
};

export default user;
