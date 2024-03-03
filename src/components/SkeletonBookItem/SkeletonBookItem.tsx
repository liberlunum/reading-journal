import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import style from './SkeletonBookItem.module.css';
import { Skeleton } from '@mui/material';

function SkeletonBookItem() {
  return (
    <Card className={style.Skeleton}>
      <Skeleton sx={{ height: 250 }} animation="wave" variant="rectangular" />
      <CardContent>
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width="80%" />
      </CardContent>
      {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
    </Card>
  );
}

export default SkeletonBookItem;
