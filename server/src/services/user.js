import { db } from "db";

export function getAllUsers() {
  return usersBD.findAll();
}

export function getById(id) {
  return usersBD.findById(id);
}

export function deleteById(id) {
  return usersBD.deleteById(id);
}
