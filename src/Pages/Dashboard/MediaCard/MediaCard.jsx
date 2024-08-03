import * as React from 'react';
import Card from '@mui/material/Card';
import { Stack } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export default function MediaCard({ item }) {
    console.log(item);
    return (
        <Card>
            <CardMedia
                component="img"
                alt="green iguana"
                height="180"
                image={item?.image}
            />
            <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography fontWeight="bold" fontSize={20}>
                        {item?.product_name}
                    </Typography>
                    <Typography fontSize={20} fontWeight="bold" color="#FC8019">
                        $  {item?.price.toFixed(2)}
                    </Typography>
                </Stack>
            </CardContent>

        </Card>
    );
}
