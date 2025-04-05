
import { motion } from 'framer-motion';

const AdminDashboardPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Dashboard Cards */}
        <div className="glass-panel p-6">
          <h2 className="text-lg font-semibold mb-2">Recent Projects</h2>
          <p className="text-3xl font-bold">12</p>
        </div>
        
        <div className="glass-panel p-6">
          <h2 className="text-lg font-semibold mb-2">Blog Posts</h2>
          <p className="text-3xl font-bold">8</p>
        </div>
        
        <div className="glass-panel p-6">
          <h2 className="text-lg font-semibold mb-2">Messages</h2>
          <p className="text-3xl font-bold">24</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboardPage;
