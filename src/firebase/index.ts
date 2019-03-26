import app from 'firebase/app';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyDoLLKnWr1jOJpA6PrQ81ooZGXVq4eZlE0',
	authDomain: 'notedown-9432c.firebaseapp.com',
	databaseURL: 'https://notedown-9432c.firebaseio.com',
	projectId: 'notedown-9432c',
	storageBucket: 'notedown-9432c.appspot.com',
	messagingSenderId: '353275719484',
};

export class Firebase {
	auth: app.auth.Auth;

	constructor() {
		app.initializeApp(config);

		this.auth = app.auth();

		(window as any).fbase = this;
	}

	async createUser(email: string, password: string) {
		return this.auth.createUserWithEmailAndPassword(email, password);
	}

	async logIn(email: string, password: string) {
		return this.auth.signInWithEmailAndPassword(email, password);
	}

	async logOut() {
		return this.auth.signOut();
	}

	async resetPassword(email: string) {
		return this.auth.sendPasswordResetEmail(email);
	}

	async updatePassword(password: string) {
		if (!this.auth.currentUser) {
			return;
		}

		return this.auth.currentUser.updatePassword(password);
	}
}

export default Firebase;
