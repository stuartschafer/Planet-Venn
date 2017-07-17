// Include React
import React from "react";
var Link = require("react-router").Link;

var Pieces = React.createClass({

  // Here we render the component
		render: function() {
				return (
						<div className="row">
								<div className="col-sm-3">
										<div className="panel panel-primary">
												<div className="panel-heading">
														<h3 className="panel-title text-center">Playable Pieces</h3>
														<button type="button" id="resetPieces" className="btn btn-danger btn-sm">Reset All Pieces</button>
														<p>Correct places: <span id="right">0</span></p>
														<p>Incorrect places: <span id="wrong">0</span></p>
														<div className="panel-body">
														
																<img id="satBlueBig" className="big piece" data-shape="sat" data-color="blue" data-size="big" data-spot="false" data-placed="false" src="./images/sat.gif" />
																<img id="alienGreenSmall" className="small piece" data-shape="alien" data-color="green" data-size="small" data-spot="false" data-placed="false" src="./images/alien.gif" />
																<img id="sunRedBig" className="big piece" data-shape="sun" data-color="red" data-size="big" data-spot="false" data-placed="false" src="./images/sun.gif" />
																<img id="sunBlueSmall" className="small piece" data-shape="sun" data-color="blue" data-size="small" data-placed="false" src="./images/sun.gif" />

																<img id="alienGreenBig" className="big piece" data-shape="alien" data-color="green" data-size="big" data-placed="false" src="./images/alien.gif" />
																<img id="satBlueSmall" className="small piece" data-shape="sat" data-color="blue" data-size="small" data-placed="false" src="./images/sat.gif" />
																<img id="sunGreenBig" className="big piece" data-shape="sun" data-color="green" data-size="big" data-placed="false" src="./images/sun.gif" />
																<img id="alienRedSmall" className="small piece" data-shape="alien" data-color="red" data-size="small" data-placed="false" src="./images/alien.gif" />
															
																<img id="alienBlueBig" className="big piece" data-shape="alien" data-color="blue" data-size="big" data-placed="false" src="./images/alien.gif" />
																<img id="satGreenSmall" className="small piece" data-shape="sat" data-color="green" data-size="small" data-placed="false" src="./images/sat.gif" />
																<img id="satRedBig" className="big piece" data-shape="sat" data-color="red" data-size="big" data-placed="false" src="./images/sat.gif" />
																<img id="sunRedSmall" className="small piece" data-shape="sun" data-color="red" data-size="small" data-spot="false" data-placed="false" src="./images/sun.gif" />

														</div>
												</div>
										</div>
								</div>

								<div className="col-sm-4">
										
										<img id="category1" data-rule="TBD" alreadyPlaced="false" src="./images/emptybox.gif" />
										<h1>NONE OF THE ABOVE</h1>
										<img id="category4" alreadyPlaced="false" src="./images/emptybox.gif" />
								</div>
								<div className="col-sm-2">
									
										<img id="category3" alreadyPlaced="false" src="./images/emptybox.gif" />
								</div>
								<div className="col-sm-2">
									
										<img id="category2" data-rule="TBD" alreadyPlaced="false" src="./images/emptybox.gif" />
								</div>

								{this.props.children}

						</div>

				);
		}
});

// Export the component back for use in other files
module.exports = Pieces;