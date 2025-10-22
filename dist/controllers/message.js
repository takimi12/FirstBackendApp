export const generateRoomId = (userA, userB) => {
    return [userA, userB].sort().join("_");
};
//# sourceMappingURL=message.js.map