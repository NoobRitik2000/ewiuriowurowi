// // pages/account.tsx
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// export interface Loan {
//     id: number;
//     bookId: number;
//     loanDate: string; // or Date, depending on your API response
//     status: string;
// }

// export interface NotificationPreferences {
//     emailNotifications: boolean;
//     smsNotifications: boolean;
// }
// const AccountPage = () => {
//     const [loans, setLoans] = useState([]);
//     const [preferences, setPreferences] = useState({ emailNotifications: false, smsNotifications: false });

//     useEffect(() => {
//         const fetchLoans = async () => {
//             const response = await axios.get('/api/loans/history');
//             setLoans(response.data);
//         };

//         const fetchPreferences = async () => {
//             const response = await axios.get('/api/notifications/preferences');
//             setPreferences(response.data);
//         };

//         fetchLoans();
//         fetchPreferences();
//     }, []);

//     const updatePreferences = async () => {
//         await axios.put('/api/notifications/preferences', preferences);
//         alert('Preferences updated successfully');
//     };

//     return (
//         <div>
//             <h1>Account Management</h1>
            
//             <h2>Borrowing History</h2>
//             <ul>
//                 {loans.map(loan => (
//                     <li key={loan.id}>
//                         Book ID: {loan.bookId}, Loan Date: {loan.loanDate}, Status: {loan.status}
//                     </li>
//                 ))}
//             </ul>

//             <h2>Notification Preferences</h2>
//             <label>
//                 Email Notifications
//                 <input
//                     type="checkbox"
//                     checked={preferences.emailNotifications}
//                     onChange={(e) => setPreferences({ ...preferences, emailNotifications: e.target.checked })}
//                 />
//             </label>
//             <label>
//                 SMS Notifications
//                 <input
//                     type="checkbox"
//                     checked={preferences.smsNotifications}
//                     onChange={(e) => setPreferences({ ...preferences, smsNotifications: e.target.checked })}
//                 />
//             </label>
//             <button onClick={updatePreferences}>Update Preferences</button>
//         </div>
//     );
// };

// export default AccountPage;
