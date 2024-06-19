import React, { useState } from 'react';
import axios from 'axios';

const UpdateProfile = ({ userProfile, onUpdate }) => {
    const [name, setName] = useState(userProfile.name);
    const [age, setAge] = useState(userProfile.age);
    const [gender, setGender] = useState(userProfile.gender);
    const [email, setEmail] = useState(userProfile.email);
    const [error, setError] = useState('');

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('authToken');
        if (!token) {
            setError('User not authenticated');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/profile/update', {
                name,
                age,
                gender,
                email
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                onUpdate({ ...userProfile, name, age, gender, email });
                setError('');
            } else {
                setError('Failed to update user profile');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="update-profile-modal">
            <h2>Update Profile</h2>
            <form onSubmit={handleUpdateProfile}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update Profile</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default UpdateProfile;
