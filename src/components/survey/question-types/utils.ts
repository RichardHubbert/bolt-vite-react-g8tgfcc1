import type { QuestionType } from "@/types/survey";
import { DEFAULT_OPTIONS } from "./constants";

export function getDefaultValueForType(type: QuestionType) {
  switch (type) {
    case "text":
      return "";
    case "multipleChoice":
      return "";
    case "checkbox":
      return [];
    case "rating":
      return null;
    default:
      return null;
  }
}

export function getDefaultOptionsForType(type: QuestionType) {
  switch (type) {
    case "multipleChoice":
    case "checkbox":
      return [...DEFAULT_OPTIONS];
    default:
      return undefined;
  }
}