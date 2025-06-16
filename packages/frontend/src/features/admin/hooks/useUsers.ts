import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '../services/adminApi';

export const useUsers = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  return {
    users,
    isLoading,
    deleteUser,
    updateUser,
  };
};
