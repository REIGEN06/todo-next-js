'use client';
import Box from '@mui/material/Box';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Link from 'next/link';
import { Button, Theme, styled } from '@mui/material';

const NavBar = () => {
	return (
		<StyledBox>
			<Link href="/">
				<Button>
					<ListAltIcon />
					ToDo List
				</Button>
			</Link>
		</StyledBox>
	);
};

export default NavBar;

const StyledBox = styled(Box)(({ theme }: { theme: Theme }) => ({
	display: 'flex',
	padding: '8px 80px',
	backgroundColor: theme.palette.BackgroundColors.main,
	boxShadow: `0px 2px ${theme.palette.border.main}`,
	'@media (max-width: 890px)': {
		padding: '8px 10px',
	},
}));
