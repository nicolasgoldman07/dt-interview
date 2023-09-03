import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Flex } from '@dynatrace/strato-components-preview';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

interface LineChartProps {
    xAxisTitle: string
    yAxisTitle: string
    data: any
}

export interface ChartData {
    labels: number[];
    datasets: {
        label: string;
        data: (number | undefined)[];
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
        fill?: string | boolean;
        type?: string;
    }[];
}

export const LineChart = ({ xAxisTitle, yAxisTitle, data }: LineChartProps) => {
    const chartOptions: any = generateChartOptions(xAxisTitle, yAxisTitle);
    return (
        <Flex flexDirection="column" alignItems="center" padding={32} width="100%" height="fit-content">
            <Line options={chartOptions} data={data} height="100%" />
        </Flex >
    );
}

const generateChartOptions = (xAxisTitle: string, yAxisTitle: string) => {
    return {
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
        },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                reverse: true,
                title: {
                    display: true,
                    text: xAxisTitle,
                    // Colors.Background.Field.Neutral.Accent
                    color: "#aeafc9",
                    font: { size: 16 }
                },
                grid: {
                    color: 'rgba(35,49,63, 0.5)',
                },
            },
            y: {
                type: 'linear',
                title: {
                    display: true,
                    text: yAxisTitle,
                    color: "#aeafc9", // Colors.Background.Field.Neutral.Accent,
                    font: { size: 16 }
                },
                ticks: {
                    callback: (value) => `${value.toFixed(2)}%`,
                },
                grid: {
                    color: 'rgba(35,49,63, 0.5)',
                },
            },
        },
    };
}