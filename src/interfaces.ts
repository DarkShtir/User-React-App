export interface User {
	_id?: string | undefined;
	login: string;
	password: string;
	gender: string;
	firstName: string;
	lastName: string;
	nat: string;
	phone?: string;
	tokens?: [{ token: string }] | [];
}
