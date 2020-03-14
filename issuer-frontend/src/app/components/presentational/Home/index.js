import React from "react";

import constants from "../../../constants";
import homeConstants from "../../../constants/homeConstants";

import Button from "../../reusables/Button";
import Image from "../../reusables/Image";

// Images and Assets
import SupportImage from "../../../files/support.svg";
import StatsImage from "../../../files/stats.svg";

const HomeUI = props => {
	// Refraining from using Constants for text because not required.

	return (
		<div className={"homepage"}>
			<section className={"homepage-front"}>
				<div className={"fixedcontainer aligncenter row"}>
					<div className={"col-md-5 paddingcol imagecolumn"}>
						<Image className={"resimage"} src={SupportImage} />
					</div>
					<div className={"col-md-7 paddingcol"}>
						<div className={"heading extraweight"}>
							Get Your Solutions. Quick!
						</div>
						<p>
							With {constants.APPNAME}, you can get fixes to all
							your issues quick and simple.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Donec sed magna sem. Proin ut tortor a eros
							hendrerit laoreet. In ut scelerisque nibh, eu
							viverra erat. Nullam volutpat quam non mi tempus
							molestie. Praesent id magna vel justo mattis
							convallis. Nullam porta in nunc id vehicula. Integer
							posuere dolor orci, id accumsan urna accumsan
							sagittis. Sed sodales, orci sit amet sagittis
							mattis, justo urna elementum velit, non pretium diam
							risus at dolor. In a vestibulum erat.
						</p>
					</div>
				</div>
			</section>
			<div style={{ height: "150px", overflow: "hidden" }}>
				<svg
					viewBox="0 0 500 150"
					preserveAspectRatio="none"
					style={{ height: "100%", width: "100%" }}
				>
					<path
						d="M-0.94,107.06 C150.00,150.00 349.21,-49.99 500.75,101.15 L500.00,150.00 L0.00,150.00 Z"
						style={{ stroke: "none", fill: "#292731" }}
					></path>
				</svg>
			</div>
			<section className={"homepage-second"}>
				<div className={"fixedcontainer row aligncenter invertrow"}>
					<div className={"col-md-7 paddingcol"}>
						<div className={"heading extraweight"}>
							Keep Track of Everything!
						</div>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Donec sed magna sem. Proin ut tortor a eros
							hendrerit laoreet. In ut scelerisque nibh, eu
							viverra erat. Nullam volutpat quam non mi tempus
							molestie. Praesent id magna vel justo mattis
							convallis. Nullam porta in nunc id vehicula. Integer
							posuere dolor orci, id accumsan urna accumsan
							sagittis. Sed sodales, orci sit amet sagittis
							mattis, justo urna elementum velit, non pretium diam
							risus at dolor. In a vestibulum erat.
						</p>
					</div>
					<div className={"col-md-5 paddingcol imagecolumn"}>
						<Image className={"resimage"} src={StatsImage} />
					</div>
				</div>
			</section>
		</div>
	);
};

export default HomeUI;
