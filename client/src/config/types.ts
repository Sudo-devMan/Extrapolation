
export interface User {
    username: string,
    email: string,
    bio?: string,
    createdAt?: string,
    updatedAt?: string,
    userType?: string,
    profilePicture?: string,
    id?: number,
    password?: string
}

export interface Document {
    id: number,
    url: string
}

export interface Upload {
    title: string,
    grade: string,
    createdAt?: string,
    updatedAt?: string,
    id?: number,
    math: string,
    documents: Document[],
    user?: User
}
