import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

type IProps = {
  target: string;
  title: string;
};

export default function MainButton(props: IProps) {

  let navigate = useNavigate()
  return (
    <div>
      <Button sx={{ borderRadius: '8px', textTransform: 'capitalize', boxShadow: 'none' }} className='button' variant='contained' onClick={() => {
        navigate(props.target);
      }}>{props.title}</Button>
    </div>
  )
}
