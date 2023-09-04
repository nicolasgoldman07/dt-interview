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

export interface UniqueValuesToFilter { [key: string]: string[] }

const useImpactScores = () => {
    const [impactScores, setImpactScores] = useState<ImpactScore[]>([]);
    const [uniqueValuesToFilter, setUniqueValuesToFilter] = useState<UniqueValuesToFilter>({
        browserType: [],
        pageName: [],
        analyzedMetric: [],
        typePrediction: [],
    });
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

                setUniqueValuesToFilter({
                    browserType: [...new Set(parsedImpactScores.map((result) => result.browser_type))],
                    pageName: [...new Set(parsedImpactScores.map((result) => result.page_name))],
                    analyzedMetric: [...new Set(parsedImpactScores.map((result) => result.analyzed_metric))],
                });

                setImpactScores(parsedImpactScores);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { impactScores, loading, error, uniqueValuesToFilter };
};

export default useImpactScores;