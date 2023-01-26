import { Intern } from "../types/Intern";

export const fetchSignleIntern = async (id: number) => {
  const response = await fetch(`http://localhost:3001/interns/?id=${id}`);
  const intern: Intern[] = await response.json();
  return intern;
};

export const editIntern = async (
  id: string,
  name: string,
  email: string,
  internshipStart: string,
  internshipEnd: string
) => {
  const response = await fetch(`http://localhost:3001/interns/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      email: email,
      internshipStart: internshipStart,
      internshipEnd: internshipEnd,
    }),
  });
  return response.ok
};

export const addIntern = async (
  name: string,
  email: string,
  internshipStart: string,
  internshipEnd: string
) => {
  const response = await fetch(`http://localhost:3001/interns`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      email: email,
      internshipStart: internshipStart,
      internshipEnd: internshipEnd,
    }),
  });
  return response.ok
};
