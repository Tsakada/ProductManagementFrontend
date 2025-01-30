import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SELECT_CATEGORY } from '../../../Schema/SelectSchema';

export default function SelectCategory({ selectValue, setSelectValue }) {
    const [selectOptions, setSelectOptions] = useState([]);

    const { refetch, loading, error } = useQuery(SELECT_CATEGORY, {
        onCompleted: ({ selectCategory }) => {
            const data = selectCategory.map((e) => ({
                id: e?._id,
                title: e?.category_name,
            }));
            console.log('Fetched Categories:', data);
            setSelectOptions(data);
        },
        onError: (error) => {
            console.error('Error fetching categories:', error);
        },
    });

    useEffect(() => {
        if (refetch) refetch();
    }, [refetch]);

    if (loading) {
        return <p>Loading categories...</p>;
    }

    if (error) {
        return <p>Error loading categories: {error.message}</p>;
    }

    return (
        <Autocomplete
            fullWidth
            size='small'
            disablePortal
            value={selectValue}
            id="category-select"
            options={selectOptions}
            getOptionLabel={(option) => option.title || ''}
            onChange={(_, value) => setSelectValue(value)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Choose a category"
                    variant="outlined"
                />
            )}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
        />
    );
}
