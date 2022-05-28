type Entity = { id: string };

export const findEntityById = <T extends Entity>(store: T[], id: string) => {
  return store.find((e) => e.id === id);
};

export const insertEntity = <T extends Entity>(store: T[], entity: T) => {
  return findEntityById(store, entity.id)
    ? store.map((e) => (e.id === entity.id ? entity : e))
    : store.concat(entity);
};

export const deleteEntity = <T extends Entity>(store: T[], id: string) => {
  return store.filter((e) => e.id !== id);
};
