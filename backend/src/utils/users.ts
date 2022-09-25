const users: any[] = [];

export const addUser = ({
  id,
  username,
  room,
}: {
  id: number;
  username: string;
  room: string;
}) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!username || !room) {
    return {
      error: "Username and room are required!",
    };
  }
  const userExist = users.find((user: { username: string; room: string }) => {
    return user.room === room && user.username === username;
  });

  if (userExist) {
    return {
      error: "Username is in use!",
    };
  }

  const user = { id, username, room };
  users.push(user);
  return { user };
};

export const removeUser = (id: number) => {
  const index = users.findIndex((user) => {
    return user.id === id;
  });

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export const getUser = (id: number) => {
  return users.find((user) => user.id === id);
};

export const getUsersInRoom = (room: any) => {
  return users.filter((user) => user.room === room);
};
