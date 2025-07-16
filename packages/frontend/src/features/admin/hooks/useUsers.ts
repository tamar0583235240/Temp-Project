import {
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
//   useGetUsersQuery,
//   useDeleteUserMutation,
//   useUpdateUserMutation,
//     useCreateUserMutation, // ✅ ייבוא של ההוק החדש
// } from '../services/adminApi';

// export const useUsers = () => {
//   const { data: users, isLoading } = useGetUsersQuery();
//   const [deleteUser] = useDeleteUserMutation();
//   const [updateUser] = useUpdateUserMutation();
//   const [createUser] = useCreateUserMutation(); // ✅ שימוש בהוק החדש


// >>>>>>> 2d36eb4 (עדכון קבצים בפרויקט Group3)
  return {
    users,
    isLoading,
    deleteUser,
    updateUser,
// <<<<<<< HEAD
// <<<<<<< HEAD
// >>>>>>> f54d24c (הוספה מחיקה ועדכון)
    createUser,
  };
};
  // };
// };
// >>>>>>> 2d36eb4 (עדכון קבצים בפרויקט Group3)
