
import { motion } from 'framer-motion';
import { AreaChart, LineChart, BarChart, Bar, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUp, ArrowDown, LayoutDashboard, FileText, User, ShoppingBag } from 'lucide-react';

// Sample data for charts
const visitorData = [
  { name: 'Jan', visitors: 400 },
  { name: 'Feb', visitors: 300 },
  { name: 'Mar', visitors: 600 },
  { name: 'Apr', visitors: 800 },
  { name: 'May', visitors: 700 },
  { name: 'Jun', visitors: 900 },
  { name: 'Jul', visitors: 1000 },
];

const projectData = [
  { name: 'Jan', completed: 5, inProgress: 2 },
  { name: 'Feb', completed: 3, inProgress: 4 },
  { name: 'Mar', completed: 6, inProgress: 3 },
  { name: 'Apr', completed: 4, inProgress: 5 },
  { name: 'May', completed: 7, inProgress: 2 },
  { name: 'Jun', completed: 8, inProgress: 1 },
];

const blogData = [
  { name: 'Jan', posts: 2 },
  { name: 'Feb', posts: 4 },
  { name: 'Mar', posts: 3 },
  { name: 'Apr', posts: 5 },
  { name: 'May', posts: 2 },
  { name: 'Jun', posts: 6 },
];

const AdminDashboardPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="mb-6">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl font-bold"
        >
          Dashboard
        </motion.h1>
        <motion.p 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground"
        >
          Welcome to your admin dashboard
        </motion.p>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Projects</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">20%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <div className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">10%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <div className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-red-500">5%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Visitors</CardTitle>
              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,024</div>
              <div className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">12%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Charts Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Tabs defaultValue="visitors" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="visitors">Visitors</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visitors" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Visitor Statistics</CardTitle>
                <CardDescription>Monthly website visitor count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={visitorData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="visitors" stroke="#8884d8" fillOpacity={1} fill="url(#colorVisitors)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Project Statistics</CardTitle>
                <CardDescription>Monthly completed vs in-progress projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={projectData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" fill="#8884d8" />
                      <Bar dataKey="inProgress" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="blog" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Blog Post Statistics</CardTitle>
                <CardDescription>Monthly blog post count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={blogData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="posts" stroke="#ff7300" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
      
      {/* Recent Activity Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-start space-x-4 border-b border-gray-200 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Published new blog post</p>
                    <p className="text-xs text-muted-foreground">The Future of AI in Data Science</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboardPage;
