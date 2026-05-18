import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployees,
  patchEmployeeDeletion,
  updateEmployee,
} from "../controllers/employeeController";

const router = Router();

router.post("/", createEmployee);
router.get("/", getEmployees);
router.patch("/:id/deletion", patchEmployeeDeletion);
router.get("/:id", getEmployeeById);
router.patch("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
