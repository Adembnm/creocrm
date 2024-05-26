import React from 'react';

import { Pie as PieChart } from '../../components';

const Pie = ({ pieChartData }) => (
  <div className="w-full">
    <div className="w-full p-2">
      <PieChart
        id="chart-pie"
        data={pieChartData}
        legendVisiblity={false}
        height="300px"
        width="300px"
      />
    </div>
  </div>
);

export default Pie;
