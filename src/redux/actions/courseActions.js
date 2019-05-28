// Naming conv: verbNoun
// Requires a type and usually a payload
export function createCourse(course) {
  return { type: "CREATE_COURSE", course };
}
