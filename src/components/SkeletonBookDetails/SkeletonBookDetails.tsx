import { Skeleton, Box } from '@mui/material';

export default function SkeletonBookDetails() {
  return (
    <Box
      sx={{ display: 'flex' }}
      className=""
      gap={'2rem'}
      paddingInline={'12rem'}
    >
      <Skeleton variant="rectangular" width={1100} height={'85vh'} />
      <Box sx={{ flexDirection: 'column' }} width={'100%'}>
        <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
        <Skeleton variant="rectangular" width={'100%'} height={506} />
      </Box>
    </Box>
  );
}
