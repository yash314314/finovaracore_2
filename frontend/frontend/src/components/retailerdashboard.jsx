import AadhaarStatusChecker from "./adharStatus";
export default function ManagerDashboard() {
  return (
    <div>
      <h2>Manager Dashboard</h2>
      <p>Welcome, Manager! You can manage teams and approve tasks.</p>
      <AadhaarStatusChecker />
    </div>
  );
}
