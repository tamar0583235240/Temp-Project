import {
<<<<<<< HEAD
  useGetUsersQueryAdmin,
  useDeleteUserMutationAdmin,
  useUpdateUserMutationAdmin,
  useCreateUserMutationAdmin,
} from '../../../shared/api/adminApi';
export const useUsers = () => {
  const { data: users, isLoading } = useGetUsersQueryAdmin();
  const [deleteUser] = useDeleteUserMutationAdmin();
  const [updateUser] = useUpdateUserMutationAdmin();
  const [createUser] = useCreateUserMutationAdmin();
=======
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '../services/adminApi';

export const useUsers = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

>>>>>>> 2d36eb4 (עדכון קבצים בפרויקט Group3)
  return {
    users,
    isLoading,
    deleteUser,
    updateUser,
<<<<<<< HEAD
    createUser,
  };
};
=======
  };
};
>>>>>>> 2d36eb4 (עדכון קבצים בפרויקט Group3)
