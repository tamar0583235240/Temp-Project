export interface User {
	id: string
	first_name: string
	last_name: string
	email: string
	phone?: string
	role: 'student' | 'manager'
	created_at: Date
	is_active: boolean
	password:string
    
}