import { ReactNode } from "react";

const PageContent = ({ children }: { children: ReactNode }) => (
		<div style={{  margin: "0 auto", padding: "5rem 4rem 3rem 4rem", textAlign: "center"		}}>	
			{children}
		</div>
	);

export default PageContent;