const Dashboard = ({ user }) => {
  console.log(user);
  return <div>Hello, {user.email}</div>;
};

export default Dashboard;
