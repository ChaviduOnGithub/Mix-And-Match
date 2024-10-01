import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa'; 
import { jsPDF } from 'jspdf'; 
import 'jspdf-autotable'; 

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8070/api/user');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Filter users based on the search term (starting with the search term)
    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    const generateReport = () => {
        const doc = new jsPDF();

        // Add Title
        doc.setFontSize(18);
        doc.text('User List Report', 20, 20);

        // User Details Table
        doc.autoTable({
            startY: 30,
            head: [['Username', 'Email', 'Update History']],
            body: filteredUsers.map(user => [
                user.username,
                user.email,
                user.updateHistory && user.updateHistory.length > 0 
                    ? user.updateHistory.map(update => {
                        let updateText = `Field: ${update.field}\n`;
                        if (update.field === 'avatar') {
                            updateText += `Previous Avatar: Added\nNew Avatar: Updated\n`;
                        } else {
                            updateText += `Previous Value: ${update.previousValue}\nNew Value: ${update.newValue}\n`;
                        }
                        updateText += `Updated At: ${new Date(update.updatedAt).toLocaleString()}`;
                        return updateText; // Returning formatted text for each update
                    }).join('\n\n') // Join updates with double line breaks
                    : 'No updates'
            ]),
            styles: {
                cellPadding: 3,
                fontSize: 10,
                overflow: 'linebreak',  
            },
        });

        
        doc.save('user_list_report.pdf');
    };

    if (loading) {
        return <p className="text-center text-blue-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold text-center mb-6">User List</h1>

            {/* Search Input */}
            <div className="mb-4 relative max-w-xs mx-auto">
                <input
                    type="text"
                    placeholder="Search by username..."
                    className="border border-gray-300 rounded-lg p-2 pl-10 pr-4 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {filteredUsers.length === 0 ? (
                <p className="text-center text-gray-600">No users found.</p>
            ) : (
                <div className="w-full max-w-4xl mx-auto overflow-x-auto shadow-lg">
                    <table className="table-auto w-full bg-white border border-gray-300 rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 border-b text-left">Username</th>
                                <th className="py-2 px-4 border-b text-left">Email</th>
                                <th className="py-2 px-4 border-b text-left">Update History</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b text-left">{user.username}</td>
                                    <td className="py-2 px-4 border-b text-left">{user.email}</td>
                                    <td className="py-2 px-4 border-b text-left">
                                        {user.updateHistory && user.updateHistory.length > 0 ? (
                                            <ul className="list-disc list-inside">
                                                {user.updateHistory.map((update, index) => (
                                                    <li key={index} className="mt-2">
                                                        <strong>Field:</strong> {update.field} <br />
                                                        {update.field === 'avatar' ? (
                                                            <>
                                                                <strong>Previous Avatar:</strong> Added <br />
                                                                <strong>New Avatar:</strong> Updated <br />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <strong>Previous Value:</strong> {update.previousValue} <br />
                                                                <strong>New Value:</strong> {update.newValue} <br />
                                                            </>
                                                        )}
                                                        <strong>Updated At:</strong> {new Date(update.updatedAt).toLocaleString()}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-500">No updates</p>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Button to Generate PDF Report */}
            <button onClick={generateReport} className="bg-blue-500 text-white rounded-lg p-3 mt-5">
                Download User List as PDF
            </button>
        </div>
    );
};

export default UserList;
