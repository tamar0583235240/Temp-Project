import { useGetUsersQuery } from '../shared/api/userApi';

export const UsersPage = () => {
    const { data: users, isLoading, error } = useGetUsersQuery();

    console.log("error:", error);
    console.log("users:", users);
console.log(users?.[0]?.first_name);
// console.log(users?.[0]?.lastName);
console.log(users?.[0]?.role);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <p>Error loading users</p>;
    console.log("users:", users);

    return (
        <div>
            <h2>All Users</h2>
            <ul>
                {users?.map((user) => (
                    <li key={user.id}>
                        {user.first_name} {user.last_name} - {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};
