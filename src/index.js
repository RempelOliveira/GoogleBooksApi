import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./store";

import * as sw from "./service-worker";

import { library } from "@fortawesome/fontawesome-svg-core";

import { faWhatsapp, faSkype } from "@fortawesome/free-brands-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faBookmarkSolid, faChevronLeft, faCommentDots, faHeart, faShare, faTimes, faEnvelopeOpenText, faEye, faEyeSlash, faCheckCircle, faExclamationCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import Router from "./views/Router";

library.add(faBookmarkRegular, faBookmarkSolid, faChevronLeft, faCommentDots, faHeart, faShare, faTimes, faEnvelopeOpenText, faWhatsapp, faSkype, faEye, faEyeSlash, faCheckCircle, faExclamationCircle, faExclamationTriangle);

ReactDOM.render(
	<Provider store={ store }>
		<Router />
	</Provider>, document.getElementById("root"));

sw.unregister();