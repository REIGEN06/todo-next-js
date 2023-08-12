'use client';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Link from 'next/link';
import { Button, useTheme } from '@mui/material';

export default function NavBar() {
	const theme = useTheme();
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				p: 2,
				backgroundColor: 'white',
				boxShadow: `0px 2px ${theme.palette.border.main}`,
			}}
		>
			<Link href="/">
				<Button>
					<HomeIcon />
					Home
				</Button>
			</Link>
			<Link href="/todolist">
				<Button>
					<ListAltIcon />
					ToDo
				</Button>
			</Link>
		</Box>
	);
}
