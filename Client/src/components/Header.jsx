import { Avatar, Dropdown, TextInput, Button, Navbar } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { toggleTheme } from '../redux/theme/themeSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function Header() {
    const path = useLocation().pathname;
    const { currentUser } = useSelector(state => state.user);
    const { theme } = useSelector((state => state.theme));
    const dispatch = useDispatch();

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
        <Navbar className='border-b-2'>
            <Link
                to='/'
                className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
            >
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                    Piyush's
                </span>
                Blog
            </Link>
            <form >
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                />
            </form>
            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch />
            </Button>
            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => { dispatch(toggleTheme()) }}>
                    {theme === 'light' ? <FaSun /> : <FaMoon />}
                </Button>
                {currentUser ?
                    (
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar
                                    alt='user'
                                    img={currentUser.profilePicture}
                                    rounded
                                />
                            }
                        >
                            <Dropdown.Header>
                                <span className='block text-sm'>@:{currentUser.username}</span>
                                <span className='block text-sm font-medium truncate'>@:{currentUser.email}</span>
                            </Dropdown.Header>
                            <Link to='/dashboard?tab=profile'>
                                <Dropdown.Item>Profile</Dropdown.Item>
                            </Link>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
                        </Dropdown>
                    ) : (
                        <Link to='/sign-in'>
                            <Button gradientDuoTone='purpleToBlue' outline>
                                Sign In
                            </Button>
                        </Link>
                    )
                }
            </div>
            <div className='flex justify-center items-center p-3 space-x-8 text-center text-teal-500'>
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/projects'>Projects</Link>
            </div>

        </Navbar>
    );
}
