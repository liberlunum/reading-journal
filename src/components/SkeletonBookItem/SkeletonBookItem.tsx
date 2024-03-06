import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import style from './SkeletonBookItem.module.css';
import { Skeleton } from '@mui/material';

function SkeletonBookItem() {
  return (
    <Card className={style.Skeleton}>
      <Skeleton
        sx={{ minHeight: 330.4, maxHeight: 330.4 }}
        animation="wave"
        variant="rectangular"
      />
      <CardContent className={style.Skeleton__content}>
        <Skeleton
          animation="wave"
          height={24}
          width="80%"
          style={{ marginBottom: 6 }}
        />
        <Skeleton animation="wave" height={10} width="60%" />
      </CardContent>
    </Card>
  );
}

export default SkeletonBookItem;
