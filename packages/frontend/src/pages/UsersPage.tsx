import { useGetUsersQuery } from '../shared/api/userApi';

export const UsersPage = () => {
    const { data: users, isLoading, error } = useGetUsersQuery();

    console.log("error:", error);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <p>Error loading users</p>;

    return (
        <div>
            <h2>All Users</h2>
            <ul>
                {users?.map((user) => (
                    <li key={user.id}>
                        {user.firstName} {user.lastName} - {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};
