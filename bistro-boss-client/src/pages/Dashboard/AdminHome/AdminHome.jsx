import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Legend,
  Pie,
} from "recharts";

const AdminHome = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure("/admin-stats");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["chart-data"],
    queryFn: async () => {
      const res = await axiosSecure("/order-stats");
      return res.data;
    },
  });

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full p-4">
      <Helmet>
        <title>Bistro Boss | Admin Home</title>
      </Helmet>
      <h2 className="text-2xl mt-10 font-medium text-center">
        Hi, {user.displayName}. Welcome Back
      </h2>
      <div className="m-6 md:m-10 text-center">
        <div className="stats shadow w-full p-3">
          <div className="stat">
            <div className="stat-title">Revenue</div>
            <div className="stat-value">${stats.revenue}</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-title">New Users</div>
            <div className="stat-value">{stats.users}</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Items</div>
            <div className="stat-value my-2">{stats.products}</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat">
            <div className="stat-title">Orders</div>
            <div className="stat-value">{stats.orders}</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row bg-white m-6 md:m-10 py-10 rounded">
        <div className="w-full md:w-1/2">
          <BarChart
            width={400}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar
              dataKey="total"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Legend></Legend>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    name={entry.category}
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
