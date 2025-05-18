import AadhaarStatusChecker from "./adharStatus";
export default function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin! You have full access.</p>
      <AadhaarStatusChecker />
    </div>
  );
}
