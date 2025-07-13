const user = 'api/user';
const post = 'api/post';

/* URL */
export const API_URL = process.env.REACT_APP_API_URL;

/* JWT */
export const API_JWT = `${API_URL}/jwtId`;

/* User */
export const API_USER_LOGIN = `${API_URL}/${user}/login`;
export const API_USER_LOGOUT = `${API_URL}/${user}/logout`;
export const API_USER_REGISTER = `${API_URL}/${user}/register`;
export const API_USER_ALL = `${API_URL}/${user}/`;
export const API_USER_BY_ID = `${API_URL}/${user}`;
export const API_USER_FOLLOW = `${API_URL}/${user}/follow`;
export const API_USER_UNFOLLOW = `${API_URL}/${user}/unfollow`;
export const API_USER_UPLOAD_PICTURE = `${API_URL}/${user}/upload`;

/* Post */
export const API_POST_ALL = `${API_URL}/${post}/`;
export const API_POST_CREATE = `${API_URL}/${post}/`;
export const API_POST_UPDATE = `${API_URL}/${post}`;
export const API_POST_DELETE = `${API_URL}/${post}`;
export const API_POST_LIKE = `${API_URL}/${post}/likePost`;
export const API_POST_UNLIKE = `${API_URL}/${post}/unlikePost`;

