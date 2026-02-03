/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { userServices } from '../../services/userService'
import toast from 'react-hot-toast'
import { FormHeader, FormSection } from '../../components/admin/FormComponents'
import { FaChevronLeft, FaChevronRight, FaQuestionCircle, FaSearch, FaTrash, FaUser, FaUserShield, FaEllipsisV } from 'react-icons/fa'
import Spinner from '../../components/common/Spinner'
import { MdVerified } from 'react-icons/md'

const AllUsers = () => {

  const { globalLoading, setGlobalLoading } = useAppContext()
  const [users, setUsers] = useState([])
  const [openMenu, setOpenMenu] = useState(null) // Track open menu

  // Filter & pagination
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, settotalPages] = useState(1)
  const limit = 10

  const fetchUsers = async () => {
    setGlobalLoading(true)
    try {
      const data = await userServices.getAllUsers({ search, page, limit })
      if (data.success) {
        setUsers(data.users)
        settotalPages(data.pagination.pages)
      }

    } catch (error) {
      toast.error(error.message)
    } finally {
      setGlobalLoading(false)
    }
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setPage(1)
      fetchUsers()
    }, 1000)

    return () => clearTimeout(timeOut)

  }, [search])

  useEffect(() => {
    fetchUsers()
  }, [page])

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return

    try {
      const response = await userServices.deleteUser(id)
      if (response.success) {
        toast.success(response.message)
        fetchUsers()
        setOpenMenu(null)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  // Helper: User Avatar
  const UserAvatar = ({ user }) => (
    <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg overflow-hidden border-2 border-gray-600 flex-shrink-0'>
      {user.image ? (
        <img src={user.image} alt={user.name} className='w-full h-full object-cover' />
      ) : (
        user.name.charAt(0).toUpperCase()
      )}
    </div>
  )

  // Helper: Role Badge
  const RoleBadge = ({ role }) => (
    role === 'admin' ? (
      <span className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20'>
        <FaUserShield size={14} /> Admin
      </span>
    ) : (
      <span className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-600/30 text-gray-400 border border-gray-600'>
        <FaUser size={14} /> User
      </span>
    )
  )

  // Helper: Status Badge
  const StatusBadge = ({ isVerified }) => (
    isVerified ? (
      <span className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20'>
        <MdVerified size={14} /> Verified
      </span>
    ) : (
      <span className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600/30 text-red-400 border border-red-600'>
        <FaQuestionCircle size={14} /> Not Verified
      </span>
    )
  )

  return (
    <div className='max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8'>
      <FormHeader title='All Users' subtitle='Manage your customer base' />

      <div className='flex flex-col gap-4'>

        {/* ==== SEARCH BAR ==== */}
        <FormSection>
          <div className='relative w-full md:w-96'>
            <input
              type="text"
              placeholder='Search by name or email'
              className='w-full bg-gray-700 text-white pl-10 pr-4 py-2.5 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' />
          </div>
        </FormSection>

        {/* === USERS TABLE/CARDS ==== */}
        <FormSection>
          {globalLoading ? (
            <div className='flex-1 flex flex-col justify-center items-center gap-2 py-12'>
              <Spinner />
              <p className='text-gray-400 text-sm animate-pulse'>Loading Users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className='flex-1 flex flex-col justify-center items-center text-gray-400 py-12'>
              <div className='text-5xl mb-4'><FaUser /></div>
              <p>No users found.</p>
            </div>
          ) : (
            <>
              {/* ===== DESKTOP TABLE VIEW ===== */}
              <div className='hidden lg:block overflow-x-auto w-full'>
                <table className='w-full text-left border-collapse'>
                  <thead className='bg-gray-750 text-gray-300 uppercase text-xs tracking-wider border-b border-gray-700'>
                    <tr>
                      <th className='p-4 font-semibold'>User</th>
                      <th className='p-4 font-semibold'>Email</th>
                      <th className='p-4 font-semibold text-center'>Role</th>
                      <th className='p-4 font-semibold text-center'>Status</th>
                      <th className='p-4 text-right font-semibold'>Actions</th>
                    </tr>
                  </thead>

                  <tbody className='text-sm text-gray-200 divide-y divide-gray-700'>
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className='hover:bg-gray-700/50 transition-colors duration-150'
                      >
                        <td className='p-4'>
                          <div className='flex items-center gap-3'>
                            <UserAvatar user={user} />
                            <div className='font-medium text-white'>{user.name}</div>
                          </div>
                        </td>

                        <td className='p-4 text-gray-400 font-mono text-xs md:text-sm'>
                          {user.email}
                        </td>

                        <td className='p-4 text-center'>
                          <RoleBadge role={user.role} />
                        </td>

                        <td className='p-4 text-center'>
                          <StatusBadge isVerified={user.isVerified} />
                        </td>

                        <td className='p-4 text-right'>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className='p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors'
                            title="Delete User"
                          >
                            <FaTrash size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ===== MOBILE/TABLET CARD VIEW ===== */}
              <div className='lg:hidden space-y-3'>
                {users.map((user) => (
                  <div
                    key={user._id}
                    className='bg-gradient-to-br from-gray-700/50 to-gray-800/50 border border-gray-600/50 rounded-xl p-4 hover:border-gray-500 hover:from-gray-700/60 hover:to-gray-800/60 transition-all duration-200 shadow-md'
                  >

                    {/* User Header */}
                    <div className='flex items-start justify-between gap-3 mb-4'>
                      <div className='flex items-center gap-3 flex-1 min-w-0'>
                        <UserAvatar user={user} />
                        <div className='flex-1 min-w-0'>
                          <div className='font-semibold text-white text-sm truncate'>{user.name}</div>
                          <div className='text-xs text-gray-400 font-mono truncate mt-0.5'>{user.email}</div>
                        </div>
                      </div>

                      {/* Menu Button */}
                      <div className='relative flex-shrink-0'>
                        <button
                          onClick={() => setOpenMenu(openMenu === user._id ? null : user._id)}
                          className='p-2 hover:bg-gray-600/50 rounded-lg transition-colors text-gray-400 hover:text-white'
                        >
                          <FaEllipsisV size={16} />
                        </button>

                        {/* Dropdown Menu */}
                        {openMenu === user._id && (
                          <div className='absolute right-0 top-full mt-2 bg-gray-700 border border-gray-600 rounded-lg shadow-xl z-10 min-w-44 overflow-hidden'>
                            <button
                              onClick={() => {
                                handleDelete(user._id)
                                setOpenMenu(null)
                              }}
                              className='w-full text-left px-4 py-2.5 text-sm hover:bg-red-600/20 transition-colors text-red-400 hover:text-red-300 flex items-center gap-2 font-medium border-t border-gray-600'
                            >
                              <FaTrash size={14} />
                              Delete User
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className='h-px bg-gradient-to-r from-gray-600/20 to-transparent mb-4'></div>

                    {/* User Details Grid */}
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <span className='text-gray-500 text-xs font-semibold uppercase tracking-wider block'>Role</span>
                        <RoleBadge role={user.role} />
                      </div>
                      <div className='space-y-2'>
                        <span className='text-gray-500 text-xs font-semibold uppercase tracking-wider block'>Status</span>
                        <StatusBadge isVerified={user.isVerified} />
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* === PAGINATION === */}
              <div className='mt-6 p-4 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-800/50'>
                <span className='text-sm text-gray-400'>
                  Page <span className='text-white font-medium'>{page}</span> of <span className='text-white font-medium'>{totalPages}</span>
                </span>

                <div className='flex gap-2'>
                  <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className='px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 text-sm font-medium'
                  >
                    <FaChevronLeft size={12} /> Previous
                  </button>

                  <button
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className='px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 text-sm font-medium'
                  >
                    Next <FaChevronRight size={12} />
                  </button>
                </div>
              </div>

            </>
          )}

        </FormSection>
      </div>

    </div>
  )
}

export default AllUsers