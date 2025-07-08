import { useNavigate } from 'react-router-dom'


const HomePage = () => {
  const navigate = useNavigate();
  const user = { role: 'student' }
  const isManager = user?.role === 'manager'
  return (
    <div dir="rtl">
      <div>
        <div onClick={() => { navigate('/simulation') }}>
          <button>start simulation</button>
        </div>
        <div onClick={() => { navigate('/dashboard') }}>
          <button>dashboard</button>
        </div>
        <div onClick={() => navigate('/admin/users')}>
          <button>users</button>
        </div>
        <div onClick={() => { navigate('/resources') }}>
          <button>resources</button>
        </div>
        <div onClick={() => { navigate('/recordings') }}>
          <button>recordings</button>
        </div>
        <div onClick={() => { navigate('/shared') }}>
          <button>shared</button>
        </div>
      </div>
      {isManager && (
        <div>
          <h2>admin</h2>
          <div onClick={() => { navigate('/admin/questions') }}>
            <button>questions</button>
          </div>
          <div onClick={() => { navigate('/admin/resources') }}>
            <button>resources</button>
          </div>
          <div onClick={() => { navigate('/admin/users') }}>
            <button>users</button>
          </div>
        </div>
      )}
    </div>
  )
}
export default HomePage