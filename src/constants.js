// Set up some "enums" (they're not) to store some values
// Helps prevent us making mistakes by assigning
// an invalid value somewhere. It's not foolproof, but
// it's not designed to be. Also means we're not tied to the
// acutal string value of each key, we could change or add
// as we like
export const TODO_STATUS = {
  completed: "completed",
  incomplete: "incomplete",
};

export const TODO_PRIORITY = {
  urgent: "urgent",
  high: "high",
  normal: "normal",
  low: "low",
};
