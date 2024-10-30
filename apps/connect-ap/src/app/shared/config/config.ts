const API = 'http://106.51.138.23:3003/api/'
export const API_CONFIG = {
  admin: {
    login_api: API + 'admin/login',
  },
  users: {
    get_api: API + 'auth/getAllUsers',
  },
  posts: {
    get_api: API + 'post/getAllPosts',
  },
}
