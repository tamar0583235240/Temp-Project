import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
    useCreateUserMutation, // ✅ ייבוא של ההוק החדש
} from '../services/adminApi';

export const useUsers = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [createUser] = useCreateUserMutation(); // ✅ שימוש בהוק החדש


  return {
    users,
    isLoading,
    deleteUser,
    updateUser,
    createUser,
  };
};