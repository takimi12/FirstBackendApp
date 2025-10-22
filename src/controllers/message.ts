export const generateRoomId = (userA: string, userB: string) => {
  return [userA, userB].sort().join("_");
};