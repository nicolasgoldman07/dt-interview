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
    const filteredData: ImpactScore[] = impactScores.filter((item) => {
      return (
        item.browser_type === browserType
      );
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
      <Flex flexDirection="row" alignItems="center" paddingLeft={32}>
        <ImpactScoresFilters uniqueValuesToFilter={uniqueValuesToFilter} onFilterChange={onFilterChange} />
      </Flex>
      <Flex flexDirection="column" alignItems="center" padding={32}>
        {loading
          ? <Skeleton width="50%" height="30px" />
          : <Heatmap data={filteredData} xAxisProp="analyzed_metric" yAxisProp="page_name" metric="impact_score" />
        }
      </Flex>
    </>
  );
};
