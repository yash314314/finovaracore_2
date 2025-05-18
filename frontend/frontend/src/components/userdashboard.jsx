import AadhaarStatusChecker from "./adharStatus";
export default function UserDashboard() {
  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Welcome, User! You can view your data here.</p>
      <AadhaarStatusChecker />
    </div>
  );
}
