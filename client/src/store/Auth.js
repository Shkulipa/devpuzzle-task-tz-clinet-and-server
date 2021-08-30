import { makeAutoObservable } from 'mobx';

class Auth {
	constructor() {
		this._isAuth = false;
		this._user = null;
		this._accessToken = null;
		this._isLoading = false;
		makeAutoObservable(this);
	}

	setAuth(boolean) {
		this._isAuth = boolean;
	}

	setUser(user) {
		return (this._user = user);
	}

	setAccessToken(token) {
		return (this._accessToken = token);
	}

	setLoading(boolean) {
		return (this._isLoading = boolean);
	}

	get loading() {
		return this._isLoading;
	}

	get getUser() {
		return this._user;
	}

	get getAccessToken() {
		return this._accessToken;
	}

	get getAuth() {
		return this._isAuth;
	}
}

export default new Auth();
