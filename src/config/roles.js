const allRoles = {
  user: ['createPost','editPost','deletePost','viewPosts','createComment', 'editComment', 'deleteComment', 'createTodo', 'editTodo', 'deleteTodo', 'viewTodos'],
  admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
