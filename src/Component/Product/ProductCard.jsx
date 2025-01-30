import * as React from 'react';
import Card from '@mui/material/Card';
import { Stack } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export default function ProductCard({ item }) {
    console.log(item);
    return (
        <Card>
            <CardMedia
                height="180"
                component="img"
                alt="green iguana"
                image={item?.image}
            />
            <CardContent>
                <Stack direction="row" justifyContent="space-between">
                    <Stack>

                        <Typography fontWeight="bold" fontSize={20} color="#1976d2">
                            {item?.product_name}
                        </Typography>

                        <Typography fontSize={14} color="gray">
                            {item?.product_name}
                        </Typography>
                    </Stack>
                    <Typography fontSize={20} fontWeight="bold" color="#FC8019">
                        $  {item?.price.toFixed(2)}
                    </Typography>
                </Stack>
            </CardContent>

        </Card>
    );
}
