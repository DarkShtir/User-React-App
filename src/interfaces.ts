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
	avatarUrl?: string;
	quotes?: string;
}

export interface UserLogin {
	login: string;
	password: string;
}

export interface Pet {
	_id?: string;
	name: string;
	species: string;
	ownerId?: string;
	__v?: number;
}
