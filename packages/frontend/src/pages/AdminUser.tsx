import AddUserForm from '../features/admin/components/AddNewUser';
import UserList from '../features/admin/UserList';
import {UploadUsers} from '../features/admin/components/UploadUsers'
const AdminUser= () => {
  return (
    <div>
     <AddUserForm/>
     <UserList/>
     <UploadUsers/>
    </div>
  )
}
export default AdminUser






