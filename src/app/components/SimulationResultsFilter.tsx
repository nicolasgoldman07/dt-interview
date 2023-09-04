import React, { ReactElement, cloneElement } from 'react';
import {
    _mergeProps,
} from '@dynatrace/strato-components-preview/core';
import { FilterBar } from '@dynatrace/strato-components-preview/filters';
import {
    Select,
    SelectOption,
} from '@dynatrace/strato-components-preview/forms';
import { UniqueValuesToFilter } from '../hooks/useSimulationResults';

type MappingProps = {
    children: ReactElement;
    onChange?: (value: unknown) => void;
    value?: unknown;
    defaultValue?: unknown;
};
const Mapper = (props: MappingProps) => {
    const { children, defaultValue, value, onChange } = props;
    // Select-specific prop, which will be different for another FormControl
    const { defaultSelectedId, selectedId } = children.props;
    return (
        <>
            {cloneElement(children, {
                ..._mergeProps(children.props, {
                    value: defaultSelectedId || defaultValue || selectedId || value,
                    onChange,
                }),
            })}
        </>
    );
};

const generateSelectItem = (name, defaultValue, uniqueValues, id, label) => (
    <FilterBar.Item name={name} label={label}>
        <Mapper defaultValue={defaultValue}>
            <Select defaultSelectedId={defaultValue} name={name} id={id}>
                {uniqueValues.map((value) => (
                    <SelectOption key={value} id={value}>
                        {value}
                    </SelectOption>
                ))}
            </Select>
        </Mapper>
    </FilterBar.Item>
);


export const SimulationResultsFilters = (props: {
    uniqueValuesToFilter: UniqueValuesToFilter;
    onFilterChange: (value: unknown) => void;
}) => {
    const { uniqueValuesToFilter } = props;
    const defaultFilterState = {
        analyzedMetric: { value: ["DOM_COMPLETE_TIME"] },
        pageName: { value: ["page.com||loading of page /enrol/fidelity"] },
        browserType: { value: ["All"] },
    };


    return (
        <FilterBar
            onFilterChange={props.onFilterChange}
        >
            {generateSelectItem("analyzedMetric", defaultFilterState.analyzedMetric.value, uniqueValuesToFilter.analyzedMetric, "analyzedMetric-select", "Analized Metric")}
            {generateSelectItem("browserType", defaultFilterState.browserType.value, uniqueValuesToFilter.browserType, "browserType-select", "Browser Type")}
            {generateSelectItem("pageName", defaultFilterState.pageName.value, uniqueValuesToFilter.pageName, "pageName-select", "Page Name")}
        </FilterBar>
    );
};
