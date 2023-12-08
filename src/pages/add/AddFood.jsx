import React, { useState } from 'react';
import { v5 as uuid } from 'uuid';

import { Container, ButtonGroup, Button, Typography } from '@mui/material';
import { flexColumnCentered as center, topMargin } from '../../utils/muiTheme';

const mainCategories = ['veg', 'fruit', 'misc'];

export const AddFood = () => {

    const [currentCategory, setCurrentCategory] = useState(mainCategories[0]);

    const selectCategory = item => {
        setCurrentCategory(item);
    };

    return (
        <Container sx={{ ...center, ...topMargin }}>
            <MainCategorySelector selectCategory={selectCategory} currentCategory={currentCategory} />
        </Container>
    );
};

const MainCategorySelector = ({ selectCategory, currentCategory }) => {
    return (
        <Container sx={center}>
            <ButtonGroup variant='contained'>
                {mainCategories.map(item => {

                    let colour = 'primary';
                    if (item === currentCategory) colour = 'highlighted';

                    return (
                        <Button key={uuid} color={colour}>
                            <Typography variant='body2' onClick={() => selectCategory(item)} sx={{ textTransform: 'lowercase' }}>{item}</Typography>
                        </Button>
                    );
                })}
            </ButtonGroup>
        </Container>
    );
};