import React from 'react';
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiUser, HiDocumentText, HiOutlineUserGroup, HiAnnotation, HiChartPie, HiDocumentAdd} from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';


export default function DashSidebar() {
  const { currentUser } = useSelector(state => state.user);
  const location = useLocation();
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location]);


  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: "POST"
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess(data));
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor='light' 
              as='div'>
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item active={tab === 'dash' || !tab} icon={HiChartPie} as='div'>
                DashBoard
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=create-post'>
              <Sidebar.Item active={tab === 'create-post' || !tab} icon={HiDocumentAdd} as='div'>
                Create Post
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as='div'>
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=users'>
              <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup} as='div'>
                Users
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=comments'>
              <Sidebar.Item active={tab === 'comments'} icon={HiAnnotation} as='div'>
                Comments
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
            Sign-Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
