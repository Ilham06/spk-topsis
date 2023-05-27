import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

type IProps = {
  onClick: (event: any) => void;
  title: string;
};

export default function CloseButton(props: IProps) {

  return (
    <div>
      <Button
        color='secondary'
        onClick={props.onClick}
        sx={
          {
            borderRadius: '8px',
            textTransform: 'capitalize',
            boxShadow: 'none',
            color: '#000',
            fontWeight: 700
          }
        }
        variant="outlined">{props.title}</Button>
    </div>
  )
}
