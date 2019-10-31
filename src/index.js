import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./Shared/store";

import * as sw from "./service-worker";

import { library } from "@fortawesome/fontawesome-svg-core";

import { faWhatsapp, faSkype } from "@fortawesome/free-brands-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faBookmarkSolid, faChevronLeft, faCommentDots, faHeart, faShare, faTimes, faEnvelopeOpenText, faEye, faEyeSlash, faCheckCircle, faExclamationCircle, faExclamationTriangle, faPencilAlt, faTimesCircle, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

import Router from "./Shared/Router";

library.add(faBookmarkRegular, faBookmarkSolid, faChevronLeft, faCommentDots, faHeart, faShare, faTimes, faEnvelopeOpenText, faWhatsapp, faSkype, faEye, faEyeSlash, faCheckCircle, faExclamationCircle, faExclamationTriangle, faPencilAlt, faTimesCircle, faSyncAlt);

ReactDOM.render(
	<Provider store={ store }>
		<Router />
	</Provider>, document.getElementById("root"));

sw.unregister();