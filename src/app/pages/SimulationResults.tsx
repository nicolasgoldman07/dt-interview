import {
  Flex,
  Heading,
  Skeleton,
} from '@dynatrace/strato-components-preview';
import React, { useEffect, useState } from 'react';
import useSimulationResults, { SimulationResult } from '../hooks/useSimulationResults';
import { ChartData, LineChart } from '../components/LineChart';

export const SimulationResults = () => {
  const { simulationResults, loading } = useSimulationResults();
  const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });

  const filterMetric = "DOM_COMPLETE_TIME";
  const filterPageName = "page.com||loading of page /enrol/fidelity";
  const filterBrowserType = "All";

  useEffect(() => {
    const filteredData: SimulationResult[] = simulationResults.filter((item) => {
      return (
        item.analyzed_metric === filterMetric &&
        item.page_name === filterPageName &&
        item.browser_type === filterBrowserType
      );
    });
    const chartData = generateChartData(filteredData);
    setChartData(chartData);
  }, [simulationResults]);

  return (
    <>
      <Flex flexDirection="row" alignItems="center" padding={32}>
        <img
          src="./assets/Dynatrace_Logo.svg"
          alt="Dynatrace Logo"
          width={50}
          height={50}
        />
        <Heading level={2}>
          Simulation Results
        </Heading>
      </Flex>
      <Flex flexDirection="column" alignItems="center" padding={32}>
        {loading
          ? <Skeleton width="50%" height="30px" />
          : <LineChart
            data={chartData}
            xAxisTitle={`Median ${filterMetric} (<unit>)`}
            yAxisTitle="Predicted Exit Rate"
          />
        }
      </Flex>
    </>
  );
};


const generateChartData = (data: SimulationResult[]): ChartData => {
  const chartData: ChartData = {
    labels: [],
    datasets: [
      {
        label: "Current",
        data: [],
        backgroundColor: "red",
        borderColor: "red",
        borderWidth: 2,
        fill: "-1"
      },
      {
        label: "Benchmark",
        data: [],
        backgroundColor: "white",
        borderColor: "white",
        borderWidth: 2,
        fill: "-1"
      },
      {
        label: "Target",
        data: [],
        backgroundColor: "yellow",
        borderColor: "yellow",
        borderWidth: 2,
        fill: "-1"
      },
      {
        label: "Predicted Exit Max",
        data: [],
        backgroundColor: "rgba(95,192,182,0.2)",
        borderColor: "rgba(95,192,182)",
        borderWidth: 2,
        fill: "+1"
      },
      {
        label: "Predicted Exit Rate",
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
      {
        label: "Predicted Exit Min",
        data: [],
        backgroundColor: "rgba(95,192,182,0.2)",
        borderColor: "rgba(95,192,182)",
        borderWidth: 2,
        fill: "-1"
      },
    ]
  }

  const currentData = chartData.datasets[0].data;
  const benchmarkData = chartData.datasets[1].data;
  const targetData = chartData.datasets[2].data;
  const exitMaxData = chartData.datasets[3].data;
  const exitData = chartData.datasets[4].data;
  const exitMinData = chartData.datasets[5].data;

  data.forEach(element => {
    chartData.labels.push((element.median * 100));
    exitMaxData.push(element.predicted_exit_max * 100);
    exitData.push(element.predicted_exit * 100);
    exitMinData.push(element.predicted_exit_min * 100);
    currentData.push(element.type_prediction === "current_value" ? (element.predicted_exit * 100) : undefined);
    benchmarkData.push(element.type_prediction === "benchmark" ? (element.predicted_exit * 100) : undefined);
    targetData.push(element.type_prediction === "target" ? (element.predicted_exit * 100) : undefined);
  })

  const sortedIndices = chartData.labels
    .map((value, index) => ({ value, index }))
    .sort((a, b) => b.value - a.value)
    .map(item => item.index);

  chartData.labels = sortedIndices.map(index => chartData.labels[index]);
  chartData.datasets.forEach(dataset => {
    dataset.data = sortedIndices.map(index => dataset.data[index]);
  });

  return chartData;
}