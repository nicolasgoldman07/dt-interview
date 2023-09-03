// * Library
import {
  Flex,
  Heading,
  Skeleton,
} from '@dynatrace/strato-components-preview';
import React from 'react';
// * Hook
import useImpactScores from '../hooks/useImpactScores';
// * Component
import Heatmap from '../components/Heatmap';

export const ImpactScores = () => {
  const { impactScoresHeatmapParsed, loading: loadingRequest } = useImpactScores();
  // TODO: Add posibility to select browser type and some API Filtering
  // TODO: Add error handling

  return (
    <>
      <Flex flexDirection="column" alignItems="center" padding={32}>
        <img
          src="./assets/Dynatrace_Logo.svg"
          alt="Dynatrace Logo"
          width={150}
          height={150}
          style={{ paddingBottom: 32 }}
        />
        <Heading level={2}>
          Explore the data in your environment by using the Dynatrace Query
          Language
        </Heading>
      </Flex>
      <Flex flexDirection="column" alignItems="center" padding={32}>
        {loadingRequest
          ? <Skeleton width="50%" height="30px" />
          : <Heatmap data={impactScoresHeatmapParsed["All"]} xAxisProp="analyzed_metric" yAxisProp="page_name" metric="impact_score" />
        }
      </Flex>
    </>
  );
};
