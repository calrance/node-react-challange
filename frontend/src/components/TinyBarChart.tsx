import { PureComponent } from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

interface Props<T> {
  data: T[];
}

class TinyBarChart extends PureComponent<Props<any>> {
  private chartData: any;

  constructor(props: any) {
    super(props);
    this.chartData = props.data;
    console.log('this.chartData >> ' + JSON.stringify(this.chartData));
  }

  render() {
    return (
      <ResponsiveContainer width={'100%'} height={300}>
        <BarChart width={300} height={40} data={this.chartData}>
          <XAxis dataKey='name' tick={{ fontSize: 11 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey='value' fill='#667aff' />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default TinyBarChart;
