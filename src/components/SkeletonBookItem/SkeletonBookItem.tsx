import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import style from './SkeletonBookItem.module.css';
import { Skeleton } from '@mui/material';

function SkeletonBookItem() {
  return (
    <Card className={style.Skeleton}>
      <Skeleton
        sx={{ minHeight: 472, maxHeight: 472 }}
        animation="wave"
        variant="rectangular"
      />
      <CardContent className={style.Skeleton__content}>
        <Skeleton animation="wave" height={24} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width="80%" />
      </CardContent>
    </Card>
  );
}

export default SkeletonBookItem;
