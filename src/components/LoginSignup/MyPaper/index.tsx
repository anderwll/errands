import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const MyPaper = styled(Paper)(() => ({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'space-between',
    width: '384px',
    height: '676px',
    padding: '60px 50px',
    overflow: 'hidden',
    gap: '20px',
    borderRadius: 12,
    zIndex: 9999,
}));

export default MyPaper;
