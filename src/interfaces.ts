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

export interface Album {
	_id?: string;
	name: string;
	ownerId: string;
	description?: string;
	privateAlbum?: boolean;
	previewUrl?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface Photo {
	_id?: string;
	name?: string;
	description?: string;
	ownerId: string;
	albumId: string;
	width: number;
	height: number;
	createdAt?: string;
	updatedAt?: string;
	src: string;
	totalCount?: [number];
}

export interface PageInfo {
	elemPerPage: number;
	page: number;
	firstPage: boolean;
	lastPage: boolean;
	countOfPhotos: number;
	setPage: (page: number) => void;
	filter: boolean;
	setFilter: (setFilter: boolean) => void;
}
