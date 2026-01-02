export const saveTeacher = (teacher) => {
  const teachers = JSON.parse(localStorage.getItem("teachers") || "[]");
  teachers.push(teacher);
  localStorage.setItem("teachers", JSON.stringify(teachers));
};

export const saveStudent = (student) => {
  const students = JSON.parse(localStorage.getItem("students") || "[]");
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
};

export const loginUser = (email, password) => {
  const teachers = JSON.parse(localStorage.getItem("teachers") || "[]");
  const students = JSON.parse(localStorage.getItem("students") || "[]");

  const teacher = teachers.find(
    t => t.email === email && t.password === password
  );

  if (teacher) return { role: "teacher", user: teacher };

  const student = students.find(
    s => s.email === email && s.password === password
  );

  if (student) return { role: "student", user: student };

  return null;
};

