import React from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "January", total: 12 },
  { name: "February", total: 21 },
  { name: "March", total: 8 },
  { name: "April", total: 16 },
  { name: "May", total: 9 },
  { name: "June", total: 7 },
];

const Chart = ({ aspect, title }) => {
  return (
    <div className="chart-container">
      <div className="chart-title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff0080" stopOpacity={0.8}>
                <animate
                  attributeName="stop-color"
                  values="#ff0080; #00ccff; #ff0080"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="95%" stopColor="#00ccff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            stroke="#fff"
            tick={{ fontSize: 12, fontWeight: "bold" }}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "none",
              borderRadius: 10,
              color: "#333",
              fontSize: 14,
            }}
            labelStyle={{ fontWeight: "bold", fontSize: 16 }}
            formatter={(value) => `Total: ${value}`}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#ff0080"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;