import { User } from "../interfaces/User";

let users: User[] = [];

export const supabase = {
    from: (table: string) => {
        console.log(`supabase.from called with table: ${table}`);

        console.log("🟡 Supabase URL:", process.env.SUPABASE_URL);
        console.log("🟢 Supabase SERVICE_ROLE_KEY:", process.env.SERVICE_ROLE_KEY?.slice(0, 10), '...'); // partially logged

        if (table === 'users') {
            let query = users; // the full user list

            return {
                select: (columns?: string) => {
                    console.log(`supabase.from(users).select(${columns}) called`);
                    // Return an object that supports eq and single for chaining
                    return {
                        eq: (field: keyof User, value: any) => {
                            console.log(`supabase.from(users).select().eq(${field}, ${value}) called`);
                            query = query.filter(user => user[field] === value);

                            return {
                                single: async () => {
                                    console.log(`supabase.from(users).select().eq().single() called`);
                                    const user = query.length > 0 ? query[0] : null;
                                    return { data: user, error: null };
                                }
                            };
                        },
                        // If no eq call, single just returns all users
                        single: async () => {
                            console.log(`supabase.from(users).select().single() called`);
                            const user = query.length > 0 ? query[0] : null;
                            return { data: user, error: null };
                        }
                    };
                },

                insert: (newUsers: User[]) => {
                    console.log('supabase.from(users).insert() called with:', newUsers);
                    users.push(...newUsers);

                    return {
                        select: () => ({
                            single: async () => {
                                // Return the last inserted user as the single user
                                const lastUser = users[users.length - 1];
                                return { data: lastUser, error: null };
                            },
                        }),
                    };
                },

                update: (updateFields: Partial<User>) => ({
                    eq: (field: keyof User, value: any) => {
                        console.log(`supabase.from(users).update().eq(${field}, ${value}) called with updateFields:`, updateFields);
                        users = users.map(user =>
                            user[field] === value ? { ...user, ...updateFields } : user
                        );
                        return { data: users, error: null };
                    }
                }),
            };
        }

        throw new Error(`Table ${table} not implemented in fakeSupabase`);
    },
};
