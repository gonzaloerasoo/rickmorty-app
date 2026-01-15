const STORAGE_KEY = "team";

function getTeam() {
  const data = localStorage.getItem(STORAGE_KEY);
  return Promise.resolve(data ? JSON.parse(data) : []);
}

function addToTeam(member) {
  return getTeam().then((team) => {
    const exists = team.some((m) => m.id === member.id);
    if (!exists) {
      const updated = [...team, member];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    return true;
  });
}

function removeFromTeam(id) {
  return getTeam().then((team) => {
    const updated = team.filter((m) => m.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  });
}

export default {
  getTeam,
  addToTeam,
  removeFromTeam,
};
