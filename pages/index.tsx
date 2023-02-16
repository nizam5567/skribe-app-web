import type { NextPage } from 'next';
import Link from 'next/link';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const Index: NextPage = () => (
    <Box width="100%" minHeight="100vh" sx={{ 'color': '#9CA3AF' }} display="flex" justifyContent="center" alignItems="center" p={2} py={4}>
        You are being redirected. If it takes more than a few seconds,
        <Link href="/home">
            <Typography
                component="a"
                sx={{ 'fontSize': '14px', 'fontWeight': 100, 'lineHeight': '24px', 'color': '#657CFF', 'ml': 1, 'cursor': 'pointer' }}
            >go directly to the home page</Typography>
        </Link>.
    </Box>
);

export default Index;
