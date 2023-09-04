// * Library
import React from 'react';
import styled from 'styled-components';
import Colors from '@dynatrace/strato-design-tokens/colors';
import Spacings from '@dynatrace/strato-design-tokens/spacings';
import Typography from '@dynatrace/strato-design-tokens/typography';
import { Flex, Grid, Tooltip } from '@dynatrace/strato-components-preview';

const HeatmapStyledBox = styled.div`
    color: ${Colors.Text.Neutral.Default};
    background: ${Colors.Background.Field.Neutral.Emphasized};
    padding: ${Spacings.Size8};
    width: 90px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: ${Typography.Text.Base.Default.Size};
`;

interface HeatmapDataBoxProps {
    value?: number;
    colorRange?: [string, string];
}
const HeatmapDataBox = styled(HeatmapStyledBox)`
    background: ${(props: HeatmapDataBoxProps) => props.value ?
        getItemColor(props.value, props.colorRange) :
        props.colorRange ? props.colorRange[0] : Colors.Background.Field.Neutral.Emphasized
    };
    width: 100%;
    height: 100%;
    padding: 0px;
`;

const HeatmapBoxText = styled.span`
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

interface HeatmapProps {
    xAxisProp: string;
    yAxisProp: string;
    metric: string;
    colorRange?: [string, string];
    data?: { [key: string]: any };
}

const Heatmap = ({
    xAxisProp,
    yAxisProp,
    metric,
    colorRange,
    data = []
}: HeatmapProps) => {
    const groupedDataX = groupDataByProperty(xAxisProp, data);
    const groupedDataY = groupDataByProperty(yAxisProp, data);
    const uniqueXValues = Object.keys(groupedDataX);
    const uniqueYValues = Object.keys(groupedDataY);

    const maxPointValue = Math.max(
        ...data.map(item => parseFloat(item[metric]))
    );

    const heatmapData = Array.from({ length: uniqueYValues.length }, () =>
        Array.from({ length: uniqueXValues.length }, () => 0)
    );

    fillHeatmapData(heatmapData, groupedDataY, uniqueYValues, uniqueXValues, xAxisProp, maxPointValue, metric);

    return (
        <Flex width="fit-content" flexDirection="column" alignItems="center">
            <Grid gridTemplateColumns={`repeat(${uniqueXValues.length + 1}, 1fr);`} gridTemplateRows={`repeat(${uniqueYValues.length + 1}, 1fr);`} >
                <HeatmapStyledBox key={'empty'} />
                {uniqueXValues.map((xValue, xIndex) => (
                    <HeatmapStyledBox key={xIndex}>
                        <Tooltip text={xValue}>
                            <HeatmapBoxText>{xValue}</HeatmapBoxText>
                        </Tooltip>
                    </HeatmapStyledBox>
                ))}
                {uniqueYValues.map((yValue, yIndex) => (
                    <>
                        <HeatmapStyledBox key={yIndex}>
                            <Tooltip text={yValue}>
                                <HeatmapBoxText>{yValue}</HeatmapBoxText>
                            </Tooltip>
                        </HeatmapStyledBox>
                        {heatmapData[yIndex].map((value, xIndex) => {
                            return (
                                <HeatmapDataBox key={xIndex} colorRange={colorRange}>
                                    <HeatmapDataBox key={xIndex} value={value} colorRange={colorRange} />
                                </HeatmapDataBox>
                            )
                        }
                        )}
                    </>
                ))}
            </Grid>
        </Flex>
    );
};

const groupDataByProperty = (prop, data) => {
    const groupedData = {};
    data.forEach((item) => {
        const value = item[prop];
        if (!groupedData[value]) {
            groupedData[value] = [];
        }
        groupedData[value].push(item);
    });
    return groupedData;
};

const fillHeatmapData = (heatmapData, groupedDataY, uniqueYValues, uniqueXValues, xAxisProp, maxPointValue, metric) => {
    uniqueYValues.forEach((yValue, yIndex) => {
        uniqueXValues.forEach((xValue, xIndex) => {
            const dataGroup = groupedDataY[yValue].filter(
                item => item[xAxisProp] === xValue
            );

            if (dataGroup.length > 0) {
                const totalPoints = dataGroup.reduce(
                    (accumulator, currentValue) => accumulator + parseFloat(currentValue[metric]),
                    0
                );
                const averagePoints = totalPoints / dataGroup.length;
                heatmapData[yIndex][xIndex] = averagePoints / maxPointValue;

            }
        });
    });
}

const getItemColor = (value, colorRange) => {
    if (colorRange && colorRange[1] && colorRange[1].startsWith("#")) {
        const hex = colorRange[1].replace("#", "");
        return `rgba(${parseInt(hex.substring(0, 2), 16)}, ${parseInt(hex.substring(2, 4), 16)}, ${parseInt(hex.substring(4, 6), 16)}, ${value})`;
    }
    return `rgba(0, 0, 255, ${value})`;
}

export default Heatmap;
