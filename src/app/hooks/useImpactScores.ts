import { functions } from '@dynatrace-sdk/app-utils';
import { useState, useEffect } from 'react';
import { FAILED_NETWORK_RESPONSE } from '../commons/errors';

export interface ImpactScore {
    tenant_id: string;
    app_id: string;
    dates: string;
    browser_type: string;
    page_name: string;
    analyzed_metric: string;
    impact_score: number;
}

const useImpactScores = () => {
    const [impactScores, setImpactScores] = useState<ImpactScore[]>([]);

    const [impactScoresHeatmapParsed, setImpactScoresHeatmapParsed] = useState<{ [browserType: string]: ImpactScore[] }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const apiResponse = await functions.call('get-impact-scores').then((res) => res);

                if (!apiResponse.ok) {
                    throw new Error(FAILED_NETWORK_RESPONSE);
                }

                const { response } = await apiResponse.json();
                const parsedImpactScores: ImpactScore[] = JSON.parse(response);

                const impactScoresHeatmapParsed: { [key: string]: ImpactScore[] } = parsedImpactScores.reduce((acc, score) => {
                    const { browser_type } = score;
                    if (!acc[browser_type]) {
                        acc[browser_type] = [];
                    }
                    acc[browser_type].push({
                        page_name: score.page_name.split("||").length > 1 ? score.page_name.split("||")[1] : score.page_name,
                        analyzed_metric: score.analyzed_metric.charAt(0).toUpperCase() + score.analyzed_metric.slice(1).replace(/_/g, ' ').toLowerCase(),
                        impact_score: score.impact_score,
                    });
                    return acc;
                }, {});

                setImpactScoresHeatmapParsed(impactScoresHeatmapParsed);
                setImpactScores(parsedImpactScores);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { impactScores, impactScoresHeatmapParsed, loading, error };
};

export default useImpactScores;