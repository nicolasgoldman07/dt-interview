import { functions } from '@dynatrace-sdk/app-utils';
import { useState, useEffect } from 'react';
import { FAILED_NETWORK_RESPONSE } from '../commons/errors';

export interface SimulationResult {
    tenant_id: string;
    app_id: string;
    dates: string;
    browser_type: string;
    page_name: string;
    analyzed_metric: string;
    median: number;
    predicted_exit: number;
    predicted_exit_max: number;
    predicted_exit_min: number;
    type_prediction: string;
}

const useSimulationResults = () => {
    const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const apiResponse = await functions.call('get-simulation-results').then((res) => res);
                if (!apiResponse.ok) {
                    throw new Error(FAILED_NETWORK_RESPONSE);
                }
                const { response } = await apiResponse.json();
                const parsedSimulationResults: SimulationResult[] = JSON.parse(response);

                setSimulationResults(parsedSimulationResults);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { simulationResults, loading, error };
};

export default useSimulationResults;