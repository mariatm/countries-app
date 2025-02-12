import Typography from "@mui/material/Typography";
import grey from '@mui/material/colors/grey';

const style: React.CSSProperties = { 
	display: 'flex', 
	backgroundColor: grey["A200"], 
	width: '100%', justifyContent: 'center', 
	boxSizing: 'border-box', 
	zIndex: 1000, 
	marginTop: "auto" 
}

const Footer = () => (
	<div style={style}>		
		<Typography variant="caption" sx={{ p: 2 }}>María Toledo Melgar</Typography>
	</div>
);

export default Footer;
