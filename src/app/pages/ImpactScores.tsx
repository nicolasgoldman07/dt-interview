// * Library
import {
  Flex,
  Heading,
  Skeleton,
} from '@dynatrace/strato-components-preview';
import React, { useEffect, useState } from 'react';
// * Hook
import useImpactScores, { ImpactScore } from '../hooks/useImpactScores';
// * Component
import Heatmap from '../components/Heatmap';
import { ImpactScoresFilters } from '../components/ImpactScoresFilter';

export const ImpactScores = () => {
  const { loading, impactScores, uniqueValuesToFilter } = useImpactScores();
  const [filteredData, setFilteredData] = useState<ImpactScore[]>([]);
  const [browserType, setBrowserType] = useState<string>("All");

  const onFilterChange = (fullFilters: { [key: string]: { value: string } }) => {
    setBrowserType(fullFilters["browserType"].value[0]);
  }

  useEffect(() => {
    const filteredData: ImpactScore[] = impactScores.filter((item) => item.browser_type === browserType);
    filteredData.forEach((item) => {
      item.page_name = item.page_name.split("||loading of page").length > 1 ? item.page_name.split("||loading of page")[1] : item.page_name
      item.analyzed_metric = item.analyzed_metric.charAt(0).toUpperCase() + item.analyzed_metric.slice(1).replace(/_/g, ' ').toLowerCase()
    });

    setFilteredData(filteredData);
  }, [browserType, impactScores]);

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
          HeatMap Chart
        </Heading>
      </Flex>
      <Flex flexDirection="column" alignItems="flex-start" paddingLeft={32}>
        {loading
          ? (
            <Flex alignSelf='center' marginTop={20}>
              <Skeleton width="40vw" height="30px" />
            </Flex>
          )
          : (
            <>
              <Flex flexDirection="row">
                <ImpactScoresFilters uniqueValuesToFilter={uniqueValuesToFilter} onFilterChange={onFilterChange} />
              </Flex>
              <Flex alignSelf='center' width="90%" justifyContent="center">
                <Heatmap
                  data={filteredData}
                  xAxisProp="analyzed_metric"
                  yAxisProp="page_name"
                  metric="impact_score"
                />
              </Flex>
            </>
          )
        }
      </Flex>
    </>
  );
};
