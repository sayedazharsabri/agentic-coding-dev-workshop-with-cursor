import { Request, Response } from "express";
import { Employee } from "../models/Employee";

export async function createEmployee(req: Request, res: Response): Promise<void> {
  try {
    const { isDeleted: _omit, ...data } = req.body as Record<string, unknown>;
    const employee = await Employee.create({ ...data, isDeleted: false });
    res.status(201).json(employee);
  } catch (err: unknown) {
    if (isDuplicateKeyError(err)) {
      res.status(409).json({ message: "An employee with this email already exists" });
      return;
    }
    if (isValidationError(err)) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to create employee" });
  }
}

export async function getEmployees(_req: Request, res: Response): Promise<void> {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch {
    res.status(500).json({ message: "Failed to fetch employees" });
  }
}

export async function getEmployeeById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({
      _id: id,
      isDeleted: { $ne: true },
    });
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }
    res.json(employee);
  } catch {
    res.status(400).json({ message: "Invalid employee id" });
  }
}

export async function updateEmployee(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { isDeleted: _omit, ...data } = req.body as Record<string, unknown>;
    const employee = await Employee.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }
    res.json(employee);
  } catch (err: unknown) {
    if (isDuplicateKeyError(err)) {
      res.status(409).json({ message: "An employee with this email already exists" });
      return;
    }
    if (isValidationError(err)) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(400).json({ message: "Failed to update employee" });
  }
}

export async function deleteEmployee(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }
    res.status(204).send();
  } catch {
    res.status(400).json({ message: "Invalid employee id" });
  }
}

export async function patchEmployeeDeletion(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { isDeleted } = req.body as { isDeleted?: unknown };
    if (typeof isDeleted !== "boolean") {
      res.status(400).json({ message: "Body must include isDeleted as a boolean" });
      return;
    }
    const employee = await Employee.findByIdAndUpdate(
      id,
      { isDeleted },
      { new: true, runValidators: true }
    );
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }
    res.json(employee);
  } catch {
    res.status(400).json({ message: "Invalid employee id" });
  }
}

function isDuplicateKeyError(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: number }).code === 11000
  );
}

function isValidationError(err: unknown): err is Error {
  return (
    typeof err === "object" &&
    err !== null &&
    "name" in err &&
    (err as { name?: string }).name === "ValidationError"
  );
}
