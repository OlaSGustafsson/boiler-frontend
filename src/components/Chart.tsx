import { useEffect, useState } from "react";
import { ChartData, ChartDataDateValues, Sensor } from "../types/types";
import { GetData } from "../services/TemperatureService";
import {
  GetShortDateString,
  GetTimeStamp,
  GetTimeStampSubHours,
} from "../logic/logic";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { SpinnerDotted } from "spinners-react";

export const Chart = (props: { sensor: Sensor; hours: number }) => {
  const [ChartData, setChartData] = useState<ChartDataDateValues[]>();

  useEffect(() => {
    const fetchData = async () => {
      if (props.sensor) {
        const start = GetTimeStampSubHours(props.hours);
        const end = GetTimeStamp();
        const chartData = (await GetData(
          props.sensor.id,
          start,
          end
        )) as ChartData;
        const dateDataValues = chartData.values.map((p) => ({
          date: GetShortDateString(p.timestamp),
          temperature: p.temperature,
        }));
        setChartData(dateDataValues);
      }
    };
    fetchData();
  }, [props.sensor, props.hours]);

  return (
    <div className="box">
      {!ChartData && (
        <div>
          <SpinnerDotted /> Loading...
        </div>
      )}
      {ChartData && (
        <div className="content">
          <div className="subtitle">{props.sensor.name}</div>
          <ResponsiveContainer height={225}>
            <LineChart
              data={ChartData}
              margin={{
                top: 2,
                right: 2,
                left: 2,
                bottom: 2,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date">
                <Label value="Dag tid" offset={0} position="insideBottom" />
              </XAxis>
              <YAxis
                type="number"
                domain={[25, 95]}
                label={{
                  value: "temperatur °C",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <ReferenceLine y={45} label="Elda" stroke="red" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
