import { useSelector } from 'react-redux';
import {useRef, useState, useEffect} from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Profile(){
  const fileRef=useRef(null)
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file,setFile]=useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      //const token = localStorage.getItem('access_token'); 
      //const token = localStorage.getItem('token'); // or retrieve it from cookies
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           //'Authorization': `Bearer ${token}`, // Add token here
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      // Check for 200 status and handle errors more precisely
    // if (!res.ok) {
    //   console.error(`Update failed: ${res.status} - ${res.statusText}`);
    //   dispatch(updateUserFailure(data.message || 'Failed to update user'));
    //   return;
    // }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('http://localhost:8070/api/auth/signout');
      

      // const res = await fetch(`/api/user/delete/${currentUser._id}`, {
      //   method: 'DELETE',

      // });
      // Check if the response is OK (status 200-299)
      // if (!res.ok) {
      //   const errorText = await res.text();
      //   throw new Error(`Error: ${res.status} ${res.statusText} - ${errorText}`);
      // }
  
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message)); 
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message)); 
      console.error('Sign out error:', error);
    }
  };
  

  // const handleSignOut = async () => {
  //   try {
  //     dispatch(signOutUserStart());
  //     const res = await fetch('http://localhost:8070/api/auth/signout');
  //     const data = await res.json();
  //     if (data.success === false) {
  //       dispatch(deleteUserFailure(data.message));
  //       return;
  //     }
  //     dispatch(deleteUserSuccess(data));
  //   } catch (error) {
  //     dispatch(deleteUserFailure(error.message));
  //   }
  // };

  // Debugging: Log currentUser and formData to ensure they are set correctly
  // useEffect(() => {
  //   console.log('Current User:', currentUser);
  //   console.log('Form Data:', formData);
  // }, [currentUser, formData]);


    return(
        <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

          <input onChange={(e)=>setFile(e.target.files[0])}
          type="file" 
          ref={fileRef} hidden accept='image/*'/>

          <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
          />

          <p className='text-sm self-center'>
            {fileUploadError ? (
              <span className='text-red-700'>
                Error Image upload (image must be less than 2 mb)
              </span>
              ) : filePerc > 0 && filePerc < 100 ? (
              <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
              <span className='text-green-700'>Image successfully uploaded!</span>
              ) : (
              ''
              )}
              </p>

          <input
            type='text'
            placeholder='username'
            defaultValue={currentUser.username}
            id='username'
            className='border p-3 rounded-lg'
            onChange={handleChange}
          />
          <input
            type='email'
            placeholder='email'
            id='email'
            defaultValue={currentUser.email}
            className='border p-3 rounded-lg'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='password'
            onChange={handleChange}
            id='password'
            className='border p-3 rounded-lg'
          />
           <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>

        </form>
        <div className='flex justify-between mt-5'>
            <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>

            <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Logout</span>
        </div>

        <p className='text-red-700 mt-5'>{error ? error :''}</p>
        <p className='text-green-700 mt-5'>{updateSuccess ? 'User is updated successfully!' :''}</p>
        </div>
    )
}









// import { useEffect, useState, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext'; // Ensure you use your auth context to handle login state

// function UserProfile() {
//   const [user, setUser] = useState(null);  // State to store user data
//   const [error, setError] = useState('');  // State to handle errors
//   const { user: contextUser, dispatch } = useContext(AuthContext);  // Use useContext to get the user and dispatch from AuthContext

//   // Fetch user data after login
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       if (contextUser && contextUser.email) {
//         try {
//           const response = await fetch(`http://localhost:8070/api/user/profile/${contextUser.email}`, {
//             headers: {
//               Authorization: `Bearer ${contextUser.token}`, // Send the token in the Authorization header
//             },
//           });

//           const data = await response.json();

//           if (data.error) {
//             setError(data.error);
//           } else {
//             setUser(data);  // Set user data to state
//           }
//         } catch (err) {
//           setError('Failed to fetch user data');
//         }
//       } else {
//         setError('No user email available');
//       }
//     };

//     fetchUserProfile();
//   }, [contextUser]);

//   // Function to delete user
//   const handleDelete = async () => {
//     if (contextUser && contextUser.email) {
//       try {
//         const response = await fetch(`http://localhost:8070/api/user/delete/${contextUser.email}`, {
//           method: 'DELETE',
//           headers: {
//             Authorization: `Bearer ${contextUser.token}`, // Send token in headers for authorization
//           },
//         });

//         const data = await response.json();

//         if (data.error) {
//           setError(data.error);
//         } else {
//           alert('Account deleted successfully');
//           localStorage.removeItem('user'); // Clear user from local storage
//           dispatch({ type: 'LOGOUT' }); // Log out the user
//           window.location.href = '/login'; // Redirect to login after deletion
//         }
//       } catch (err) {
//         setError('Failed to delete user');
//       }
//     }
//   };

//   if (!user) {
//     return <div>{error ? error : 'Loading user profile...'}</div>;
//   }

//   return (
//     <div>
//       <h1>User Profile</h1>
//       <p>Email: {user.email}</p>
      
//       {/* Delete account button */}
//       <button onClick={handleDelete}>Delete Account</button>

//       {error && <p>{error}</p>}
//     </div>
//   );
// }

// export default UserProfile;


